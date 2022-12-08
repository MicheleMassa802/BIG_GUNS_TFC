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
import { useSubContext, Sub_context } from "./Contexts/Sub_context";
import Get_Sub from './components/Subscription/Sub_get';
import Update_Sub from './components/Subscription/Sub_update';
import Delete_sub from './components/Subscription/Sub_del';

function App() {


  const payments = (

    <PH_context.Provider value={usePHContext()}>
      <PaymentHist />
    </PH_context.Provider>
  )

  const getSub = (
    <Sub_context.Provider value={useSubContext()}> 
      <Get_Sub />
    </Sub_context.Provider>
  )

  const createSub = (
    <Sub_context.Provider value={useSubContext()}>
      <CreateSub />
    </Sub_context.Provider>
  )

  const updateSub = (
    <Sub_context.Provider value={useSubContext()}>
      <Update_Sub />
    </Sub_context.Provider>
  )

  const cancelSub = (
    <Sub_context.Provider value={useSubContext()}>
      <Delete_sub />
    </Sub_context.Provider>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/get_sub" element={getSub} />
          <Route path="/create_sub" element={createSub} />
          <Route path="/update_sub" element={updateSub} />
          <Route path="/cancel_sub" element={cancelSub} />
          <Route path="/payment_history" element={payments} />
          <Route path="/about_us" element={<Text>We are tired</Text>} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
