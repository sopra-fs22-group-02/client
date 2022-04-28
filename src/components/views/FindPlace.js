import React, {useEffect, useState} from 'react';
import BaseContainer from '../ui/BaseContainer';
import {Button} from '../ui/Button';
import {Box} from '../ui/Box';
import {api, handleError} from "../../helpers/api";
import "styles/views/FindPlace.scss";
import {useHistory} from 'react-router-dom';
import Place from "models/Place";
import PropTypes from "prop-types";
import { storage } from 'helpers/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/material/Avatar";
import { id } from 'date-fns/locale';

const PlaceBox = ({ place }) => {
    return (
        <div className= "find insidefields">
            <img className = "find profile-ima" src="/zuri_lake.jpeg" alt="user profile img" />
            <div className = "find text" >
                <h1>{place.name}</h1>
                <h2>Nearest campus: {place.cloestCampus}</h2>
            </div>
            <Button>
                Select
            </Button>
        </div>
        
    );
};
const EmptyPlaceBox = () => {
    return (
        <div className= "find insidefields">
        </div>
    );
}

PlaceBox.propTypes = {
    place: PropTypes.object
};

const FindPlace = () => {

    const [places, setPlaces] = useState(null); 
    const history = useHistory();

    useEffect( () => {
        async function fetchData() {
            try {
                const response = await api.get('/places');
                console.log(response.data); 
                setPlaces(response.data);
                // let len = response.data.length; 
                // for (let i = 0; i < len; i++) {
                //     let place = new Place(response.data[i]);
                //     console.log(place.closestCampus);
                //     places.push(place); 
                //     setPlaceLength(len);
                // }
                console.log(places);  
                // history.push(`/profileedit/${ userId }`);
            } catch (error) {
                alert(`Something went wrong during the fetching: \n${handleError(error)}`);
            }
        }

        fetchData()
    }, [])
    let placeContent = <EmptyPlaceBox/>
    if (places) {
        placeContent = (
            places.map(place => (
                <PlaceBox key={place.placeId} place={place}/>
            ))
        );
    }
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
                {placeContent}
            </div>
        </BaseContainer>
    );
};

export default FindPlace;
