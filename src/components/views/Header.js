import React, { useState } from "react";
// import {ReactLogo} from "components/ui/ReactLogo";
import PropTypes from "prop-types";
import "styles/views/Header.scss";
import { useHistory } from "react-router-dom";
import { storage } from 'helpers/firebase';
import { ref, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/material/Avatar";

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */

// eslint-disable-next-line no-unused-vars
const Log = () => {
    const history = useHistory();
    history.push(`/profile`);
    }



const Header = () => {
    const [url, setUrl] = useState(null);

    getDownloadURL(ref(storage, 'userProfile'))
    .then((url) => {
        setUrl(url);
    })

    return(
    <div className="header container">
        <div className="header inner">
            <div className = "header logo">
                <h1>FIND <span>A PLACE</span></h1>
            </div>
            <div className = "header profile" >
                <div className= "header action">
                    <div className = "header profile">
                        <Avatar
                            className="header image"
                            src={url}
                            sx={{ width: 50, height: 50}}
                        />       
                    </div>
                    <div className = "header menu">
                        <h3> Paul Safari </h3>
                        <ul>
                            <li> <img src= "profile.png" /> <a href= "#">My Profile</a> </li>

                        </ul>
                    </div>

                </div>
            </div>

        </div>
    </div>
    )
};

Header.propTypes = {
    height: PropTypes.string
};

/**
 * Don't forget to export your component!
 */
export default Header;
