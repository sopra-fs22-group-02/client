import React, {useEffect, useState} from 'react';
import BaseContainer from '../ui/BaseContainer';
import {Button} from '../ui/Button';
import {Box} from '../ui/Box';
import {api, handleError} from "../../helpers/api";
import "styles/views/FindPlace.scss";
import {useHistory} from 'react-router-dom';
import Place from "models/Place";


const FindPlace = () => {

    const places = [];
    const history = useHistory();

    useEffect( () => {
        async function fetchData() {
            try {
                const response = await api.get('/places'); 
                for (let resp in response.data) {
                    places.push(new Place(resp));
                }
                console.log(places)
                // history.push(`/profileedit/${ userId }`);
            } catch (error) {
                alert(`Something went wrong during the fetching: \n${handleError(error)}`);
            }
        }

        fetchData()
    }, [])

    return (
        <BaseContainer>
            <div className = "find firststack" >
                <Button 
                    onClick={() => history.push('/home')}
                >
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
