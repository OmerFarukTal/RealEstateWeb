import React from 'react';
import { Grid, Button, Container } from '@mui/material';
import PropertyCard from './PropertyCard';
import axios from 'axios';
import { useState, useEffect } from 'react';

const RealEstateList = () => {
    const [properties, setProperties] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const pageSize = 3;

    useEffect(() => {
        axios.get("http://localhost:5041/api/Property/list")
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
        axios.get(`http://localhost:5041/api/Property/page?page=${page}&pageSize=${pageSize}`)
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



  return (
    <Container>
      <Grid container spacing={4}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <PropertyCard property={property} />
          </Grid>
        ))}
        
      </Grid>
      <Button variant="contained" onClick={handlePrevPage}>
            Prev
        </Button>
        <Button variant="contained" onClick={handleNextPage}>
            Next
        </Button>
    </Container>
  );
};

export default RealEstateList;
