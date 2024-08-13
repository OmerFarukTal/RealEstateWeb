import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Paper, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import axios from 'axios';


const PropertyDetail = ({ property2, setDetailButtonClicked }) => {
  // Sample data
  
  const [propertyImages, setPropertyImages] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5041/api/PropertyImage?id=${property2.id}`)
    .then((response) => {
      console.log(response);
      const tempList = [];
      response.data.map((x) => {
        tempList.push(x.source);
      });
      setPropertyImages(tempList);
    })
    .catch((error) => {
      console.error(error);
    });

    console.log("Image source example ", propertyImages);
  }, []);
  

  const handleButtonClick = () => {
    console.log(typeof setDetailButtonClicked );
    setDetailButtonClicked(false);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {property2.name}
        </Typography>

        {/* Image Carousel */}
        <Carousel>
          {propertyImages.map((photo, index) => (
            <div>
               <img key={index} src={photo} alt={`Property ${index}`} style={{ width: '100%', height: 'auto' }} />
            </div>
           
          ))}
        </Carousel>
        

        {/* Description */}
        <Typography variant="body1" sx={{ mt: 2 }}>
          {property2.description}
        </Typography>

        {/* Price */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Price: ${property2.price.toLocaleString()}
        </Typography>

        {/* Start and End Date */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            
          </Grid>
          <Grid item xs={6}>
           
          </Grid>
        </Grid>

        {/* Button to go back */}
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" onClick={() => handleButtonClick()}>
            Back to Listings
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default PropertyDetail;