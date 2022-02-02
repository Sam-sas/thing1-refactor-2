import { Switch, Route } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";
import "./styles/main.scss";
import PrivateRoute from "./components/layouts/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import SignIn from "./components/authforms/SignIn";
import { AuthProvider } from "./utilities/contexts/authContext";
import SignUp from "./components/authforms/SignUp";
import LandingPage from "./pages/LandingPage";
import LoggedInNavigation from "./components/navigation/LoggedInNavigation";
import ForgotPassword from "./components/authforms/ForgotPassword";
import Account from "./pages/Account";
import SearchExpert from "./pages/SearchExpert";
import Calendar from "./pages/Calendar";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <AuthProvider>
      <Switch>
        <Route exact path="/" component={LoggedInNavigation}></Route>
        <Route path="/welcome" component={LandingPage} />
        <Route path="/sign-in" component={SignIn}></Route>
        <Route path="/sign-up" component={SignUp}></Route>

        <Route path="/account-page" component={Account}></Route>
        <Route path="/expert-search" component={SearchExpert}></Route>
        <Route path="/calendar" component={Calendar}></Route>
        <Route path="/contact-page" component={ContactUs}></Route>
        <Route path="/about-page" component={AboutUs}></Route>
        
        <Route path="/forgot-password" component={ForgotPassword}></Route>
        <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
      </Switch>
    </AuthProvider>
  );
}

export default App;
