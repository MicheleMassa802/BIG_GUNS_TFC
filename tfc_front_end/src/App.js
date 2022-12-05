import './App.css';
import {PH_context, usePHContext} from './Contexts/PH_context';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PaymentHist from './components/Payment_Hist';
import CreateSub from './components/Subscription/Sub_Create';
import { useContext, useEffect, useState } from "react";
import React from 'react';
import Text from './components/Text';

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
          <Route path="/payment_history" element={payments} />
          <Route path="/subscription" element={<CreateSub></CreateSub>} />
          <Route path="/about_us" element={<Text>We are tired</Text>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
