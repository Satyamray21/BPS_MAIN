import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL='http://localhost:8000/api/v2/vehicles'

export const addVehicles = createAsyncThunk(
    'addVehicle/vehicle', async(data,{rejectWithValue})=>{
        try{
          console.log("Sending vehicle data:", data);
            const res = await axios.post(`${BASE_URL}/vehicle`,data);
            return res.data.message;
        }
        catch(err)
        {
          console.log("error",err);
             return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
)

export const getAvailableVehiclesCount= createAsyncThunk(
    'getAvailableVehiclesCount/vehicle', async(_,{rejectWithValue})=>{
        try{
            const res = await axios.get(`${BASE_URL}/available-vehicles`);
            return {availableCount:res.data.message.availableVehicles};
        }
        catch(err)
        {
             return rejectWithValue(err.response?.data?.message || err.message);
        }
        }
)
export const getDeactivatedVehiclesCount= createAsyncThunk(
    'getDeactivatedVehiclesCount/vehicle', async(_,{rejectWithValue})=>{
        try{
            const res = await axios.get(`${BASE_URL}/deactivated-vehicles`);
            return {deactiveCount:res.data.message.deactivatedVehicles};
        }
        catch(err)
        {
             return rejectWithValue(err.response?.data?.message || err.message);
        }
        }
)
export const getBlacklistedVehiclesCount= createAsyncThunk(
    'getBlacklistedVehiclesCount/vehicle', async(_,{rejectWithValue})=>{
        try{
            const res = await axios.get(`${BASE_URL}/blacklisted-vehicles`);
            return{blacklistedCount: res.data.message.blacklistedVehicles};
        }
        catch(err)
        {
             return rejectWithValue(err.response?.data?.message || err.message);
        }
        }
)
export const getTotalVehiclesCount= createAsyncThunk(
    'getTotalVehiclesList/vehicle', async(_,{rejectWithValue})=>{
        try{
            const res = await axios.get(`${BASE_URL}/total-vehicles`);
            return {totalCount:res.data.message.totalVehicles};
        }
        catch(err)
        {
             return rejectWithValue(err.response?.data?.message || err.message);
        }
        }
)
export const getTotalVehiclesList= createAsyncThunk(
    'getTotalVehiclesCount/vehicle', async(_,{rejectWithValue})=>{
        try{
            const res = await axios.get(`${BASE_URL}/getAllvehicle`);
            return res.data.message;
        }
        catch(err)
        {
             return rejectWithValue(err.response?.data?.message || err.message);
        }
        }
)
export const getBlacklistedVehiclesList= createAsyncThunk(
    'getBlacklistedVehiclesList/vehicle', async(_,{rejectWithValue})=>{
        try{
            const res = await axios.get(`${BASE_URL}/blacklisted-vehicles-List`);
            return res.data.message.blacklistedVehicles;
        }
        catch(err)
        {
             return rejectWithValue(err.response?.data?.message || err.message);
        }
        }
)
export const getAvailableVehiclesList= createAsyncThunk(
    'getAvailableVehicles/vehicle', async(_,{rejectWithValue})=>{
        try{
            const res = await axios.get(`${BASE_URL}/available-vehicles-List`);
            return res.data.message.availableVehicles;
        }
        catch(err)
        {
             return rejectWithValue(err.response?.data?.message || err.message);
        }
        }
)
export const getDeactivatedVehicles= createAsyncThunk(
    'getDeactivatedVehiclesList/vehicle', async(_,{rejectWithValue})=>{
        try{
            const res = await axios.get(`${BASE_URL}/deactivated-vehicles-List`);
            return res.data.message.deactivatedVehicles;
        }
        catch(err)
        {
             return rejectWithValue(err.response?.data?.message || err.message);
        }
        }
)

export const getVehicleById = createAsyncThunk(
  'getVehicleById/vehicle' , async(vehicleId,thunkApi)=>{
    try{
      const res = await axios.get(`${BASE_URL}/vehicle/${vehicleId}`)
      return res.data.message;
    }
    catch(error)
    {
      return thunkApi.rejectWithValue(error.response?.data?.message || "Failed to view Vehicle");
    }
  }
)

const initialState = {
    list:[],
    form:{
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
    status:'idle',
    error:null,
    viewedVehicle:null,
    availableCount: 0,
    deactiveCount: 0,
    blacklistedCount: 0,
    totalCount: 0,
};

const vehicleSlice= createSlice(
    {
        name:'vehicles',
        initialState,
        reducers:
        {
             setFormField: (state, action) => {
                  const { field, value } = action.payload;
                  state.form[field] = value;
                },
                resetForm: (state) => {
                  state.form = initialState.form;
                },
                addVehicle: (state, action) => {
                  state.list.push(action.payload);
                },
                setVehicle: (state, action) => {
                  state.list = action.payload;
                },
                clearViewedVehicle:(state)=>{
                  state.viewedVehicle=null;
                }
        },
        extraReducers: (builder) => {
    builder
      .addCase(addVehicles.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addVehicles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error=null;
      })
      .addCase(addVehicles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(getAvailableVehiclesCount.fulfilled, (state, action) => {
        state.availableCount = action.payload.availableCount;
      })
      .addCase(getDeactivatedVehiclesCount.fulfilled, (state, action) => {
        state.deactiveCount = action.payload.deactiveCount;
      })
      .addCase(getBlacklistedVehiclesCount.fulfilled, (state, action) => {
        state.blacklistedCount = action.payload.blacklistedCount;
      })
      .addCase(getTotalVehiclesCount.fulfilled, (state, action) => {
        state.totalCount = action.payload.totalCount;
      })

      .addCase(getTotalVehiclesList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTotalVehiclesList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(getTotalVehiclesList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(getBlacklistedVehiclesList.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(getAvailableVehiclesList.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(getDeactivatedVehicles.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(getVehicleById.pending,(state)=>{
        state.loading=true;
        state.error=null
      })
      .addCase(getVehicleById.fulfilled,(state,action)=>{
        state.loading=false;
        state.viewedVehicle=action.payload;
        state.form={
          ...state.form,
          ...action.payload
        }
      })
      .addCase(getVehicleById.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
      })
      ;
  }
    
})
export const { setFormField, resetForm, addVehicle, setVehicle,clearViewedVehicle } = vehicleSlice.actions;

export default vehicleSlice.reducer;