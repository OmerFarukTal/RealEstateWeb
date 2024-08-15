import React from 'react';
import { useTranslation } from 'react-i18next';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const SignHeader = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
        </Typography>
        <Button color="inherit" onClick={() => changeLanguage('en')}>
          English
        </Button>
        <Button color="inherit" onClick={() => changeLanguage('tr')}>
          Türkçe
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default SignHeader;
