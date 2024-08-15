import React, { useState, useEffect } from 'react';
import { Grid, Button, Container, Select, MenuItem, TextField } from '@mui/material';
import PropertyCard from './PropertyCard';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const PropertySelective = () => {
    const {t, i18n} = useTranslation();

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

    // Fetch total pages for pagination
    useEffect(() => {
        axios.get("http://localhost:5041/api/Property/page?page=1&pageSize=2")
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

    // Fetch properties with filters and pagination
    useEffect(() => {
        const params = new URLSearchParams({
            page,
            pageSize,
            propertyType,
            startDate: startDate ? startDate.toISOString() : '',
            endDate: endDate ? endDate.toISOString() : ''
        }).toString();

        axios.get(`http://localhost:5041/api/Property/pageSelective?page=${page}&pageSize=${pageSize}&propertyTypeId=${propertyType}&propertyStatusId=${propertyStatus}&currencyId=${currency}&lowerBoundMoney=${lowerPrice}&upperBoundMoney=${upperPrice}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
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
        if (page > 1) setPage(page - 1);
    }

    const handleNextPage = () => {
        if (page < totalPage) setPage(page + 1);
    }

    return (
        <Container>
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
                            <em>{t('All Types')}</em>
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
                            <em>{t('All Statuses')}</em>
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
                            <em>{t('All Currencies')}</em>
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
                        label={t("Lower Price")}
                        type="number"
                        value={lowerPrice}
                        onChange={(e) => setLowerPrice(e.target.value)}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label={t("Upper Price")}
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
                            label={t("Start Date")}
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </Grid>
                    {/* End Date Filter */}
                    <Grid item xs={12} sm={6} md={6}>
                        <DatePicker
                            label={t("End Date")}
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
                        <PropertyCard property={property} />
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                <Grid item>
                    <Button variant="contained" onClick={handlePrevPage} disabled={page === 1}>
                        Prev
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleNextPage} disabled={page === totalPage}>
                        Next
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PropertySelective;
