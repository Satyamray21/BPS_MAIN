import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL='http://localhost:8000/api/v2/quotation'

export const createBooking = createAsyncThunk(

    'bookings/createBooking',async(data,{rejectWithValue})=>{
      
        try{
            const res = await axios.post(`${BASE_URL}`,data)
            return res.data.data
        }
        catch(err)
        {
          console.log('Error creating booking:', err.response?.data?.message || err.message);
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
)
export const deleteBooking = createAsyncThunk(
  '/booking/deleteBooking',async(bookingId,thunkApi)=>{
    try{
      const res = await axios.delete(`${BASE_URL}/delete/{bookingId}`)
      return bookingId;
    }
    catch(error)
    {
      return  thunkApi.rejectWithValue(error.response?.data?.message || "Failed to delete the booking");
    }
  }
)
//booking request.
export const fetchBookingRequest = createAsyncThunk(
  'booking/bookingRequestCount',
  async (_, thunkApi) => {
    try {
      const res = await axios.get(`${BASE_URL}/booking-request-list`);
      return res.data.data.deliveries; // ✅ Corrected return
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch Booking request"
      );
    }
  }
);

//active booking.
export const fetchActiveBooking = createAsyncThunk(
  'booking/activeBooking', async(_,thunkApi)=>{
    try{
      const res = await axios.get(`${BASE_URL}/active-list`)
      return {activeDeliveries: res.data.data.totalActiveDeliveries,
        deliveries: res.data.data.deliveries,
      };
    }
    catch(error)
    {
       return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Active Deliveries ");
    }
  }
)
//cancelled booking
export const  fetchCancelledBooking = createAsyncThunk(
  'booking.cancelledCount',async(_,thunkApi)=>{
    try{
      const res = await axios.get(`${BASE_URL}/cancelled-list`)
      return {cancelledCount:res.data.data.totalCancelledDeliveries}
    }
    catch(error)
    {
       return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Cancelled Booking");
    }
  }
)

export const viewBookingById = createAsyncThunk(
  '/booking/viewBookingById', async(bookingId,thunkApi)=>{
    try{
      const res = await axios.get(`${BASE_URL}/search/${bookingId}`)
      return res.data;
    }
    catch(err)
    {
      return thunkApi.rejectWithValue( err.response?.data?.message || 'f' );
    }
    
  }
)
const initialState = {
  list: [],
  requestCount: 0,
  activeDeliveriesCount: 0,
  cancelledDeliveriesCount: 0,

  form: {
  firstName: "",
  lastName: "",
  startStationName: null,
  endStation: null,
  locality: "",
  quotationDate: "",
  proposedDeliveryDate: "",
  fromCustomerName: "",
  fromAddress: "",
  fromState: "",
  fromCity: "",
  fromPincode: "",
  toCustomerName: "",
  toAddress: "",
  toState: "",
  toCity: "",
  toPincode: "",
  amount: "",
  sgst: "",
  additionalCmt: "",
  productDetails: [
    {
      name: "",
      quantity: "",
      price: "",
      weight: "",
    },
  ],
  addComment: "",
 
  
  billTotal: "",
  
  sgst: "",
  
  grandTotal: "",
  },
  status: 'idle',
  error: null,
  viewedbooking : null,
};
const quotationSlice = createSlice({
  name: 'quotation',
  initialState,
  reducers: {
    setFormField: (state, action) => {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
    resetForm: (state) => {
      state.form = initialState.form;
    },
    addBooking: (state, action) => {
      state.list.push(action.payload);
    },
    setBooking: (state, action) => {
      state.list = action.payload;
    },
    clearViewedBooking:(state)=>{
      state.viewedBooking=null;
    }
  },
 extraReducers: (builder) => {
    builder
    //for booking.
    .addCase(createBooking.pending,(state)=>{
      state.loading=true;
      state.error=null;
    })
    .addCase(createBooking.fulfilled,(state,action)=>{
      state.status='succeeded';
      state.error=null;
      state.list.push(action.payload);
    })
    .addCase(createBooking.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.payload;
    })
    //for deleting
    .addCase(deleteBooking.fulfilled,(state,action)=>{
      state.loading=false;
      state.list = state.list.filter(booking=>booking.bookingId !== action.payload);
    })
     
    

      .addCase(fetchBookingRequest.fulfilled, (state, action) => {
        
        state.list = action.payload;
        })
        .addCase(fetchBookingRequest.rejected, (state, action) => {
         console.error("Fetch error:", action.error.message);
        })

        .addCase(fetchActiveBooking.fulfilled, (state, action) => {
        
        state.list = action.payload;
        })
        .addCase(fetchCancelledBooking.fulfilled, (state, action) => {
        state.cancelledDeliveriesCount = action.payload.cancelledCount;
        state.list = action.payload.deliveries;
        })
      //view booking
      .addCase(viewBookingById.pending,(state)=>{
        state.loading=false;
        state.error=null;
      })
      .addCase(viewBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.viewedBooking=action.payload;
        state.form = {
          ...state.form,
          ...action.payload
        };
      })
      .addCase(viewBookingById.rejected,(state)=>{
        state.loading=false;
        state.error=null
      })

    ;
 }
})
export const { setFormField, resetForm, addBooking , setBooking,clearViewedBooking} = quotationSlice.actions;
export default quotationSlice.reducer;