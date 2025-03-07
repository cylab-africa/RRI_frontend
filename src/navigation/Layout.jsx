import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { getFirstItemFromIndexedDB, logoutUser, SaveToIndexedDB } from "../helpers/indexedDB";
import { jwtDecode } from "jwt-decode";
import { API } from "../apis/http";
import { Button } from "react-bootstrap";
import { useAuth } from "./AuthProvider";
import loadingGif from '../images/loading.gif'

function Layout({ children }) {
    const { profile, isAuthenticated, setIsAuthenticated, setProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    const [imageKey, setImageKey] = useState(Date.now());
    const [isSideBarOpen, setisSideBarOpen] = useState(false);
    const [profilePic, setProfilePic] = useState(null)
    const api = new API();
    const location = useLocation();
    const isAdminRoute = location.pathname === '/admin';
    const [user, setUser] = useState(null);
    const errorMessage = (error) => {
        console.log(error);
    };


    function openNav(event) {
        if (event) {
            event.preventDefault();  // Prevent any default behavior such as form submission
        }
        setisSideBarOpen(!isSideBarOpen)
        document.getElementById("myNav").classList.toggle("menu_width")
        document.querySelector(".custom_menu-btn").classList.toggle("menu_btn-style")
    }

    useEffect(() => {
        if (profilePic) {
            setImageKey(Date.now()); // Forces re-render
        }
    }, [profilePic]);
    // Check if the user is logged in on component mount
    useEffect(() => {
        const checkLoginStatus = async () => {
            const storedCredentials = await getFirstItemFromIndexedDB('GoogleCredentialsDB', 'CredentialsStore');
            if (storedCredentials) {
                console.log('stored credential: ', storedCredentials.picture)
                let decodedToken = jwtDecode(storedCredentials.accessToken);
                console.log('picture: ', decodedToken)
                setProfile(decodedToken);
                setProfilePic(storedCredentials.picture);
                setUser(storedCredentials);
                setIsAuthenticated(true)
            }
        };

        checkLoginStatus();
    }, [isAuthenticated]); // Empty dependency array means this runs once when the component mounts

    const onSuccess = async (response) => {
        setIsAuthenticated(true)
        try {
            setLoading(true);  // Set loading state to true when the process starts
            openNav()
            const checkUserBody = { token: response.credential };
            // Start checking if the user exists and don't wait for it yet
            const checkUserPromise = api.postRequest("/check-user", checkUserBody, true);

            // Wait for the check-user response
            const checkUserResponse = await checkUserPromise;
            // check if user exit
            const data = checkUserResponse.data;
            const decodedToken = jwtDecode(response.credential);
            let authResponse;
            let accessToken;
            if (data?.userRegistered === false) {
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
                setProfilePic(decodedToken.picture);
                setLoading(false)
            } else {
                console.log('auth response: ', data)
                accessToken = data?.accessToken;
                setProfilePic(decodedToken.picture);
                setProfile(decodedToken);
                setLoading(false)
            }
            setIsAuthenticated(true)
            // Save Google credentials to IndexedDB
            const googleCredentials = {
                id: decodedToken.sub, // unique identifier
                email: decodedToken.email,
                firstName: decodedToken.given_name,
                lastName: decodedToken.family_name,
                picture: decodedToken.picture,
                accessToken: accessToken
            };
            SaveToIndexedDB('GoogleCredentialsDB', 'CredentialsStore', googleCredentials);


        } catch (error) {

            console.log('authentication failed', error)
        }
    };

    // log out function to log the user out of google and set the profile array to null
    const logOut = async (e) => {
        e.preventDefault();
        try {
            googleLogout(); // Immediately log out from Google
            await logoutUser(); // Ensure IndexedDB operations complete

            setUser(null);
            setProfilePic(null)
            setProfile(null);
            setIsAuthenticated(false);
            openNav()
        } catch (error) {
            console.error("Logout failed:", error);
        }

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
                                            (profile && !isSideBarOpen && !loading) ? <button
                                                style={{
                                                    width: 'fit-content',
                                                    'margin-top': '14px',
                                                    'outline': 'none',
                                                    'border': 'none',
                                                    'background-color': 'transparent',
                                                }} onClick={openNav}>

                                                <img
                                                    style={{
                                                        'width': '70px',
                                                        'height': '70px',
                                                        borderRadius: '50%',
                                                        marginBottom: '30px'
                                                    }}
                                                    src={`${profilePic}?v=${new Date().getTime()}`}
                                                    referrerPolicy="no-referrer"
                                                    alt=""
                                                    loading="lazy" />
                                            </button> :
                                                <button onClick={openNav}
                                                    style={{
                                                        width: 'fit-content',
                                                        'margin-top': '14px',
                                                        'outline': 'none',
                                                        'border': 'none',
                                                        'background-color': 'transparent',
                                                        'display': (isSideBarOpen && profile) ? 'none' : 'block'
                                                    }}>
                                                    {
                                                        loading ?
                                                            <img
                                                                style={{
                                                                    'width': '50px',
                                                                    'height': '50px',
                                                                    borderRadius: '50%',
                                                                    marginBottom: '30px'
                                                                }}
                                                                src={`${loadingGif}?v=${new Date().getTime()}`}
                                                                referrerPolicy="no-referrer"
                                                                alt=""
                                                                loading="lazy" /> :
                                                            <>
                                                                <span class="s-1">

                                                                </span>
                                                                <span class="s-2">

                                                                </span>
                                                                <span class="s-3">

                                                                </span></>
                                                    }

                                                </button>

                                        }

                                    </div>
                                    <div id="myNav" class="overlay"
                                    >
                                        <div class="overlay-content"
                                            style={{
                                                top: profile ? "2%" : '12%'
                                            }}>
                                            <a href="">
                                                <button
                                                    style={{
                                                        width: 'fit-content',
                                                        'margin-top': '14px',
                                                        'outline': 'none',
                                                        'border': 'none',
                                                        'background-color': 'transparent',
                                                        display: profile ? 'block' : 'none'
                                                    }} onClick={openNav}>
                                                    <img
                                                        style={{
                                                            'width': '70px',
                                                            'height': '70px',
                                                            borderRadius: '50%',
                                                            marginBottom: '30px'
                                                        }}
                                                        src={profilePic}
                                                        referrerPolicy="no-referrer"
                                                        alt=""
                                                        loading="lazy" />
                                                </button>
                                            </a>
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
            )
            }
            {children}
            {
                !isAdminRoute && (
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
                )
            }
            {
                !isAdminRoute && (

                    <section class="container-fluid footer_section ">
                        <p>

                            <a href=""> &copy; 2024 Upanzi Network</a>
                        </p>
                    </section>

                )
            }
        </div >
    );
}
export default Layout;