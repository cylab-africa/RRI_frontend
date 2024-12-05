import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
// import { Switch, Route } from "react-router-dom";
import CustomNavbar from "../components/CustomNavbar";
import EvaluationPage from "../pages/EvaluationPage";
import ScoresPage from "../pages/DashboardScreen";
import HomePage from "../pages/HomePage";
import ContactsPage from "../pages/ContactsPage";
import AboutusPage from "../pages/AboutusPage";
import DashboardScreen from "../pages/DashboardScreen";
import ConsentPage from "../pages/ConsentPage";
import NotFoundPage from "../pages/NotFoundPage";
import PrinciplesPage  from "../pages/PrinciplesPage.jsx"
import NewHomePage from "../pages/NewHope";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Button } from "react-bootstrap";
import { API } from "../apis/http";
import { checkUserLoggedIn, logoutUser, SaveToIndexedDB } from "../helpers/indexedDB.js";
import AdminScreen from "../pages/admin.jsx";
import Layout from "./Layout.jsx";



export default function MainApp() {
  const api = new API();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profilePic, setProfilePic] = useState('');
  const errorMessage = (error) => {
    console.log(error);
  };

  function openNav() {
    document.getElementById("myNav").classList.toggle("menu_width")
    document.querySelector(".custom_menu-btn").classList.toggle("menu_btn-style")
  }
  useEffect(() => {
    checkUserLoggedIn('GoogleCredentialsDB', 'CredentialsStore')
      .then((isLoggedIn) => {
        if (isLoggedIn) {
          // Retrieve user data from IndexedDB
          const request = indexedDB.open('GoogleCredentialsDB', 2);

          request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['CredentialsStore'], 'readonly');
            const store = transaction.objectStore('CredentialsStore');
            const getAllRequest = store.getAll();

            getAllRequest.onsuccess = (event) => {
              const storedData = event.target.result[0]; // Assuming you only store one user's credentials
              if (storedData) {
                setProfile(storedData);
              }
            };
          };
        }
      })
      .catch((error) => console.error("Error checking logged-in status:", error));
  }, []);
  const onSuccess = async (response) => {
    try {
      const checkUserBody = { token: response.credential };
      // check if user exit
      const checkUserResponse = await api.postRequest("/check-user", checkUserBody, true);
      const data = await checkUserResponse.data;
      console.log('true registration:', data)
      const decodedToken = jwtDecode(response.credential);
      let authResponse;
      let accessToken;
      if (data.userRegistered == false) {
        console.log('false registration')
        const registerBody = {
          email: decodedToken.email,
          firstName: decodedToken.given_name,
          lastName: decodedToken.family_name,
          googleCredential: response.credential
        };
        authResponse = await api.postRequest("/signup", registerBody, true);
        accessToken = authResponse.data.accessToken;
        setProfile(decodedToken);
      } else {
        accessToken = data.accessToken;
        setProfile(decodedToken);
      }
      // Save Google credentials to IndexedDB
      const googleCredentials = {
        id: decodedToken.sub, // unique identifier
        token: response.credential,
        email: decodedToken.email,
        firstName: decodedToken.given_name,
        lastName: decodedToken.family_name,
        picture: decodedToken.picture,
        accessToken: accessToken
      };
      SaveToIndexedDB('GoogleCredentialsDB', 'CredentialsStore', googleCredentials);

      openNav()

    } catch (error) {
      console.log(error)
    }
  };

  // log out function to log the user out of google and set the profile array to null
  const logOut = (e) => {
    logoutUser('GoogleCredentialsDB', 'CredentialsStore');
    googleLogout(); // This should log the user out from Google
    setUser(null);  // Reset user state
    setProfile(null);
    setProfilePic(null) // Reset profile state
    openNav()
  };

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/old" component={NewHomePage} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/consent" component={ConsentPage} />

          <Route exact path="/evaluation" component={EvaluationPage} />
          {/* <Route exact path="/score" component={ScoresPage}/> */}
          <Route exact path="/principles" component={PrinciplesPage} />
          <Route exact path="/contacts" component={ContactsPage} />
          <Route exact path="/about" component={AboutusPage} />
          <Route exact path="/dashboard" component={DashboardScreen} />
          <Route exact path="/admin" component={AdminScreen} />
          <Route path="*" component={NotFoundPage} />
        </Switch>

      </Layout>
    </Router>
  );
}
