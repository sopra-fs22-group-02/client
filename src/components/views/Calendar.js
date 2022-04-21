import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import "styles/views/Calendar.scss"
import { Link } from "react-router-dom";

const Event = ({ event }) => {
  return (
    <Link to={`/eventprofile/${event.place ? event.place.id : "undef"}/${event.id}`} className="calevent item" style={(event.state === "AVAILABLE" ? {} : { background:  "green" }) } >      
      {/* <div className="calevent item"> */}
        <div className="calevent role">
          {event.provider ? "Provider" : "Applicant"}
        </div>
        <div className="calevent state">{event.state}</div>
        <div className="calevent start-time">
          From: {moment(event.starttime).format("LT")}
        </div>
        <div className="calevent end-time">
          To: {moment(event.endtime).format("LT")}
        </div>
      {/* </div> */}
    </Link>

  );
};

const Weekday = ({ weekday }) => {
  return (
    <div className="weekday">
      <div className="weekday title">
        <h3>{weekday.name}</h3>
      </div>
      <div className="calevent container" >
      {weekday.events.map((event) => (
          <Event event={event} key={event.id} />
      ))}
      </div>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.object
};

const Calendar = ({ events }) => {

  console.log(events)

  // let events = [
  //   {
  //     id: 1,
  //     // applicants: [1], // association EVENT -> USER
  //     // confirmedApplicant: null, // association: EVENT -> USER
  //     // date: "2022-04-10", // let's remove this
  //     starttime: "2022-04-10T20:00:00Z", // let's make this a datetime field
  //     endtime: "2022-04-11T06:00:00Z", // let's make this a datetime field
  //     state: "AVAILABLE",
  //     provider: true
  //   },
  //   {
  //     id: 2,
  //     // applicants: [1], // association EVENT -> USER
  //     // confirmedApplicant: null, // association: EVENT -> USER
  //     // date: "2022-04-10", // let's remove this
  //     starttime: "2022-04-08T10:00:00Z", // let's make this a datetime field
  //     endtime: "2022-04-08T14:00:00Z", // let's make this a datetime field
  //     state: "CONFIRMED",
  //     provider: false
  //   },
  //   {
  //     id: 3,
  //     // applicants: [1], // association EVENT -> USER
  //     // confirmedApplicant: null, // association: EVENT -> USER
  //     // date: "2022-04-10", // let's remove this
  //     starttime: "2022-04-09T15:00:00Z", // let's make this a datetime field
  //     endtime: "2022-04-09T16:00:00Z", // let's make this a datetime field
  //     state: "CONFIRMED",
  //     provider: false
  //   }
  // ];

  // group the events by the date (starttime)
  const eventsGroupedByDay = _.groupBy(events, (element) =>
    element.starttime.substring(0, 10)
  );

  // debugging
  // console.log(eventsGroupedByDay);

  let weekDates = [];
  let daysRequired = 7;

  // get the locale of the next 7 days
  for (let i = 1; i <= daysRequired; i++) {
    // remove params in moment(...) for production!
    weekDates.push(
      moment()
        .add(i, "days")
        .format()
        .substring(0, 10)
    );
  }

  // debugging
  // console.log(days);

  // create a JSX friendly object
  // a lot of wrangling, I know :(
  let days = _.map(weekDates, (weekdate) => {
    // let eventsOnDay = eventsGroupedByDay.hasOwnProperty(weekdate)
    let eventsOnDay = Object.prototype.hasOwnProperty.call(eventsGroupedByDay, weekdate)
      ? eventsGroupedByDay[weekdate]
      : [];
    return {
      name: moment(weekdate, "YYYY-MM-DD").format("dddd"),
      date: weekdate,
      events: eventsOnDay
    };
  });

  // debugging
  // console.log(days);

  return (
    <>
    <h1>My Events!</h1>
      <div className="calendar container">
        <div className="weekday container">
          {days.map((day) => (
            <Weekday weekday={day} key={day.date} />
          ))}
        </div>
    </div>
    </>
  );
};

export default Calendar;
