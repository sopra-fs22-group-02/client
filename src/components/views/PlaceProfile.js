import React, {useState, useEffect} from 'react';
import {api, handleError} from 'helpers/api';
import Place from 'models/Place';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import {Box} from 'components/ui/Box';
import 'styles/views/PlaceProfile.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { storage } from 'helpers/firebase';
import { ref, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/material/Avatar";

const ProfileField = props => {
    return (
      <div className="placeprofile field">
        <Box
            className="placeprofile label-box"
            value={props.label}
        />
        <Box
            className="placeprofile value-box"
            value={props.value}
        />
      </div>
    );
  };
  
  ProfileField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
  };
  
  const PlaceProfile = () => {
    const history = useHistory();
    const [place, setPlace] = useState(new Place());
    const [url, setUrl] = useState(null);


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

    const toEdit = () => {
        console.log(localStorage.getItem('placeIdOfLoggedInUser'))
        history.push(`/placeProfileEdit/${localStorage.getItem('placeIdOfLoggedInUser')}`)
      };
    
    getDownloadURL(ref(storage, `place/user-${localStorage.getItem('loggedInUserId')}`))
      .then((url) => {
        setUrl(url);
      })

    return (
      <div>
      {/* <ProfileData/> */}
      <BaseContainer>
          <div className = "placeprofile return" >
              <Button
                  className="placeprofile placeedit-return-button"
                  onClick={() => history.push("/")}
              >
                  Return
              </Button>
          </div>
        <div className="placeprofile container">
          <div className="placeprofile form">
            <ProfileField
                label="Name of Place: "
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
            <div className="placeprofile button-container">
              <Button
                width="40%"
                onClick={() => toEdit()}
              >
                Edit
              </Button>
            </div>
          </div>
          <div className="placeprofile form2">
              <div className = "placeprofile title" >
                  <h1> Place profile image</h1>
              </div>

            <Avatar
              className="placeprofile picture"
              src={url}
              sx={{ width: 400, height: 370 }}
              variant="square"
            />
            <Button
              className='placeprofile event-button'
              width="50%"
              onClick={() => history.push(`/events/${place.placeId}`)}
            >
                view events
            </Button>
          </div>
        </div>
      </BaseContainer>
      </div>
    );
  };


export default PlaceProfile;