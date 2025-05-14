// src/pages/EditDriver.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField, Button, Box, Typography, Grid,
  Paper, Card, CardContent, Divider, Avatar
} from '@mui/material';
import { InsertDriveFile } from '@mui/icons-material';
import { updateDriver, viewDriverById } from '../../../../features/Driver/driverSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const EditDriver = () => {
  const navigate = useNavigate();
  const { driverId } = useParams();
  const dispatch = useDispatch();

  const { form: driverData, loading } = useSelector(state => state.drivers);

  const [form, setForm] = useState({
    firstName: '', middleName: '', lastName: '',
    contactNumber: '', email: '',
    address: '', state: '', city: '', district: '', pincode: '',
    idProof: '', idPhoto: '', driverPhoto: '', dlNumber: ''
  });

  useEffect(() => {
    dispatch(viewDriverById(driverId));
  }, [dispatch, driverId]);

  useEffect(() => {
    if (driverData) {
      setForm({
        firstName: driverData.firstName || '',
        middleName: driverData.middleName || '',
        lastName: driverData.lastName || '',
        contactNumber: driverData.contactNumber || '',
        email: driverData.emailId || '',
        address: driverData.address || '',
        state: driverData.state || '',
        city: driverData.city || '',
        district: driverData.district || '',
        pincode: driverData.pincode || '',
        idProof: driverData.idProof || '',
        idPhoto: driverData.idPhoto || '',
        driverPhoto: driverData.driverPhoto || '',
        dlNumber: driverData.dlNumber || ''
      });
    }
  }, [driverData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setForm(prev => ({
      ...prev,
      [fieldName === 'idProofPhoto' ? 'idPhoto' : 'driverPhoto']: previewUrl
    }));

    const formData = new FormData();
    formData.append(fieldName, file);

    try {
      const response = await axios.put(
        `http://localhost:8000/api/v2/driver/update/${driverId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      const updatedImagePath = response.data.message[fieldName];
      const fullImageUrl = `http://localhost:8000/${updatedImagePath.replace(/\\/g, '/').replace(/^\/+/, '')}?ts=${Date.now()}`;

      setForm(prev => ({
        ...prev,
        [fieldName === 'idProofPhoto' ? 'idPhoto' : 'driverPhoto']: fullImageUrl
      }));

      dispatch(viewDriverById(driverId));
    } catch (error) {
      console.error('Upload failed:', error);
      setForm(prev => ({
        ...prev,
        [fieldName === 'idProofPhoto' ? 'idPhoto' : 'driverPhoto']:
          driverData[fieldName === 'idProofPhoto' ? 'idPhoto' : 'driverPhoto']
      }));
    } finally {
      e.target.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(form).forEach(key => {
      if (form[key] !== null && form[key] !== undefined) {
        const backendFieldName = key === 'email' ? 'emailId' : key;
        formData.append(backendFieldName, form[key]);
      }
    });

    dispatch(updateDriver({ driverId, data: formData }))
      .unwrap()
      .then(() => {
        alert('Driver updated successfully!');
        navigate('/driver');
      })
      .catch(err => alert(`Error: ${err}`));
  };

  if (!driverData) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, margin: '0 auto' }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Driver Details - {driverId}
          </Typography>
          <Button variant="contained" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Personal Info */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                  Personal Information
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField label="First Name" name="firstName" value={form.firstName} fullWidth  />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField label="Last Name" name="lastName" value={form.lastName} fullWidth  />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Contact" name="contactNumber" value={form.contactNumber} fullWidth  />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Email" name="email" value={form.email} fullWidth  />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Address Info */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                  Address Information
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField label="Address" name="address" value={form.address} fullWidth disabled />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="State" name="state" value={form.state} fullWidth disabled />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="City" name="city" value={form.city} fullWidth disabled />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="District" name="district" value={form.district} fullWidth disabled />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Pincode" name="pincode" value={form.pincode} fullWidth disabled />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Document Info */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                  Document Verification
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField label="DL Number" name="dlNumber" value={form.dlNumber} fullWidth disabled />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="ID Proof" name="idProof" value={form.idProof} fullWidth disabled />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ mt: 3, p: 2, bgcolor: 'grey.50' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  <InsertDriveFile sx={{ mr: 1 }} /> Documents
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  {/* ID Photo Upload */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" fontWeight={600}>ID Photo</Typography>
                    <Avatar src={form.idPhoto} variant="rounded" sx={{ width: 100, height: 100, mt: 1 }} />
                    <Button
                      variant="outlined"
                      sx={{ mt: 1 }}
                      onClick={() => document.getElementById('idProofFileInput').click()}
                    >
                      {form.idPhoto ? 'Change Photo' : 'Upload Photo'}
                    </Button>
                    <input
                      id="idProofFileInput"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleImageChange(e, 'idProofPhoto')}
                    />
                  </Grid>

                  {/* Driver Photo Upload */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" fontWeight={600}>Driver Photo</Typography>
                    <Avatar src={form.driverPhoto} variant="rounded" sx={{ width: 100, height: 100, mt: 1 }} />
                    <Button
                      variant="outlined"
                      sx={{ mt: 1 }}
                      onClick={() => document.getElementById('driverPhotoInput').click()}
                    >
                      {form.driverPhoto ? 'Change Photo' : 'Upload Photo'}
                    </Button>
                    <input
                      id="driverPhotoInput"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleImageChange(e, 'driverPhoto')}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default EditDriver;
