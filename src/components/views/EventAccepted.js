import React, {useEffect, useState} from 'react';
import BaseContainer from "../ui/BaseContainer";

import "styles/views/EventAccepted.scss";
import {Button} from "../ui/Button";
import { api, handleError } from 'helpers/api';



const EventAccepted = ({ sleepEvent }) => {

    const [sl, setSl] = useState(sleepEvent)

    // const [sleepEvent, setSleepEvent] = useState(sleepEvent)
    console.log("Render child:")

    console.log(JSON.stringify(sleepEvent))

    console.log("Includes")

    // console.log(sl.applicants.includes(parseInt(localStorage.getItem('loggedInUserId'))))

    // useEffect(() => {

    // }, [sleepEvent])

    return (
        // <BaseContainer>
        <>
            <div className = "accept firststack" >
                <Button>
                    Return
                </Button>
            </div>
            <div className= "accept box" >
                <div className="accept box1">
                    <div className= "accept grid-title1" >
                        <h1>Picture</h1>
                    </div>
                    <img className = "accept ima2" src="/zuri_lake.jpeg" alt="user profile img" />
                    {/* Only show address when the applicant is confirmed */}
                    { sleepEvent.confirmedApplicant == localStorage.getItem('loggedInUserId') 
                    ?
                    (<>
                    <div className= "accept grid-title2" >
                        <h1>Adress</h1>
                    </div>
                    <div className="accept grid-item2">
                        <h1 className = "accept grid-item2-text" >{ sl.place.address }</h1>
                    </div>
                    </>
                    ) : (<></>)
                    }
                    {/* Only show map when the applicant is confirmed */}
                    { sl.confirmedApplicant == localStorage.getItem('loggedInUserId') 
                    ? ( <>
                        <div className= "accept grid-title4" >
                        <h1>Map</h1>
                        </div>
                        <div className="accept grid-item4">
                        <img className = "accept ima3" src="/map.jpeg" alt="user profile img" />
                        </div>
                        </>
                        )
                    : (<></>)
                    }
                    <div className= "accept grid-title3" >
                        <h1>Description</h1>
                    </div>
                    <div className="accept grid-item3">
                        <p className = "acept text">{ sl.place.description }</p>
                    </div>
                </div>

                <div className="accept box2">
                    <div className= "accept box1h">
                        <h1>Avilability</h1>
                    </div>
                    <div className = "accept from">
                        <h1>From: <span>{ sl.startDate }</span> <span>{ sl.startTime.substring(0, sl.startTime.length - 3) }</span> </h1>
                    </div>
                    <div className = "accept from">
                        <h1>From: <span>{ sl.endDate }</span> <span>{ sl.endTime.substring(0, sl.endTime.length - 3) }</span> </h1>
                    </div>
                </div>

                <div className="accept box3">
                    <div className= "accept box1h1">
                        <h1>About the provider</h1>
                    </div>
                    <div className= "accept insidebox" >
                        <img className = "accept ima" src="/profile.png" alt="user profile img" />
                        <div className= "accept  textboxprof">
                            <p className = "profile text" > { sl.provider.bio } </p>
                        </div>
                    </div>
                </div>
            </div>
        {/* </BaseContainer> */}
        </>
    );


};

export default EventAccepted;