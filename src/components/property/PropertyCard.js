import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, CardActions, Button } from '@mui/material';

const PropertyCard = ({ property }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
      />
      <CardContent>
        <Typography variant="h5" component="div">
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
        <Button size="small">View Details</Button>
        <Button size="small">Contact Agent</Button>
      </CardActions>
    </Card>
  );
};

export default PropertyCard;
