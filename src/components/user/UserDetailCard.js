import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Paper, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import dayjs from 'dayjs';
import axios from 'axios';


const UserDetailCard = ({ property2, setDetailButtonClicked }) => {
  // Sample data
  const [user, setUser] = useState(null);
 
  useEffect(() => {
    axios.get(`http://localhost:5041/api/Property/raw?id=${property2.id}`)
    .then((response) => {
      
      if (response.status === 200) {
        console.log("Debug", response.status)
        axios.get(`http://localhost:5041/api/User?id=${response.data.creatorId}`)
        .then(r2 => {
          console.log("Debug 2 ", r2.status);
          setUser(r2.data);
          console.log("Debug 3 ", r2.data);

        })
      }
    })
    .catch((error) => {
      console.error(error);
    });

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

        {/* Creator */}
        <Typography variant="h5" sx={{ mt: 2 }}>
          {property2.creatorName}
        </Typography>

        <Typography variant="h5" sx={{ mt: 2 }}>
          {user?.email}
        </Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>
          {user?.roleName}
        </Typography>

        


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

export default UserDetailCard;