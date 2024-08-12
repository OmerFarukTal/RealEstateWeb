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
} from '@mui/material'; // Assume this is a custom component for image upload
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PropertyImageUpload from './PropertyImageUpload'; // Assume this is a custom component for image upload
import { UserContext } from '../sign-components/UserContext';
import axios from 'axios';

export default function AddProperty() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [currency, setCurrency] = useState('');
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(0.0);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
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

}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    var userId = localStorage.getItem('user').id;
    const date = new Date();
    console.log("User id", localStorage.getItem('user').id);
    console.log("To be submitted",  {
        name: name,
        description: description,
        propertyTypeId: type,
        propertyStatusId: status,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        price: price,
        currencyId: currency,
        creatorId: user?.id,
        createdDate: date.toISOString()
    });

    axios.post(`http://localhost:5041/api/Property`, {
        name: name,
        description: description,
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

        images.map(x => {
          // Upload Images

          console.log("images = ", x);
          console.log(typeof x)

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
        });
        

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

        {/* PropertyImageUpload is a custom component that you will create for handling image uploads */}
      <PropertyImageUpload images={images} setImages={setImages} />

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
    </Box>
  );
}
