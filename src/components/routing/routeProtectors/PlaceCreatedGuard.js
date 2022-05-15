import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

/**
 *
 * If the user has already created a place, then simply redirect him to the placeprofile
 *  
 */
export const PlaceCreatedGuard = props => {

    const placeId = localStorage.getItem("placeIdOfLoggedInUser")

    if (!placeId) {
        return props.children;
    }
    // if user is already logged in, redirects to the main /app
    return <Redirect to={`/placeprofile/${placeId}`}/>;
};

PlaceCreatedGuard.propTypes = {
  children: PropTypes.node
}