export const SaveToIndexedDB = (dbName, storeName, data) => {
  const request = indexedDB.open(dbName, 2);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    console.log("Upgrade needed: ", event);
    if (!db.objectStoreNames.contains(storeName)) {
      console.log(`Creating object store: ${storeName}`);
      db.createObjectStore(storeName, { keyPath: "id" });
    } else {
      console.log(`Object store already exists: ${storeName}`);
    }
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    console.log("Database opened successfully: ", event);

    // Check if the object store exists
    if (!db.objectStoreNames.contains(storeName)) {
      console.error(`Object store not found: ${storeName}`);
      return;
    }

    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);

    store.put(data);

    transaction.oncomplete = () => {
      console.log("Data saved to IndexedDB successfully.");
    };

    transaction.onerror = (event) => {
      console.error("Error saving data to IndexedDB:", event.target.error);
    };
  };

  request.onerror = (event) => {
    console.error("Error opening IndexedDB:", event.target.error);
  };
};

export const getFirstItemFromIndexedDB = (dbName, storeName) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 2);

    request.onsuccess = (event) => {
      const db = event.target.result;

      // Check if the object store exists
      if (!db.objectStoreNames.contains(storeName)) {
        console.error(`Object store not found: ${storeName}`);
        resolve(null); // No data found if the store doesn't exist
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
      const request = indexedDB.open(dbName, 2);
  
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
export const logoutUser = (dbName, storeName) => {
  const request = indexedDB.open(dbName, 2);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    console.log("Upgrade needed: ", event);
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, { keyPath: "id" });
    }
  };

  request.onsuccess = (event) => {
    const db = event.target.result;

    if (!db.objectStoreNames.contains(storeName)) {
      console.error(`Object store not found: ${storeName}`);
      return;
    }

    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);

    // Clear all data from the object store to "log out" the user
    const clearRequest = store.clear();

    clearRequest.onsuccess = () => {
      console.log("User logged out successfully. Data cleared from IndexedDB.");
    };

    clearRequest.onerror = (event) => {
      console.error("Error clearing data from IndexedDB:", event.target.error);
    };
  };

  request.onerror = (event) => {
    console.error("Error opening IndexedDB:", event.target.error);
  };
};
