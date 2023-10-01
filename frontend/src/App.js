
import './App.css';
import Signup from './components/Signup'
import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/Login';
import { useState } from 'react';
import Main from './components/Main';

function App() {

  

  const auth=localStorage.getItem('token')

 
  return (
    <>
    <BrowserRouter>
    
      <Routes>
      {auth && <Route path='/' exact element={<Main/>}></Route>}
        <Route path="/signup" exact element={<Signup />}/>
        <Route path="/login" exact element={<Login />}/>
        <Route path='/' exact element={<Navigate replace to="/login" />} /> 
      </Routes> 
      

    </BrowserRouter>
    <ToastContainer/>
    </>
  );
}

export default App;
