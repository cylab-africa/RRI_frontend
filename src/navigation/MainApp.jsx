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
import NewHomePage from "../pages/NewHope";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { Button } from "react-bootstrap";
import { API } from "../apis/http";



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
  const onSuccess = async (response) => {
    console.log('successful: ',response)
    

    try {
      const checkUserBody = { token: response.credential };
    // check if user exit
    const checkUserResponse = await api.postRequest("/check-user", checkUserBody, true);
    console.log('check user: ',checkUserResponse)
      const data = await checkUserResponse.data;
    console.log('registered: ',data)
    if(data.userRegistered==false){
      const decodedToken = jwtDecode(response.credential);
    console.log("Decoded JWT token:", decodedToken);
    const registerBody={
      email:decodedToken.email,
      firstName:decodedToken.given_name,
      lastName:decodedToken.family_name,
      googleCredential:response.credential
    };
    const signupResponse=await api.postRequest("/signup", registerBody, true);
    console.log('sign up successful',signupResponse)

    setProfile(decodedToken);
    }else{
      console.log('google credential: ',response)
      const decodedToken = jwtDecode(response.credential);
      setProfile(decodedToken);
    }
    
    openNav()
    } catch (error) {
      console.log(error)
    }
  };

  // log out function to log the user out of google and set the profile array to null
  const logOut = (e) => {
    googleLogout(); // This should log the user out from Google
    setUser(null);  // Reset user state
    setProfile(null);
    setProfilePic(null) // Reset profile state
    openNav()
  };

  return (
    <Router>
      <div class="hero_area ">
        <header class="header_section">
          <div class="container-fluid">
            <nav class="navbar navbar-expand-lg custom_nav-container">
              <a class="navbar-brand" href="/">
                <img style={{ width: 200 }} src={require('../images/Upanzi-Network-logo.png')} alt="" />
              </a>
              <div class="" id="">

                <div class="custom_menu-btn">
                  {
                    profile?<button
                    style={{
                      width:'fit-content'
                    }} onClick={openNav}>
                       <img 
                       style={{
                        'width':'90px',
                        'height':'90px',
                        borderRadius:'50%'
                       }}
                       src={`${profile.picture}?v=${new Date().getTime()}`}
                       referrerPolicy="no-referrer"
                       alt="" 
                       loading="lazy"/>
                    </button>:
                    <button onClick={openNav}>
                    <span class="s-1">

                    </span>
                    <span class="s-2">

                    </span>
                    <span class="s-3">

                    </span>
                  </button>

                  }
                  
                </div>
                <div id="myNav" class="overlay">
                  <div class="overlay-content">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/dashboard">Dashboard</a>
                    <a className="google-btn" href="">
                      {profile ?
                        <Button onClick={logOut}>Log out</Button>
                        : <GoogleLogin onSuccess={onSuccess} onError={errorMessage} />
                      }</a>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </header>
        <Switch>
          <Route exact path="/old" component={NewHomePage} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/consent" component={ConsentPage} />

          <Route exact path="/evaluation" component={EvaluationPage} />
          {/* <Route exact path="/score" component={ScoresPage}/> */}
          <Route exact path="/contacts" component={ContactsPage} />
          <Route exact path="/about" component={AboutusPage} />
          <Route exact path="/dashboard" component={DashboardScreen} />
          <Route path="*" component={NotFoundPage} />
        </Switch>

        <section class="info_section ">
          <div class="container">
            <div class="row">
              <div class="col-md-4 col-lg-4">
                <div class="info_contact">
                  <h5>
                    CONTACT INFO
                  </h5>

                  <div>
                    <img src="images/mail.png" alt="" />
                    <p>
                      upanzi@andrew.cmu.edu
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-lg-4">
                <div class="info_time">
                  <h5>
                    Affiliations
                  </h5>

                  {/* <div >
                  <p>
                  <a  href="/about">
                About us
              </a>
                  </p>
                
            </div> */}

                  <div >

                    <p>
                      <a target="_blank" href="https://www.africa.engineering.cmu.edu/research/upanzi/index.html">
                        Upanzi network
                      </a>
                    </p>

                  </div>

                  <div >

                    <p>
                      <a target="_blank" href="https://www.africa.engineering.cmu.edu/research/cybersecurity/cylab/index.html">
                        CyLab Africa
                      </a>
                    </p>

                  </div>
                  <div >

                    <p>

                      <a target="_blank" href="https://africa.engineering.cmu.edu/">
                        CMU Africa
                      </a>
                    </p>

                  </div>

                </div>
              </div>

              <div class="col-md-4 col-lg-4">
                <div class="info_social">
                  <h5>
                    social media
                  </h5>
                  <div class="social_container">


                    <div>
                      <a target="_blank" href="https://x.com/cylabafrica?lang=en">
                        <img src={require('../images/twitter.png')} alt="" />
                      </a>
                    </div>
                    <div>
                      <a target="_blank" href="https://www.linkedin.com/company/cylabafrica/">
                        <img src={require('../images/linkedin.png')} alt="" />
                      </a>
                    </div>

                  </div>
                </div>
              </div>


            </div>
          </div>
        </section>



        <section class="container-fluid footer_section ">
          <p>

            <a href=""> &copy; 2024 Upanzi network.</a>
          </p>
        </section>



      </div>

    </Router>
  );
}
