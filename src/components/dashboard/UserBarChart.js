import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const UserBarChart = () => {
  const {t, i18n} = useTranslation();

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch data from your Web API
    axios.get('http://localhost:5041/api/Property/list')
      .then(response => {
        const properties = response.data;
        // Process the data
        const groupedData = groupPropertiesByDate(properties);
        setChartData(groupedData);
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
      });
  }, []);

  // Function to group properties by creation date
  const groupPropertiesByDate = (properties) => {
    const grouped = properties.reduce((acc, property) => {
      const date = new Date(property.createdDate).toLocaleDateString();
      console.log("Valid date : ", property.createdDate); // Format date as needed
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {});

    // Convert the grouped object into an array for the chart
    return Object.keys(grouped).map(date => ({
      name: date,
      count: grouped[date],
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t("Daily Property Added")}
        </Typography>

        <Box>
            <Grid container spacing={2} justifyContent="center">
                <BarChart width={600} height={300} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </Grid>
        </Box>

    </Container>

    
  );
};

export default UserBarChart;
