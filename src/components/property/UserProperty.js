import React, { useContext } from 'react';
import { Grid, Button, Container } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AddProperty from './AddProperty';
import { UserContext } from '../sign-components/UserContext';
import UserPropertyCard from './UserPropertyCard';

const dummyProperty = {
    name : "naber",
    id : 999,
    creatorName : "emre",
    price: 999.999,
    currencyName : "Türk Lirası"

}


const UserProperty = () => {
    const [properties, setProperties] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [addPropertyButtonClicked, setAddPropertyButtonClicked] = useState(false);
    const pageSize = 3;
    const {user} = useContext(UserContext);
    console.log("USER ID", user?.id);
    useEffect(() => {
        axios.get(`http://localhost:5041/api/UserProperty?userId=${user?.id}`)
        .then((response) => {
            
            if (response.status === 200) {
                setTotalPage(Math.floor(response.data.length / pageSize) + 1 )
            }
        })
        .catch((error) => {
            console.error(error);
        });

    });

    useEffect(() => {
        axios.get(`http://localhost:5041/api/Property/page?userId=${user?.id}&page=${page}&pageSize=${pageSize}`)
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                setProperties(response.data);
            }
        })
        .catch((error) => {
            console.error(error);
        });

    }, [page]);

    const handlePrevPage = () => {
        if (page=== 1) setPage(1);
        else setPage(page-1);
    }

    const handleNextPage = () => {
        if (page === totalPage) setPage(page);
        else setPage(page + 1);
    }

    const handleAddProperty = (event) => { 
        event.preventDefault();
        setAddPropertyButtonClicked(!addPropertyButtonClicked);       
    }

    if (addPropertyButtonClicked) {
        return <Container>
            <AddProperty/>
            <Button variant='contained' onClick={(event) => handleAddProperty(event)}>My Properties</Button>
        </Container>
        
    }
    else {
        return <Container>
        <Grid container spacing={4}>
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <UserPropertyCard property={property} />
            </Grid>
          ))}
          
          <Button variant='contained' onClick={(event) => handleAddProperty(event)}>Add Property</Button>
          
          
        </Grid>
        <Button variant="contained" onClick={handlePrevPage}>
              Prev
          </Button>
          <Button variant="contained" onClick={handleNextPage}>
              Next
          </Button>
  
      </Container>
    }
    
};

export default UserProperty;
