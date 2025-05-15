import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../Pages/Admin/Dashboard';
import Users from '../Pages/Admin/Users';
import DashboardLayout from '../Layout/DashboardLayout';
import BookingCard from '../Pages/Admin/Booking/BookingCard';
import ContactCard from '../Pages/Admin/Contact/ContactCard';
import CustomerCard from '../Pages/Admin/Customer/CustomerCard';
import DeliveryCard from '../Pages/Admin/Delivery/DeliveryCard';
import DriverCard from '../Pages/Admin/Driver/DriverCard';
import VehicleCard from '../Pages/Admin/Vehicle/VehicleCard';
import TrackerCard from '../Pages/Admin/Tracker/TrackerCard';
import QuotationCard from '../Pages/Admin/Quotation/QuotationCard';
import LedgerCard from '../Pages/Admin/Ledger/LedgerCard';
import UserCard from '../Pages/Admin/Manage User/UserCard';
import StationCard from '../Pages/Admin/Manage Station/StationCard';
import StationForm from '../Pages/Admin/Manage Station/Form/StationForm';
import CustomerForm from '../Pages/Admin/Customer/Form/CustomerForm'
import CustomerView from '../Pages/Admin/Customer/Form/CustomerView';
import DriverForm from '../Pages/Admin/Driver/Form/DriverForm';
import ViewDriver from '../Pages/Admin/Driver/Form/ViewDriver';
import EditDriver from '../Pages/Admin/Driver/Form/EditDriver';
import StationView from '../Pages/Admin/Manage Station/Form/StationView';
import EditStation from '../Pages/Admin/Manage Station/Form/EditStation';
import BookingForm from '../Pages/Admin/Booking/Form/BookingForm';
import QuotationForm from '../Pages/Admin/Quotation/Form/QuotationForm'
import CustomerUpdate from '../Pages/Admin/Customer/Form/CustomerUpdate';
import VehicleForm from '../Pages/Admin/Vehicle/Form/VehicleForm';
import ViewBooking from '../Pages/Admin/Booking/Form/ViewBooking';

const MainRoute = () => {
    const isAuthenticated = true; // Replace with real auth check

    return isAuthenticated ? (
        <DashboardLayout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path='/booking' element={<BookingCard />} />
                <Route path='/contact' element={<ContactCard />} />
                <Route path='/customer' element={<CustomerCard />} />
                <Route path='/delivery' element={<DeliveryCard />} />

                {/* Manage Vehicle */}
                <Route path='/vehicle' element={<VehicleCard />} />
                <Route path='/vehicleform' element={<VehicleForm />} />

                <Route path='/tracker' element={<TrackerCard />} />

                <Route path='/ladger' element={<LedgerCard />} />
                <Route path='/users' element={<UserCard />} />

                <Route path='/contact' element={<ContactCard />} />
                {/* Sation Routing */}
                <Route path='/station' element={<StationCard />} />
                <Route path='/stationform' element={<StationForm />} />
                <Route path='/stationview/:stationId' element={<StationView />} />
                <Route path='/editstation/:stationId' element={<EditStation />} />


                {/* manage Customer */}
                <Route path='/customer' element={<CustomerCard />} />
                <Route path='/customerform' element={<CustomerForm />} />
                <Route path='/customerview/:customerId' element={< CustomerView />} />
                <Route path='/customerupdate/:customerId' element={< CustomerUpdate />} />

                {/* Driver Routing */}
                <Route path='/driver' element={<DriverCard />} />
                <Route path='/driverform' element={<DriverForm />} />
                <Route path='/viewdriver/:driverId' element={<ViewDriver />} />
                <Route path="/editdriver/:driverId" element={<EditDriver />} />

                {/*Booking Routing */}
                <Route path='/booking' element={<BookingCard />} />
                <Route path='/booking/new' element={<BookingForm />} />
                <Route path ='/booking/:bookingId' element = {<ViewBooking />} />

                {/* Quotation routing */}
                <Route path='/quotation' element={<QuotationCard />} />
                <Route path='/quotationform' element={<QuotationForm />} />

                


            </Routes>
        </DashboardLayout>
    ) : (
        <Navigate to="/login" />
    );
};

export default MainRoute;
