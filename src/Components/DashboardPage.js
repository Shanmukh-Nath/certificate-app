// src/components/DashboardPage.js
import React from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h1">Dashboard</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/upload')}
          fullWidth
          sx={{ mt: 2 }}
        >
          Upload Data
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/certificates')}
          fullWidth
          sx={{ mt: 2 }}
        >
          View Data
        </Button>
      </Box>
    </Container>
  );
};

export default DashboardPage;
