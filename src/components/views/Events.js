import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import 'react-calendar/dist/Calendar.css';
import SleepEvent from 'models/SleepEvent';
import {useHistory, useParams} from 'react-router-dom';
import {Box} from 'components/ui/Box';
import 'styles/views/EventProfile.scss';
import BaseContainer from "components/ui/BaseContainer";


  
  const Events = () => {
    const history = useHistory();
    const [sleepEvents, setSleepEvents] = useState(null);

    useEffect(() => {
      async function fetchData() {
        try {

          const response = await api.get(`/places/${placeId}/events`);

          console.log(response.data)

          // Creation successfully worked --> navigate to the route /PlaceProfile
          console.log(`Retrieval worked: ${JSON.stringify(response.data)}`);
        } catch (error) {
          alert(`Something went wrong during fetching all events: \n${handleError(error)}`);
        }
      }

      fetchData()

    }, [])

    let { placeId } = useParams();

    const goBack = () => {
        history.push(`/placeprofile/${placeId}`)
    }

    return (
      <BaseContainer>
        <div className="events container">
        </div>
      </BaseContainer>
    );
  };


export default Events;