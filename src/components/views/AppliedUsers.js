import React, {useEffect, useState} from 'react';
import BaseContainer from "../ui/BaseContainer";
import "styles/views/AppliedUsers.scss";
import {Button} from "../ui/Button";
import { api, handleError } from 'helpers/api';
import { useHistory } from 'react-router-dom';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from 'helpers/firebase';
import User from 'models/User';

const AppliedUsers = ({ sleepEvent, callback, setCallback }) => {
    const history = useHistory()
    const [sl, setSl] = useState(sleepEvent)
    const [userPicPath, setUserPicPath] = useState("/profile.png")

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
        const fetchUserPicPath = async function () {
            let pUser = null
            if(sl.applicant.length > 0 && sl.applicant[0]) {
                pUser = new User(sl.applicant[0])
                getDownloadURL(ref(storage, `user/${pUser.userId}`))
                .then((url) => {
                  console.log("Retrievel URL:")
                  console.log(url)
                  setUserPicPath(url)
                }).catch((error) => {
                    setUserPicPath("/profile.png")
                })
            }
            // setUserPicPath(pUser.pictureUrl ? pUser.pictureUrl : "/profile.png")
        }

        fetchUserPicPath();

    }, [sl])

    useEffect(() => {
        console.log("Rerender")
        setSl(sleepEvent)
        console.log("Confirmed Applicant")
        // console.log(sl.confirmedApplicantEntity.username);
    }, [sleepEvent])

    return(
        // <BaseContainer>
        <>
            <div className = "applied header" >
                <Button onClick={ () => { history.goBack() } }>
                    Return
                </Button>
                <div className= "applied header-title">
                    <h1>Event Provider</h1>
                </div>
            </div>
            <div className= "applied box" >
                <div className="applied box1">
                        { sl.applicantsEntities ?
                        sl.applicantsEntities.map((a) => (
                            <div className= "applied insideboxes" key={a.userId}>
                            <img className = "applied avatar" src={userPicPath} alt="user profile img" />
                            <h3>{a.username}</h3>
                            <Button onClick={() => { accept(a.userId) }}>
                                Accept
                            </Button>
                            </div>
                        ))
                        : sl.confirmedApplicant !== 0 
                        ? (
                            <>
                            <h1>Applicant Profile</h1>
                            <h3>{ sl.confirmedApplicantEntity ? sl.confirmedApplicantEntity.username : "n.A." }</h3>
                            <h5>{ sl.confirmedApplicantEntity ? sl.confirmedApplicantEntity.bio : "n.A." }</h5>
                            </>
                          )
                        : (<><h1>No applicants.</h1></>)
                        } 
                </div>
                <div className="applied box2">
                    <div className= "applied box2-title">
                        <h1>Event Time</h1>
                    </div>
                    <div className= "applied insideboxesframe">
                        <h1> From: <span>{sl.startDate}</span> <span>{sl.startTime}</span> </h1>
                    </div>
                    <div className= "applied insideboxesframe">
                        <h1> To: <span>{sl.endDate}</span> <span>{sl.endTime}</span> </h1>
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