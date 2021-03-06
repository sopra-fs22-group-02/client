import React, {useState, useEffect} from 'react';
import {api, handleError} from 'helpers/api';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SleepEvent from 'models/SleepEvent';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/EventUpdate.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import TimePicker from "react-time-picker";
import moment from "moment";


const FormField = props => {
    return (
      <div className="eventu field">
        <TimePicker 
            onChange={t => props.onChange(t)} 
            value={props.value} 
        />
      </div>
    );
  };

  
  FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  };
  
  const EventUpdate = () => {
    const history = useHistory();

    // => These are binded to UI components and are sent via JSON
    const [starttime, setStartTime] = useState(new Date());
    const [endtime, setEndTime] = useState(new Date());

    // This is for the UI DatePicker Component
    const [date, setDate] = useState(new Date());
    // these are for the UI TimePicker Component 
    const [starthour, setStartHour] = useState(moment(starttime).format("HH:mm"));
    const [endhour, setEndHour] = useState(moment(endtime).format("HH:mm"))

    // General useEffect for update
    useEffect(() => {
      async function fetchData() {
        try {
          // const requestBody = JSON.stringify({});

          const response = await api.get(`/places/events/${eventId}`);

          console.log(`Response: ${JSON.stringify(response.data)}`)

          const repolate = {
            starttime: moment(`${response.data.startDate} ${response.data.startTime}`, "YYYY-MM-DD HH:mm").toISOString(),
            endtime: moment(`${response.data.endDate} ${response.data.endTime}`, "YYYY-MM-DD HH:mm").toISOString()
          }
    
          // Get the returned user and update a new object`
          let sl = new SleepEvent(repolate)

          // set editable attributes:
          setDate(moment(sl.starttime).toDate())
          setStartTime(moment(sl.starttime).toDate())
          setEndTime(moment(sl.endtime).toDate())
          setStartHour(moment(sl.starttime).format('HH:mm'))
          setEndHour(moment(sl.endtime).format('HH:mm'))
     
          // Creation successfully worked --> navigate to the route /PlaceProfile
          console.log(`Retrieval worked: ${JSON.stringify(response.data)}`);
        } catch (error) {
          alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
      }

      fetchData()

    }, [])

    // Effects for consistency
    useEffect(() => {
      let pureDate = moment(date).format('DD-MM-YYYY');
      console.log(pureDate)
      setStartTime(moment(`${pureDate} ${moment(starttime).format('HH:mm')}`, 'DD-MM-YYYY HH:mm').toDate());
      setEndTime(moment(`${pureDate} ${moment(endtime).format('HH:mm')}`, 'DD-MM-YYYY HH:mm').toDate());
      console.log(`Update the day.`)
    }, [date])

    useEffect(() => {
      let generatedStartDate = moment(`${moment(date).format("DD-MM-YYYY")} ${starthour}`, "DD-MM-YYYY HH:mm").toDate();
      console.log(generatedStartDate);
      setStartTime(generatedStartDate);
      // debug
      console.log(starthour)
    }, [starthour])

    useEffect(() => {
      let generatedEndDate = moment(`${moment(date).format("DD-MM-YYYY")} ${endhour}`, "DD-MM-YYYY HH:mm").toDate();
      console.log(generatedEndDate)
      // if startDate > endDate then assume endDate applies to next day
      if(moment(starttime).isAfter(moment(generatedEndDate))) {
        generatedEndDate = moment(generatedEndDate).add(1, 'day').toDate()
        // debug
        console.log(`Added a day to the endtime ${generatedEndDate}`)
      }
      setEndTime(generatedEndDate)
      console.log(endhour)
    }, [endhour])
  
    const update = async () => {
      try {
        // const requestBody = JSON.stringify({starttime, endtime});
        const requestBody = JSON.stringify({
          startTime: moment(starttime).format('HH:mm'), 
          endTime: moment(endtime).format('HH:mm'),
          startDate: moment(starttime).format('YYYY-MM-DD'),
          endDate: moment(endtime).format('YYYY-MM-DD'),
          comment: "None"
        });

        const response = await api.put(`/places/${localStorage.getItem('loggedInUserId')}/events/${eventId}`, requestBody);

        console.log(`Sending: Starttime: ${starttime} and \n Endtime: ${endtime}`)

        // debug
        // console.log(response);
  
        // Get the returned user and update a new object.
        // const sleepEvent = new SleepEvent(response.data);
  
  
        // Creation successfully worked --> navigate to the route /PlaceProfile
        history.push(`/eventprofile/${placeId}/${eventId}`);
      } catch (error) {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
    };
    let {placeId, eventId} = useParams();
    return (
        <BaseContainer>
          <div className = "eventu firststack" >
            <Button
                onClick={() => history.goBack()}
            >
              Return
            </Button>
          </div>
          <div className="eventu container">
            <div className="eventu form2">
              <div className = "eventu title" >
                <h1> Calendar</h1>
              </div>
              <Calendar
                  locale='en'
                  defaultValue={date}
                  onChange={setDate}
                  minDate={moment().toDate()}
                  maxDate={moment().add(7, 'days').toDate()}
              />
            </div>
            <div className="eventu form">
              <div className = "eventu title" >
                <h1> Arrival time </h1>
              </div>
              <FormField
                  label="Arrival Time"
                  value={starthour}
                  onChange={setStartHour}
              />
              <div className = "eventu title" >
                <h1> depature time </h1>
              </div>
              <FormField
                  label="Departure Time"
                  value={endhour}
                  onChange={setEndHour}
              />
            </div>
          </div>
          <div className="eventu offer-slot">
            <Button
                width="30%"
                onClick={() => update()}
            >
              Update
            </Button>
          </div>
        </BaseContainer>

    );
  };


export default EventUpdate;