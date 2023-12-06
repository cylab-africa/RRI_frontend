import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
// import { Switch, Route } from "react-router-dom";
import CustomNavbar from "../components/CustomNavbar";
import EvaluationPage from "../pages/EvaluationPage";
import ScoresPage from "../pages/ScoresPage";
import HomePage from "../pages/HomePage";
import ContactsPage from "../pages/ContactsPage";
import AboutusPage from "../pages/AboutusPage";


export default function MainApp() {
  return (
    <Router>
      <div>
        {/* Set up the navigation links */}
        <CustomNavbar />

        {/* Set up the routes */}
        <Switch>
          <Route exact path="/"  component ={HomePage} />
          <Route exact path="/evaluation" component={EvaluationPage} />
          <Route exact path="/score" component={ScoresPage}/>
          <Route exact path="/contacts" component={ContactsPage}/>
          <Route exact path="/about" component={AboutusPage}/>


        </Switch>
      </div>
    </Router>
  );
}
