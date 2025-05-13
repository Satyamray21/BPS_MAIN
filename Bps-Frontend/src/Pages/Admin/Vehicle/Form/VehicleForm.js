import React from "react";
import {
    Box,
    Button,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const years = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i
);

const validationSchema = Yup.object({
    registrationNumber: Yup.string().required("Required"),
    registrationDate: Yup.string().required("Required"),
    regExpiryDate: Yup.string().required("Required"),
    vehicleModel: Yup.string().required("Required"),
    manufactureYear: Yup.string().required("Required"),
    ownedBy: Yup.string().required("Required"),
    currentLocation: Yup.string().required("Required"),
    dateofPurchase: Yup.string().required("Required"),
    purchasedFrom: Yup.string().required("Required"),
    PurchasedUnder: Yup.string().required("Required"),
    purchasePrice: Yup.number().required("Required"),
    deprecidepreciationPercentationPercent: Yup.number().required("Required"),
    depreciationValue: Yup.number().required("Required"),
    currentValue: Yup.number().required("Required"),

    currentInsuranceProvider: Yup.string().required("Required"),
    policyNumber: Yup.string().required("Required"),
    policyType: Yup.string().required("Required"),
    policyStartDate: Yup.date().required("Required"),
    policyEndDate: Yup.date().required("Required").min(
        Yup.ref("policyStartDate"),
        "End date must be after start date"
    ),
    policyPremium: Yup.number().required("Required"),

    lastFitnessRenewalDate: Yup.date().required("Required"),
    currentFitnessValidUpto: Yup.date().required("Required").min(
        Yup.ref("lastFitnessRenewalDate"),
        "Must be after renewal date"
    ),

    firstRegValidUpto: Yup.date().required("Required"),
    renewalDate: Yup.date(),
    renewalrenewalValidUptoValidUpto: Yup.date().required("Required").min(
        Yup.ref("renewalDate"),
        "Must be after renewal date"
    ),

    addcomment: Yup.string(),
});

