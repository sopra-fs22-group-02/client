import React, {useState,useEffect} from 'react';
import {api, handleError} from 'helpers/api';
import Place from 'models/Place';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import {Box} from 'components/ui/Box';
import 'styles/views/PlaceRegister.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { useParams } from 'react-router-dom';

const FormField = props => {
    return (
      <div className="place field">
        <Box
            className="place box"
            value={props.label}
        />
        <input
          className="place input"
          // placeholder="enter here.."
          defaultValue={props.defaultValue}
          // value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      </div>
    );
  };

  const ImageHolder = props => {
    return (
        <img
          className="place picture"
          src="/zuri_lake.jpeg"
          width={props.width}
        />
    );
  };
  
  FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  };
  
  const PlaceRegister = () => {
    const history = useHistory();
    const [name, setName] = useState(null);
    const [nearestTo, setNearestTo] = useState(null);
    const [address, setAddress] = useState(null);
    const [description, setDescription] = useState(null);
    const [place, setPlace] = useState(new Place());
  
    const doUpdate = async () => {
      try {
        // Only update non-null values (where the state is not null, partial update)
        const requestBody = JSON.stringify({id: placeId, nearestTo, name, address, description}, 
          (key, value) => {
          if (value !== null) return value
        });
        const response = await api.put('/places', requestBody);
  
        // Get the returned user and update a new object.
        const place = new Place(response.data);
  
  
        // Creation successfully worked --> navigate to the route /PlaceProfile
        history.push(`/PlaceProfile/${ placeId }`);
      } catch (error) {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
    };

    useEffect(() => {
      async function fetchData() {
            try {
                const response = await api.get(`/places/${placeId}`);

                console.log("Called fetchData")
          
                // Get the returned user and update a new object.
                setPlace(new Place(response.data));
                 
                // Creation successfully worked --> navigate to the route /PlaceProfile
              } catch (error) {
                alert(`Something went wrong during the login: \n${handleError(error)}`);
              }
      }

      fetchData();

    }, []);

    let { placeId } = useParams()

    console.log(place)
  
    return (
      <BaseContainer>
        <div className="place container">
          <div className="place form">
            <FormField
              label="Name"
              defaultValue={place.name}
              // value={place.name}
              onChange={n => setName(n)}
            />
            <FormField
              label="Nearest To"
              defaultValue={place.nearestTo}
              onChange={nt => setNearestTo(nt)}
            />
            <FormField
              label="Address"
              defaultValue={place.address}
              onChange={ads => setAddress(ads)}
            />
            <FormField
              label="Description"
              defaultValue={place.description}
              onChange={des => setDescription(des)}
            />
            <div className="place button-container">
              <Button
                width="30%"
                onClick={() => doUpdate()}
              >
                Update
              </Button>
            </div>
          </div>
          <div className="place form2">
            <Box
                className="place image-box"
                value="Place Image"
            />
            <ImageHolder 
                width={250}
            />
          </div>
        </div>
      </BaseContainer>
    );
  };


export default PlaceRegister;