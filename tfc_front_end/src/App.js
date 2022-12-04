import './App.css';
import {PH_context, usePHContext} from './Contexts/PH_context';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PaymentHist from './components/Payment_Hist';
import { useContext, useEffect, useState } from "react";
import React from 'react';

function App() {


  const payments = (

    <PH_context.Provider value={usePHContext()}>
      <PaymentHist />
    </PH_context.Provider>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="payments" element={payments} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
