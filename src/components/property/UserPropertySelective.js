import React, { useContext } from 'react';
import { Grid, Button, Container, Select, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AddProperty from './AddProperty';
import { UserContext } from '../sign-components/UserContext';
import UserPropertyCard from './UserPropertyCard';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


const UserPropertySelective = () => {
    const [properties, setProperties] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const pageSize = 3;

    // State variables for filters
    const [propertyType, setPropertyType] = useState(0);
    const [propertyTypeList, setPropertyTypeList] = useState([]);
    
    const [propertyStatus, setPropertyStatus] = useState(0);
    const [propertyStatusList, setPropertyStatusList] = useState([]);

    const [currency, setCurrency] = useState(0);
    const [currencyList, setCurrencyList] = useState([]);

    const [lowerPrice, setLowerPrice] = useState(-1);
    const [upperPrice, setUpperPrice] = useState(-1);

    const [startDate, setStartDate] = useState(dayjs("1900-01-01"));
    const [endDate, setEndDate] = useState(dayjs("2099-01-01"));


    const [addPropertyButtonClicked, setAddPropertyButtonClicked] = useState(false);
    const {user} = useContext(UserContext);
    console.log("USER ID", user?.id);


    useEffect(() => {
        axios.get(`http://localhost:5041/api/UserProperty/page?userId=${user?.id}&page=1&pageSize=2`)
        .then((response) => {
            
            if (response.status === 200) {
                setProperties(response.data);
            }
        })
        .catch((error) => {
            console.error(error);
        });

        axios.get("http://localhost:5041/api/PropertyType/list")
        .then(response => {
            setPropertyTypeList(response.data);
        });

        axios.get("http://localhost:5041/api/PropertyStatus/list")
        .then(response => {
            setPropertyStatusList(response.data);
        });

        axios.get("http://localhost:5041/api/Currency/list")
        .then(response => {
            setCurrencyList(response.data);
        });

    }, []);

    useEffect(() => {
        axios.get(`http://localhost:5041/api/UserProperty/pageSelective?userId=${user?.id}&page=${page}&pageSize=${pageSize}&propertyTypeId=${propertyType}&propertyStatusId=${propertyStatus}&currencyId=${currency}&lowerBoundMoney=${lowerPrice}&upperBoundMoney=${upperPrice}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                setProperties(response.data.list);
                setTotalPage(response.data.totalLength);
            }
        })
        .catch((error) => {
            console.error(error);
        });

    }, [page, propertyType, propertyStatus, currency, lowerPrice, upperPrice, startDate, endDate]);

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
        <Grid container spacing={4} sx={{ mb: 4 }}>
                {/* Property Type Filter */}
                <Grid item xs={12} sm={6} md={4}>
                    <Select
                        fullWidth
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        label="Property Type"
                        displayEmpty
                    >
                        <MenuItem value={0}>
                            <em>All Types</em>
                        </MenuItem>
                        {propertyTypeList.map((type) => (
                            <MenuItem key={type.id} value={type.id}>
                                {type.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>

                {/* Property Sttatus Filter */}
                <Grid item xs={12} sm={6} md={4}>
                    <Select
                        fullWidth
                        value={propertyStatus}
                        onChange={(e) => setPropertyStatus(e.target.value)}
                        label="Property Status"
                        displayEmpty
                    >
                        <MenuItem value={0}>
                            <em>All Status</em>
                        </MenuItem>
                        {propertyStatusList.map((status) => (
                            <MenuItem key={status.id} value={status.id}>
                                {status.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>

                {/* Currency Filter */}
                <Grid item xs={12} sm={6} md={4}>
                    <Select
                        fullWidth
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        label="Currency"
                        displayEmpty
                    >
                        <MenuItem value={0}>
                            <em>All Currencies</em>
                        </MenuItem>
                        {currencyList.map((curr) => (
                            <MenuItem key={curr.id} value={curr.id}>
                                {curr.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Lower Price"
                        type="number"
                        value={lowerPrice}
                        onChange={(e) => setLowerPrice(e.target.value)}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Upper Price"
                        type="number"
                        value={upperPrice}
                        onChange={(e) => setUpperPrice(e.target.value)}
                        fullWidth
                    />
                </Grid>
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* Start Date Filter */}
                    <Grid item xs={12} sm={6} md={6}>
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </Grid>
                    {/* End Date Filter */}
                    <Grid item xs={12} sm={6} md={6}>
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </Grid>

                </LocalizationProvider>
                
                
            </Grid>

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

export default UserPropertySelective;
