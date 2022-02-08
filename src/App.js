import { Switch, Route } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";
import "./styles/main.scss";
import PrivateRoute from "./components/layouts/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import SignIn from "./components/authforms/SignIn";
import { AuthProvider } from "./utilities/contexts/authContext";
import SignUp from "./components/authforms/SignUp";
import LandingPage from "./pages/LandingPage";
import ForgotPassword from "./components/authforms/ForgotPassword";
import Account from "./pages/Account";
import SearchExpert from "./pages/SearchExpert";
import Calendar from "./pages/Calendar";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import UpdateProfile from "./components/authforms/UpdateProfile";
import CheckUserStatusNavigation from "./components/navigation/CheckUserStatusNavigation";
import UpdateLogin from "./components/authforms/UpdateLogin";
import UpdateExpertise from "./components/authforms/UpdateExpertise";

function App() {
  return (
    <AuthProvider>
      <Switch>
        <Route exact path="/" component={CheckUserStatusNavigation}></Route>
        <Route path="/welcome" component={LandingPage} />
        <Route path="/sign-in" component={SignIn}></Route>
        <Route path="/sign-up" component={SignUp}></Route>

        <Route path="/account" component={Account}></Route>
        <Route path='/update-login' component={UpdateLogin}></Route>
        <Route path='/update-profile' component={UpdateProfile}></Route>
        <Route path='/update-expertise' component={UpdateExpertise}></Route>

        <Route path="/expert-search" component={SearchExpert}></Route>
        <Route path="/calendar" component={Calendar}></Route>
        <Route path="/contact-page" component={ContactUs}></Route>
        <Route path="/about-page" component={AboutUs}></Route>
        
        <Route path="/update-profile" component={UpdateProfile} />
        <Route path="/forgot-password" component={ForgotPassword}></Route>
        <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
      </Switch>
    </AuthProvider>
  );
}

export default App;
