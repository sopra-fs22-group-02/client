import React, {useEffect, useState} from 'react';
import BaseContainer from "../ui/BaseContainer";

import "styles/views/ApplyEvent.scss";
import {Button} from "../ui/Button";
import {Box} from "../ui/Box";
import { storage } from 'helpers/firebase';
import { ref, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/material/Avatar";


const ApplyEvent = props => {

    return (
        <BaseContainer>
            <div className = "apply firststack" >
                <Button>
                    Return
                </Button>
            </div>
            <div className= "apply box" >
                <div className="apply box1">
                    <div className= "apply grid-title1" >
                        <h1>Picture</h1>
                    </div>
                    {/* <div className= "apply grid-title2" >
                        <h1>Adress</h1>
                    </div> */}
                    <img className = "apply ima2" src="/zuri_lake.jpeg" alt="user profile img" />
                    {/* <div className="apply grid-item2">
                        <h1 className = "apply grid-item2-text" > Margrit-Reinerstrasse 10 oerlikon </h1>
                    </div> */}
                    <div className= "apply grid-title3" >
                        <h1>Description</h1>
                    </div>
                    {/* <div className= "apply grid-title4" >
                        <h1>Map</h1>
                    </div> */}
                    <div className="apply grid-item3">
                        <p className = "profile text" > A neat place in Oerlikon. Tidiness can`t be guaranteed </p>
                    </div>
                    {/* <img className = "apply ima3" src="/map.jpeg" alt="user profile img" /> */}
                </div>

                <div className="apply box2">
                    <div className= "apply box1h">
                        <h1>Avilability</h1>
                    </div>
                    <div className = "apply from">
                        <h1>From: <span>28.03.2020</span> <span> 20:00</span> </h1>
                    </div>
                    <div className = "apply from">
                        <h1>From: <span>28.03.2020</span> <span> 20:00</span> </h1>
                    </div>
                </div>

                <div className="apply box3">
                    <div className= "apply box1h1">
                        <h1>About the provider</h1>
                    </div>
                    <div className= "apply insidebox" >
                        <img className = "apply ima" src="/profile.png" alt="user profile img" />
                        <div className= "apply textboxprof">
                            <p className = "profile text" > I am a freelance graphic designer with over five years of industry experience.” or “My specialities include logo creation, branding concepts, vector image editing/cropping and Photoshop work.” because it can make you sound generic and boring to potential clients. </p>
                        </div>
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

export default ApplyEvent;