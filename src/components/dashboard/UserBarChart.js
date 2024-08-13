import { Box, Grid } from '@mui/material';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const data = [
  { name: '8 AM', residential: 5, commercial: 2 },
  { name: '10 AM', residential: 10, commercial: 3 },
  { name: '12 PM', residential: 8, commercial: 4 },
  { name: '2 PM', residential: 7, commercial: 6 },
  { name: '4 PM', residential: 4, commercial: 1 },
  { name: '6 PM', residential: 6, commercial: 2 },
];

const UserBarChart = () => {
  return (
    <Box>
        <Grid container spacing={2} justifyContent="center">
            <BarChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="residential" fill="#8884d8" />
                <Bar dataKey="commercial" fill="#82ca9d" />
            </BarChart>
        </Grid>
    </Box>
    
  );
};

export default UserBarChart;
