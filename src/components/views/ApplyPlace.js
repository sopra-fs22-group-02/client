import React, {useEffect, useState} from 'react';
import BaseContainer from "../ui/BaseContainer";

import "styles/views/ApplyPlace.scss";
import {Button} from "../ui/Button";



const ApplyPlace = props => {

    return (
        <BaseContainer>
            <div className = "apply firststack" >
                <Button>
                    Return
                </Button>
            </div>
            <div className= "apply box" >
                <div className="apply box1">
                    <div className= "apply box1h">
                        <h1>Picture</h1>
                    </div>
                    <img className = "apply im" src="/zuri_lake.jpeg" alt="user profile img" />
                    <div className= "apply box1h">
                        <h1>Discription</h1>
                    </div>
                    <div className= "apply textbox">
                        <p className = "profile text" > I am a freelance graphic designer with over five years of industry experience.” or “My specialities include logo creation, branding concepts, vector image editing/cropping & Photoshop work.” because it can make you sound generic and boring to potential clients. </p>

                    </div>
                </div>

                <div className="apply box2">Two</div>
                <div className="apply box3">Three</div>
            </div>
            <div className = "apply footer" >
                <Button>
                    Apply
                </Button>
            </div>


        </BaseContainer>
    );


};

export default ApplyPlace;