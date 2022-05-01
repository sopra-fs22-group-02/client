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
import SleepEvent from 'models/SleepEvent';


const ApplicantBox = ({ applicant, history, eventId }) => {
    const [userUrl, setUserUrl] = useState(null);
    const [username, setUsername] = useState(null);
    const [message, setMessage] = useState(null);
    getDownloadURL(ref(storage, `user/${applicant}`))
    .then((userUrl) => {
      setUserUrl(userUrl);
    });
    useEffect ( () => {
        async function fetchUser() {
            try {
                const response = await api.get(`/users/${applicant}/profile`);
                setUsername(response.data.username);
               
            } catch (error) {
                alert(`Something went wrong during application: \n${handleError(error)}`);
            }
        }
        fetchUser()
        }, [])

    const accept = async () => {
        try {
            const response = await api.get(`/users/${localStorage.getItem('loggedInUserId')}/profile`)
            setMessage(`${response.data.username} accepted your application`)
            if (message) {
                const requestBody = JSON.stringify({message});
                const response2 = await api.post(`/users/${applicant}/notifications`, requestBody);
                console.log(response2);
            }
            const response3 = await api.get(`/places/${applicant}/events/${eventId}/accept`)
        } catch (error) {
            alert(`Something went wrong during sending notifications: \n${handleError(error)}`);
        }
    }

    return (
        <div className='choice box'>
            <Avatar
                className='choice avatar'
                src={userUrl}
                sx={{ width: 150, height: 150}}
            />
            <Box
                className='choice username'
                value={username}
            />
            <Button
                className='choice button'
                onClick={() => accept()}
            >
                accept
            </Button>
        </div>
    )
}

const EmptyApplicantBox = () => {
    return (
        <div className='choice empty-applicant'>
        </div>
    )
};

const ChooseApplicant = () => {
    const [startDate, setStartDate] = useState(null); 
    const [startTime, setStartTime] = useState(null); 
    const [endTime, setEndTime] = useState(null); 
    const [applicants, setApplicants] = useState(null);
    const [placeId, setPlaceId] = useState(null);
    const history = useHistory();

    useEffect( () => {
        async function fetchData() {
            try {
                const response = await api.get(`/places/events/${eventId}`);
                console.log(response.data); 
                setStartDate(response.data.startDate);
                setStartTime(response.data.startTime);
                setEndTime(response.data.endTime);
                setApplicants(response.data.applicants);
                setPlaceId(response.data.placeId)
            } catch (error) {
                alert(`Something went wrong during the events fetching: \n${handleError(error)}`);
            }
        }

        fetchData()
    }, [])
    let { eventId } = useParams();
    let applicantContent = <EmptyApplicantBox/>
    if (applicants) {
        applicantContent = (
            applicants.map(applicant => (
                <ApplicantBox key={applicant} applicant={applicant} history={history} eventId={eventId}/>
            ))
        )
    }
    return (
        <BaseContainer className='choice base-container'>
            <div className='choice user-container'>
                {applicantContent}
            </div>
            <div className='choice event-container'>
                <h2 className='choice text'>Date: {startDate}</h2>
                <h3 className='choice text'>From: {startTime}</h3>
                <h3 className='choice text'>Till: {endTime}</h3>
            </div>
            <Button
                onClick={() => history.push(`/events/${placeId}`)}
            >
                return
            </Button>
        </BaseContainer>
    );


};

export default ChooseApplicant;