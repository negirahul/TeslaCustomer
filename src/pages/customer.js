import React from "react";
import '../pages/intro.css';
import HeaderBack from '../pages/header-back';
import * as Icon from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';

function Customer() {

    return (
        <div>
            <HeaderBack />
            <div className="container">
            
            <div className="empty-box shadow my-4 text-center">
                <img src={require('../img/empty-box.png')} alt=""/>
                <h3>No Customers</h3>
                <p>Looks like you have not added any customer to your account.</p>
            </div>

            <div className="shop-item d-flex align-items-center bg-white shadow shop-item-round my-3">
            <div className="cart-text-no w25">
                <img src={require('../img/322285891_623893153007029_2285248259759708472_n.jpg')} className="shop-item-img"  alt=""/>
            </div>
            <div className="cart-text w50">Amit Sharma <span>sohamamit@gmail.com</span> <span>9350210028</span></div>
            <div className="w25"><button type="button" className="cart-item-btn"><Icon.Eye/></button></div>
            </div>

            <div className="shop-item d-flex align-items-center bg-white shadow shop-item-round my-3">
            <div className="cart-text-no w25">
                <img src={require('../img/322285891_623893153007029_2285248259759708472_n.jpg')} className="shop-item-img"  alt=""/>
            </div>
            <div className="cart-text w50">Amit Sharma <span>sohamamit@gmail.com</span> <span>9350210028</span></div>
            <div className="w25"><button type="button" className="cart-item-btn"><Icon.Eye/></button></div>
            </div>

            <div className="shop-item d-flex align-items-center bg-white shadow shop-item-round my-3">
            <div className="cart-text-no w25">
                <img src={require('../img/322285891_623893153007029_2285248259759708472_n.jpg')} className="shop-item-img"  alt=""/>
            </div>
            <div className="cart-text w50">Amit Sharma <span>sohamamit@gmail.com</span> <span>9350210028</span></div>
            <div className="w25"><button type="button" className="cart-item-btn"><Icon.Eye/></button></div>
            </div>


            <Button variant="primary" className="btn-black-form">
            Load More...
          </Button>

            </div>
        </div>
    );
}
export default Customer;