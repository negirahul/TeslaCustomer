import React, { useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import { useState } from 'react';
import '../pages/intro.css';
import HeaderBack from '../pages/header-back';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QRCodeScanner from 'react-qr-scanner';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
import Select from 'react-select'

function RegisterWarranty({ userDetails }) {

  const [disabledButton, setdisabledButton] = useState(false);

  useEffect(() => {
    getWarrantyDetails();
    getDealerList();
    getProductDetails();
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

  const [options, setoptions] = useState([]);
  const [dealerList, setDealerList] = useState([]);
  function getDealerList() {
    axios.get(process.env.REACT_APP_ADMIN_URL + 'userList.php?user_type=2').then(function (response) {
      var data = response.data;
      if (data.statusCode === 200) {
        setDealerList(data.data);
        var arr = [];
        data.data.map((item) => (
          arr.push({ value: item.id, label: item.name +' / '+item.mobile_number })
        ))
        setoptions(arr);
      }
    });
  }

  const [productDetails, setProductDetails] = useState([]);
  function getProductDetails() {
    axios.get(process.env.REACT_APP_ADMIN_URL + 'productDetails.php').then(function (response) {
      var data = response.data;
      if (data.statusCode === 200) {
        setProductDetails(data.data);
      }
    });
  }

  const notify = (type, msg) => {
    if(type === 'success')
    toast.success(msg, {position:"top-center", newestOnTop:true, autoClose:5000, closeOnClick:true, rtl:false, pauseOnFocusLoss:true, draggable:true, theme:"dark"});
    else if(type === 'alert')
    toast.warn(msg, {position:"top-center", newestOnTop:true, autoClose:5000, closeOnClick:true, rtl:false, pauseOnFocusLoss:true, draggable:true, theme:"dark"});
    else if(type === 'error')
    toast.error(msg, {position:"top-center", newestOnTop:true, autoClose:5000, closeOnClick:true, rtl:false, pauseOnFocusLoss:true, draggable:true, theme:"dark"});
  }

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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  //qr code scanner
  const [qrCode, setQrCode] = useState('');
  const handleScan = (qrCode) => {
    setQrCode(qrCode);
  };

  const [inputs, setInputs] = useState([]);
  const [billCopy, setBillCopy] = useState();
  const warrantyChange = (event) => {
    console.log(event);
    if (event.target.name === 'bill_copy') {
      let reader = new FileReader();
      reader.onload = function (event) {
        let changeImage = event.target.result;
        setBillCopy(changeImage);
      }
      reader.readAsDataURL(event.target.files[0]);
    } else {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({ ...values, [name]: value }));
      if (name == 'product') {
        productDetails.forEach((employee, index) => {
          if (employee.id == value) {
            setModelDetails(employee.models);
          }
        })
      }
    }
    console.log(inputs);
  }
  const dealerChange = (event) => {
    setInputs(values => ({ ...values, 'dealer': event.value }));
  }
  const [modelDetails, setModelDetails] = useState([]);

  const warrantySubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    if(inputs.dealer === undefined || inputs.dealer === ''){  notify("alert","Please Select Dealer");return;  }
    if(inputs.product === undefined || inputs.product === ''){  notify("alert","Please Select Product");return;  }
    if(inputs.model_no === undefined || inputs.model_no === ''){  notify("alert","Please Enter Model number");return;  }
    if(inputs.product_serial_no === undefined || inputs.product_serial_no === ''){  notify("alert","Please Enter Serial Number");return;  }
    if(inputs.purchase_date === undefined || inputs.purchase_date === ''){  notify("alert","Please Enter Purchase Date");return;  }
    
    setdisabledButton(true);
    axios.post( process.env.REACT_APP_ADMIN_URL + 'customerWarrantyAdd.php', {inputs,billCopy,userDetails}).then(function(response){
      console.log(response.data);
      var data = response.data;
      if(data.statusCode === 200){
        notify("success",data.msg);
      }else if(data.statusCode === 201){
        notify("alert",data.msg);
      }
      event.target.reset();
      setShow(false);
      getWarrantyDetails();
      setdisabledButton(false);
    });
  }

  const [searchValue, setsearchValue] = useState('');
  const inputChange = (event) => {
    const value = event.target.value;
    setsearchValue(value);
  }

  return (
    <div>
      <ToastContainer />
      <HeaderBack />

      <div className="container">

        <div className="">
          <div className="my-3 position-relative">
            <input type="text" name="search" onInput={inputChange} class="form-control" placeholder="Search Product Serial No"/>
            <Icon.Search className="searchIcon"/>
          </div>
        </div>

        <div className="warranty">
        {!warrantyDetails ? ''
          : warrantyDetails.length === 0 ? (
            <div className="empty-box shadow my-4 text-center">
              <img src={require('../img/empty-box.png')} alt="" />
              <h3>No Warranty have been added yet!</h3>
              <p>It's easy to add your product warranty. Just click the button below.</p>
            </div>
          )
            : (warrantyDetails.map((item) => (
              searchValue.length == 0 ?
                <div className="register-warrent shadow d-flex align-items-center my-4">
                  <div className="w-25 wattenty-img">
                    <img src={require('../img/Gringo-Pro-3.png')} className="" alt="" />
                  </div>
                  <div className="warrenty-text w-75">
                    <strong>Product:</strong> {item.product}<br />
                    <strong>Model No.</strong> {item.model_no}<br />
                    <strong>Product Serial No:</strong> {item.product_serial_no}<br />
                    <strong>Warranty</strong><br />
                    <strong>From</strong> {getFormattedDate(item.purchase_date, 'day_month_year')} <strong>To</strong> {getFormattedDate(item.expire_date, 'day_month_year')}<br />
                    <strong>Dealer : </strong> {item.dealer_detail.name} | {item.dealer_detail.mobile_number} | {item.dealer_detail.state_name} | {item.dealer_detail.city_name}<br/>
                    <strong>Status : </strong> 
                    {item.w_status == 0 ? <span className="text-warning">Pending</span> 
                      : item.w_status == 1 ? <span className="text-success">Approved</span> 
                      : <span className="text-danger">Reject</span>
                    }<br/>
                    {item.w_status == 1 ? <Link className="nav-Link open-link open-link-app btn btn-dark btn-sm text-white" to={'../warranty-claim'}>Claim Warranty</Link> : ''}
                  </div>
                </div>
              : (item.product_serial_no.includes(searchValue)) ?
                <div className="register-warrent shadow d-flex align-items-center my-4">
                  <div className="w-25 wattenty-img">
                    <img src={require('../img/Gringo-Pro-3.png')} className="" alt="" />
                  </div>
                  <div className="warrenty-text w-75">
                    <strong>Product:</strong> {item.product}<br />
                    <strong>Model No.</strong> {item.model_no}<br />
                    <strong>Product Serial No:</strong> {item.product_serial_no}<br />
                    <strong>Warranty</strong><br />
                    <strong>From</strong> {getFormattedDate(item.purchase_date, 'day_month_year')} <strong>To</strong> {getFormattedDate(item.expire_date, 'day_month_year')}<br />
                    <strong>Status : </strong> 
                    {item.w_status == 0 ? <span className="text-warning">Pending</span> 
                      : item.w_status == 1 ? <span className="text-success">Approved</span> 
                      : <span className="text-danger">Reject</span>
                    }<br/>
                    {item.w_status == 1 ? <Link className="nav-Link open-link open-link-app btn btn-dark btn-sm text-white" to={'../warranty-claim'}>Claim Warranty</Link> : ''}
                  </div>
                </div>
              : ''
            )))
        }
        </div>

        {/* <button type="button" className="btn-black text-center" onClick={handleShow2}>SCAN QR TO ADD WARRANTY</button> */}
        <button type="button" className="btn-black text-center" onClick={handleShow}>ADD WARRANTY MANUALLY</button>
      </div>


      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Warranty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={warrantySubmit}>
            <div className="mb-3">
              <label htmlFor="dealer" className="form-label">Select Dealer</label>
              {/* <select className="form-control select2" name="dealer" id="dealer" onChange={warrantyChange}>
                <option value="">Select Dealer</option>
                {!dealerList ? <option>Loading data...</option>
                  : dealerList.length === 0 ? <option>No data found</option>
                    : dealerList.map((item) => (
                      <option value={item.id}>{item.name} / {item.mobile_number}</option>
                    ))
                }
              </select> */}
              <Select name="dealer" id="dealer" onChange={dealerChange} options={options} />
            </div>
            <div className="mb-3">
              <label htmlFor="product" className="form-label">Product</label>
              <select className="form-control" name="product" id="product" onChange={warrantyChange}>
                <option value="">Select Product</option>
                {!productDetails ? (
                  <option>Loading data...</option>
                ) : productDetails.length === 0 ? (
                  <option>No data found</option>
                ) : (productDetails.map((item) => (
                  <option value={item.id} data-key={item.models} >{item.name}</option>
                ))
                )}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="model_no" className="form-label">Model No.</label>
              {/* <input type="text" name="model_no" id="model_no" className="form-control" onInput={warrantyChange} /> */}
              <select className="form-control" name="model_no" id="model_no" onChange={warrantyChange}>
                <option value="">Select Model</option>
                {!modelDetails ? (
                  <option>Loading data...</option>
                ) : modelDetails.length === 0 ? (
                  <option>No data found</option>
                ) : (modelDetails.map((item) => (
                  <option value={item.id}>{item.model_name}</option>
                ))
                )}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="product_serial_no" className="form-label">Product Serial No.</label>
              <input type="text" name="product_serial_no" id="product_serial_no" className="form-control" onInput={warrantyChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="purchase_date" className="form-label">Date of Purchase</label>
              <input type="date" name="purchase_date" id="purchase_date" className="form-control" onInput={warrantyChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="bill_copy" className="form-label">Attach Bill Copy</label>
              <input type="file" name="bill_copy" id="bill_copy" className="form-control" onChange={warrantyChange} required />
            </div>
            <Modal.Footer>
              <Button type="submit" variant="primary" className="btn-black-form" disabled={disabledButton}>Submit</Button>
            </Modal.Footer>
          </form>

        </Modal.Body>
      </Modal>

      <Modal show={show2} onHide={handleClose2} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Warranty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QRCodeScanner
            delay={500}
            onScan={handleScan}
            facingMode={1}
            style={{ height: 200, width: 300 }}
          />
          <h1>QR Code: {qrCode}</h1>

        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" className="btn-black-form" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  );
}
export default RegisterWarranty;


