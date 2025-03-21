import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropertyDetail from './PropertyDetail';
import axios from 'axios';
import ModifyProperty from './ModifyProperty';
import { useTranslation } from 'react-i18next';

const UserPropertyCard = ({ property }) => {
  const {t, i18n} = useTranslation();

  const navigate = useNavigate("");
  const [detailButtonClicked, setDetailButtonClicked] = useState(false);
  const [modifyButtonClicked, setModifyButtonClicked] = useState(false);
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

  const handleModifyButtonClick = (event, id) => {
    event.preventDefault();
    setModifyButtonClicked(true);
  };

  const handleDeleteButtonClick = (event, id) => {
    event.preventDefault();
    
    axios.delete(`http://localhost:5041/api/Property?id=${id}`)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
  }


  if (modifyButtonClicked) {
    return   <Card>
      <ModifyProperty
      propertyToBeModified={property}
      setModifyButtonClicked={setModifyButtonClicked}
      />
      </Card>
      
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
          <Button variant="outlined" 
            color="primary" 
            onClick={(event) => setModifyButtonClicked(true)}>{t("Edit Property")}</Button>
          <Button variant="outlined" 
            color="primary" 
            onClick={(event) => handleDeleteButtonClick(event, property.id)}>{t("Delete Property")}</Button>   
        </CardActions>
      </Card>
    );
  }


  
};

export default UserPropertyCard;
