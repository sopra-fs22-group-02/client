import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import 'react-calendar/dist/Calendar.css';
import SleepEvent from 'models/SleepEvent';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import {Box} from 'components/ui/Box';
import 'styles/views/EventProfile.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import moment from "moment"
import EventAccepted from './EventAccepted';


const ProfileField = props => {
    return (
      <div className="event field">
        <Box
            className="event box"
            value={props.label}
        />
        <Box
            className="event box"
            value={props.value}
        />
      </div>
    );
  };

  
  ProfileField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  };
  
  const EventProfile = () => {
    const history = useHistory();
    const [sleepEvent, setSleepEvent] = useState(new SleepEvent());

    useEffect(() => {
      async function fetchData() {
        try {
          // const requestBody = JSON.stringify({});

          const response = await api.get(`/places/events/${eventId}`);
          // user

          console.log(`Response: ${JSON.stringify(response.data)}`)

          const repolate = {
            starttime: moment(`${response.data.startDate} ${response.data.startTime}`, "YYYY-MM-DD HH:mm").toISOString(),
            endtime: moment(`${response.data.endDate} ${response.data.endTime}`, "YYYY-MM-DD HH:mm").toISOString()
          }
    
          // Get the returned user and update a new object`
          let sl = new SleepEvent(response.data)

          // modified injections to call based on need of data
          await sl.constructDateTime();
          await sl.embed_place();
          await sl.embed_applicants();
          await sl.embed_confirmed_applicant();
          await sl.embed_provider();

          setSleepEvent(sl)

          // debug
          console.log(`Construced full object: ${JSON.stringify(sl)}`)
     
          // Creation successfully worked --> navigate to the route /PlaceProfile
          // console.log(`Retrieval worked: ${JSON.stringify(response.data)}`);
        } catch (error) {
          alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
      }

      fetchData()

    }, [])

    const apply = async () => {

      try {
          const response = await api.get(`users/${localStorage.getItem('loggedInUserId')}/profile`)

          const message = JSON.stringify({
              messageContent: `${response.data.firstName} applied to one of your events.`,
              link: `/eventprofile/${sleepEvent.placeId}/${sleepEvent.eventId}`
          })
          // setMessage(`${response.data.username} wants to apply for your sleep event`)
          if (message) {
              const requestBody = JSON.stringify({message});
              const response2 = await api.post(`/users/${sleepEvent.providerId}/notifications`, requestBody);
              // debug
              // console.log(response2);
          }
          console.log(message); // click apply twice
          // const requestBody = JSON.stringify({});
          // console.log(`Making request to: places/${localStorage.getItem('loggedInUserId')}/events/${sleepEvent.eventId}`)
          const response3 = await api.post(`/places/${localStorage.getItem('loggedInUserId')}/events/${sleepEvent.eventId}`);
          // debug
          // console.log(response3);
      } catch (error) {
          alert(`Something went wrong during application: \n${handleError(error)}`);
      }
  }

    // effect hook for sleep event
    useEffect(() => {
      console.log("SL updated")
      console.log(sleepEvent)
    }, [sleepEvent])

    // do we really need placeId?
    let {placeId, eventId} = useParams();
    // let {eventId} = useParams();
    const goBack = () => {
        history.push("/home")
    }

    const toEdit = () => {
      history.push(`/eventupdate/${placeId}/${eventId}`)
    }

    const doDelete = () => {
      // TODO: Implement
    }

    const providerView = () => 
    ( <>{ 
      // sleepEvent.confirmedApplicant != 0
      // ? (<h2>Provider has chosen</h2>)
      // : (<h2>Provider has not yet chosen</h2>)
      // <EventAccepted sleepEvent={sleepEvent} />
    }</>
    )
  

    const applicantView = () => 
    ( <>{ 
        // localStorage.getItem('loggedInUserId') == sleepEvent.confirmedApplicant
        // ? (<h2>Is Confirmed Applicant</h2>)
        // : (<h2>Is Unconfirmed Applicant</h2>)
        <>
        <EventAccepted sleepEvent={sleepEvent} />
        <div className = "accept footer" >
        <div className= "placeholder" >
        </div>
        {/* Only show QnA Button when applicant is confirmed */}
        { sleepEvent.confirmedApplicant == localStorage.getItem('loggedInUserId')
        ? (<Button>
            Start QnA
        </Button>)
        : (<></>)
        }
        {/* Show the different states of the buttons depending on the state */}
        { sleepEvent.applicants.includes(parseInt(localStorage.getItem('loggedInUserId')))
        ? 
        (<Button disabled={true}>
            Applied
        </Button>)
        : sleepEvent.confirmedApplicant == localStorage.getItem('loggedInUserId')
        ? 
        (<Button disabled={true}>
            Confirmed
        </Button>)
        : (
        <Button
            onClick={() => {apply()}}
            >
            Apply
        </Button>
        )}
        </div>
        </>
      }</>
    )

    return (
      <BaseContainer>
          { localStorage.getItem('loggedInUserId') == sleepEvent.providerId
            ? providerView()
            : localStorage.getItem('loggedInUserId') != sleepEvent.providerId && sleepEvent.providerId
            ? applicantView()
            : (<></>)
          }
        <div className="event container">
          <div className="event form">
            <ProfileField
              label="Arrival Time"
              value={moment(sleepEvent.starttime).format("HH:mm")}
            />
            <ProfileField
              label="Departure Time"
              value={moment(sleepEvent.endtime).format("HH:mm")}
            />
            <ProfileField
              label="Date"
              value={moment(sleepEvent.starttime).format("DD-MM-YYYY")}
            />
            <div className="event button-container">
              <Button
                width="30%"
                onClick={() => goBack()}
              >
                Go back
              </Button>
              { localStorage.getItem('loggedInUserId') == sleepEvent.providerId 
              ? (<Button
                  width="30%"
                  onClick={() => toEdit()}
                >
                  Edit
                </Button>)
              : (<></>)
              }
            </div>
          </div>
        </div>
      </BaseContainer>
    );
  };


export default EventProfile;