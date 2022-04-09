
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Profile.scss";
import "styles/views/Game.scss";
import {Button} from 'components/ui/Button';



const Profile = () => {
    // use react-router-dom's hook to access the history


    return (
        <BaseContainer>
            <div className= "profile card" >
                <div className= "profile card-header" >
                    <img className = "profile image" src="/profile.jpeg" />
                </div>
                <div className= "profile card-body" >
                    <p className = "profile first-name" > Paul </p>
                    <p className = "profile last-name" >  Safari </p>
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

                </div>




            </div>



        </BaseContainer>
    );



}

export default Profile;