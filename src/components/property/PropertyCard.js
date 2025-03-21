import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropertyDetail from './PropertyDetail';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import UserDetailCard from '../user/UserDetailCard';

const PropertyCard = ({ property }) => {
  const {t, i18n} = useTranslation();
  
  const navigate = useNavigate("");
  const [detailButtonClicked, setDetailButtonClicked] = useState(false);
  const [contactButtonClicked, setContactButtonClicked] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5041/api/PropertyImage?id=${property.id}`)
    .then((response) => {
      console.log(response);
      const tempList = [];
      response.data.map((x) => {
        tempList.push(`http://localhost:5041${x.source}`);
      });
      setThumbnailImage(tempList);
    })
    .catch((error) => {
      console.error(error);
    });

  }, []);


  const handleButtonClick = (event, id) => {
    event.preventDefault();
    setDetailButtonClicked(true);
  };

  const handleContactButton = (event, id) => {
    event.preventDefault();
    setContactButtonClicked(true);
  };

  if (contactButtonClicked) {
    return <UserDetailCard
      property2={property}
      setDetailButtonClicked={setContactButtonClicked}
    />
  }

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
          src={thumbnailImage[0]}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {property.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {property.adress}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {property.creatorName}
          </Typography>
          <Typography variant="h6" component="div" color="text.primary">
            {property.price} {property.currencyName}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" 
            color="primary" 
            onClick={(event) => handleButtonClick(event, property.id)}>{t("View Details")}</Button>
          <Button size="small"
            onClick={(event) => handleContactButton(event, property.id)}
          >{t("Contact Agent")}</Button>
        </CardActions>
      </Card>
    );
  }


  
};

export default PropertyCard;
