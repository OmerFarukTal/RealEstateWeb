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

export default function TranslationTable() {
  const [translation, setTranslation] = useState([]);

  const [translationKey, setTranslationKey] = useState("");
  const [translationTr, setTranslationTr] = useState("");
  const [translationEn, setTranslationEn] = useState("");

  const [reloadDashboard, setReloadDashboard] = useState(true);


  useEffect(() => {
    // Fetch the real estate types from the API
    axios.get('http://localhost:5041/api/Translation/list')
    .then(response => {
      if (response.status === 200) {
        setTranslation(response.data);
      }
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
        setReloadDashboard(false);
    });

  }, [reloadDashboard]);
 

  const handleAddTranslation = () => {
    axios.post('http://localhost:5041/api/Translation', {
      key: translationKey,
      en: translationEn,
      tr: translationTr
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setReloadDashboard(true);
      setTranslationKey("");
      setTranslationEn("");
      setTranslationTr("");
    });
  }

  const handleDeleteTranslation = (event, currencyId) => {
    event.preventDefault();
    axios.delete(`http://localhost:5041/api/Translation?id=${currencyId}`)
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
          Admin Dashboard - Translation
        </Typography>

        <Paper sx={{ p: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Key</TableCell>
                  <TableCell>TR</TableCell>
                  <TableCell>EN</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {translation.map((type) => (
                  <TableRow key={type.id}>
                    <TableCell>{type.id}</TableCell>
                    <TableCell>{type.key}</TableCell>
                    <TableCell>{type.tr}</TableCell>
                    <TableCell>{type.en}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" size="small">
                        Edit
                      </Button>
                      <Button variant="contained" color="secondary" size="small" sx={{ ml: 2 }} onClick={(event) => handleDeleteTranslation(event, type.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow key={999}>
                    <TableCell>{999}</TableCell>
                    <TableCell>
                      <TextField
                        value={translationKey}
                        onChange={(e) => setTranslationKey(e.target.value)}
                        placeholder="Enter Key"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={translationEn}
                        onChange={(e) => setTranslationEn(e.target.value)}
                        placeholder="Enter EN"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={translationTr}
                        onChange={(e) => setTranslationTr(e.target.value)}
                        placeholder="Enter Tr"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" size="small" onClick={handleAddTranslation}>
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