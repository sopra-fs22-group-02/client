import React, { useState } from "react";
// import {ReactLogo} from "components/ui/ReactLogo";
import PropTypes from "prop-types";
import "styles/views/Header.scss";
import {Link, useHistory} from "react-router-dom";
import { storage } from 'helpers/firebase';
import { ref, getDownloadURL } from "firebase/storage";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';

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
    // const [url, setUrl] = useState(null);

    // getDownloadURL(ref(storage, 'userProfile'))
    // .then((url) => {
    //     setUrl(url);
    // })

const userid = localStorage.getItem("loggedInUserId")

    return(
    <div className="header container">
        <div className="header inner">

            <div className = "header logo">
                <Link to="/home" className="header navbar-item-link">
                    <h1>FIND <span>A PLACE</span></h1>
                </Link>
            </div>

            <div className= "header picture-box2" >

                    <Link to="/home" className="header navbar-item-link">
                        <div className="header navbar-item">
                        <HomeIcon className="header svg_icons" style={{ fontSize: 60 , color: "white"}} />
                        <div className="header navbar-item-text">Home</div>
                        </div>
                    </Link>

                    <Link to={`/Findplace`} className="header navbar-item-link">
                        <div className="header navbar-item">
                        <SearchIcon className="header svg_icons" style={{ fontSize: 60 , color: "white"}} />
                        <div className="header navbar-item-text">Find A Place</div>
                        </div>
                    </Link>

                    <Link to={`/profile/${userid}`} className="header navbar-item-link">
                        <div className="header navbar-item">
                        <AccountCircleIcon className="header svg_icons" style={{ fontSize: 60 , color: "white"}} />
                        <div className="header navbar-item-text">My Profile</div>
                        </div>
                    </Link>
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
