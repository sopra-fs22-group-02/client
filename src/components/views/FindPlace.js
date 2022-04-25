import React, {useEffect, useState} from 'react';
import BaseContainer from "../ui/BaseContainer";
import {Button} from "../ui/Button";
import {api, handleError} from "../../helpers/api";
import "styles/views/FindPlace.scss";



const FindPlace = props => {
    let events = null

    useEffect( () => {
        async function fetchData() {
            try {
                //const response = await api.get(`/users/${userId}/profile`); //why?

                //setUser(new User(response.data));

                //console.log(response)

                // history.push(`/profileedit/${ userId }`);
            } catch (error) {
                alert(`Something went wrong during the login: \n${handleError(error)}`);
            }
        }

        fetchData()
    }, [])

    return (
        <BaseContainer>
            <div className = "find firststack" >
                <Button>
                    Return
                </Button>
            </div>
            <div className = "find stack" >
                <div className= "find frame" >
                    <h1>Select an event</h1>
                </div>
            </div>
            <div className = "find box" >
                <div className= "find insidefields" >
                    <img className = "find profile-ima" src="/zuri_lake.jpeg" alt="user profile img" />
                    <div className = "find text" >
                        <h1>Annas Room</h1>
                        <h2>Nearest campus: oerlikon</h2>
                    </div>
                    <Button>
                        Select
                    </Button>
                </div>
                <div className= "find insidefields" >
                    <img className = "find profile-ima" src="/zuri_lake.jpeg" alt="user profile img" />
                    <div className = "find text" >
                        <h1>Pauls Room</h1>
                        <h2>Nearest campus: Hauptgebäude</h2>
                    </div>
                    <Button>
                        Select
                    </Button>
                </div>
                <div className= "find insidefields" >
                    <img className = "find profile-ima" src="/zuri_lake.jpeg" alt="user profile img" />
                    <div className = "find text" >
                        <h1>Dylans Room</h1>
                        <h2>Nearest campus: Irchel</h2>
                    </div>
                    <Button>
                        Select
                    </Button>
                </div>

            </div>


        </BaseContainer>
    );


};

export default FindPlace;
