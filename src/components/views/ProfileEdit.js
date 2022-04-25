import React, {useState, useEffect} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import {Box} from 'components/ui/Box';
import 'styles/views/ProfileEdit.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import User from 'models/User';
import { useParams } from 'react-router-dom';

const FormField = props => {
    return (
        <div className="place field">
            <Box
                className="place box"
                value={props.label}
            />
            <input
                className="place input"
                // placeholder="enter here.."
                defaultValue={props.defaultValue}
                // value={props.value}
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
            alt="set user profile"
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
    const [user, setUser] = useState(new User())

    const doUpdate = async () => {
        try {
            const requestBody = JSON.stringify({id: userId, firstName, lastName, username, bio}, 
                (key, value) => {
                    if (value !== null) return value
            });

            const response = await api.put(`/users/${ userId }/profile`, requestBody);

            // debug
            console.log(response)

            // Get the returned user and update a new object.
            // const user = new User(response.data);


            // Creation successfully worked --> navigate to the route /PlaceProfile
            history.push(`/profile/${ userId }`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    };

    useEffect(() => {
        async function fetchData() {
              try {
                  const response = await api.get(`/users/${userId}/profile`);
  
                //   console.log("Called fetchData")
            
                  // Get the returned user and update a new object.
                  setUser(new User(response.data));

                //   console.log(response)
                   
                  // Creation successfully worked --> navigate to the route /PlaceProfile
                } catch (error) {
                  alert(`Something went wrong during the login: \n${handleError(error)}`);
                }
        }
  
        fetchData();
  
      }, []);

    const { userId  = 1 } = useParams()

    console.log("User obj fetched")
    console.log(user)

    return (
        <BaseContainer>
            <div className="place container">
                <div className="place form">
                    <FormField
                        label="First name"
                        // defaultValue="Hello"
                        defaultValue={ user.firstName }
                        onChange={f => setFirstName(f)}
                    />
                    <FormField
                        label="Last Name"
                        defaultValue={ user.lastName }
                        onChange={l => setLastName(l)}
                    />
                    <FormField
                        label="username"
                        defaultValue={ user.username }
                        onChange={un => setUsername(un)}
                    />
                    <FormField
                        label="Bio"
                        defaultValue={ user.bio }
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