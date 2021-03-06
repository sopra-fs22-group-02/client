
import React, {useEffect, useState} from "react";
import {useHistory, useParams} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Profile.scss";
import "styles/views/Home.scss";
import {Button} from 'components/ui/Button';
import {api, handleError} from "../../helpers/api";
import User from "../../models/User";
import { storage } from 'helpers/firebase';
import { ref, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/material/Avatar";


const Profile = () => {
    const history = useHistory();
    const [user, setUser] = useState(new User())
    const [url, setUrl] = useState(null);

    useEffect( () => {
        async function fetchData() {
            try {
                const response = await api.get(`/users/${userId}/profile`);
                setUser(new User(response.data));
                console.log(response)
            } catch (error) {
                alert(`Something went wrong during the login: \n${handleError(error)}`);
            }
        }

        fetchData()
        
    }, [])

    let { userId = 1 } = useParams();

    const toEdit = () => {
        history.push(`/profileEdit/${userId}`)
    }

    getDownloadURL(ref(storage, `user/${userId}`))
      .then((url) => {
        setUrl(url);
      })

    return (
        <BaseContainer>
            <div className= "profile card" >
                <div className= "profile card-header" >
                    <Avatar
                        className="profile image"
                        src={url}
                        sx={{ width: 150, height: 150}}
                        variant="square"
                    />                
                </div>
                <div className= "profile card-body" >
                    <p className = "profile first-name" >{ user.firstName }</p>
                    <p className = "profile last-name" >{ user.lastName } </p>
                    <p className = "profile username" >{ user.username } </p>
                    <p className = "profile email" >{ user.email }</p>
                    <div className= "profile textbox">
                        {/* <p className = "profile text" > I am a freelance graphic designer with over five years of industry experience.??? or ???My specialities include logo creation, branding concepts, vector image editing/cropping & Photoshop work.??? because it can make you sound generic and boring to potential clients. </p> */}
                        <p className='profile text'>{ user.bio }</p>
                    </div>
                <div className= "profile card-footer" >
                    </div>
                        <Button
                            width="100%"
                            onClick={() => toEdit()}
                        >
                            Edit
                        </Button>
                        <Button
                            width="100%"
                            onClick={() => history.push("/")}
                        >
                            return
                        </Button>
                    </div>
            </div>
        </BaseContainer>
    );


}

export default Profile;