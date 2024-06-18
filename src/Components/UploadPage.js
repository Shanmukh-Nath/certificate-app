// src/components/UploadPage.js
import React, { useState } from 'react';
import { Container, Button, Typography, Box, CircularProgress } from '@mui/material';
import * as XLSX from 'xlsx';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        for (const item of json) {
          await addDoc(collection(db, 'certificates'), item);
        }

        alert('Data uploaded successfully');
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.error('Error uploading data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h1">Upload Certificate Data</Typography>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="upload-file"
        />
        <label htmlFor="upload-file">
          <Button
            variant="contained"
            component="span"
            fullWidth
          >
            Choose File
          </Button>
        </label>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Upload'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UploadPage;
