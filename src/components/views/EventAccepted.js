import React, {useEffect, useState} from 'react';
import BaseContainer from "../ui/BaseContainer";

import "styles/views/EventAccepted.scss";
import {Button} from "../ui/Button";
import { api, handleError } from 'helpers/api';
import axios from 'axios';

const MapFrame = (props) => {
    const [inferredAddress, setInferredAddress] = useState(null)


    function getCoords() {
        return axios
          .get(
            `http://nominatim.openstreetmap.org/search?q=${props.address}&format=json&polygon=1&addressdetails=1`
          )
          .then((res) => {
            console.log("Coords data")
            console.log(res.data[0]);
            setInferredAddress(res.data[0])
          });
    }

    getCoords();

    return (<>
    {/* <iframe 
        // width="100%" 
        // height="350" 
        // frameBorder="0" 
        // scrolling="no" 
        // marginHeight="0" 
        // marginWidth="0" 
        src="https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=47.503%2C9.747%3B47.489%2C9.692#map=15/47.4970/9.7206">
        </iframe>
        <br/><small>
        <a href="https://www.openstreetmap.org/?mlat=47.4920&amp;mlon=9.7145#map=16/47.4920/9.7145">
            Show on larger map
        </a>
        </small> */}
        {/* Currently only this appears possible due to security restrictions */}
        <Button onClick={()=> window.open(`https://www.openstreetmap.org/?mlat=${inferredAddress.lat}&amp;mlon=${inferredAddress.lon}`, "_blank")}>
            Show Place on Map
        </Button>
        </>
        )

}

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
                    <div className="accept grid-item1">
                    <img className = "accept ima2" src="/zuri_lake.jpeg" alt="user profile img" />
                    </div>
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
                        {/* <img className = "accept ima3" src="/map.jpeg" alt="user profile img" /> */}
                        {/* Embed iFrame through external API */}
                        {sl.place && sl.place.address ?
                        (<MapFrame address={sl.place.address}/>)
                        : (<></>)
                        }
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