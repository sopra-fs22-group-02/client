import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {HomeGuard} from "components/routing/routeProtectors/HomeGuard";
import {ProfileGuard} from "components/routing/routeProtectors/ProfileGuard";
import {ProfileEditGuard} from "components/routing/routeProtectors/ProfileEditGuard";
import {AuthPlaceGuard} from "components/routing/routeProtectors/AuthPlaceGuard"
import { LoginGuard } from "../routeProtectors/LoginGuard";
import HomeRouter from "components/routing/routers/HomeRouter";
import Login from "components/views/Login";
import PlaceRegister from "components/views/PlaceRegister";
import PlaceProfile from "components/views/PlaceProfile";
import PlaceProfileEdit from "components/views/PlaceProfileEdit";
import EventCreation from "components/views/EventCreation";
import EventProfile from "components/views/EventProfile";
import EventUpdate from "components/views/EventUpdate";
import Events from "components/views/Events";
import Registration from "../../views/Registration";
import Profile from "../../views/Profile";
import ProfileEdit from "../../views/ProfileEdit";
import FindPlace from "../../views/FindPlace";
import ApplyEvent from "../../views/ApplyEvent";
import QnA from "components/views/QnA";
import EventAccepted from "../../views/EventAccepted";
import ChooseApplicant from "components/views/ChooseApplicant";
import AppliedUsers from "../../views/AppliedUsers";
import Home from "components/views/Home";
import { PlaceCreatedGuard } from "../routeProtectors/PlaceCreatedGuard";
import Header from "components/views/Header";


/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
    <Header height="100"/>
      <Switch>
        <Route path="/home">
          <HomeGuard>
            <HomeRouter base="/home"/>
          </HomeGuard>
        </Route>
        <Route exact path="/login">
            <LoginGuard><Login/></LoginGuard>
        </Route>
        <Route exact path="/placeRegister">
          <HomeGuard>
            <PlaceCreatedGuard>
              <PlaceRegister/>
            </PlaceCreatedGuard>
          </HomeGuard>
        </Route>
        <Route exact path="/placeProfile/:placeId?">
            <AuthPlaceGuard>
              <PlaceProfile/>
            </AuthPlaceGuard>
        </Route>
        <Route exact path="/events/:placeId">
            <AuthPlaceGuard><Events/></AuthPlaceGuard>
        </Route>
        {/* <Route exact path="/chooseApplicants/:eventId">
            <HomeGuard><ChooseApplicant/></HomeGuard>
        </Route> */}
        <Route exact path="/FindPlace">
            <HomeGuard><FindPlace/></HomeGuard>
        </Route>
        {/* <Route exact path="/eventaccepted">
            <HomeGuard><EventAccepted/></HomeGuard>
        </Route> */}
        <Route exact path="/applyEvent/:placeId/:providerId">
            <HomeGuard><ApplyEvent/></HomeGuard>
        </Route>
        <Route exact path="/placeProfileEdit/:placeId?">
            <AuthPlaceGuard><PlaceProfileEdit/></AuthPlaceGuard>
        </Route>
        <Route exact path="/">
          <Redirect to="/home"/>
        </Route>
        <Route exact path="/eventCreation/:placeId?">
            <AuthPlaceGuard><EventCreation/></AuthPlaceGuard>
        </Route>
        <Route exact path="/eventProfile/:placeId?/:eventId?">
            <HomeGuard><EventProfile/></HomeGuard>
        </Route>
        <Route exact path="/eventUpdate/:placeId?/:eventId?">
            <AuthPlaceGuard><EventUpdate/></AuthPlaceGuard>
        </Route>
        <Route exact path="/qa/:eventId">
          <HomeGuard><QnA/></HomeGuard>
        </Route>
        <Route exact path="/qa/:eventId/:qaSessionId">
          {/* Later refactor this into an embedded component */}
          <HomeGuard><QnA/></HomeGuard>
        </Route>
        <Route exact path="/registration">
            <LoginGuard><Registration/></LoginGuard>
        </Route>
        {/* <Route exact path="/appliedUsers">
            <HomeGuard><AppliedUsers/></HomeGuard>
        </Route> */}
        <Route exact path="/">
          <Redirect to="/login"/>
        </Route>
        <Route exact path= "/profile/:userId?">
          <ProfileGuard>
            <Profile/>
          </ProfileGuard>
        </Route>
        <Route exact path= "/profileEdit/:userId?">
          <ProfileEditGuard>
            <ProfileEdit/>
          </ProfileEditGuard>
        </Route>
        {/* <Route exact path="/chooseapplicant/:eventId">
          <ChooseApplicant />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
