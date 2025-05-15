import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    Button,
    InputAdornment,
    Typography,
    Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveCustomer } from '../features/customers/customerSlice';

const CustomerSearch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { list: customerList, loading } = useSelector((state) => state.customers);

    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        dispatch(fetchActiveCustomer());
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            customerSearch: '',
            firstName: '',
            middleName: '',
            lastName: '',
            contactNumber: '',
            email: '',
        },
        validationSchema: Yup.object({
            customerSearch: Yup.string().required('Required'),
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            contactNumber: Yup.string()
                .matches(/^[0-9]{10}$/, 'Must be a valid 10-digit number')
                .required('Contact number is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
        }),
        onSubmit: (values) => {
            console.log('Submit values:', values);
            // TODO: Call update customer API if needed
        },
    });

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
    } = formik;

    const handleSearch = () => {
        const value = values.customerSearch.trim().toLowerCase();

        const found = customerList.find((customer) => {
            const contact = customer.contactNumber?.toString().toLowerCase();
            const email = customer.emailId?.toString().toLowerCase();
            return contact === value || email === value;
        });

        if (found) {
            setNotFound(false);
            formik.setValues({
                ...values,
                firstName: found.firstName || '',
                middleName: found.middleName || '',
                lastName: found.lastName || '',
                contactNumber: found.contactNumber?.toString() || '',
                email: found.emailId || '',
            });
        } else {
            setNotFound(true);
            formik.setValues({
                ...values,
                firstName: '',
                middleName: '',
                lastName: '',
                contactNumber: '',
                email: '',
            });
        }
    };

    const handleRegister = () => {
        navigate('/customerForm'); 
    };


    return (
        <Box component="form" onSubmit={handleSubmit} p={3}>
            <Grid container spacing={2}>
                <Grid item size={{ xs: 12, sm: 9 }}>
                    <TextField
                        fullWidth
                        label="Search Customer (by Contact No. or Email)"
                        name="customerSearch"
                        value={values.customerSearch}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.customerSearch && Boolean(errors.customerSearch)}
                        helperText={
                            (touched.customerSearch && errors.customerSearch) ||
                            (notFound && 'Customer not found')
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button onClick={handleSearch} variant="contained">
                                        Search
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item size={{ xs: 12, sm: 3 }}>
                    <Button fullWidth onClick={handleRegister} variant="contained" sx={{ mt: { xs: 2, sm: 0 } }}>
                        Registration
                    </Button>
                </Grid>

                <Grid item size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                    />
                </Grid>

                <Grid item size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        label="Middle Name"
                        name="middleName"
                        value={values.middleName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Grid>

                <Grid item size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                    />
                </Grid>

                <Grid item size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        label="Contact Number"
                        name="contactNumber"
                        value={values.contactNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.contactNumber && Boolean(errors.contactNumber)}
                        helperText={touched.contactNumber && errors.contactNumber}
                    />
                </Grid>

                <Grid item size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    />
                </Grid>
            </Grid>
        </Box >
    );
};

export default CustomerSearch;