import React, {useEffect, useState} from 'react';
import BaseContainer from "../ui/BaseContainer";

import "styles/views/EventAccepted.scss";
import {Button} from "../ui/Button";



const EventAccepted = props => {

    return (
        <BaseContainer>
            <div className = "accept firststack" >
                <Button>
                    Return
                </Button>
            </div>
            <div className= "accept box" >
                <div className="accept box1">
                    <div className= "accept grid-title1" >
                        <h1>Picture</h1>
                    </div>
                    <div className= "accept grid-title2" >
                        <h1>Adress</h1>
                    </div>
                    <img className = "accept ima2" src="/zuri_lake.jpeg" alt="user profile img" />
                    <div className="accept grid-item2">
                        <h1 className = "accept grid-item2-text" > Margrit-Reinerstrasse 10 oerlikon </h1>
                    </div>
                    <div className= "accept grid-title3" >
                        <h1>Description</h1>
                    </div>
                    <div className= "accept grid-title4" >
                        <h1>Map</h1>
                    </div>
                    <div className="accept grid-item3">
                        <p className = "accept text" > A neat place in Oerlikon. Tidiness can`t be guaranteed </p>
                    </div>
                    <img className = "accept ima3" src="/map.jpeg" alt="user profile img" />
                </div>

                <div className="accept box2">
                    <div className= "accept box1h">
                        <h1>Avilability</h1>
                    </div>
                    <div className = "accept from">
                        <h1>From: <span>28.03.2020</span> <span> 20:00</span> </h1>
                    </div>
                    <div className = "accept from">
                        <h1>From: <span>28.03.2020</span> <span> 20:00</span> </h1>
                    </div>
                </div>

                <div className="accept box3">
                    <div className= "accept box1h1">
                        <h1>About the provider</h1>
                    </div>
                    <div className= "accept insidebox" >
                        <img className = "accept ima" src="/profile.png" alt="user profile img" />
                        <div className= "accept  textboxprof">
                            <p className = "profile text" > I am a freelance graphic designer with over five years of industry experience.” or “My specialities include logo creation, branding concepts, vector image editing/cropping & Photoshop work.” because it can make you sound generic and boring to potential clients. </p>
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

export default EventAccepted;