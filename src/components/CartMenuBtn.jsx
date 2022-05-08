import React, { Component } from 'react';

class CartMenuBtn extends Component {
    render() { 
        return (
            <button className='cart-btn'>
                <img className='cart-btn-svg' src="/imgs/shopping.svg" alt="" />
            </button>
        );
    }
}
 
export default CartMenuBtn;