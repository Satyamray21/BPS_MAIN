import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicRoute from '../src/Routes/PublicRoute';
import MainRoute from '../src/Routes/MainRoute';
import NotFound from '../src/Pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute />} />
      <Route path="/*" element={<MainRoute />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
