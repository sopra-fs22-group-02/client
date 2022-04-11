
import {useHistory, useParams} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Profile.scss";
import "styles/views/Game.scss";
import {Button} from 'components/ui/Button';
import {useEffect, useState} from "react";
import {api, handleError} from "../../helpers/api";
import User from "../../models/User";



const Profile = () => {
    const history = useHistory();
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null);
    const [bio, setBio] = useState(null)


    const ProfileData =  () => {
        useEffect( async () => {
            try {
                const response = await api.get(`/users/${userId}/profile/`); //why?

                const user = new User(response.data);

                history.push(`/game`);
            } catch (error) {
                alert(`Something went wrong during the login: \n${handleError(error)}`);
            }
        }, [])

    };
    let {userId} = useParams();
    const toEdit = () => {
        history.push('/profile')
    }

    return (
        <BaseContainer>
            <div className= "profile card" >
                <div className= "profile card-header" >
                    <img className = "profile image" src="/profile.jpeg" />
                </div>
                <div className= "profile card-body" >
                    <p className = "profile first-name" > Paul </p>
                    <p className = "profile last-name" >  Safari </p>
                    <p className = "profile username" >  nante </p>
                    <p className = "profile email" >  paul.safar@bluewin.ch </p>
                    <div className= "profile textbox">
                        <p className = "profile text" > I am a freelance graphic designer with over five years of industry experience.” or “My specialities include logo creation, branding concepts, vector image editing/cropping & Photoshop work.” because it can make you sound generic and boring to potential clients. </p>
                    </div>
                <div className= "profile card-footer" >
                    </div>
                        <Button
                            width="100%"
                        >
                            Edit
                        </Button>
                       <Button
                            width="100%"
                        >
                            Back
                       </Button>
                    </div>
            </div>
        </BaseContainer>
    );


}

export default Profile;