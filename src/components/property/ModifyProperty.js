import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PropertyImageUpload from './PropertyImageUpload'; 
import PropertyImageUploadCopy from './PropertyImageUploadCopy';
import { UserContext } from '../sign-components/UserContext';
import axios from 'axios';
import dayjs from 'dayjs';
import Carousel from 'react-material-ui-carousel';

const convertToBase64 = (file) => {
  console.log(file); // Log the file to verify it's a File object
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default function ModifyProperty({propertyToBeModified, setModifyButtonClicked}) {
  const [name, setName] = useState('');
  const [address, setAddress ] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [currency, setCurrency] = useState('');
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(0.0);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const [rawProperty, setRawProperty] = useState(null);
  const [oldImages, setOldImages] = useState([]);


  const [propertyStatuses, setPropertyStatuses] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const {user} = useContext(UserContext);
  const [addedPropertyId, setAddedPropertyId] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5041/api/PropertyStatus/list")
    .then((response) => {
        if (response.status === 200) {
            const propertyStatuses = response.data.map(element => ({
                value: element.id,  // Assuming each element has an 'id' property
                label: element.name, // Assuming each element has a 'name' property
            }));
            setPropertyStatuses(propertyStatuses);
        }
    })
    .catch((error) => {
        console.error(error);
    });
    axios.get("http://localhost:5041/api/PropertyType/list")
    .then((response) => {
        if (response.status === 200) {
            const propertyTypes = response.data.map(element => ({
                value: element.id,  // Assuming each element has an 'id' property
                label: element.name, // Assuming each element has a 'name' property
            }));
            setPropertyTypes(propertyTypes);
        }
    })
    .catch((error) => {
        console.error(error);
    });
    axios.get("http://localhost:5041/api/Currency/list")
    .then((response) => {
        if (response.status === 200) {
            const currencies = response.data.map(element => ({
                value: element.id,  // Assuming each element has an 'id' property
                label: element.name, // Assuming each element has a 'name' property
            }));
            setCurrencies(currencies);
            console.log("Currencies", currencies)
        }
    })
    .catch((error) => {
        console.error(error);
    });


    axios.get(`http://localhost:5041/api/Property/raw?id=${propertyToBeModified.id}`)
    .then((response) => {
        if (response.status === 200) {
          setName(response.data.name);
          setAddress(response.data.adress);
          setPrice(response.data.price);
          setDescription(response.data.description);
          setStatus(response.data.propertyStatusId);
          setType(response.data.propertyTypeId);
          setCurrency(response.data.currencyId);
          setStartDate(dayjs(response.data.startDate));
          setEndDate(dayjs(response.data.endDate));

          setRawProperty(response.data);
        }
    })
    .catch((error) => {
        console.error(error);
    });


    axios.get(`http://localhost:5041/api/PropertyImage?id=${propertyToBeModified.id}`)
    .then((response) => {
        if (response.status === 200) {
          console.log(response);
          const tempList = [];
          response.data.map((x) => {
            tempList.push({source: `http://localhost:5041${x.source}`, id: x.id });
          });
          setOldImages(tempList);
        }
    })
    .catch((error) => {
        console.error(error);
    });

}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    var userId = localStorage.getItem('user').id;
    const date = new Date();
    console.log("User id", localStorage.getItem('user').id);
    console.log("To be submitted",  {
      id: propertyToBeModified.id,
      name: name,
      description: description,
      adress: address,
      latitude: rawProperty.latitude,
      longitude: rawProperty.longitude,
      propertyTypeId: type,
      propertyStatusId: status,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      price: price,
      currencyId: currency,
      creatorId: user?.id,
      createdDate: date.toISOString()
    });

    axios.put(`http://localhost:5041/api/Property`, {
        id: propertyToBeModified.id,
        name: name,
        description: description,
        adress: address,
        latitude: rawProperty.latitude,
        longitude: rawProperty.longitude,
        propertyTypeId: type,
        propertyStatusId: status,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        price: price,
        currencyId: currency,
        creatorId: user?.id,
        createdDate: date.toISOString()
    })
    .then((response) => {
        console.log(response);
        setAddedPropertyId(response.data.id)
        console.log("Added property id ", addedPropertyId);

        //
        oldImages.forEach(image => {
          axios.delete(`http://localhost:5041/api/Image?id=${image.id}`);
        })

        images.forEach(async (image) => {
          const base64Image = await convertToBase64(image);
        
          const payload = {
            propertyId: response.data.id,
            name: "dummy_string",
            source: base64Image,
          };
        
          axios.post('http://localhost:5041/api/Image/upload', payload)
            .then((response) => {
              console.log('Image uploaded:', response.data);
            })
            .catch((error) => {
              console.error('Error uploading image:', error);
            });
        });
        //
        

        /*images.map(x => {
          // Upload Images

          console.log("images = ", x);
          console.log(typeof x);

          axios.post(`http://localhost:5041/api/Image`, {
            name: "string",
            source: x,
            propertyId: response.data.id
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        });*/
        

    })
    .catch((error) => {
        console.error(error);
    });

  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add New Property
      </Typography>
      
      <Carousel>
        {oldImages.map((photo, index) => (
          <div>
              <img key={index} src={photo.source} alt={`Property ${index}`} style={{ width: '100%', height: 'auto' }} />
          </div>
          
        ))}
      </Carousel>



        {/* PropertyImageUpload is a custom component that you will create for handling image uploads */}
      <PropertyImageUploadCopy images={images} setImages={setImages} />

      <TextField
        label="Name"
        fullWidth
        multiline
        rows={1}
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Address"
        fullWidth
        multiline
        rows={1}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Description"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Price"
        fullWidth
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
        inputProps={{ step: "any" }}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
        >
          {propertyStatuses.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Types</InputLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          label="Type"
        >
          {propertyTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Currencies</InputLabel>
        <Select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          label="Currency"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} sx={{ mb: 2 }} />}
        />
            
        <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} sx={{ mb: 2 }} />}
        />
      </LocalizationProvider>
      

      

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>

      {/* Button to go back */}
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={() => setModifyButtonClicked(false)}>
          Back to Listings
        </Button>
      </Box>

    </Box>
  );
}
