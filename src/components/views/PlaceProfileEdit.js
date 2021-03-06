import React, {useState,useEffect, useRef} from 'react';
import {api, handleError} from 'helpers/api';
import Place from 'models/Place';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import {Box} from 'components/ui/Box';
import 'styles/views/PlaceProfileEdit.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { storage } from 'helpers/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/material/Avatar";

const FormField = props => {
    return (
      <div className="placeedit field">
        <Box
            className="placeedit box"
            value={props.label}
        />
        <input
          className="placeedit input"
          // placeholder="enter here.."
          defaultValue={props.defaultValue}
          // value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      </div>
    );
  };

  const SelectField = props => {
    return (
      <div className="placeedit field">
        <Box
            className="placeedit box"
            value={props.label}
        />
        <select className="placeedit select" onChange={(e) => props.onChange(e.target.value)} >
            { Place.getClosestCampi().map((c) =>
            {
              console.log(`selected value: ${props.value}`)
              return (
              <option key={c.id} value={c.campus} selected={c.campus === props.value}>
                  {c.campus}
              </option>
              )
            })
          }
        </select>
      </div>
    );
  };
  
  FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  };
  
  const PlaceProfileEdit = () => {
    const history = useHistory();
    const [name, setName] = useState(null);
    const [closestCampus, setClosestCampus] = useState(null);
    const [address, setAddress] = useState(null);
    const [description, setDescription] = useState(null);
    const [place, setPlace] = useState(new Place());
    const refUrl = useRef(null);
  
    const doUpdate = async () => {
      try {
        // Only update non-null values (where the state is not null, partial update)
        // Potentially partial update
        const requestBody = JSON.stringify({closestCampus, name, address, description, pictureOfThePlace: refUrl.current}, 
          (key, value) => {
          if (value !== null) { return value } else { return place[key] }
        });

        console.log(`Sending: ${requestBody}`)

        console.log(`Url: /places/${ placeId }`)

        const response = await api.put(`/places/${ placeId }`, requestBody);

        // debug
        console.log(response)
  
        // Get the returned user and update a new object.
        // const place = new Place(response.data);
        
  
        // Creation successfully worked --> navigate to the route /PlaceProfile
        history.push(`/placeProfile/${ placeId }`);
      } catch (error) {
        alert(`Something went wrong during the update: \n${handleError(error)}`);
      }
    };

    useEffect(() => {
      async function fetchData() {
            try {
                const response = await api.get(`/places/${ localStorage.getItem('loggedInUserId') }`);

                console.log("Called fetchData")
          
                // Get the returned user and update a new object.
                setPlace(new Place(response.data[0]));
                 
                // Creation successfully worked --> navigate to the route /PlaceProfile
              } catch (error) {
                alert(`Something went wrong during the login: \n${handleError(error)}`);
              }
      }

      fetchData();

    }, []);

    useEffect(() => {
      refUrl.current = url
    }, [url])

    let { placeId } = useParams()

    // console.log(place)

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);

    const handleImageChange = (e) => {
      if (e.target.files[0]){
        setImage(e.target.files[0]);
      }
    };
    console.log(image);
    const handleSubmit = () => {
      const imageRef = ref(storage, `place/user-${localStorage.getItem('loggedInUserId')}`);
      uploadBytes(imageRef, image).then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch(error => {
            console.log(error.message, "error getting the image url");
          });
          setImage(null);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
  
    return (
      <BaseContainer>
        <div className = "placeedit return" >
          <Button
              className="placeedit placeedit-return-button"
              onClick={() => history.push(`/placeProfile/${placeId}`)}
          >
            Return
          </Button>
        </div>
        <div className="placeedit container">
          <div className="placeedit form">
            <FormField
              label="Name of Place:"
              defaultValue={place.name}
              // value={place.name}
              onChange={n => setName(n)}
            />
            <SelectField
              label="Nearest To:"
              value={place.closestCampus}
              onChange={nt => setClosestCampus(nt)}
            />
            <FormField
              label="Address:"
              defaultValue={place.address}
              onChange={ads => setAddress(ads)}
            />
            <FormField
              label="Description:"
              defaultValue={place.description}
              onChange={des => setDescription(des)}
            />
            <div className="placeedit button-container">
              <Button
                width="40%"
                onClick={() => doUpdate()}
              >
                Update
              </Button>
            </div>
          </div>
          <div className="placeedit form2">
            <div className = "placeedit title" >
              <h1> Place profile image</h1>
            </div>

            <Avatar
              className="placeedit picture"
              src={url}
              sx={{ width: 400, height: 370}}
              variant="square"
            />
            <div className = "placeedit selectfield" >
              <input type="file" onChange={handleImageChange}/>
            </div>

            <Button 
              className='placeedit image-button'
              onClick={handleSubmit}
              width="40%"
            >
              Upload Image
            </Button>
          </div>
        </div>
      </BaseContainer>
    );
  };


export default PlaceProfileEdit;