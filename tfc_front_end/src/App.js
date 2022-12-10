import React from 'react';
import {PH_context, usePHContext} from './Contexts/PH_context';
import StudiosContext from './Contexts/studios_all';
import { useStudiosContext } from './Contexts/studios_all';
import { CH_context, useCHContext } from './Contexts/CH_context';
import ClassesHist from './components/Classes_History';
import CreateEnroll from './components/Enroll/Enroll_Create';
import CreateDrop from './components/Drop/Drop_Create';
import './App.css';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Logval from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Update from './components/UpdateProfile';
import PaymentHist from './components/Payment_Hist';
import CreateSub from './components/Subscription/Sub_Create';
import Text from './components/Text';
import { useContext, useEffect, useState } from "react";
import { useSubContext, Sub_context } from "./Contexts/Sub_context";
import Get_Sub from './components/Subscription/Sub_get';
import Update_Sub from './components/Subscription/Sub_update';
import Delete_sub from './components/Subscription/Sub_del';
import AllStudioView from './components/Studios';
import IndStudiosContext from './Contexts/Ind_studio';
import { useIndStudiosContext } from './Contexts/Ind_studio';
import StudioDetails from './components/Ind_Studio';
import Profile from './components/Profile';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FilterContext, useFilterContext} from './Contexts/Filter_context';
import FilterClass from './components/Filters/Class_Filter/FilterClass';
import FilterStudio from './components/Filters/Studio_Filter/FilterStudio';

function App() {

  localStorage.setItem('perPage', 1);

  const about = (<Text>
    This is my seventh time taking CSC309, and inarguably, this is the best assignment I've ever seen.
    Problems are so accurately designed that anyone with their own knowledge and experience have their own takeaways.
    I hope next assignments will be this good, too!
  </Text>)
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

  const studios = (
    <StudiosContext.Provider value={useStudiosContext()}>
      <AllStudioView />
    </StudiosContext.Provider>
  )

  const classesHist = (

    <CH_context.Provider value={useCHContext()}>
      <ClassesHist />
    </CH_context.Provider>
  )

  const StudioInfo = (
    <IndStudiosContext.Provider value={useIndStudiosContext()}>
      <StudioDetails />
    </IndStudiosContext.Provider>
  )
  
  const filtered_classes = (
    <FilterContext.Provider value={useFilterContext()}>
      <FilterClass></FilterClass>
    </FilterContext.Provider>
  )

  const filtered_studios = (
    <FilterContext.Provider value={useFilterContext()}>
      <FilterStudio></FilterStudio>
    </FilterContext.Provider>
  )

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Landing />} />
              <Route path="/login" element={<Logval />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/class_history" element={classesHist} />
              <Route path="/enroll" element={<CreateEnroll></CreateEnroll>} />
              <Route path="/drop" element={<CreateDrop></CreateDrop>} />
              <Route path="/update" element = {<Update />} />
              <Route path="/get_sub" element={getSub} />
              <Route path="/create_sub" element={createSub} />
              <Route path="/update_sub" element={updateSub} />
              <Route path="/cancel_sub" element={cancelSub} />
              <Route path="/payments" element={payments} />
              <Route path="/about" element={about} />
              <Route path="/studios" element={studios} />
              <Route path='/details/:studioId' element={StudioInfo} />
              <Route path='/profile' element={<Profile />} />
              <Route path="/filter_classes" element={filtered_classes} />
              <Route path="/filter_studios" element={filtered_studios} />
            </Route>
            {/* <Route index element={<Landing />} /> */}
        </Routes>
    </BrowserRouter>
  );
}

export default App;


// <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>