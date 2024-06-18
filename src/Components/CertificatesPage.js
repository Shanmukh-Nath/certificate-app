// src/components/CertificatesPage.js
import React, { useEffect, useState } from 'react';
import { Container, TextField, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress } from '@mui/material';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const CertificatesPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'certificates'));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setCertificates(data);
      } catch (err) {
        console.error('Error fetching certificates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const filteredCertificates = certificates.filter((cert) =>
    cert.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h1">Issued Certificates</Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          margin="normal"
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Certificate Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Certificate Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCertificates.map((cert, index) => (
                <TableRow key={index}>
                  <TableCell>{cert.certificateNumber}</TableCell>
                  <TableCell>{cert.name}</TableCell>
                  <TableCell>{cert.certificateType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
    </Container>
  );
};

export default CertificatesPage;
