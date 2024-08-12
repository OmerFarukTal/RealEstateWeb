import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropertyDetail from './PropertyDetail';


const PropertyCard = ({ property }) => {
  const navigate = useNavigate("");
  const [detailButtonClicked, setDetailButtonClicked] = useState(false);

  const handleButtonClick = (event, id) => {
    event.preventDefault();
    setDetailButtonClicked(true);
  };

  if (detailButtonClicked) {
    return <PropertyDetail
      property2={property}
      setDetailButtonClicked={setDetailButtonClicked}
    />
  }
  else {
    return (
      <Card>
        <CardMedia
          component="img"
          height="200"
        />
        <CardContent>
          <Typography variant="h5" component="div">
            PROPERTY ID = {property.id}
            {property.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Dummy Address
          </Typography>
          <Typography variant="body2" color="text.secondary">
              {property.creatorName}
          </Typography>
          <Typography variant="h6" component="div" color="text.primary">
            {property.price} {property.currencyName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Dummy Description
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" 
            color="primary" 
            onClick={(event) => handleButtonClick(event, property.id)}>View Details</Button>
          <Button size="small">Contact Agent</Button>
        </CardActions>
      </Card>
    );
  }


  
};

export default PropertyCard;
