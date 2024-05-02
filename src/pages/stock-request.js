import React from "react";
import { useState } from 'react';
import '../pages/intro.css';
import HeaderBack from '../pages/header-back';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import * as Icon from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function StockRequest() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    
    return (
        <div>
            <HeaderBack />
            <div className="container">
             <div className="mt-4"> 
            <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="home" title="New Order">
        <div className="bg-white shadow tab-body-edit">
           
        <div className="empty-box shadow my-4 text-center">
                <img src={require('../img/empty-box.png')} alt=""/>
                <h3>No Orders Yet</h3>
                <p>Looks like you have not placed/ receive any stock yet!.</p>
            </div>
        
        <div className="shop-item d-flex align-items-center">
            <div className="cart-text-no w25">1.</div>
            <div className="cart-text w50">Invertor Battery <span>Model No. XYZ123 | Qty: 1</span></div>
            <div className="w25"><button type="button" className="cart-item-btn"><Icon.Trash3/></button></div>
        </div>

        <div className="shop-item d-flex align-items-center">
            <div className="cart-text-no w25">2.</div>
            <div className="cart-text w50">Two Wheeler Battery <span>Model No. XYZ123 | Qty: 1</span></div>
            <div className="w25"><button type="button" className="cart-item-btn"><Icon.Trash3/></button></div>
        </div>
        <div className="mb-3">
                    <label for="" className="form-label">Upload Bill Copy</label>
                    <input type="file" name="" className="form-control" value=""/>
                </div>

        <hr/>
        <Button variant="primary" className="btn-black-form mb-3">
            CONFIRM ORDER
          </Button>
        <Button variant="primary" className="btn-black-form" onClick={handleShow}>
            <Icon.Basket className="me-2"/>ADD ITEM IN CART
          </Button>

        </div>
      </Tab>
      <Tab eventKey="profile" title="Previous Order">
      <div className="bg-white shadow tab-body-edit">
           
      <div className="empty-box shadow my-4 text-center">
                <img src={require('../img/empty-box.png')} alt=""/>
                <h3>No Orders</h3>
                <p>No record available in your order history.</p>
            </div>
        
        <div className="shop-item d-flex align-items-center">
            <div className="cart-text-no w25">1.</div>
            <div className="cart-text w50">Product: 25 | Qty: 40 <span>27 Oct 2023 | Order Placed</span></div>
            <div className="cart-icon w25 text-success">
              <Icon.Check2Circle/>
            </div>
        </div>
        <div className="w-100"><button type="button" className="cart-item-btn cart-item-forn w-100" onClick={handleShow2}>View Details / Approved Bill</button>
            </div>

            <div className="shop-item d-flex align-items-center">
            <div className="cart-text-no w25">1.</div>
            <div className="cart-text w50">Product: 25 | Qty: 40 <span>27 Oct 2023 | Order Placed</span></div>
            <div className="cart-icon w25 text-info">
              <Icon.ArrowClockwise/>
            </div>
        </div>
        <div className="w-100"><button type="button" className="cart-item-btn cart-item-forn w-100" onClick={handleShow2}>View Details / Approved Bill</button>
            </div>

        </div>
      </Tab>
    </Tabs>
    </div>

            </div>


            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div className="mb-3">
                    <label for="" className="form-label">Select Category</label>
                    <select className="form-control">
                      <option value="">Select Category</option>  
                      <option value="">Invertor Battery</option>
                      <option value="">Truck Battery</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label for="" className="form-label">Select Model</label>
                    <select className="form-control">
                      <option value="">Select Model</option>  
                      <option value="">XYZ125</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label for="" className="form-label">Qty.</label>
                    <input type="text" name="" className="form-control" value=""/>
                </div>
                <div className="mb-3">
                    <label for="" className="form-label">Any Remark</label>
                    <textarea name="" className="form-control" value=""></textarea>
                </div>
            </form>

        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" className="btn-black-form" onClick={handleClose}>
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={show2} onHide={handleClose2} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="text-center">
            <h6>Order Date: 27 Oct 2023<br/>
            Status: Placed</h6>
            </div>
           <hr/>

           <div className="shop-item d-flex align-items-center">
            <div className="cart-text-no w25">1.</div>
            <div className="cart-text w50">Invertor Battery <span>Model No. XYZ123 | Qty: 1</span></div>
            <div className="w25"><button type="button" className="cart-item-btn"><Icon.CheckAll/></button></div>
        </div>

        <div className="shop-item d-flex align-items-center">
            <div className="cart-text-no w25">2.</div>
            <div className="cart-text w50">Car Battery <span>Model No. XYZ123 | Qty: 1</span></div>
            <div className="w25"><button type="button" className="cart-item-btn"><Icon.CheckAll/></button></div>
        </div>

        <div className="shop-item d-flex align-items-center">
            <div className="cart-text-no w25">3.</div>
            <div className="cart-text w50">Bike Battery <span>Model No. XYZ123 | Qty: 1</span></div>
            <div className="w25"><button type="button" className="cart-item-btn"><Icon.CheckAll/></button></div>
        </div>
        <button type="button" className="cart-item-btn cart-item-forn w-100">View Bill</button>
        <button type="button" className="cart-item-btn cart-item-forn w-100 mt-3">Approve Bill</button>
        </Modal.Body>
      </Modal>


      

        </div>
    );
}
export default StockRequest;