import React, {useEffect, useState} from 'react';
import BaseContainer from "../ui/BaseContainer";
import "styles/views/AppliedUsers.scss";
import {Button} from "../ui/Button";
import { api, handleError } from 'helpers/api';

const AppliedUsers = ({ sleepEvent, callback, setCallback }) => {
    const [sl, setSl] = useState(sleepEvent)

    const accept = async (aId) => {
        try {
            const response = await api.get(`/users/${localStorage.getItem('loggedInUserId')}/profile`)

            const message = JSON.stringify({
                messageContent: `${ response.data.username } accepted your request.`,
                link: `/eventprofile/${sleepEvent.placeId}/${sleepEvent.eventId}`
            })

            const requestBody = JSON.stringify({message});
            const response2 = await api.post(`/users/${aId}/notifications`, requestBody);
            console.log(response2);

            // api call to accept applicant
            const res3 = await api.post(`/places/${aId}/events/${sleepEvent.eventId}/accept`)

            setCallback(!callback)

        } catch (error) {
            alert(`Something went wrong during sending notifications: \n${handleError(error)}`);
        }
    }

    useEffect(() => {
        console.log("Rerender")
        setSl(sleepEvent)
    }, [sleepEvent])

    return(
        // <BaseContainer>
        <>
            <div className = "applied header" >
                <Button>
                    Return
                </Button>
                <div className= "applied header-title">
                    <h1>Event Provider</h1>
                </div>
            </div>
            <div className= "applied box" >
                <div className="applied box1">
                    <div className= "applied insideboxes">
                        { sl.applicantsEntities ?
                        sl.applicantsEntities.map((a) => (
                            <div key={a.userId}>
                            <img className = "applied avatar" src="/profile.png" alt="user profile img" />
                            <h1>{a.firstName}</h1>
                            <Button onClick={() => { accept(a.userId) }}>
                                Accept
                            </Button>
                            </div>
                        ))
                        : sl.confirmedApplicant !== 0 
                        ? (<h1>Applicant Profile</h1>)
                        : (<><h1>No applicants.</h1></>)
                        } 
                    </div>

                </div>
                <div className="applied box2">
                    <div className= "applied box2-title">
                        <h1>Event Time</h1>
                    </div>
                    <div className= "applied insideboxesframe1">
                        <h1> From: <span>{sl.startDate}</span> <span>{sl.startTime}</span> </h1>
                    </div>
                    <div className= "applied insideboxesframe2">
                        <h1> To:<span>{sl.endDate}</span> <span>{sl.endTime}</span> </h1>
                    </div>
                </div>
            </div>
        </>
        // {/* // </BaseContainer> */}
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default AppliedUsers;