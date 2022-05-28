import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from '@mui/material';

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const FAQ = props => {

  const BGCOLOR = "#64c3ce"

  return (
    <>
    <Accordion style={{background: BGCOLOR}}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>What is FindAPlace?</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      FindAPlace is a location-centric event-planner that allows students to quickly and easily find a place to sleep. Whether it is about taking a quick nap, or just crashing at a place to sleep after a long night of studying or partying.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion style={{background: BGCOLOR}}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-content"
      id="panel2a-header"
    >
      <Typography>Where can I find more info or help?</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        FindAPlace is a student project. More information about the project and the workflow can be found @<Link target="_blank" href='https://github.com/sopra-fs22-group-02/client#Illustrations'>GITHUB</Link>
      </Typography>
    </AccordionDetails>
  </Accordion>
  </>
  )
}

const FormField = props => {
  return (
    <div className="login field">
      <label className="login label">
        {props.label}
      </label>
      <input
        className="login input"
        placeholder="enter here.."
        type={props.type ? props.type : "text"}
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

const Login = props => {
  const history = useHistory();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({username, password});
      const response = await api.post(`/users/${username}/login`, requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem('token', user.token);
      localStorage.setItem('loggedInUserId', user.userId);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/home`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          <div className= "login title">
            <h1> Login </h1>
            {/* <p>FindAPlace is a location-centric event-planner that allows students to quickly and easily find a place to sleep. Whether it is about taking a quick nap, or just crashing at a place to sleep after a long night of studying or partying. FindAPlace has you covered!
              <br/>
              <br/>
              Places for sleeping are offered by other users. These places can then be chosen when searching for a suitable time slot and location. A simple accept / reject mechanism allows the place provider to then simply choose which applicant will get the place for the desired time.
              <br/>
              <br/>
              After being accepted, you or the provider of the place can start a real-time Question and Answering session where you can ask each other your important questions about the stay.
              <br/>
              <br/>
            </p> */}
            <FAQ />
          </div>
          <FormField
            label="Username"
            value={username}
            onChange={un => setUsername(un)}
          />
          <FormField
            label="Password"
            type="password"
            value={password}
            onChange={n => setPassword(n)}
          />
          <div className="login button-container">
            <Button
              disabled={!username || !password}
              width="100%"
              onClick={() => doLogin()}
            >
              Login
            </Button>            
            <Button
              width="100%"
              onClick={() => history.push('/registration')}
            >
              Go To Registration
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Login;
