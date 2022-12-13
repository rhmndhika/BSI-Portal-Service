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
import ProfileSosmedProvider from './Helper/ProfileSosmedProvider';
import PostSosmedProvider from './Helper/PostSosmed';
import RequireAuth from './RequireAuth';
import { AuthProvider } from './Helper/AuthProvider';

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
const Outsourcing = lazy(() => import("./Component/OutsourcingPortal/Home"));
const OutsourcingProvider = lazy(() => import("./Helper/OutsourcingPortalProvider"));
const OutsourcingDetail = lazy(() => import("./Component/OutsourcingPortal/OutsourcingDetail"));
const VendorRegistrationProvider = lazy(() => import("./Helper/VendorRegistrationProvider"));
const RegistrationInput = lazy(() => import("./Component/VendorRegistration/InputDataVendor"));
const RegistrationHistory = lazy(() => import("./Component/VendorRegistration/History"));
const RegistrationHistoryDetail = lazy(() => import("./Component/VendorRegistration/HistoryDetail"));
const ProgressOutsourcing = lazy(() => import("./Component/OutsourcingPortal/Progress"));
const ChatIO = lazy(() => import("./Component/ChatIO/ChatIO"));
const SocialMedia = lazy(() => import("./Pages/SocialMedia"));
const PostDetails = lazy(() => import("./Pages/PostDetails"));
const LiveChat = lazy(() => import("./Component/ChatIO/LiveChat"));
const SosmedProfile = lazy(() => import("./Component/SocialMedia/ProfileDetails"));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <EmailUserProvider>
  <RoleUserProvider>
  <OutsourcingProvider>
  <ProfileUserProvider>
  <VendorRegistrationProvider>
  <DataPaygProvider>
  <ProfileSosmedProvider>
  <PostSosmedProvider>
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
      <Route element={<ProtectedRoutes />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/landingpage' element={<HeroPage />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/payg' element={<PayG />} />
        <Route path='/paygHome' element={<PaygHome />} />
        <Route path='/paygStatus' element={<PaygStatus />} />
        <Route path='/paygstatusdetail/:id' element={<PaygStatusDetail />} />
        <Route path='/outsourcing' element={<Outsourcing />} />
        <Route path='/outsourcingdetail/:id' element={<OutsourcingDetail />} />
        <Route path='/inputdatavendor' element={<RegistrationInput />} />
        <Route path='/registrationhistory' element={<RegistrationHistory />} />
        <Route path='/registrationhistory/:id' element={<RegistrationHistoryDetail />} />
        <Route path='/chatio' element={<ChatIO />} />
        <Route path='/livechat' element={<LiveChat />} />
        <Route path='/progress' element={<ProgressOutsourcing />} />
        <Route path='/socialmedia/home' element={<SocialMedia />} />
        <Route path='/socialmedia/:id' element={<PostDetails />} />
        <Route path='/socialmedia/profile/:id' element={<SosmedProfile />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  </Suspense>
  </BrowserRouter>
  </React.StrictMode>
  </ChakraProvider>
  </PostSosmedProvider>
  </ProfileSosmedProvider>
  </DataPaygProvider>
  </VendorRegistrationProvider>
  </ProfileUserProvider>
  </OutsourcingProvider>
  </RoleUserProvider>
  </EmailUserProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
