import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Home.scss";
import Calendar from './Calendar';
import { MenuItem } from 'components/ui/MenuItem';
import User from 'models/User';
import { responsiveFontSizes } from '@mui/material';
import { Link } from 'react-router-dom';
import Message from 'models/Message';

const Player = ({user}) => (
  <div className="player container">
    <div className="player username">{user.username}</div>
    <div className="player name">{user.name}</div>
    <div className="player id">id: {user.id}</div>
  </div>
);

Player.propTypes = {
  user: PropTypes.object
};

const Home = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();

  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUserId');
    history.push('/login');
  }

  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        // Return more details if the requesting user is the actual user.
        const response = await api.get(`/users/${localStorage.getItem('loggedInUserId')}/profile`);

        // delays continuous execution of an async operation for 1 second.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        await new Promise(resolve => setTimeout(resolve, 50));

        // debug
        // let events = [...response.data.myCalendarAsApplicant, ...response.data.myCalendarAsApplicant];
        // console.log("Events")
        // console.log(events)

        // Get the returned users and update the state.
        const updUser = new User(response.data);
        // embed necessary attribute place
        await updUser.embed_place()

        setUser(updUser)

        // This is just some data for you to see what is available.
        // Feel free to remove it.
        console.log('request to:', response.request.responseURL);
        console.log('status code:', response.status);
        console.log('status text:', response.statusText);
        console.log('requested data:', response.data);

        // See here to get more data.
        console.log(user);
      } catch (error) {
        console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
        console.error("Details:", error);
        alert("Something went wrong while fetching the users! See the console for details.");
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log(`Updated user ${JSON.stringify(user)}`)
  }, [user])

  let content = <Spinner/>;

  if (user) {
    content = (
      <>
      <div className='home column' >
        <div className='notification'>
          {/* TODO: Possibly refactor into component */}
          <h1>Notifications!</h1>
          <div className='notification container'>
            {/* TODO: Only get the last 3 notifications & display as link */}
            { 
            user.myNotifications.slice(0,3).map((n) => {
              let msg = null;
              try {
                msg = new Message(JSON.parse(n.message))
              } catch {
                msg = new Message({link: "/", messageContent: n.message})
              }
              return (<Link to={`${ msg.link }`} key={n.notificationId} className="notification item"><h3>{ msg.messageContent }</h3></Link>)
              })
            }
          </div>
        </div>
        <div className='menu'>
          <div className='menu container'>
            { user.place ? <MenuItem onClick={() => history.push(`/placeprofile/${user.place.placeId}`)}>My Place</MenuItem> :  <MenuItem onClick={() => history.push('/placeregister')}>Create Place</MenuItem> }
            <MenuItem onClick={() => history.push(`/eventcreation/${user.place ? user.place.placeId : ""}`)} disabled={!user.place}>Offer Slot</MenuItem>
            <MenuItem onClick={() => history.push('/Findplace')}>Find Place</MenuItem>
            <MenuItem onClick={() => history.push(`/profile/${user.userId}`)}>My Profile</MenuItem>
          </div>
        </div>
      </div>
      <div className="calendar">
          {/* Below code not necessary */}
          {/* <ul className="game user-list">
      {users.map(user => (
        <Player user={user} key={user.id}/>
      ))}
    </ul> */}
          <Calendar events={user.events} />
          <Button
            width="100%"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </div>
      </>
    );
  }

  return (
    <BaseContainer className="home container">
      {content}
    </BaseContainer>
  );
}

export default Home;

