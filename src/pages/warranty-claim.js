import React, {useEffect} from "react";
import { useSearchParams } from "react-router-dom"
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../pages/intro.css';
import HeaderBack from '../pages/header-back';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";

function WarrantyClaim({ userDetails }) {

  const getFormattedDate = (ddate, type) => {
    let dd = new Date(ddate);

    let day = dd.getDate();
    let month = dd.toLocaleString('en-US', { month: 'short' });
    let year = dd.getFullYear();

    if (type === 'day')
      return day
    else if (type === 'month')
      return month
    else if (type === 'year')
      return year
    else if (type === 'day_month_year')
      return day + ' ' + month + ' ' + year
    else if (type === 'month_year')
      return month + ' ' + year
  }

  const notify = (type, msg) => {
    if(type === 'success')
    toast.success(msg, {position:"top-center", newestOnTop:true, autoClose:5000, closeOnClick:true, rtl:false, pauseOnFocusLoss:true, draggable:true, theme:"dark"});
    else if(type === 'alert')
    toast.warn(msg, {position:"top-center", newestOnTop:true, autoClose:5000, closeOnClick:true, rtl:false, pauseOnFocusLoss:true, draggable:true, theme:"dark"});
    else if(type === 'error')
    toast.error(msg, {position:"top-center", newestOnTop:true, autoClose:5000, closeOnClick:true, rtl:false, pauseOnFocusLoss:true, draggable:true, theme:"dark"});
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getWarrantyDetails();
    getWarrantyClaimDetails();
  }, [userDetails])

  const [warrantyDetails, setWarrantyDetails] = useState([]);
  function getWarrantyDetails() {
    axios.get(process.env.REACT_APP_ADMIN_URL + 'customerWarrantyDetails.php?mobile_number=' + userDetails.mobile_number).then(function (response) {
      var data = response.data;
      if (data.statusCode === 200) {
        setWarrantyDetails(data.data);
      }
    });
  }

  const [claimDetails, setWarrantyClaimDetails] = useState([]);
  function getWarrantyClaimDetails() {
    axios.get(process.env.REACT_APP_ADMIN_URL + 'claimDetails.php?id=' + userDetails.id).then(function (response) {
      var data = response.data;
      if (data.statusCode === 200) {
        setWarrantyClaimDetails(data.data);
      }
    });
  }

  const [inputs, setInputs] = useState([]);
  const handleSelect = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == 'product') {
      setInputs(values => ({ ...values, [name]: warrantyDetails[value] }));
    }else{
      setInputs(values => ({ ...values, [name]: value }));
    }
    setShow(true);
  }

  const claimSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    if(inputs.product === undefined || inputs.product === ''){  notify("alert","Please Select Product");return;  }
    if(inputs.reason === undefined || inputs.reason === ''){  notify("alert","Please Select Reason");return;  }
    if(inputs.message === undefined || inputs.message === ''){  notify("alert","Please Enter Message");return;  }
    
    axios.post( process.env.REACT_APP_ADMIN_URL + 'warrantyclaimSubmit.php', {inputs, userDetails}).then(function(response){
      console.log(response.data);
      var data = response.data;
      if(data.statusCode === 200){
        notify("success",data.msg);
      }else if(data.statusCode === 201){
        notify("alert",data.msg);
      }
      event.target.reset();
      setShow(false);
      getWarrantyClaimDetails();
    });      
  }

  return (
    <div>
      <ToastContainer />
      <HeaderBack />
      <div className="container warranty">
        <div className="empty-box shadow my-4">
          <div className="mb-3">
            <label htmlFor="" className="form-label">Select Product</label>
            <select className="form-control" name="product" onChange={handleSelect}>
              <option value="">Select Product</option>
              {/* <option>Model: TPUX12456T</option>
              <option>Model: TPUZ12455T</option>
              <option>Model: TPUP89646T</option> */}
              {!warrantyDetails ? ''
                : warrantyDetails.length === 0 ? ''
                : warrantyDetails.map((item, index) => (
                  item.w_status == 1 ? <option value={index}>{item.product} / {item.model_no}</option> : ''
                ))
              }
            </select>
          </div>
        </div>

        {!claimDetails ? ''
          : claimDetails.length == 0 ? 
            <div className="empty-box shadow my-4 text-center">
              <img src={require('../img/empty-box.png')} alt="" />
              <h3>No Claims</h3>
              <p>No Claims Submited Yet!</p>
            </div>
          : claimDetails.map((item) => 
            <div className="empty-box-2 shadow my-4 text-center">
              <h5>Product: {item.warranty_detail.product}<br/>Model: {item.warranty_detail.model_no}</h5>
              <span>Warranty From {getFormattedDate(item.warranty_detail.purchase_date, 'day_month_year')} To {getFormattedDate(item.warranty_detail.expire_date, 'day_month_year')}</span>
              <hr />
              <div className="d-flex align-items-center icon-box-4">
                <div className="w-50 text-center border-end" >{getFormattedDate(item.ddate, 'day_month_year')}</div>
                <div className="w-50 text-center text-success" >{item.claim_status==0 ? 'Under Process' : ''}</div>
              </div>
            </div>
            )
        }
        
      </div>



      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Claim Warranty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={claimSubmit}>
            <div className="text-center">
              {!inputs.product ? '' 
                : <>
                  <h5>Selected Product:<br />{inputs.product.product} / {inputs.product.model_no}</h5>
                  <p>Warranty From {getFormattedDate(inputs.product.purchase_date, 'day_month_year')} To {getFormattedDate(inputs.product.expire_date, 'day_month_year')}<br /></p>
                </>
              }
            </div>
            <hr />
            <div className="mb-3">
              <label htmlFor="reason" className="form-label">Select Reason</label>
              <select className="form-control" name="reason" id="reason" onChange={handleSelect} required>
                <option value="">Select Any One</option>
                <option value="Damage Product">Damage Product</option>
                <option value="Charging and other charging issue">Charging and other charging issue</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Any Message</label>
              <textarea rows="" className="form-control" name="message" id="message" onInput={handleSelect}></textarea>
            </div>
            <Modal.Footer>
              <Button variant="primary" type="submit" className="btn-black-form">Submit</Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      <button type="button" className="btn-black text-center" onClick={handleShow}>CLAIM WARRANTY</button>

    </div>
  );
}
export default WarrantyClaim;

