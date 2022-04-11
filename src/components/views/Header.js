import React from "react";
import {ReactLogo} from "components/ui/ReactLogo";
import PropTypes from "prop-types";
import "styles/views/Header.scss";
import {useHistory} from "react-router-dom";

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */

const Log = props => {
    const history = useHistory();
    history.push(`/profile`);
    }


const Header = props => (
    <div className="header container">
        <div className="header inner">
            <div className = "header logo">
                <h1>FIND <span>A PLACE</span></h1>
            </div>
            <div className = "header profile" >
                <div className= "header action">
                    <div className = "header profile">
                        <img className = "header image" src="/profile.jpeg" onClick={Log}/>
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
);

Header.propTypes = {
    height: PropTypes.string
};

/**
 * Don't forget to export your component!
 */
export default Header;
