import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {GameGuard} from "components/routing/routeProtectors/GameGuard";
import GameRouter from "components/routing/routers/GameRouter";
import {LoginGuard} from "components/routing/routeProtectors/LoginGuard";
import Login from "components/views/Login";
import PlaceRegister from "components/views/PlaceRegister";
import PlaceProfile from "components/views/PlaceProfile";
import PlaceProfileEdit from "components/views/PlaceProfileEdit";
import EventCreation from "components/views/EventCreation";
import EventProfile from "components/views/EventProfile";
import EventUpdate from "components/views/EventUpdate";

import {RegistrationGuard} from "../routeProtectors/RegistrationGuard";
import Registration from "../../views/Registration";
import Profile from "../../views/Profile";
import ProfileEdit from "../../views/ProfileEdit";

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
        <Route path="/game">
          <GameGuard>
            <GameRouter base="/game"/>
          </GameGuard>
        </Route>
        <Route exact path="/login">

            <Login/>

        </Route>
        <Route exact path="/">
          <Redirect to="/game"/>
        </Route>
        <Route exact path="/placeRegister">
            <PlaceRegister/>
        </Route>
        <Route exact path="/placeProfile">
            <PlaceProfile/>
        </Route>
        <Route exact path="/placeProfileEdit">
            <PlaceProfileEdit/>
        </Route>
        <Route exact path="/eventCreation">
            <EventCreation/>
        </Route>
        <Route exact path="/eventUpdate">
            <EventUpdate/>
        </Route>
        <Route exact path="/eventProfile">
            <EventProfile/>
        </Route>
        <Route exact path="/eventUpdate">
            <EventUpdate/>
        </Route>
        <Route exact path="/registration">
            <Registration/>
        </Route>
        <Route exact path="/">
          <Redirect to="/login"/>
        </Route>
        <Route exact path= "/profile">
           <Profile/>
        </Route>
        <Route exact path= "/profileedit">
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
