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
import { ref, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/material/Avatar";

const PlaceBox = ({ place, history }) => {
    const [url, setUrl] = useState(null);
    getDownloadURL(ref(storage, `place/user-${place.providerId}`))
      .then((url) => {
        setUrl(url);
      });
    
    const selectPlace = () => {
        history.push(`/applyEvent/${place.placeId}/${place.providerId}`);
    }
    return (
        <div className= "find insidefields">
            <Avatar
                className='find avatar'
                src={url}
                variant="square"
            />
            <div className = "find text" >
                <h1>{place.name}</h1>
                <h2>Nearest campus: {place.closestCampus}</h2>
            </div>
            <Button
                onClick={() => selectPlace()}
            >
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
                console.log(places);  
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
                <PlaceBox key={place.placeId} place={place} history={history}/>
            ))
        );
    }
    return (
        <BaseContainer className="find container">
            <div className= "find title" >
                Choose your place      
            </div>
            <div className = "find box" >
                {placeContent}
            </div>
            <div className = "find return" >
                <Button 
                    width='100%'
                    onClick={() => history.push('/home')}
                >
                    Return
                </Button>
            </div>
        </BaseContainer>
    );
};

export default FindPlace;
