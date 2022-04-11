import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import Place from 'models/Place';
import SleepEvent from 'models/SleepEvent';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import {Box} from 'components/ui/Box';
import 'styles/views/EventCreation.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { useParams } from 'react-router-dom';

const FormField = props => {
    return (
      <div className="event field">
        <Box
            className="event box"
            value={props.label}
        />
        <input
          className="event input"
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
  
  const EventCreation = () => {
    const history = useHistory();
    const [arrivalTime, setArrivalTime] = useState(null);
    const [departureTime, setDepartureTime] = useState(null);
    const [nearestTo, setNearestTo] = useState(null);
    const [description, setDescription] = useState(null);
  
    const doUpdate = async () => {
      try {
        const requestBody = JSON.stringify({nearestTo, description});
        const response = await api.put(`/places/${placeId}/events`, requestBody);
  
        // Get the returned user and update a new object.
        const sleepEvent = new SleepEvent(response.data);
  
  
        // Creation successfully worked --> navigate to the route /PlaceProfile
        history.push(`/PlaceProfile`);
      } catch (error) {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
    };
    let {placeId} = useParams();
    return (
      <BaseContainer>
        <div className="event container">
          <div className="event form">
            <FormField
              label="Arrival Time"
              value={arrivalTime}
              onChange={at => setArrivalTime(at)}
            />
            <FormField
              label="Departure Time"
              value={departureTime}
              onChange={dt => setDepartureTime(dt)}
            />
            <FormField
              label="Nearest To"
              value={nearestTo}
              onChange={nt => setNearestTo(nt)}
            />
            <FormField
              label="Description"
              value={description}
              onChange={des => setDescription(des)}
            />
            <div className="event button-container">
              <Button
                width="30%"
                onClick={() => doUpdate()}
              >
                Offer slot
              </Button>
            </div>
          </div>
          <div className="event form2">
            <Box
                className="event image-box"
                value="Calendar"
            />
            <Box
                className="event calendar-box"
                value="Mon-Tue-Wen-Thu-Fri-Sat-Sun"
            />
          </div>
        </div>
      </BaseContainer>
    );
  };


export default EventCreation;