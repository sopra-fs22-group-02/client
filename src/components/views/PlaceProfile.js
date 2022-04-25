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
          alt="the lake zurich"
        />
    );
  };
  
  ProfileField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
  };
  
  const PlaceProfile = () => {
    const history = useHistory();
    const [place, setPlace] = useState(new Place());
  
    useEffect(() => {
        async function fetchData() {
              try {
                // TODO: Get a single place, currently we are tricking
                // const response = await api.get(`/places/${ localStorage.getItem('loggedInUserId') }/${placeId}`);
                const response = await api.get(`/places/${ localStorage.getItem('loggedInUserId') }`);
            
                  // Get the returned user and update a new object.
                  // FIXME: This is a workaround, just getting the first place.
                  setPlace(new Place(response.data[0]));
                   
                  // Creation successfully worked --> navigate to the route /PlaceProfile
                  // history.push(`/home`);
                } catch (error) {
                  alert(`Something went wrong during the login: \n${handleError(error)}`);
                }
        }

        fetchData();

      }, []);
    let { placeId = 1 } = useParams();

    const toEdit = () => {
        history.push(`/placeProfileEdit/${placeId}`)
      }
    
    return (
      <div>
      {/* <ProfileData/> */}
      <BaseContainer>
        <div className="profile container">
          <div className="profile form">
            <ProfileField
                label="Name: "
                value={place.name}
            />  
            <ProfileField
                label="Nearest to: "
                value={place.closestCampus}
            />
            <ProfileField
                label="Address: "
                value={place.address}
            />
            <ProfileField
                label="Description: "
                value={place.description}
            />
            <div className="profile button-container">
              <Button
                width="30%"
                onClick={() => toEdit()}
              >
                Edit
              </Button>
              <Button
                  width="100%"
                  onClick={() => history.push("/")}
              >
                  Back
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