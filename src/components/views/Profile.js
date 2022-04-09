import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Profile.scss";
import "styles/views/Game.scss";



const Profile = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();


    return (
        <BaseContainer className="game container">

        </BaseContainer>
    );



}

export default Profile;