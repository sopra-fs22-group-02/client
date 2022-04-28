import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import 'react-calendar/dist/Calendar.css';
import SleepEvent from 'models/SleepEvent';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import {Box} from 'components/ui/Box';
import 'styles/views/EventProfile.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import moment from "moment"


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
    const [sleepEvent, setSleepEvent] = useState(new SleepEvent());

    useEffect(() => {
      async function fetchData() {
        try {
          // const requestBody = JSON.stringify({});

          const response = await api.get(`/places/events/${eventId}`);

          console.log(`Response: ${JSON.stringify(response.data)}`)

          const repolate = {
            starttime: moment(`${response.data.startDate} ${response.data.startTime}`, "YYYY-MM-DD HH:mm").toISOString(),
            endtime: moment(`${response.data.endDate} ${response.data.endTime}`, "YYYY-MM-DD HH:mm").toISOString()
          }
    
          // Get the returned user and update a new object`
          setSleepEvent(new SleepEvent(repolate))
     
          // Creation successfully worked --> navigate to the route /PlaceProfile
          console.log(`Retrieval worked: ${JSON.stringify(response.data)}`);
        } catch (error) {
          alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
      }

      fetchData()

    }, [])

    // effect hook for sleep event
    useEffect(() => {
      console.log("SL updated")
      console.log(sleepEvent)
    }, [sleepEvent])

    // do we really need placeId?
    let {placeId, eventId} = useParams();
    // let {eventId} = useParams();
    const goBack = () => {
        history.push("/home")
    }

    const toEdit = () => {
      history.push(`/eventupdate/${placeId}/${eventId}`)
    }

    const doDelete = () => {
      // TODO: Implement
    }
    return (
      <BaseContainer>
        <div className="event container">
        
          <div className="event form">
            <ProfileField
              label="Arrival Time"
              value={moment(sleepEvent.starttime).format("HH:mm")}
            />
            <ProfileField
              label="Departure Time"
              value={moment(sleepEvent.endtime).format("HH:mm")}
            />
            <ProfileField
              label="Date"
              value={moment(sleepEvent.starttime).format("DD-MM-YYYY")}
            />
            <div className="event button-container">
              <Button
                width="30%"
                onClick={() => goBack()}
              >
                Go back
              </Button>
              <Button
                width="30%"
                onClick={() => toEdit()}
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </BaseContainer>
    );
  };


export default EventProfile;