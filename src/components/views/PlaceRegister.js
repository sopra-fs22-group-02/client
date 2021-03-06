import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import Place from 'models/Place';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import {Box} from 'components/ui/Box';
import 'styles/views/PlaceRegister.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { storage } from 'helpers/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/material/Avatar";

const FormField = props => {
    return (
      <div className="placeregister field">
        <Box
            className="placeregister box"
            value={props.label}
        />
        <input
          className="placeregister input"
          placeholder="enter here.."
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      </div>
    );
  };

const FormFieldAddress = props => {
  return (
      <div className="placeregister field">
        <Box
            className="placeregister box"
            value={props.label}
        />
        <input
            className="placeregister input"
            placeholder="e.g.: Binzmühlestrasse 14"
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
        />
      </div>
  );
};

  const SelectField = props => {
    return (
      <div className="placeregister field">
        <Box
            className="placeregister box"
            value={props.label}
        />
        <select className="placeregister select" onChange={(e) => props.onChange(e.target.value)}>
          <option value="" >None selected</option>
            { Place.getClosestCampi().map((c) =>
              (<option key={c.id} value={c.campus}>{c.campus}</option>)
            )}
        </select>
      </div>
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
    const [closestCampus, setClosestCampus] = useState(null);
    const [address, setAddress] = useState(null);
    const [description, setDescription] = useState(null);
  
    const doRegister = async () => {
      try {
        const requestBody = JSON.stringify({providerId: localStorage.getItem('loggedInUserId'), 
          closestCampus, 
          name, 
          address, 
          description,
          pictureOfThePlace: url
        });
        const response = await api.post('/places', requestBody);
  
        // Get the returned user and update a new object.
        const place = new Place(response.data);

        console.log(response.data);
        localStorage.setItem('placeIdOfLoggedInUser', place.placeId)
        // Creation successfully worked --> navigate to the route /PlaceProfile
        history.push(`/PlaceProfile/${place.placeId}`);
      } catch (error) {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
      alert(`You have successfully created a new place!  Now you can offer time slots for this place.`)
    };
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
      // -place-${localStorage.getItem('placeIdOfLoggedInUser')}
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
      <BaseContainer alerts={[{message:"Please create place with real address, otherwise it will not be displayed in the map!", severity:"info"}]}>
        <div className = "placeregister return" >
          <Button
              className="placeregister placeregister-return-button"
              onClick={() => history.push('/home')}
          >
            Return
          </Button>
        </div>
        <div className="placeregister container">
          <div className="placeregister form">
            <FormField
              label="Name of Place:"
              value={name}
              onChange={n => setName(n)}
            />
            <SelectField
              label="Nearest To:"
              value={closestCampus}
              onChange={nt => setClosestCampus(nt)}
            />
            {/* <FormField
              label="Nearest To"
              value={closestCampus}
              onChange={nt => setClosestCampus(nt)}
            /> */}
            <FormFieldAddress
              label="Address:"
              value={address}
              onChange={ads => setAddress(ads)}
            />
            <FormField
              label="Description:"
              value={description}
              onChange={des => setDescription(des)}
            />
            <div className="placeregister button-container">
              <Button
                disabled={!closestCampus || !name || !address}
                width="40%"
                onClick={() => doRegister()}
              >
                Create
              </Button>
            </div>
          </div>
          <div className="placeregister form2">
            <div className = "placeregister title" >
              <h1> Place profile image</h1>
            </div>
            <Avatar
              className="placeregister picture"
              src={url}
              sx={{ width: 400, height: 370}}
              variant="square"
            />
            <div className = "placeregister selectfield" >
              <input type="file" onChange={handleImageChange}/>
            </div>
            <Button 
              className='placeregister image-button'
              width="40%"
              onClick={handleSubmit}
            >
              Upload Image
            </Button>
          </div>
        </div>
      </BaseContainer>
    );
  };


export default PlaceRegister;