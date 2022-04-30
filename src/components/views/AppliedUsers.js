import React, {useEffect, useState} from 'react';
import BaseContainer from "../ui/BaseContainer";
import "styles/views/AppliedUsers.scss";
import {Button} from "../ui/Button";

const AppliedUsers = props => {
    return(
        <BaseContainer>
            <div className = "applied header" >
                <Button>
                    Return
                </Button>
                <div className= "applied header-title">
                    <h1>Request</h1>
                </div>
            </div>
            <div className= "applied box" >
                <div className="applied box1">
                    <div className= "applied insideboxes">
                        <img className = "applied avatar" src="/profile.png" alt="user profile img" />
                        <h1>Anna</h1>
                        <Button>
                            Accept
                        </Button>
                    </div>

                </div>
                <div className="applied box2">
                    <div className= "applied box2-title">
                        <h1>Event Time</h1>
                        <div className= "applied insideframes">
                            <h1>Anna</h1>
                        </div>
                    </div>
                    <div className= "applied insideboxesframe1">
                        <h1> From: <span>28.03.2020</span> <span> 20:00</span> </h1>
                    </div>
                    <div className= "applied insideboxesframe2">
                        <h1> To:<span>28.03.2020</span> <span> 20:00</span> </h1>
                    </div>
                </div>
            </div>
            <div className = "apply footer" >
                <div className= "placeholder" >
                </div>
                <Button>
                    Start QnA
                </Button>
                <Button>
                    Apply
                </Button>
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default AppliedUsers;