import React, {useEffect, useState} from 'react';
import BaseContainer from '../ui/BaseContainer';
import {Button} from '../ui/Button';
import {api, handleError} from "../../helpers/api";
import "styles/views/FindPlace.scss";
import {useHistory} from 'react-router-dom';
import PropTypes from "prop-types";
import { storage } from 'helpers/firebase';
import { ref, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/material/Avatar";
import { NightShelter } from '@mui/icons-material';

const PlaceBox = ({ place, history }) => {
    const [url, setUrl] = useState(null);
    let isOwnPlace = place.providerId == localStorage.getItem('loggedInUserId');
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
            ><NightShelter style={{fontSize: 80}} />
            </Avatar>
            <div className = "find text" >
                <h1>{place.name}{isOwnPlace ? " (your place) ": ""}</h1>
                <h2>Nearest campus: {place.closestCampus}</h2>
            </div>
            <Button
                onClick={() => selectPlace()}
                disabled={isOwnPlace}
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
    const [allPlaces, setAllPlaces] = useState(null); 
    const history = useHistory();

    useEffect( () => {
        async function fetchData() {
            try {
                const response = await api.get('/places');
                console.log(response.data); 
                setPlaces(response.data);
                setAllPlaces(response.data);
                console.log(places);  
            } catch (error) {
                alert(`Something went wrong during the fetching: \n${handleError(error)}`);
            }
        }

        fetchData()
    }, [])

    const filterPlace = closestCampus => {
        let filteredPlaces = [];
        if (allPlaces) {
            allPlaces.map((place) => {
                if (place.closestCampus == closestCampus) {
                    filteredPlaces.push(place)
                    console.log(place)
                }
            })
            setPlaces(filteredPlaces)
        }
    }
    const getAllPlaces = () => {
        setPlaces(allPlaces);
    }

    let placeContent = <EmptyPlaceBox/>
    if (places) {
        placeContent = (
            places.length > 0 ?
            places.map(place => (
                <PlaceBox key={place.placeId} place={place} history={history}/>
            ))
            : (<h3>Oops! We found no place for this facet!</h3>)
        );
    }
    return (
            <BaseContainer>
                <div className = "find return" >
                        <Button 
                            className="find find-return-button"
                            onClick={() => history.push('/home')}
                        >
                            Return
                        </Button>
                </div>
                <div className= "find title" >
                        <h1>Choose your place </h1>     
                </div>
                <div className='find result'>
                    <div className='find filter'>
                        <fieldset className='find set'>
                            <label> Oerlikon
                                <input 
                                    name='campus'
                                    type="radio"
                                    value="OERLIKON"
                                    onClick={e => filterPlace(e.target.value)}
                                /> 
                            </label>
                            <label> Irchel
                                <input 
                                    name='campus'
                                    type="radio"
                                    value="IRCHEL"
                                    onClick={e => filterPlace(e.target.value)}
                                /> 
                            </label>
                            <label> Center
                                <input 
                                    name='campus'
                                    type="radio"
                                    value="CENTER"
                                    onClick={e => filterPlace(e.target.value)}
                                /> 
                            </label>
                            <label> Hoenggerberg
                                <input 
                                    name='campus'
                                    type="radio"
                                    value="HOENGGERBERG"
                                    onClick={e => filterPlace(e.target.value)}
                                /> 
                            </label>
                            <label> Show All
                                <input 
                                    name='campus'
                                    type="radio"
                                    onClick={() => getAllPlaces()}
                                /> 
                            </label>
                        </fieldset>
                    </div>
                    <div className = "find box" >
                        {placeContent}
                    </div>
                </div>
        </BaseContainer>
    );
};

export default FindPlace;
