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




function RoleTable() {
  const {t, i18n} = useTranslation();

    const [roles, setRoles] = useState([]);
    const [roleName, setRoleName] = useState("");
  
    const [reloadDashboard, setReloadDashboard] = useState(true);

    useEffect(() => {
        // Fetch the real estate types from the API
        axios.get('http://localhost:5041/api/Role/list')
        .then(response => {
          if (response.status === 200) {
            setRoles(response.data);
          }
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setReloadDashboard(false);
        });
    
      }, [reloadDashboard]);      
    
      const handleAddRole = () => {
        axios.post('http://localhost:5041/api/Role', {
          name: roleName
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setReloadDashboard(true);
          setRoleName("");
        });
      }
    
      const handleDeleteRole = (event, currencyId) => {
        event.preventDefault();
        axios.delete(`http://localhost:5041/api/Role?id=${currencyId}`)
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
          {t("All Roles")}
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
                {roles.map((type) => (
                  <TableRow key={type.id}>
                    <TableCell>{type.id}</TableCell>
                    <TableCell>{type.name}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" size="small">
                        Edit
                      </Button>
                      <Button variant="contained" color="secondary" size="small" sx={{ ml: 2 }} onClick={(event) => handleDeleteRole(event, type.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow key={999}>
                    <TableCell>{999}</TableCell>
                    <TableCell>
                      <TextField
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        placeholder="Enter Name"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" size="small" onClick={handleAddRole}>
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

export default RoleTable;