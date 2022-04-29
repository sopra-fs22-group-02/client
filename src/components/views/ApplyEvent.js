import React, {useEffect, useState} from 'react';
import BaseContainer from "../ui/BaseContainer";
import {api, handleError} from "../../helpers/api";
import "styles/views/ApplyEvent.scss";
import {Button} from "../ui/Button";
import {Box} from "../ui/Box";
import { storage } from 'helpers/firebase';
import { ref, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/material/Avatar";
import {useHistory} from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EventBox = ({ event, providerId }) => {

    const apply = () => {

    }

    return (
        <div className='apply event'>
            <h2 className='apply text'>Date: {event.startDate}</h2>
            <h3 className='apply text'>From: {event.startTime}</h3>
            <h3 className='apply text'>Till: {event.endTime}</h3>
            <Button
            className='apply button'
            onClick={() => history.push('/findplace')}
            >
                apply
            </Button>
        </div>
    )
}

const EmptyEventBox = () => {
    return (
        <div className='apply empty-event'>
        </div>
    )
};

const ApplyEvent = () => {
    const [events, setEvents] = useState(null); 
    const history = useHistory();
    const [url, setUrl] = useState(null);
    getDownloadURL(ref(storage, `place/user-3`))
      .then((url) => {
        setUrl(url);
      });

    useEffect( () => {
        async function fetchData() {
            try {
                const response = await api.get(`/places/${placeId}/events`);
                console.log(response.data); 
                setEvents(response.data);
                console.log(events);
            } catch (error) {
                alert(`Something went wrong during the events fetching: \n${handleError(error)}`);
            }
        }

        fetchData()
    }, [])
    let { placeId, providerId } = useParams();
    let eventContent = <EmptyEventBox/>
    if(events) {
        let availableEvents = events.filter(function(value, index, arr) {
            return value.state != "EXPIRED";
        })
        console.log(availableEvents);
        eventContent = (
            availableEvents.map(event => (
                <EventBox key={event.eventId} event={event} providerId={providerId}/>
            ))
        )
    }
    return (
        <BaseContainer>
            <div className="apply container">
                <div className= "apply profile-container" >
                    <Box
                        className="apply place-title"
                        value="About the place"
                    />
                    <Avatar 
                        className = "apply place-avatar" 
                        src={url}
                        variant="square"
                        sx={{ width: 150, height: 150}}
                    />
                    <Box
                        className="apply place-description"
                        value="This is a nice place to stay, This is a nice place to stay, This is a nice place to stay"
                    />
                    <Box
                        className="apply provider-title"
                        value="About the provider"
                    />
                    <Avatar 
                        className = "apply provider-avatar" 
                        src={url}
                        variant="square"
                        sx={{ width: 150, height: 150}}
                    />
                    <Box
                        className="apply provider-description"
                        value="Student at university"
                    />
                </div>
                <div className= "apply event-container" >
                    <Box
                        className="apply event-title"
                        value="Available slots"
                    />
                    <div className="apply list-container">
                        {eventContent}
                    </div>
                </div>
            </div>
            <div className = "apply footer" >
                <Button
                    onClick={() => history.push('/findplace')}
                    width='30%'
                >
                    Return
                </Button>
            </div>

        </BaseContainer>
    );


};

export default ApplyEvent;