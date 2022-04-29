import React, {useEffect, useState} from 'react';
import BaseContainer from "../ui/BaseContainer";

import "styles/views/ApplyEvent.scss";
import {Button} from "../ui/Button";
import {Box} from "../ui/Box";
import { storage } from 'helpers/firebase';
import { ref, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/material/Avatar";


const ApplyEvent = () => {
    const [url, setUrl] = useState(null);
    getDownloadURL(ref(storage, `place/user-${localStorage.getItem('loggedInUserId')}`))
      .then((url) => {
        setUrl(url);
      })
    return (
        <BaseContainer>
            <div className="apply container">
                <div className= "apply profile-container" >
                    <Box
                        className="apply place-title"
                        value="About the place"
                    />
                    <Avatar 
                        className = "apply place-avatar" 
                        src={url}
                        variant="square"
                        sx={{ width: 150, height: 150}}
                    />
                    <Box
                        className="apply place-description"
                        value="This is a nice place to stay, This is a nice place to stay, This is a nice place to stay"
                    />
                    <Box
                        className="apply provider-title"
                        value="About the provider"
                    />
                    <Avatar 
                        className = "apply provider-avatar" 
                        src={url}
                        variant="square"
                        sx={{ width: 150, height: 150}}
                    />
                    <Box
                        className="apply provider-description"
                        value="Student at university"
                    />
                </div>
                <div className= "apply event-container" >
                    <Box
                        className="apply event-title"
                        value="Available events"
                    />
                </div>
            </div>
            <div className = "apply footer" >
                <div className= "placeholder" >
                </div>
                <Button>
                    Return
                </Button>
            </div>

        </BaseContainer>
    );


};

export default ApplyEvent;