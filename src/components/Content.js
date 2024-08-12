import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import axios from 'axios'

export default function Content() {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyStatuses, setPropertyStatuses] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const [currencyName, setCurrencyName] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");

  const [propertyStatusName, setPropertyStatusName] = useState("");
  const [propertyTypeName, setPropertyTypeName] = useState("");

  const [reloadDashboard, setReloadDashboard] = useState(true);


  useEffect(() => {
    // Fetch the real estate types from the API
    axios.get('http://localhost:5041/api/PropertyType/list')
    .then(response => {
      if (response.status === 200) {
        setPropertyTypes(response.data);
      }
    })
    .catch(error => {
      console.error('There was an error fetching the real estate types!', error);
    });

    axios.get('http://localhost:5041/api/PropertyStatus/list')
    .then((response) => {
      if (response.status === 200) {
        setPropertyStatuses(response.data);
      }
    })
    .catch(error => {
      console.error(error);
    });

    axios.get('http://localhost:5041/api/Currency/list')
    .then((response) => {
      if (response.status === 200) {
        setCurrencies(response.data);    
      }
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      setReloadDashboard(false);
    });

  }, [reloadDashboard]);

  const handleAddType = () => {
    axios.post('http://localhost:5041/api/PropertyType', {
      name: propertyTypeName
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setReloadDashboard(true);
      setPropertyTypeName("");
    });
  }

  const handleDeleteType = (event, typeId) => {
    event.preventDefault();
    axios.delete(`http://localhost:5041/api/PropertyType?id=${typeId}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setReloadDashboard(true);
    });
  }


  const handleAddStatus = () => {
    axios.post('http://localhost:5041/api/PropertyStatus', {
      name: propertyStatusName
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setReloadDashboard(true);
      setPropertyStatusName("");
    });
  }

  const handleDeleteStatus = (event, statusId) => {
    event.preventDefault();
    axios.delete(`http://localhost:5041/api/PropertyStatus?id=${statusId}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setReloadDashboard(true);
    });
  }


  const handleAddCurrency = () => {
    axios.post('http://localhost:5041/api/Currency', {
      name: currencyName,
      code: currencyCode
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setReloadDashboard(true);
      setCurrencyCode("");
      setCurrencyName("");
    });
  }

  const handleDeleteCurrency = (event, currencyId) => {
    event.preventDefault();
    axios.delete(`http://localhost:5041/api/Currency?id=${currencyId}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setReloadDashboard(true);
    });
  }
  


  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard - Property Types
        </Typography>

        <Paper sx={{ p: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {propertyTypes.map((type) => (
                  <TableRow key={type.id}>
                    <TableCell>{type.id}</TableCell>
                    <TableCell>{type.name}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" size="small">
                        Edit
                      </Button>
                      <Button variant="contained" color="secondary" size="small" sx={{ ml: 2 }} onClick={(event) => handleDeleteType(event, type.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow key={999}>
                    <TableCell>{999}</TableCell>
                    <TableCell>
                      <TextField
                        value={propertyTypeName}
                        onChange={(e) => setPropertyTypeName(e.target.value)}
                        placeholder="Enter Name"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" size="small" onClick={handleAddType}>
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>       
        

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard - Property Status
        </Typography>

        <Paper sx={{ p: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {propertyStatuses.map((type) => (
                  <TableRow key={type.id}>
                    <TableCell>{type.id}</TableCell>
                    <TableCell>{type.name}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" size="small">
                        Edit
                      </Button>
                      <Button variant="contained" color="secondary" size="small" sx={{ ml: 2 }} onClick={(event) => handleDeleteStatus(event, type.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow key={999}>
                    <TableCell>{999}</TableCell>
                    <TableCell>
                      <TextField
                        value={propertyStatusName}
                        onChange={(e) => setPropertyStatusName(e.target.value)}
                        placeholder="Enter Name"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" size="small" onClick={handleAddStatus}>
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container> 

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard - Currencies
        </Typography>

        <Paper sx={{ p: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currencies.map((type) => (
                  <TableRow key={type.id}>
                    <TableCell>{type.id}</TableCell>
                    <TableCell>{type.name}</TableCell>
                    <TableCell>{type.code}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" size="small">
                        Edit
                      </Button>
                      <Button variant="contained" color="secondary" size="small" sx={{ ml: 2 }}  onClick={(event) => handleDeleteCurrency(event, type.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                  <TableRow key={999}>
                    <TableCell>{999}</TableCell>
                    <TableCell>
                      <TextField
                        value={currencyName}
                        onChange={(e) => setCurrencyName(e.target.value)}
                        placeholder="Enter Name"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={currencyCode}
                        onChange={(e) => setCurrencyCode(e.target.value)}
                        placeholder="Enter Code"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" size="small" onClick={handleAddCurrency}>
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container> 


      </AppBar>
    </Paper>
  );
}