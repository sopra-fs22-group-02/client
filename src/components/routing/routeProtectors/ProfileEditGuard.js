import {Redirect, useParams} from "react-router-dom";
import PropTypes from "prop-types";

/**
 *
 * Another way to export directly your functional component.
 */
export const ProfileEditGuard = props => {
  let {userId} = useParams(); 
  console.log(`userId is:${userId}`)
  if (localStorage.getItem("loggedInUserId") == userId) {
    
    return props.children;
  }

  return <Redirect to="/home"/>;
};

ProfileEditGuard.propTypes = {
  children: PropTypes.node
}