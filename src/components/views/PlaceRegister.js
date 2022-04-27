import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import Place from 'models/Place';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import {Box} from 'components/ui/Box';
import 'styles/views/PlaceRegister.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { storage } from 'helpers/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/material/Avatar";
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
          placeholder="enter here.."
          value={props.value}
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
  
  const PlaceRegister = () => {
    const history = useHistory();
    const [name, setName] = useState(null);
    const [closestCampus, setClosestCampus] = useState(null);
    const [address, setAddress] = useState(null);
    const [description, setDescription] = useState(null);
  
    const doRegister = async () => {
      try {
        // TODO: Make sure address and nearestTo is included
        const requestBody = JSON.stringify({providerId: localStorage.getItem('loggedInUserId'), closestCampus, name, address, description});
        // const requestBody = JSON.stringify({providerId: localStorage.getItem('loggedInUserId'), name, description}); 
        const response = await api.post('/places', requestBody);
  
        // Get the returned user and update a new object.
        const place = new Place(response.data);

        console.log(response.data);
        localStorage.setItem('placeIdOfLoggedInUser', place.placeId)
        // Creation successfully worked --> navigate to the route /PlaceProfile
        history.push(`/PlaceProfile/${place.placeId}`);
      } catch (error) {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
    };
    // let { placeId } = useParams();
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);

    const handleImageChange = (e) => {
      if (e.target.files[0]){
        setImage(e.target.files[0]);
      }
    };
    console.log(image);
    const handleSubmit = () => {
      const imageRef = ref(storage, `place/user-${localStorage.getItem('loggedInUserId')}`);
      // -place-${localStorage.getItem('placeIdOfLoggedInUser')}
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
      <BaseContainer>
        <div className="place container">
          <div className="place form">
            <FormField
              label="Name"
              value={name}
              onChange={n => setName(n)}
            />
            {/* TODO: This is supposed to be a dropdown of 4 options. */}
            <FormField
              label="Nearest To"
              value={closestCampus}
              onChange={nt => setClosestCampus(nt)}
            />
            <FormField
              label="Address"
              value={address}
              onChange={ads => setAddress(ads)}
            />
            <FormField
              label="Description"
              value={description}
              onChange={des => setDescription(des)}
            />
            <div className="place button-container">
              <Button
                disabled={!closestCampus || !name || !address}
                width="30%"
                onClick={() => doRegister()}
              >
                Create
              </Button>
            </div>
          </div>
          {/* TODO: Manage image*/}
          <div className="place form2">
            <Box
                className="place image-box"
                value="Place Image"
            />
            <Avatar
              className="place picture"
              src={url}
              sx={{ width: 150, height: 150}}
              variant="square"
            />
            <input type="file" onChange={handleImageChange}/>
            <button 
              className='place image-button'
              onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </BaseContainer>
    );
  };


export default PlaceRegister;