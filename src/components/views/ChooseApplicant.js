import React, {useEffect, useState} from 'react';
import BaseContainer from "../ui/BaseContainer";
import {api, handleError} from "../../helpers/api";
import "styles/views/ChooseApplicant.scss";
import {Button} from "../ui/Button";
import {Box} from "../ui/Box";
import { storage } from 'helpers/firebase';
import { ref, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/material/Avatar";
import {useHistory} from 'react-router-dom';
import { useParams } from 'react-router-dom';

const RequestBox = ({ event, providerId }) => {
    const [message, setMessage] = useState(null);
    const apply = async () => {
        try {
            const response = await api.get(`users/${localStorage.getItem('loggedInUserId')}/profile`)

            setMessage(`${response.data.username} wants to apply for your sleep event`)
            if (message) {
            const requestBody = JSON.stringify({message});
            const response2 = await api.post(`users/${providerId}/notifications`, requestBody);
            console.log(response2);
            }
            console.log(message); // click apply twice
            const requestBody = JSON.stringify({});
            const response3 = await api.post(`places/${localStorage.getItem('loggedInUserId')}/events/${event.eventId}`, requestBody)
        } catch (error) {
            alert(`Something went wrong during application: \n${handleError(error)}`);
        }
    }

    return (
        <div className='apply event'>
            <h2 className='apply text'>Date: {event.startDate}</h2>
            <h3 className='apply text'>From: {event.startTime}</h3>
            <h3 className='apply text'>Till: {event.endTime}</h3>
            <Button
                className='apply button'
                onClick={() => apply()}
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

const ChooseApplicant = () => {
    const [events, setEvents] = useState(null); 
    const history = useHistory();
    const [userUrl, setUserUrl] = useState(null);
    const [placeUrl, setPlaceUrl] = useState(null);
    const [userDescription, setUserDescription] = useState(null);
    const [placeDescription, setPlaceDescription] = useState(null);

    useEffect( () => {
        async function fetchData() {
            try {
                const response = await api.get(`/places/${placeId}/events`);
                console.log(response.data); 
                setEvents(response.data);
                console.log(events);

                const responseUser = await api.get(`/users/${providerId}/profile`);
                setUserDescription(responseUser.data.bio)
                console.log(userDescription);

                const responsePlace = await api.get(`/places/${providerId}`);
                setPlaceDescription(responsePlace.data[0].description)
                console.log(responsePlace.data[0].description);
    
            } catch (error) {
                alert(`Something went wrong during the events fetching: \n${handleError(error)}`);
            }
        }

        fetchData()
    }, [])
    let { placeId, providerId } = useParams();

    getDownloadURL(ref(storage, `user/${providerId}`))
      .then((userUrl) => {
        setUserUrl(userUrl);
      });
    getDownloadURL(ref(storage, `place/user-${providerId}`))
      .then((placeUrl) => {
        setPlaceUrl(placeUrl);
    });

    let eventContent = <EmptyEventBox/>
    if(events) {
        let availableEvents = events.filter(function(value, index, arr) {
            return value.state != "EXPIRED";
        })
        console.log(availableEvents);
        eventContent = (
            availableEvents.map(event => (
                <RequestBox key={event.eventId} event={event} providerId={providerId}/>
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
                        src={placeUrl}
                        variant="square"
                        sx={{ width: 150, height: 150}}
                    />
                    <Box
                        className="apply place-description"
                        value={placeDescription}
                    />
                    <Box
                        className="apply provider-title"
                        value="About the provider"
                    />
                    <Avatar 
                        className = "apply provider-avatar" 
                        src={userUrl}
                        variant="square"
                        sx={{ width: 150, height: 150}}
                    />
                    <Box
                        className="apply provider-description"
                        value={userDescription}
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

export default ChooseApplicant;