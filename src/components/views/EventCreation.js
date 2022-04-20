import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SleepEvent from 'models/SleepEvent';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import {Box} from 'components/ui/Box';
import 'styles/views/EventCreation.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { useParams } from 'react-router-dom';
import TimePicker from "react-time-picker";


const FormField = props => {
    return (
      <div className="event field">
        <Box
            className="event box"
            value={props.label}
        />
        <TimePicker 
            onChange={t => props.onChange(t)} 
            value={props.value} 
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
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
  
    const create = async () => {
      try {
        const requestBody = JSON.stringify({});
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
        <div className="event form2">
            <Box
                className="event calendar-box"
                value="Calendar"
            />
            <Calendar
              locale='en'
              value={date}
              onChange={setDate}
            />
          </div>
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
            <div className="event button-container">
              <Button
                width="30%"
                onClick={() => create()}
              >
                Offer slot
              </Button>
            </div>
          </div>
        </div>
      </BaseContainer>
    );
  };


export default EventCreation;