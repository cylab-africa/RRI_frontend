import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { getFirstItemFromIndexedDB, logoutUser, SaveToIndexedDB } from "../helpers/indexedDB";
import { jwtDecode } from "jwt-decode";
import { API } from "../apis/http";
import { Button } from "react-bootstrap";
import { useAuth } from "./AuthProvider";

function Layout({ children }) {
    const { profile,isauthenticated,setIsAuthenticated,setProfile } = useAuth();

    const api = new API();
    const location = useLocation();
    const isAdminRoute = location.pathname === '/admin';
    const [user, setUser] = useState(null);
    const errorMessage = (error) => {
        console.log(error);
    };


    function openNav() {
        document.getElementById("myNav").classList.toggle("menu_width")
        document.querySelector(".custom_menu-btn").classList.toggle("menu_btn-style")
    }

    // Check if the user is logged in on component mount
    useEffect(() => {
        const checkLoginStatus = async () => {
            const storedCredentials = await getFirstItemFromIndexedDB('GoogleCredentialsDB', 'CredentialsStore');
            if (storedCredentials) {
                const decodedToken = jwtDecode(storedCredentials.token);
                setProfile(decodedToken);
                // setProfilePic(storedCredentials.picture);
                setUser(storedCredentials);
            }
        };

        checkLoginStatus();
    }, []); // Empty dependency array means this runs once when the component mounts

    const onSuccess = async (response) => {
        try {
            
            openNav()
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
             
            console.log('access token: ',accessToken)
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
            setIsAuthenticated(true)
            SaveToIndexedDB('GoogleCredentialsDB', 'CredentialsStore', googleCredentials);


        } catch (error) {
            console.log(error)
        }
    };

    // log out function to log the user out of google and set the profile array to null
    const logOut = (e) => {
        openNav()
        logoutUser('GoogleCredentialsDB', 'CredentialsStore');
        googleLogout(); // This should log the user out from Google
        setUser(null);  // Reset user state
        setProfile(null);
        // setProfilePic(null) // Reset profile state
        
    };
    return (
        <div>
            {!isAdminRoute && (
                <>
                    <header class="header_section">
                        <div class="container-fluid">
                            <nav class="navbar navbar-expand-lg custom_nav-container">
                                <a class="navbar-brand" href="/">
                                    <img style={{ width: 200 }} src={require('../images/Upanzi-Network-logo.png')} alt="" />
                                </a>
                                <div class="" id="">

                                    <div class="custom_menu-btn">
                                        {
                                            profile ? <button
                                                style={{
                                                    width: 'fit-content'
                                                }} onClick={openNav}>
                                                <img
                                                    style={{
                                                        'width': '70px',
                                                        'height': '70px',
                                                        borderRadius: '50%',
                                                        marginBottom: '30px'
                                                    }}
                                                    src={`${profile.picture}?v=${new Date().getTime()}`}
                                                    referrerPolicy="no-referrer"
                                                    alt=""
                                                    loading="lazy" />
                                            </button> :
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
                                        <div class="overlay-content"
                                        style={{
                                            marginTop:profile?'70px':'10px'
                                        }}>
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
                </>
            )}
            {children}
            {!isAdminRoute && (
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

                                    <div >

                                        <p>
                                            <a target="_blank" href="https://www.africa.engineering.cmu.edu/research/upanzi/index.html">
                                                Upanzi Network
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
            )}
            {!isAdminRoute && (

                <section class="container-fluid footer_section ">
                    <p>

                        <a href=""> &copy; 2024 Upanzi Network</a>
                    </p>
                </section>

            )}
        </div>
    );
}
export default Layout;