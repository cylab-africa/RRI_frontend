export const SaveToIndexedDB = (dbName, storeName, data) => {
  const request = indexedDB.open(dbName); // Open or create the database

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    console.log("Upgrade needed: ", event);

    if (!db.objectStoreNames.contains(storeName)) {
      console.log(`Creating object store: ${storeName}`);
      db.createObjectStore(storeName, { autoIncrement: true });
    }
  };

  request.onsuccess = (event) => {
    const db = event.target.result;

    // Check if the object store exists
    if (!db.objectStoreNames.contains(storeName)) {
      console.error(`Object store not found: ${storeName}`);
      db.close();
      // Increment version and reopen the database
      const upgradeRequest = indexedDB.open(dbName, db.version + 1);

      upgradeRequest.onupgradeneeded = (event) => {
        const upgradeDB = event.target.result;
        console.log(`Creating object store: ${storeName} during upgrade.`);
        upgradeDB.createObjectStore(storeName, { autoIncrement: true });
      };

      upgradeRequest.onsuccess = (event) => {
        console.log(`Object store ${storeName} created. Reattempting data save.`);
        SaveToIndexedDB(dbName, storeName, data); // Retry saving after creating store
      };

      upgradeRequest.onerror = (event) => {
        console.error("Error creating object store during upgrade:", event.target.error);
      };

      return; // Exit to wait for upgrade to complete
    }

    // Proceed to save data
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);

    const putRequest = store.put(data);

    putRequest.onsuccess = () => {
      console.log("Data saved to IndexedDB successfully.");
    };

    putRequest.onerror = (event) => {
      console.error("Error saving data to IndexedDB:", event.target.error);
    };
  };

  request.onerror = (event) => {
    console.error("Error opening IndexedDB:", event.target.error);
  };
};

export const getFirstItemFromIndexedDB = (dbName, storeName) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);

    request.onsuccess = (event) => {
      const db = event.target.result;

      // Check if the object store exists
      if (!db.objectStoreNames.contains(storeName)) {
        console.error(`Object store not found get: ${storeName}`);
        db.close(); // Close the current connection

        // Increment version and reopen the database
        const upgradeRequest = indexedDB.open(dbName, db.version + 1);

        upgradeRequest.onupgradeneeded = (event) => {
          const upgradeDB = event.target.result;
          console.log(`Creating object store: ${storeName} during upgrade.`);
          upgradeDB.createObjectStore(storeName, { autoIncrement: true });
        };

        upgradeRequest.onsuccess = () => {
          console.log(`Object store ${storeName} created. Retrying operation.`);
          resolve(getFirstItemFromIndexedDB(dbName, storeName)); // Retry after store creation
        };

        upgradeRequest.onerror = (event) => {
          reject("Error creating object store: " + event.target.error);
        };
        return;
      }

      // Start a transaction to read from the store
      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);

      // Open a cursor to get the first record
      const cursorRequest = store.openCursor();

      cursorRequest.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          resolve(cursor.value); // Return the first item found in the store
        } else {
          resolve(null); // No data in the store
        }
      };

      cursorRequest.onerror = (event) => {
        reject("Error retrieving data from IndexedDB");
      };
    };

    request.onerror = (event) => {
      reject("Error opening IndexedDB: " + event.target.error);
    };
  });
};


// Function to check if the user is logged in
export const checkUserLoggedIn = (dbName, storeName) => {
  return new Promise((resolve, reject) => {
    // Open the IndexedDB database with version 2
    const request = indexedDB.open(dbName);

    request.onupgradeneeded = (event) => {
      // If the database needs to be upgraded, create the object store
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        // If the object store doesn't exist, create it, but this should
        // only happen if the user is signing in.
        db.createObjectStore(storeName, { keyPath: "id" });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;

      // Check if the object store exists in the database
      if (!db.objectStoreNames.contains(storeName)) {
        // If the store doesn't exist, it means the user has not signed in yet
        resolve(false);  // No user credentials found, so user is not logged in
        return;
      }

      // If the store exists, check if it has any credentials
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);

      const getAllRequest = store.getAll(); // Retrieve all user credentials

      getAllRequest.onsuccess = (event) => {
        const data = event.target.result;
        // Check if any credentials are stored
        if (data.length > 0) {
          resolve(true);  // User credentials exist, user is logged in
        } else {
          resolve(false); // No credentials found, user is not logged in
        }
      };

      getAllRequest.onerror = () => {
        reject("Error retrieving data from IndexedDB");
      };
    };

    request.onerror = (event) => {
      // Error occurred while trying to open the database (likely doesn't exist)
      if (event.target.error.name === 'NotFoundError') {
        resolve(false);  // If the database is not found, assume the user is not logged in
      } else {
        reject("Error opening IndexedDB: " + event.target.error);
      }
    };
  });
};

// Function to log out the user by clearing the credentials from IndexedDB
export const logoutUser = async () => {
  // Get the names of all IndexedDB databases
  const databases = await indexedDB.databases(); // This returns a list of all databases

    // List of databases to keep
    const keepDbs = ["QuestionsDB"]; // Add other database names you want to keep here

  // Delete each database
  databases.forEach((db) => {
    if (!keepDbs.includes(db.name)) {
      const deleteRequest = indexedDB.deleteDatabase(db.name);

      deleteRequest.onsuccess = () => {
        console.log(`Database "${db.name}" deleted successfully.`);
      };

      deleteRequest.onerror = (event) => {
        console.error(`Error deleting database "${db.name}":`, event.target.error);
      };

      deleteRequest.onblocked = () => {
        console.warn(`Database "${db.name}" deletion is blocked.`);
      };
    } else {
      console.log(`Database "${db.name}" retained.`);
    }
  });
};

// delete specific db
export const deleteIndexedDB = (dbName) => {
  return new Promise((resolve, reject) => {
    const deleteRequest = indexedDB.deleteDatabase(dbName);

    deleteRequest.onsuccess = () => {
      console.log(`Database "${dbName}" deleted successfully.`);
      resolve(true);
    };

    deleteRequest.onerror = (event) => {
      console.error(`Error deleting database "${dbName}":`, event.target.error);
      reject(event.target.error);
    };

    deleteRequest.onblocked = () => {
      console.warn(`Database "${dbName}" deletion is blocked. Close any open connections.`);
      reject("Deletion blocked");
    };
  });
};

