import React from 'react';
import styles from '../styles/Home.module.css';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={styles.header}>
          JaMMMing
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
