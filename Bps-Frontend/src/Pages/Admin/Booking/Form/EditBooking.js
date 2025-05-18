import React,{useEffect,useState} from "react";
import * as Yup from "yup";
import { Formik, Form, FieldArray } from "formik";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import { viewBookingById, updateBookingById} from "../../../../features/booking/bookingSlice";

const toPay = ['pay', 'paid','none'];

const initialValues = {
  startStation: "",
  endStation: "",
  bookingDate: null,
  deliveryDate: null,
  customerSearch: "",
  firstName: "",
  middleName: "",
  lastName: "",
  mobile: "",
  email: "",
  senderName: "",
  senderLocality: "",
  fromCity: "",
  senderGgt: "",
  fromState: "",
  senderPincode: "",
  receiverName: "",
  receiverLocality: "",
  receiverGgt: "",
  toState: "",
  toCity: "",
  toPincode: "",
  items: [
    {
      receiptNo: "",
      refNo: "",
      insurance: "",
      vppAmount: "",
      toPayPaid: "",
      weight: "",
      amount: "",
    },
  ],
  addComment: "",
  freight: "",
  ins_vpp: "",
  billTotal: "",
  cgst: "",
  sgst: "",
  igst: "",
  grandTotal: "",
};

const validationSchema = Yup.object().shape({
  startStation: Yup.string().required("Start Station is required"),
  endStation: Yup.string().required("End Station is required"),
  bookingDate: Yup.date().nullable().required("Booking Date is required"),
  deliveryDate: Yup.date().nullable().required("Delivery Date is required"),
  customerSearch: Yup.string(),
  firstName: Yup.string().required("First Name is required"),
  middleName: Yup.string(),
  lastName: Yup.string().required("Last Name is required"),
   mobile: Yup.string()
    .matches(/^\d{10}$/, "Contact Number must be 10 digits")
    .required("Contact Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  senderName: Yup.string().required("Sender Name is required"),
  senderLocality: Yup.string().required("Sender Locality is required"),
  fromCity: Yup.string().required("From City is required"),
  senderGgt: Yup.string().required("Sender GGT is required"),
  fromState: Yup.string().required("From State is required"),
  senderPincode: Yup.string()
    .matches(/^\d{6}$/, "Sender Pincode must be 6 digits")
    .required("Sender Pincode is required"),
  receiverName: Yup.string().required("Receiver Name is required"),
  receiverLocality: Yup.string().required("Receiver Locality is required"),
  receiverGgt: Yup.string().required("Receiver GGT is required"),
  toState: Yup.string().required("To State is required"),
  toCity: Yup.string().required("To City is required"),
  toPincode: Yup.string()
    .matches(/^\d{6}$/, "Receiver Pincode must be 6 digits")
    .required("Receiver Pincode is required"),
  items: Yup.array().of(
    Yup.object().shape({
      receiptNo: Yup.string().required("Receipt No is required"),
      refNo: Yup.string().required("Reference No is required"),
      insurance: Yup.number()
        .typeError("Insurance must be a number")
        .min(0, "Cannot be negative"),
      vppAmount: Yup.number()
        .typeError("VPP Amount must be a number")
        .min(0, "Cannot be negative"),
      toPay: Yup.number()
        .typeError("To Pay must be a number")
        .min(0, "Cannot be negative"),
      weight: Yup.number()
        .typeError("Weight must be a number")
        .min(0, "Cannot be negative"),
      amount: Yup.number()
        .typeError("Amount must be a number")
        .min(0, "Cannot be negative"),
    })
  ),
  addComment: Yup.string(),
  freight: Yup.number()
    .typeError("Freight must be a number")
    .min(0, "Cannot be negative"),
  ins_vpp: Yup.number()
    .typeError("Insurance/VPP must be a number")
    .min(0, "Cannot be negative"),
  billTotal: Yup.number()
    .typeError("Bill Total must be a number")
    .min(0, "Cannot be negative"),
  cgst: Yup.number()
    .typeError("CGST must be a number")
    .min(0, "Cannot be negative"),
  sgst: Yup.number()
    .typeError("SGST must be a number")
    .min(0, "Cannot be negative"),
  igst: Yup.number()
    .typeError("IGST must be a number")
    .min(0, "Cannot be negative"),
  grandTotal: Yup.number()
    .typeError("Grand Total must be a number")
    .min(0, "Cannot be negative"),
});

const EditBooking = () => {
  const {bookingId} = useParams();
  const dispatch = useDispatch();
   const { loading, error, viewedBooking } = useSelector(state => state.bookings);
    useEffect(() => {
           if (bookingId) {
               dispatch(viewBookingById(bookingId));
           }
       }, [bookingId, dispatch]);
   
       useEffect(() => {
          
       }, [viewedBooking]);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Formik
        initialValues={{
                    ...initialValues,
                    ...viewedBooking,
                    bookingDate: viewedBooking?.bookingDate ? new Date(viewedBooking.bookingDate) : new Date(),
                   deliveryDate: viewedBooking?.deliveryDate ? new Date(viewedBooking.deliveryDate) : new Date(),
  
                }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(updateBookingById({ bookingId, data: values }))
                                  .unwrap()
        }}
        enableReinitialize
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                                                        <TextField
                                                            fullWidth
                                                            label="Start Station"
                                                            name="startStation"
                                                            value={values.startStation.stationName}
                                                            onChange={handleChange}
                                                        >
                                                        </TextField>
                                                    </Grid>
                                                    <Grid size={{ xs: 12, sm: 6 }}>
                                                        <TextField
                                                            fullWidth
                                                            label="Destination Station"
                                                            name="endStation"
                                                            value={values.endStation.stationName}
                                                            onChange={handleChange}
                                                        >
                                                        </TextField>
                                                    </Grid>

                <Grid size ={{xs:12, sm:6}}>
                  <DatePicker
                    label="Booking Date"
                    value={values.bookingDate}
                    onChange={(val) => setFieldValue("bookingDate", val)}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} name="bookingDate" />
                    )}
                  />
                </Grid>
                <Grid size ={{xs:12, sm:6}}>
                  <DatePicker
                    label="Proposed Delivery Date"
                    value={values.deliveryDate}
                    onChange={(val) => setFieldValue("deliveryDate", val)}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} name="deliveryDate" />
                    )}
                  />
                </Grid>

                <Grid size ={{xs:12, sm:9}}>
                  <Typography fontWeight="bold">
                    Customer Name/Number
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Search for customer"
                    name="customerSearch"
                    value={values.customerSearch}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid
                  size ={{xs:12, sm:3}}
                  sx={{ display: "flex", alignItems: "flex-end" }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddIcon />}
                    type="submit"
                  >
                    Register
                  </Button>
                </Grid>

                <Grid size ={{xs:12, sm:4}}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size ={{xs:12, sm:4}}>
                  <TextField
                    fullWidth
                    label="Middle Name"
                    name="middleName"
                    value={values.middleName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size ={{xs:12, sm:4}}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size ={{xs:12, sm:6}}>
                  <TextField
                    fullWidth
                    label="Contact Number"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size ={{xs:12, sm:6}}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    type="email"
                  />
                </Grid>

                <Grid size ={{xs:12}}>
                  <Typography variant="h6">From (Address)</Typography>
                </Grid>
                <Grid size ={{xs:12, sm:6}}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="senderName"
                    value={values.senderName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size ={{xs:12, sm:6}}>
                  <TextField
                    fullWidth
                    label="GST Number"
                    name="senderGgt"
                    value={values.senderGgt}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size ={{xs:12, sm:6}}>
                  <TextField
                    fullWidth
                    label="Locality / Street"
                    name="senderLocality"
                    value={values.senderLocality}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                                                        <TextField
                                                            fullWidth
                                                            label="State"
                                                            name="fromState"
                                                            value={values.fromState}
                                                            onChange={handleChange}
                                                        >
                                                        </TextField>
                                                    </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                                                        <TextField
                                                            fullWidth
                                                            label="City"
                                                            name="fromCity"
                                                            value={values.fromCity}
                                                            onChange={handleChange}
                                                        >
                                                        </TextField>
                                                    </Grid>
                <Grid size ={{xs:12, sm:6}}>
                  <TextField
                    fullWidth
                    label="Pin Code"
                    name="senderPincode"
                    value={values.senderPincode}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size ={{xs:12}}>
                  <Typography variant="h6">To (Address)</Typography>
                </Grid>
                <Grid size ={{xs:12, sm:6}}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="receiverName"
                    value={values.receiverName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size ={{xs:12, sm:6}}>
                  <TextField
                    fullWidth
                    label="GST Number"
                    name="receiverGgt"
                    value={values.receiverGgt}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size ={{xs:12, sm:6}}>
                  <TextField
                    fullWidth
                    label="Locality / Street"
                    name="receiverLocality"
                    value={values.receiverLocality}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                                                        <TextField
                                                            fullWidth
                                                            label="State"
                                                            name="toState"
                                                            value={values.toState}
                                                            onChange={handleChange}
                                                        >
                                                        </TextField>
                                                    </Grid>
                                                    <Grid size={{ xs: 12, sm: 6 }}>
                                                        <TextField
                                                            fullWidth
                                                            label="City"
                                                            name="toCity"
                                                            value={values.toCity}
                                                            onChange={handleChange}
                                                        >
                                                        </TextField>
                                                    </Grid>
                <Grid size ={{xs:12, sm:6}}>
                  <TextField
                    fullWidth
                    label="Pin Code"
                    name="toPincode"
                    value={values.toPincode}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size ={{xs:12}}>
                  <Typography variant="h6">Product Details</Typography>
                </Grid>
                <FieldArray name="items">
                  {({ push, remove }) => (
                    <>
                      {values.items.map((item, index) => (
                        <Grid
                          container
                          spacing={2}
                          key={index}
                          alignItems="center"
                          sx={{ mb: 2 }}
                        >
                          <Grid size ={{xs:0.5}}>
                            <Typography>{index + 1}.</Typography>
                          </Grid>
                          <Grid size ={{xs:3, sm:3, md:1.4}}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Receipt No"
                              name={`items[${index}].receiptNo`}
                              value={item.receiptNo}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid size ={{xs:3, sm:3, md:1.4}}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Ref No"
                              name={`items[${index}].refNo`}
                              value={item.refNo}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid size ={{xs:3, sm:3, md:1.4}}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Insurance"
                              name={`items[${index}].insurance`}
                              value={item.insurance}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid size ={{xs:3, sm:3, md:1.4}}>
                            <TextField
                              fullWidth
                              size="small"
                              label="VPP Amount"
                              name={`items[${index}].vppAmount`}
                              value={item.vppAmount}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid size ={{xs:3, sm:3, md:1.4}}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Weight"
                              name={`items[${index}].weight`}
                              value={item.weight}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid size ={{xs:3, sm:3, md:1.4}}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Amount"
                              name={`items[${index}].amount`}
                              value={item.amount}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid size ={{xs:3, sm:3, md:1.5}}>
                            <TextField
                              select
                              fullWidth
                              size="small"
                              label="To Pay/Paid"
                              name={`items[${index}].toPay`}
                              value={item.toPay}
                              onChange={handleChange}
                            >
                              {toPay.map((p) => (
                                <MenuItem key={p} value={p}>
                                  {p}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid size ={{xs:3, sm:3, md:1}}>
                            <Button
                              color="error"
                              onClick={() => remove(index)}
                              variant="outlined"
                              fullWidth
                            >
                              Remove
                            </Button>
                          </Grid>
                        </Grid>
                      ))}

                      <Grid size ={{xs:12}}>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() =>
                            push({
                              receiptNo: "",
                              refNo: "",
                              insurance: "",
                              vppAmount: "",
                              toPay: "",
                              weight: "",
                              amount: "",
                            })
                          }
                        >
                          + Add Item
                        </Button>
                      </Grid>
                    </>
                  )}
                </FieldArray>

                <Grid size ={{xs:12, md:9}}>
                  <TextField
                    name="addComment"
                    label="Additional Comments"
                    multiline
                    minRows={10}
                    fullWidth
                    value={values.addComment}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid size ={{xs:12, md:3}}>
                  <Grid container spacing={2}>
                    {[
                      ["freight", "FREIGHT"],
                      ["ins_vpp", "INS/VPP"],
                      ["billTotal", "Bill Total"],
                      ["cgst", "CGST%"],
                      ["sgst", "SGST%"],
                      ["igst", "IGST%"],
                      ["grandTotal", "Grand Total"],
                    ].map(([name, label]) => (
                      <Grid size ={{xs:6}} key={name}>
                        <TextField
                          name={name}
                          label={label}
                          value={values[name]}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Grid size ={{xs:12}}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Update Booking
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </LocalizationProvider>
  );
};

export default EditBooking;