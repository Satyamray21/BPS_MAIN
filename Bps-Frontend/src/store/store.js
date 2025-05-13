import { configureStore } from '@reduxjs/toolkit';
import locationReducer from '../features/Location/locationSlice';
import stationReducer from '../features/stations/stationSlice';
import customerReducer from '../features/customers/customerSlice'
import driverReducer from '../features/Driver/driverSlice'
import bookingReducer from '../features/booking/bookingSlice'
import quotationReducer from '../features/quotation/quotationSlice'
export const store = configureStore({
  reducer: {
    stations: stationReducer,
    location: locationReducer,
    customers: customerReducer,
    drivers: driverReducer,
    bookings:bookingReducer,
    quotations:quotationReducer,

  },
});
