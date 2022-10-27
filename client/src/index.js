import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Spinner } from '@chakra-ui/react';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import ProtectedRoutes from './ProtectedRoutes';

const Home = lazy(() => import("./Component/Home/Home"));
const EmailUserProvider = lazy(() => import("./Helper/EmailUserProvider"));
const PayG = lazy(() => import("./Component/PayG/Payg"));
const DataPaygProvider = lazy(() => import("./Helper/DataPaygProvider"));
const PaygHome = lazy(() => import("./Component/PayG/PaygHome"));
const PaygStatus = lazy(() => import("./Component/PayG/PaygStatus"));
const PaygStatusDetail = lazy(() => import("./Component/PayG/PaygStatusDetail"));
const Profile = lazy(() => import("./Component/Profile/Profile"));
const ProfileUserProvider = lazy(() => import("./Helper/ProfileUserProvider"));
const RoleUserProvider = lazy(() => import("./Helper/RoleUserProvider"));
const Error = lazy(() => import("./Component/Error/Error"));
const HeroPage = lazy(() => import("./Pages/HeroPage"));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <EmailUserProvider>
  <RoleUserProvider>
  <ProfileUserProvider>
  <DataPaygProvider>
  <ChakraProvider>
  <React.StrictMode>
  <BrowserRouter>
  <Suspense fallback={
  <div style={{display : "flex", justifyContent : "center", alignItems : "center", height: "100%", marginTop : "300px"}}>
  <Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='xl'
  />
  </div>}>
  <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/payg' element={<PayG />} />
        <Route path='/paygHome' element={<PaygHome />} />
        <Route path='/paygStatus' element={<PaygStatus />} />
        <Route path='/paygstatusdetail/:id' element={<PaygStatusDetail />} />
        <Route path='/landingpage' element={<HeroPage />} />
        <Route path='/profile' element={<Profile />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </Suspense>
  </BrowserRouter>
  </React.StrictMode>
  </ChakraProvider>
  </DataPaygProvider>
  </ProfileUserProvider>
  </RoleUserProvider>
  </EmailUserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
