import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
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
        <img
          className="place picture"
          src="/zuri_lake.jpeg"
          width={props.width}
        />
    );
  };
  
  FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  };
  
  const PlaceRegister = props => {
    const history = useHistory();
    const [name, setName] = useState(null);
    const [nearestTo, setNearestTo] = useState(null);
  
    const doRegister = async () => {
      try {
        const requestBody = JSON.stringify({nearestTo, name});
        const response = await api.post('/places', requestBody);
  
        // Get the returned user and update a new object.
        const user = new User(response.data);
  
        // Store the token into the local storage.
        localStorage.setItem('token', user.token);
  
        // Login successfully worked --> navigate to the route /game in the GameRouter
        history.push(`/game`);
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
            <FormField
              label="Nearest To"
              value={nearestTo}
              onChange={un => setNearestTo(un)}
            />
            <FormField
              label="Address"
              value={nearestTo}
              onChange={un => setNearestTo(un)}
            />
            <FormField
              label="Description"
              value={nearestTo}
              onChange={un => setNearestTo(un)}
            />
            <div className="place button-container">
              <Button
                disabled={!nearestTo || !name}
                width="30%"
                onClick={() => doRegister()}
              >
                Create
              </Button>
            </div>
          </div>
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