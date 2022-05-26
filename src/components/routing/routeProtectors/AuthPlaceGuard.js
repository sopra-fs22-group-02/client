import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

/**
 *
 * Check if the user is allowed to perform the operation based on him accessing a place view that mandates him to own it.
 */
export const AuthPlaceGuard = props => {
    
    const { placeId } = useParams();

    if(!placeId) {
        alert("TO DEV: This guard can only be used when the placeId is supplied as a path parameter in the view.")
    }

    if (localStorage.getItem("placeIdOfLoggedInUser") && localStorage.getItem("placeIdOfLoggedInUser") == placeId.toString()) {
        return props.children;
    }
    // if user is already logged in, redirects to the main /app
    return <Redirect to="/home"/>;
};

AuthPlaceGuard.propTypes = {
  children: PropTypes.node
}