import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import Place from 'models/Profile';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import {Box} from 'components/ui/Box';
import 'styles/views/ProfileEdit.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

const FormField = props => {
    return (
        <div className="place field">
            <Box
                className="place box"
                value={props.label}
            />
            <input
                className="place input"
                placeholder="enter here.."
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

const ImageHolder = props => {
    return (
        <img
            className="place picture"
            src="/profile.jpeg"
            width={props.width}
        />
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

const ProfileEdit = () => {
    const history = useHistory();
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [username, setUsername] = useState(null);
    const [bio, setBio] = useState(null);

    const doUpdate = async () => {
        try {
            const requestBody = JSON.stringify({firstName, lastName, username, bio});
            const response = await api.put('/places', requestBody);

            // Get the returned user and update a new object.
            const place = new Place(response.data);


            // Creation successfully worked --> navigate to the route /PlaceProfile
            history.push(`/PlaceProfile`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    };

    return (
        <BaseContainer>
            <div className="place container">
                <div className="place form">
                    <FormField
                        label="First name"
                        value={firstName}
                        onChange={f => setFirstName(f)}
                    />
                    <FormField
                        label="Last Name"
                        value={lastName}
                        onChange={l => setLastName(l)}
                    />
                    <FormField
                        label="username"
                        value={username}
                        onChange={un => setUsername(un)}
                    />
                    <FormField
                        label="Description"
                        value={bio}
                        onChange={b => setBio(b)}
                    />
                    <div className="place button-container">
                        <Button
                            width="30%"
                            onClick={() => doUpdate()}
                        >
                            Update
                        </Button>
                    </div>
                </div>
                <div className="place form2">
                    <Box
                        className="place image-box"
                        value="Place Image"
                    />
                    <ImageHolder
                        width={250}
                    />
                </div>
            </div>
        </BaseContainer>
    );
};


export default ProfileEdit;