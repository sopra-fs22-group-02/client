import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Registration.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = props => {
    return (
        <div className="registration field">
            <label className="registration label">
                {props.label}
            </label>
            <input
                className="registration input"
                placeholder="enter here.."
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

const FormFieldPassword = props => {
    return (
        <div className="registration field">
            <label className="registration label">
                {props.label}
            </label>
            <input
                type = "password"
                className="registration input"
                placeholder="enter here.."
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

const Registration = props => {
    const history = useHistory();
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)


    const register = async () => {
        try {
            const requestBody = JSON.stringify({username, email, password});
            const response = await api.post('/users', requestBody);

            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token into the local storage.
            localStorage.setItem('token', user.token);
            localStorage.setItem('loggedInUserId', user.userId);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/home/dashboard`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    };

    return (
        <BaseContainer alerts={[{message:"Please use your UZH E-Mail address (@uzh.ch) to register.", severity:"info"}]}>
            <div className="registration container">

                <div className="registration form">
                    <div className= "registration title">
                        <h1> Registration </h1>
                    </div>
                    <FormField
                        label="Username"
                        value={username}
                        onChange={u => setUsername(u)}
                    />
                    <FormField
                        label="Email"
                        value={email}
                        onChange={e => setEmail(e)}
                    />
                    <FormFieldPassword
                        label="Password"
                        value={password}
                        onChange={p => setPassword(p)}
                    />
                    <div className="registration button-container">
                        <Button
                            disabled={ !username || !email || !password || !email.endsWith("@uzh.ch") }
                            width="100%"
                            onClick={() => register()}
                        >
                            Register
                        </Button>
                        <Button
                            width="100%"
                            onClick={() => history.push('/login')}
                            >
                            Go To Login
                        </Button>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
};

export default Registration;
