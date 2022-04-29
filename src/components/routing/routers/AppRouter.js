import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {HomeGuard} from "components/routing/routeProtectors/HomeGuard";
import HomeRouter from "components/routing/routers/HomeRouter";
import Login from "components/views/Login";
import PlaceRegister from "components/views/PlaceRegister";
import PlaceProfile from "components/views/PlaceProfile";
import PlaceProfileEdit from "components/views/PlaceProfileEdit";
import EventCreation from "components/views/EventCreation";
import EventProfile from "components/views/EventProfile";
import EventUpdate from "components/views/EventUpdate";

import Registration from "../../views/Registration";
import Profile from "../../views/Profile";
import ProfileEdit from "../../views/ProfileEdit";
import FindPlace from "../../views/FindPlace";
import ApplyEvent from "../../views/ApplyEvent";
import QnA from "components/views/QnA";
import EventAccepted from "../../views/EventAccepted";

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
      <Switch>
        <Route path="/home">
          <HomeGuard>
            <HomeRouter base="/home"/>
          </HomeGuard>
        </Route>
        <Route exact path="/login">

            <Login/>

        </Route>
        <Route exact path="/placeRegister">
            <PlaceRegister/>
        </Route>
        <Route exact path="/placeProfile/:placeId?">
            <PlaceProfile/>
        </Route>
        <Route exact path="/FindPlace">
            <FindPlace/>
        </Route>
        <Route exact path="/eventaccepted">
            <EventAccepted/>
        </Route>
        <Route exact path="/applyEvent/:placeId">
            <ApplyEvent/>
        </Route>
        <Route exact path="/placeProfileEdit/:placeId?">
            <PlaceProfileEdit/>
        </Route>
        <Route exact path="/">
          <Redirect to="/home"/>
        </Route>
        <Route exact path="/eventCreation/:placeId?">
            <EventCreation/>
        </Route>
        <Route exact path="/eventProfile/:placeId?/:eventId?">
            <EventProfile/>
        </Route>
        <Route exact path="/eventUpdate/:placeId?/:eventId?">
            <EventUpdate/>
        </Route>
        <Route exact path="/qa/:eventId">
          <QnA/>
        </Route>
        <Route exact path="/qa/:eventId/:qaSessionId">
          {/* Later refactor this into an embedded component */}
          <QnA/>
        </Route>
        <Route exact path="/registration">
            <Registration/>
        </Route>
        <Route exact path="/">
          <Redirect to="/login"/>
        </Route>
        <Route exact path= "/profile/:userId?">
           <Profile/>
        </Route>
        <Route exact path= "/profileEdit/:userId?">
           <ProfileEdit/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
