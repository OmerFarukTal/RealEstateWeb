import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
import { useTranslation } from 'react-i18next';


function CurrencyTable() {
    const {t, i18n} = useTranslation();

    const [currencies, setCurrencies] = useState([]);

    const [currencyName, setCurrencyName] = useState("");
    const [currencyCode, setCurrencyCode] = useState("");
  
    const [reloadDashboard, setReloadDashboard] = useState(true);

    useEffect(() => {
        // Fetch the real estate types from the API
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

  const handleEditCurrency = (event, idToEdit) => {
    event.preventDefault();
    console.log("BASILDIM");
    axios.put("http://localhost:5041/api/Currency", {
      id: idToEdit,
      name: currencyName,
      code: currencyCode
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t("All Currencies")}
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
                      <Button variant="contained" color="primary" size="small" onClick={(event) => handleEditCurrency(event, type.id)}>
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
      
    );
}

export default CurrencyTable;