import React, {useState, useEffect} from 'react';
import {api, handleError} from 'helpers/api';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SleepEvent from 'models/SleepEvent';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import {Box} from 'components/ui/Box';
import 'styles/views/EventCreation.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { useParams } from 'react-router-dom';
import TimePicker from "react-time-picker";
import moment from "moment";


const FormField = props => {
    return (
      <div className="event field">
        <Box
            className="event box"
            value={props.label}
        />
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
  
  const EventCreation = () => {
    const history = useHistory();

    // => These are binded to UI components and are sent via JSON
    const [starttime, setStartTime] = useState(new Date());
    const [endtime, setEndTime] = useState(new Date());

    // This is for the UI DatePicker Component
    const [date, setDate] = useState(new Date());
    // these are for the UI TimePicker Component 
    const [starthour, setStartHour] = useState(moment(starttime).format("HH:mm"));
    const [endhour, setEndHour] = useState(moment(endtime).format("HH:mm"))

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
  
    const create = async () => {
      try {
        const requestBody = JSON.stringify({
            startTime: moment(starttime).format('HH:mm'), 
            endTime: moment(endtime).format('HH:mm'),
            startDate: moment(starttime).format('YYYY-MM-DD'),
            endDate: moment(endtime).format('YYYY-MM-DD'),
            comment: "None"
          });

        const response = await api.post(`/places/${ localStorage.getItem('loggedInUserId') }/${placeId}/events`, requestBody);

        console.log(`Sending: Starttime: ${starttime} and \n Endtime: ${endtime}`)

        // debug
        console.log(response);
  
        // Get the returned user and update a new object.
        // const sleepEvent = new SleepEvent(response.data);
  
  
        // Creation successfully worked --> navigate to the route /PlaceProfile
        history.push(`/`);
      } catch (error) {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
    };
    let {placeId} = useParams();
    return (
      <BaseContainer>
        <div className="event container">
        <div className="event form2">
            <Box
                className="event calendar-box"
                value="Calendar"
            />
            <Calendar
              locale='en'
              defaultValue={date}
              onChange={setDate}
              minDate={moment().toDate()}
              maxDate={moment().add(7, 'days').toDate()}
            />
          </div>
          <div className="event form">
            <FormField
              label="Arrival Time"
              value={starthour}
              onChange={setStartHour}
            />
            <FormField
              label="Departure Time"
              value={endhour}
              onChange={setEndHour}
            />
            <div className="event button-container">
              <Button
                width="30%"
                onClick={() => create()}
              >
                Offer slot
              </Button>
            </div>
          </div>
        </div>
      </BaseContainer>
    );
  };


export default EventCreation;