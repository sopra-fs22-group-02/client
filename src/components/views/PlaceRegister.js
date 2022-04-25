import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import Place from 'models/Place';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import {Box} from 'components/ui/Box';
import 'styles/views/PlaceRegister.scss';
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
      <div className="place field">
        <input
          className="place image-input"
          placeholder="upload image"
          type="file"
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
    const [nearestTo, setNearestTo] = useState(null);
    const [address, setAddress] = useState(null);
    const [description, setDescription] = useState(null);
  
    const doRegister = async () => {
      try {
        // TODO: Make sure address and nearestTo is included
        // const requestBody = JSON.stringify({providerId: localStorage.getItem('loggedInUserId'), nearestTo, name, address, description});
        const requestBody = JSON.stringify({providerId: localStorage.getItem('loggedInUserId'), name, description}); 
        const response = await api.post('/places', requestBody);
  
        // Get the returned user and update a new object.
        const place = new Place(response.data);

        console.log(response.data)
  
  
        // Creation successfully worked --> navigate to the route /PlaceProfile
        history.push(`/PlaceProfile/${place.placeId}`);
      } catch (error) {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
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
              value={nearestTo}
              onChange={nt => setNearestTo(nt)}
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
                disabled={!nearestTo || !name || !address}
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
            <ImageHolder 
                className="place image-holder"
                width={250}
            />
          </div>
        </div>
      </BaseContainer>
    );
  };


export default PlaceRegister;