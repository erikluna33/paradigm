import React from 'react';
import './App.css';
import axios from 'axios';
import AllPatients from './components/AllPatients';
import NewPatient from './components/NewPatient';
import OnePatient from './components/OnePatient';
import EditPatient from './components/EditPatient';
import LogReg from './views/LogReg';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import {Avatar} from '@mui/material';



function App() {

  


  return (
    <BrowserRouter>
      
        <div className="App">
          <Routes>
            
            <Route element={<LogReg />} path="/"/>
            <Route element={<AllPatients />} path="/home"/>
            <Route element={<NewPatient />} path="/new"/>
            <Route element={<OnePatient />} path="/patient/:id"/>
            <Route element={<EditPatient />} path="/patient/edit/:id"/>
          </Routes>

          
        </div>
      
    </BrowserRouter>
  );
}

export default App;
