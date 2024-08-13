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
import RoleTable from './dashboard/RoleTable';
import PropertyStatusTable from './dashboard/PropertyStatusTable';
import PropertyTypeTable from './dashboard/PropertyTypeTable';
import CurrencyTable from './dashboard/CurrencyTable';
import TranslationTable from './dashboard/TranslationTable';
import PropertyPieChart from './dashboard/PropertyPieChart';
import UserBarChart from './dashboard/UserBarChart';

export default function Content() {
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
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
      
      <PropertyPieChart></PropertyPieChart>
      <UserBarChart></UserBarChart>
      <RoleTable></RoleTable>
      <PropertyStatusTable></PropertyStatusTable>
      <PropertyTypeTable></PropertyTypeTable>
      <CurrencyTable></CurrencyTable>
      <TranslationTable></TranslationTable>

      </AppBar>
    </Paper>
  );
}