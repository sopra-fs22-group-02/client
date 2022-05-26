import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import 'react-calendar/dist/Calendar.css';
import SleepEvent from 'models/SleepEvent';
import {useHistory, useParams} from 'react-router-dom';
import { Box } from 'components/ui/Box';
import { Button } from 'components/ui/Button';
import 'styles/views/Events.scss';
import BaseContainer from "components/ui/BaseContainer";

  const Event = ({ event, history }) => {
    const checkRequests = () => {
        history.push(`/eventprofile/${event.placeId}/${event.eventId}`)
    }
    return (
        <div className='events box'>
            <Box 
                className='events info'
                value={'date: '+ event.startDate}
            />
            <Box 
                className='events info'
                value={'starttime: '+ event.startTime}
            />
            <Box 
                className='events info'
                value={'endtime: '+ event.endTime}
            />
            <Box 
                className='events info'
                value={'state: '+ event.state}
            />
            <Button
                className='events button'
                onClick={() => checkRequests()}
            >
                check requests
            </Button>
        </div>
    )
  }

  const EmptyEvent = () => {
      return (
          <div className='event empty'>
          </div>
      )
  }
  
  const Events = () => {
    const history = useHistory();
    const [sleepEvents, setSleepEvents] = useState(null);

    useEffect(() => {
      async function fetchData() {
        try {

          const response = await api.get(`/places/${placeId}/events`);

          console.log(response.data);
          setSleepEvents(response.data);
          console.log(sleepEvents);
          // Creation successfully worked --> navigate to the route /PlaceProfile
          console.log(`Retrieval worked: ${JSON.stringify(response.data)}`);
        } catch (error) {
          alert(`Something went wrong during fetching all events: \n${handleError(error)}`);
        }
      }

      fetchData()

    }, [])

    let { placeId } = useParams();
    let eventContent = <EmptyEvent/>;

    if (sleepEvents) {
        eventContent = (
            sleepEvents.map(se => (
                <Event key={se.eventId} event={se} history={history}/>
            ))
        )
    } 
    // else {
    //   eventContent = (<Box value={'No slot has been offered yet!'}></Box>)
    // }

    const goBack = () => {
        history.push(`/placeprofile/${placeId}`)
    }

    return (
      <BaseContainer className='events base'>
        <div className="events container">
            {sleepEvents != null ? eventContent : 'No slot for now!'}
        </div>
        <Button
            className='events back-button'
            onClick={() => goBack()}
            width='200%'
        >
            Return
        </Button>
      </BaseContainer>
    );
  };


export default Events;