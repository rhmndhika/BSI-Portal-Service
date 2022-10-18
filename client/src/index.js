import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Home from './Component/Home/Home'
import EmailUserProvider from './Helper/EmailUserProvider';
import PayG from './Component/PayG/Payg';
import DataPaygProvider from './Helper/DataPaygProvider';
import PaygHome from './Component/PayG/PaygHome';
import PaygStatus from './Component/PayG/PaygStatus';
import PaygStatusDetail from './Component/PayG/PaygStatusDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <EmailUserProvider>
  <DataPaygProvider>
  <ChakraProvider>
  <React.StrictMode>
  <BrowserRouter>
  <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home/>} />
      <Route path='/payg' element={<PayG />} />
      <Route path='/paygHome' element={<PaygHome />} />
      <Route path='/paygStatus' element={<PaygStatus />} />
      <Route path='/paygstatusdetail/:id' element={<PaygStatusDetail />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
  </ChakraProvider>
  </DataPaygProvider>
  </EmailUserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
