import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import '../pages/intro.css';
import Header from '../pages/header';
import { Link, useNavigate } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import { useCookies } from 'react-cookie';
import axios from "axios";

function Dashboard({ userDetails }) {

  const handleClick = () => {
    window.location.replace('https://www.google.com/maps/place/Tesla+Power+USA/@28.4081582,76.9969146,15z/data=!4m8!3m7!1s0x390d3dea485bdd89:0x2431271bcede0307!8m2!3d28.4081582!4d76.9969146!9m1!1b1!16s%2Fg%2F11r70tjnwq?entry=ttu');
  };

  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user']);
  useEffect(() => {
    if (cookies.userId === undefined || cookies.userId === '') {
      navigate("/login");
    }
  }, [navigate])

  if(userDetails.profile_update == 1){
    navigate("/profile");
  }

  useEffect(() => {
    fetchOffer();
    getWalletDetails();
  }, [userDetails])
  const [offer, setOffer] = useState([]);
  function fetchOffer() {
    axios.post(process.env.REACT_APP_ADMIN_URL + 'offerDetails.php', {user_type:userDetails.user_type, user_state:userDetails.state}).then(function (response) {
      var data = response.data;
      if (data.statusCode === 200) {
        setOffer(data.offer);
      }
    });
  }

  const [walletDetails, setWalletDetails] = useState([]);
  function getWalletDetails() {
    axios.get(process.env.REACT_APP_ADMIN_URL + 'walletDetails.php?userId=' + userDetails.id).then(function (response) {
      var data = response.data;
      if (data.statusCode === 200) {
        setWalletDetails(data.data);
      }
    });
  }

  const logout = () => {
    setCookie('userId', '', { path: '/', maxAge: -1 });
    window.location.reload(); 
  }

  const [warrantyDetails, setWarrantyDetails] = useState(0);
  useEffect(() => {
    getWarrantyDetails();
  },[userDetails])
  function getWarrantyDetails(){
    axios.get(process.env.REACT_APP_ADMIN_URL + 'customerWarrantyDetails.php?mobile_number=' + userDetails.mobile_number).then(function (response) {
      var data = response.data;
      if(data.statusCode === 200){
        setWarrantyDetails(data.data.length);
      }
    });
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="profile-box-2">
          <div className="d-flex align-items-center py-4">
            {/* <div className="w-25"><img src={process.env.REACT_APP_ADMIN_URL + 'uploads/profile-images/' + userDetails.profile_image} alt="" className="profile-img" /></div> */}
            <div className="w-25 text-center position-relative">
              <img src={process.env.REACT_APP_ADMIN_URL + 'uploads/profile-images/' + userDetails.profile_image} alt="" className="profile-img" />
              <Link className="btn btn-sm btn-light position-absolute" style={{top: '-15px',right: '15px'}} to={'../profile'}><Icon.Pencil/></Link>
            </div>
            <div className="profile-name w-50">
              {userDetails.name}<span>Valued Customer</span>
              <hr className="my-1"/>
              { userDetails.dealer_name != undefined ? 
                <span>{userDetails.dealer_name} (Dealer)<br/> {userDetails.dealer_mobile_number}</span>  
              : '' }
            </div>
            <div className="drop-btn w-25 text-end">
              {/* <Icon.ThreeDotsVertical /> */}
              <Link className="nav-Link open-link open-link-app" onClick={() => logout()}>
                <div className="button-box shadow">
                  <Icon.BoxArrowRight />
                  <span className="mt-1">LOGOUT</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="wallet-box py-4">
            <div className="d-flex align-items-center">
              <div className="w-25 icon-2"><Icon.Wallet /></div>
              <div className="w-50 wallet-text">{userDetails.walletAmount}<span>Your Wallet Points</span></div>
              <div className="drop-btn w-25 text-white"><Link className="text-white" to={'../wallet'}><Icon.ThreeDotsVertical /></Link></div>
            </div>
          </div>

          <div className="py-4">

            <div className="row g-0 row-eq-height justify-content-center">
              <div className="col-3 my-auto">
                <Link className="nav-Link open-link open-link-app" to={'../register-warranty'}>
                  <div className="button-box shadow">
                    <Icon.AwardFill />
                    <span>Register Warranty</span>
                  </div>
                </Link>
              </div>

              <div className="col-3 my-auto">
                <Link className="nav-Link open-link open-link-app" to={'../raising-complaint'}>
                  <div className="button-box shadow">
                    <Icon.FilterSquare />
                    <span>Service Complaint</span>
                  </div>
                </Link>
              </div>

              {/* <div className="col-3 my-auto">
                <Link className="nav-Link open-link open-link-app" to={'../warranty-claim'}>
                  <div className="button-box shadow">
                    <Icon.PencilSquare />
                    <span>Warranty Claim</span>
                  </div>
                </Link>
              </div> */}

              {/* <div className="col-3 my-auto">
                <Link className="nav-Link open-link open-link-app" to={'../wallet'}>
                  <div className="button-box shadow">
                    <Icon.Wallet2 />
                    <span>Manage Wallet</span>
                  </div>
                </Link>
              </div> */}




              {/* <div className="col-3 my-auto">
                <Link className="nav-Link open-link open-link-app" to={'../profile'}>
                  <div className="button-box shadow">
                    <Icon.Person />
                    <span>Manage Profile</span>
                  </div>
                </Link>
              </div> */}

              {/* <div className="col-3 my-auto">
                <Link className="nav-Link open-link open-link-app" onClick={handleClick}>
                  <div className="button-box shadow">
                    <Icon.StarHalf />
                    <span>Rate<br />Us</span>
                  </div>
                </Link>
              </div> */}

              {/* <div className="col-3 my-auto">
                <Link className="nav-Link open-link open-link-app" to={'../other-features'}>
                  <div className="button-box shadow">
                    <Icon.Share />
                    <span>Reffer a Friend</span>
                  </div>
                </Link>
              </div> */}

              <div className="col-3 my-auto">
                <Link className="nav-Link open-link open-link-app" to={'../offers'}>
                  <div className="button-box shadow">
                    <Icon.Gift />
                    <span>On-going Schemes</span>
                  </div>
                </Link>
              </div>

            </div>

            {!offer ? ''
              : offer.length === 0 ? ''
                : <div className="main-slider mt-4">
                  <Splide className="my-carousel" aria-label="Main text slider" options={{
                    rewind: true,
                    autoplay: true,
                    arrows: false,
                    pagination: true,
                  }}>
                    {offer.map((item) =>
                      <SplideSlide>
                        <div className="">
                          <div className="text-center">
                            <img src={process.env.REACT_APP_ADMIN_URL + item.banner} className="w-100" alt="" />
                          </div>
                        </div>
                      </SplideSlide>
                    )}
                  </Splide>
                </div>
            }

          </div>

        </div>


      </div>
    </div>
  );
}
export default Dashboard;