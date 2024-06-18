// src/components/VerificationPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const VerificationPage = () => {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerify = async () => {
    setLoading(true);
    setError('');
    try {
      const docRef = doc(db, 'certificates', certificateNumber);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCertificateData(docSnap.data());
      } else {
        setError('Certificate not found');
      }
    } catch (err) {
      setError('Error fetching certificate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h1">Certificate Verification</Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Enter Certificate Number"
          value={certificateNumber}
          onChange={(e) => setCertificateNumber(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerify}
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Verify'}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/login')}
          fullWidth
          sx={{ mt: 2 }}
        >
          Admin Login
        </Button>
        {certificateData && (
          <Box mt={3} p={2} bgcolor="limegreen" color="white">
            <Typography>Certificate is valid and issued by our company.</Typography>
          </Box>
        )}
        {error && (
          <Box mt={3} p={2} bgcolor="red" color="white">
            <Typography>{error}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default VerificationPage;
