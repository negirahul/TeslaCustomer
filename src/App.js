import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Intro from './pages/intro';
import Login from './pages/login';
import Register from './pages/register';
import Forgot from './pages/forgot-password';
import Dashboard from './pages/dashboard';
import RegisterWarranty from './pages/register-warranty';
import ReisingComplaint from './pages/raising-complaint';
import WarrantyClaim from './pages/warranty-claim';
import Wallet from './pages/wallet';
import Profile from './pages/profile';
import OtherFeature from './pages/other-features';
import Offers from './pages/offers';

import { useState, useEffect  } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';

function App() {

  const [userDetails,setUserDetails] = useState(false);
  const [cookies, setCookie] = useCookies(['user']);
  function getUsers() {
    axios.get( process.env.REACT_APP_ADMIN_URL + 'user-detail.php?userId='+cookies.userId+'&userType=1').then(function(response) {
      var data = response.data;
      if(data.statusCode === 200){
        setUserDetails(data.userData);
      }else{
        setCookie('userId', '', { path: '/', maxAge: -1});
        window.location.reload();
      }
    });
  }
  useEffect(() => {
    if(cookies.userId !== undefined && cookies.userId !== ''){
      getUsers();
    }
  },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Intro />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
		      <Route path="forgot-password" element={<Forgot />} />
          <Route path="dashboard" element={<Dashboard userDetails={userDetails}/>} />
          <Route path="register-warranty" element={<RegisterWarranty userDetails={userDetails}/>} />
          <Route path="raising-complaint" element={<ReisingComplaint userDetails={userDetails}/>} />
          <Route path="warranty-claim" element={<WarrantyClaim userDetails={userDetails}/>} />
          <Route path="wallet" element={<Wallet userDetails={userDetails}/>} />
          <Route path="profile" element={<Profile userDetails={userDetails}/>} />
          <Route path="other-features" element={<OtherFeature userDetails={userDetails}/>} />
          <Route path="offers" element={<Offers userDetails={userDetails}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
