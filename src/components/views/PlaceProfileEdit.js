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
  
  const PlaceRegister = () => {
    const history = useHistory();
    const [name, setName] = useState(null);
    const [nearestTo, setNearestTo] = useState(null);
    const [address, setAddress] = useState(null);
    const [description, setDescription] = useState(null);
  
    const doUpdate = async () => {
      try {
        const requestBody = JSON.stringify({nearestTo, name, address, description});
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
              label="Name"
              value={name}
              onChange={n => setName(n)}
            />
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


export default PlaceRegister;