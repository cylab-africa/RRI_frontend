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

export default function MainApp() {
  return (
    <Router>
      <div class="container py-3">
        <header>
          <div class="mobile-top">
            <div class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
              <img
                style={{width:'40%'}}
                // src={require("../images/Upanzi_Network_logo.jpg")}
                src={require("../images/upanzi_logo.png")}
                class="logo-upanzi-mobile"
              />
              <a
                href="/"
                class="d-flex align-items-center text-dark text-decoration-none"
              >
                <span class="fs-5 system-name">CyLab Africa &bull; Upanzi Network &bull; RRI</span>
              </a>

              <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                <a class="me-3 py-2 text-dark nav-links" href="/">
                  Home
                </a>
                <a class="me-3 py-2 text-dark nav-links" href="/dashboard">
                  Dashboard
                </a>
                <a class="me-3 py-2 text-dark nav-links" href="/about">
                  About us
                </a>
              </nav>
            </div>
          </div>

          <div class="desktop-top">
            <div class="upanzi-logo-desktop">
              <a href="/">
              <img
                style={{width:'15%', float:'left'}}
                // src={require("../images/Upanzi_Network_logo.jpg")}
                src={require("../images/upanzi_logo.png")}
                alt="Upanzi Network"
              />
              </a>
              
            </div>
            <div class="bottom_item">
              <a class="me-3 py-2 text-dark nav-links" href="/">
                Home
              </a>
              <a class="me-3 py-2 text-dark nav-links" href="/dashboard">
                Dashboard
              </a>
              <a class="me-3 py-2 text-dark nav-links" href="/about">
                About us
              </a>
            </div>
          </div>
        </header>

        <main style={{height:'100%'}}>
          <div
            class="removeTopSpace"
            style={{ position: "relative", padding:0 }}
          >
            <div style={{padding:0, margin:0}} class="pricing-header p-3 pb-md-4 mx-auto text-center">
              {/* <h3 class="system-sub-title not-mobile">
                RRI Project Evaluation{" "}
              </h3> */}
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/consent" component={ConsentPage} />
                <Route exact path="/evaluation" component={EvaluationPage} />
                {/* <Route exact path="/score" component={ScoresPage}/> */}
                <Route exact path="/contacts" component={ContactsPage} />
                <Route exact path="/about" component={AboutusPage} />
                <Route exact path="/dashboard" component={DashboardScreen} />
              </Switch>
            </div>
          </div>
        </main>
        <footer style={{textAlign:'center'}} class="pt-4 my-md-2 pt-md-2 border-top">
          <div class="row">
            <div class="col-md-12">
              <small class="d-block mb-3 text-muted">
                &copy;{new Date().getFullYear()} CyLab-Africa &bull; Upanzi Network &bull;{" "}
                <a href="/about">RRI</a>
              </small>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
