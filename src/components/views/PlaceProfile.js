import React, {useState, useEffect} from 'react';
import {api, handleError} from 'helpers/api';
import Place from 'models/Place';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import {Box} from 'components/ui/Box';
import 'styles/views/PlaceProfile.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

const ProfileField = props => {
    return (
      <div className="profile field">
        <Box
            className="profile label-box"
            value={props.label}
        />
        <Box
            className="profile value-box"
            value={props.value}
        />
      </div>
    );
  };

  const ImageHolder = props => {
    return (
        <img
          className="profile picture"
          src="/zuri_lake.jpeg"
          width={props.width}
        />
    );
  };
  
  ProfileField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
  };
  
  const PlaceProfile = () => {
    const history = useHistory();
    const [name, setName] = useState(null);
    const [nearestTo, setNearestTo] = useState(null);
    const [address, setAddress] = useState(null);
    const [description, setDescription] = useState(null);
  
    const ProfileData = () => {
        useEffect( async () => {
            try {
                const response = await api.get(`/places${placeId}/`);
          
                // Get the returned user and update a new object.
                const place = new Place(response.data);
                
          
                // Creation successfully worked --> navigate to the route /PlaceProfile
                history.push(`/game`);
              } catch (error) {
                alert(`Something went wrong during the login: \n${handleError(error)}`);
              }
        }, [])
    };
    let {placeId} = useParams();
    const toEdit = () => {
        history.push(`/placeProfileEdit`)
      }
    return (
      <div>
      {/* <ProfileData/> */}
      <BaseContainer>
        <div className="profile container">
          <div className="profile form">
            <ProfileField
                label="Name: "
                value="Big House"
            />  
            <ProfileField
                label="Nearest to: "
                value="Zentrum"
            />
            <ProfileField
                label="Address: "
                value="Bahnhofstrasse 120"
            />
            <ProfileField
                label="Description: "
                value="Really nice place to stay"
            />
            <div className="profile button-container">
              <Button
                width="30%"
                onClick={() => toEdit()}
              >
                Eidt
              </Button>
            </div>
          </div>
          <div className="profile form2">
            <Box
                className="profile image-box"
                value="profile image"
            />
            <ImageHolder 
                className="profile image-holder"
                width={250}
            />
          </div>
        </div>
      </BaseContainer>
      </div>
    );
  };


export default PlaceProfile;