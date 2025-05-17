import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = 'http://localhost:8000/api/v2/delivery';


export const assignDeliveries = createAsyncThunk(
  'delivery/assignDeliveries',
  async ({ bookingIds, quotationIds, driverName, vehicleModel }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/assign`, {
        bookingIds,
        quotationIds,
        driverName,
        vehicleModel, 
      });
      return response.data.data;
    } catch (error) {
      console.log("error",error.response?.data?.message);
      return rejectWithValue(
        
        error.response?.data?.message || 'Failed to assign deliveries'
      );
    }
  }
);
const deliverySlice = createSlice({
  name: 'delivery',
  initialState: {
    deliveries: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(assignDeliveries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignDeliveries.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveries = action.payload;
      })
      .addCase(assignDeliveries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default deliverySlice.reducer;
