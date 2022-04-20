import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import 'react-calendar/dist/Calendar.css';
import SleepEvent from 'models/SleepEvent';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import {Box} from 'components/ui/Box';
import 'styles/views/EventProfile.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";


const ProfileField = props => {
    return (
      <div className="event field">
        <Box
            className="event box"
            value={props.label}
        />
        <Box
            className="event box"
            value={props.value}
        />
      </div>
    );
  };

  
  ProfileField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  };
  
  const EventProfile = () => {
    const history = useHistory();
    const [arrivalTime, setArrivalTime] = useState(null);
    const [departureTime, setDepartureTime] = useState(null);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
  
    const display = async () => {
      try {
        const requestBody = JSON.stringify({});
        const response = await api.get(`/places/${placeId}/events/${eventId}`, requestBody);
  
        // Get the returned user and update a new object.
        const sleepEvent = new SleepEvent(response.data);
  
  
        // Creation successfully worked --> navigate to the route /PlaceProfile
        history.push(`/PlaceProfile`);
      } catch (error) {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
    };
    let {placeId} = useParams();
    let {eventId} = useParams();
    const goBack = () => {
        history.push("/eventCreation")
    }
    return (
      <BaseContainer>
        <div className="event container">
        
          <div className="event form">
            <ProfileField
              label="Arrival Time"
              value="13:00"
            />
            <ProfileField
              label="Departure Time"
              value="15:00"
            />
            <ProfileField
              label="Date"
              value="04.15.2022"
            />
            <div className="event button-container">
              <Button
                width="30%"
                onClick={() => goBack()}
              >
                Go back
              </Button>
            </div>
          </div>
        </div>
      </BaseContainer>
    );
  };


export default EventProfile;