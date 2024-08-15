import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { Grid, Box, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';


const data = [];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PropertyPieChart = () => { 
    const {t, i18n} = useTranslation();

    const [propertyList, setPropertyList] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [typeList, setTypeList] = useState([]);

    const [tpyeChart, setTypeChart] = useState([]);
    const [statusChart, setStatusChart] = useState([]);

    const [render, setRender] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5041/api/Property/list')
        .then(response=>{
            if (response.status === 200) setPropertyList(response.data);
        })
        .catch(error => {
            console.error(error);
        });
        
        axios.get('http://localhost:5041/api/PropertyType/list')
        .then(response => {
            if (response.status === 200) setTypeList(response.data);
            // Generate chart data after both lists are set
            const chartData = response.data.map(type => ({
                name: type.name,
                value: propertyList.filter(property => property.propertyTypeName === type.name).length,
            }));
            setTypeChart(chartData);
            console.log("Type Chart: " , chartData)
        })
        .catch(error => {
            console.error(error);
        });

        axios.get('http://localhost:5041/api/PropertyStatus/list')
        .then(response => {
            if (response.status === 200) setStatusList(response.data);
            const chartData = response.data.map(type => ({
                name: type.name,
                value: propertyList.filter(property => property.propertyStatusName === type.name).length,
            }));
            setStatusChart(chartData);
            console.log("Status Chart: " , chartData)
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
          setRender(false);
        });

    },[render])


  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t("Property Type and Statuses Percentage")}
        </Typography>

        <Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              <PieChart width={450} height={450}>
                <Pie
                  data={tpyeChart}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {tpyeChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <PieChart width={450} height={450}>
                <Pie
                  data={statusChart}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Grid>
          </Grid>
        </Box>
    </Container> 
  );
};

export default PropertyPieChart;