const VehicleForm = () => {
    const formik = useFormik({
        initialValues: {
            registrationNumber: "",
            registrationDate: "",
            regExpiryDate: "",
            vehicleModel: "",
            manufactureYear: "",
            ownedBy: "",
            currentLocation: "",
            dateofPurchase: "",
            purchasedFrom: "",
            PurchasedUnder: "",
            purchasePrice: "",
            depreciationPercent: "",
            depreciationValue: "",
            currentValue: "",

            currentInsuranceProvider: "",
            policyNumber: "",
            policyType: "",
            policyStartDate: "",
            policyEndDate: "",
            policyPremium: "",

            lastFitnessRenewalDate: "",
            currentFitnessValidUpto: "",

            firstRegValidUpto: "",
            renewalDate: "",
            renewalValidUpto: "",

            addcomment: "",
        },
        validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <Box p={3} bgcolor="#f5f7f6">
            <form onSubmit={formik.handleSubmit}>
                <Typography variant="h6" mb={2}>
                    Vehicle Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            label="Registration Number"
                            name="registrationNumber"
                            fullWidth
                            value={formik.values.registrationNumber}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.registrationNumber &&
                                Boolean(formik.errors.registrationNumber)
                            }
                            helperText={
                                formik.touched.registrationNumber &&
                                formik.errors.registrationNumber
                            }
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Registration Date"
                            name="registrationDate"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={formik.values.registrationDate}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.registrationDate &&
                                Boolean(formik.errors.registrationDate)
                            }
                            helperText={
                                formik.touched.registrationDate &&
                                formik.errors.registrationDate
                            }
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Reg. Expiry Date"
                            name="regExpiryDate"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={formik.values.regExpiryDate}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.regExpiryDate &&
                                Boolean(formik.errors.regExpiryDate)
                            }
                            helperText={
                                formik.touched.regExpiryDate && formik.errors.regExpiryDate
                            }
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Make/Model"
                            name="makeModel"
                            fullWidth
                            value={formik.values.makeModel}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.makeModel && Boolean(formik.errors.makeModel)
                            }
                            helperText={formik.touched.makeModel && formik.errors.makeModel}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            select
                            label="Year of Manufacture"
                            name="yearOfManufacture"
                            fullWidth
                            value={formik.values.yearOfManufacture}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.yearOfManufacture &&
                                Boolean(formik.errors.yearOfManufacture)
                            }
                            helperText={
                                formik.touched.yearOfManufacture &&
                                formik.errors.yearOfManufacture
                            }
                        >
                            {years.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Owned By"
                            name="ownedBy"
                            fullWidth
                            value={formik.values.ownedBy}
                            onChange={formik.handleChange}
                            error={formik.touched.ownedBy && Boolean(formik.errors.ownedBy)}
                            helperText={formik.touched.ownedBy && formik.errors.ownedBy}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Current Location"
                            name="currentLocation"
                            fullWidth
                            value={formik.values.currentLocation}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.currentLocation &&
                                Boolean(formik.errors.currentLocation)
                            }
                            helperText={
                                formik.touched.currentLocation && formik.errors.currentLocation
                            }
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            label="Date of Purchase"
                            name="dateOfPurchase"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={formik.values.dateOfPurchase}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.dateOfPurchase &&
                                Boolean(formik.errors.dateOfPurchase)
                            }
                            helperText={
                                formik.touched.dateOfPurchase && formik.errors.dateOfPurchase
                            }
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            label="Purchased From"
                            name="purchasedFrom"
                            fullWidth
                            value={formik.values.purchasedFrom}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            label="Purchased Under"
                            name="purchasedUnder"
                            fullWidth
                            value={formik.values.purchasedUnder}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            label="Purchase Price (in INR)"
                            name="purchasePrice"
                            type="number"
                            fullWidth
                            value={formik.values.purchasePrice}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            label="% of Depreciation"
                            name="depreciationPercent"
                            type="number"
                            fullWidth
                            value={formik.values.depreciationPercent}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            label="Current Value"
                            name="currentValue"
                            type="number"
                            fullWidth
                            value={formik.values.currentValue}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                </Grid>

                <Typography variant="h6" mt={4} gutterBottom>
                    Insurance Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            label="Current Insurance Provider"
                            name="currentInsuranceProvider"
                            fullWidth
                            value={formik.values.currentInsuranceProvider}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            label="Policy Number"
                            name="policyNumber"
                            fullWidth
                            value={formik.values.policyNumber}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            label="Policy Type"
                            name="policyType"
                            fullWidth
                            value={formik.values.policyType}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            label="Policy Start Date"
                            name="policyStartDate"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={formik.values.policyStartDate}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            label="Policy End Date"
                            name="policyEndDate"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={formik.values.policyEndDate}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.policyEndDate &&
                                Boolean(formik.errors.policyEndDate)
                            }
                            helperText={
                                formik.touched.policyEndDate && formik.errors.policyEndDate
                            }
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            label="Policy Premium"
                            name="policyPremium"
                            fullWidth
                            value={formik.values.policyPremium}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                </Grid>

                <Typography variant="h6" mt={4} gutterBottom>
                    Fitness Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Last Fitness Renewal Date"
                            name="lastFitnessRenewalDate"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={formik.values.lastFitnessRenewalDate}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Current Fitness Valid Upto"
                            name="currentFitnessValidUpto"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={formik.values.currentFitnessValidUpto}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.currentFitnessValidUpto &&
                                Boolean(formik.errors.currentFitnessValidUpto)
                            }
                            helperText={
                                formik.touched.currentFitnessValidUpto &&
                                formik.errors.currentFitnessValidUpto
                            }
                        />
                    </Grid>
                </Grid>

                <Typography variant="h6" mt={4} gutterBottom>
                    Registration Renewal Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            label="First Reg. Valid Upto"
                            name="firstRegValidUpto"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={formik.values.firstRegValidUpto}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            label="Renewal Date"
                            name="renewalDate"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={formik.values.renewalDate}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            label="Renewal Valid Upto"
                            name="renewalValidUpto"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={formik.values.renewalValidUpto}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.renewalValidUpto &&
                                Boolean(formik.errors.renewalValidUpto)
                            }
                            helperText={
                                formik.touched.renewalValidUpto &&
                                formik.errors.renewalValidUpto
                            }
                        />
                    </Grid>
                </Grid>

                <Typography variant="h6" mt={4} gutterBottom>
                    Additional Comments
                </Typography>
                <TextField
                    name="additionalComments"
                    label="Additional Comments"
                    multiline
                    rows={4}
                    fullWidth
                    value={formik.values.additionalComments}
                    onChange={formik.handleChange}
                />

                <Box mt={3} display="flex" justifyContent="center">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ backgroundColor: "#004C99" }}
                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default VehicleForm;
