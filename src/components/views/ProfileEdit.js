import React, {useState, useEffect} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import {Box} from 'components/ui/Box';
import 'styles/views/ProfileEdit.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import User from 'models/User';
import { storage } from 'helpers/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/material/Avatar";

const FormField = props => {
    return (
        <div className="profileedit field">
            <Box
                className="profileedit box"
                value={props.label}
            />
            <input
                type={props.type ? props.type : "text"}
                className="profileedit input"
                // placeholder="enter here.."
                defaultValue={props.defaultValue}
                // value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
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
    const [password, setPassword] = useState(null)
    const [user, setUser] = useState(new User())

    const doUpdate = async () => {
        try {
            const requestBody = JSON.stringify({id: userId, firstName, lastName, username, bio, password, profilePicture: url}, 
                (key, value) => {
                    if (value !== null) { return value } else { return user[key] }
            }
            );

            const response = await api.put(`/users/${ userId }/profile`, requestBody);

            // debug
            console.log(response)

            // Get the returned user and update a new object.
            // const user = new User(response.data);


            // Creation successfully worked --> navigate to the route /PlaceProfile
            history.push(`/profile/${ userId }`);
        } catch (error) {
            alert(`Something went wrong during the updating: \n${handleError(error)}`);
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

    let { userId } = useParams()
    
    console.log("User obj fetched")
    console.log(user)
    
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);

    const handleImageChange = (e) => {
      if (e.target.files[0]){
        setImage(e.target.files[0]);
      }
    };
    console.log(image);
    const handleSubmit = () => {
      const imageRef = ref(storage, `user/${userId}`);
      uploadBytes(imageRef, image).then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch(error => {
            console.log(error.message, "error getting the image url");
          });
          setImage(null);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    return (
        <div>
            <div className='return-button'>
                <Button
                    width="10%"
                    onClick={() => history.push(`/profile/${localStorage.getItem('loggedInUserId')}`)}
                >
                    Return
                </Button>
            </div>
            <BaseContainer>
                <div className="profileedit container">
                    <div className="profileedit form">
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
                            type="password"
                            label="password"
                            defaultValue={ user.password }
                            onChange={b => setPassword(b)}
                        />
                        <FormField
                            label="Bio"
                            defaultValue={ user.bio }
                            onChange={b => setBio(b)}
                        />
                        <div className="profileedit button-container">
                            <Button
                                width="30%"
                                onClick={() => doUpdate()}
                            >
                                Update
                            </Button>
                        </div>
                    </div>
                    <div className="profileedit form2">
                        <div className = "profileedit title" >
                            <h1>profile image</h1>
                        </div>

                        <Avatar
                            className="profileedit picture"
                            src={url}
                            sx={{ width: 400, height: 370 }}
                            variant="square"
                        />
                        <div className= "placeedit selectfield" >
                            <input
                                className="profileedit picture-input"
                                type="file"
                                onChange={handleImageChange}
                            />
                        </div>

                        <Button 
                            className="profileedit image-submit"
                            onClick={handleSubmit}
                            width="50%"
                        >
                            Upload Image
                        </Button>
                    </div>
                </div>
            </BaseContainer>
        </div>
    );
};


export default ProfileEdit;