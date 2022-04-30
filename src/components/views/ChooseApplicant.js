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
import { set } from 'date-fns';

const ApplicantBox = ({ applicant, history }) => {
    const [userUrl, setUserUrl] = useState(null);
    const [username, setUsername] = useState(null);

    getDownloadURL(ref(storage, `user/${applicant}`))
    .then((userUrl) => {
      setUserUrl(userUrl);
    });
    useEffect ( () => {
        async function fetchUser() {
            try {
                const response = await api.get(`users/${applicant}/profile`);
                setUsername(response.data.username);
               
            } catch (error) {
                alert(`Something went wrong during application: \n${handleError(error)}`);
            }
        }
        fetchUser()
        }, [])

    const accept = async () => {
        try {
            const response = await api.post(`users/${applicant}/notifications`)
        } catch (error) {
            alert(`Something went wrong during sending notifications: \n${handleError(error)}`);
        }
    }

    return (
        <div className='accept box'>
            <Avatar
                className='accept avatar'
                src={userUrl}
                sx={{ width: 150, height: 150}}
            />
            <Box
                className='accept username'
                value={username}
            />
            <Button
                className='accept button'
                onClick={() => accept()}
            >
                accept
            </Button>
        </div>
    )
}

const EmptyApplicantBox = () => {
    return (
        <div className='apply empty-applicant'>
        </div>
    )
};

const ChooseApplicant = () => {
    const [event, setEvent] = useState(null); 
    const [applicants, setApplicants] = useState(null);
    const history = useHistory();
    const [placeDescription, setPlaceDescription] = useState(null);

    useEffect( () => {
        async function fetchData() {
            try {
                const response = await api.get(`/places/events/${eventId}`);
                console.log(response.data); 
                setEvent(response.data);
                setApplicants(response.data.applicants);
    
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
                <ApplicantBox key={applicant} applicant={applicant} history={history}/>
            ))
        )
    }
    return (
        <BaseContainer className='accept base-container'>
            <div className='accept user-container'>
                {applicantContent}
            </div>
            <div className='accept event'>
                <h2 className='apply text'>Date: {event.startDate}</h2>
                <h3 className='apply text'>From: {event.startTime}</h3>
                <h3 className='apply text'>Till: {event.endTime}</h3>
            </div>
        </BaseContainer>
    );


};

export default ChooseApplicant;