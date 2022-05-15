import React, { Component } from 'react';
import CartCountIcon from './CartCountIcon';

class CartMenuBtn extends Component {
    handleShowCartMenu = () => {
       
    }

    render() { 
        return (
            <button onClick={this.handleShowCartMenu} className='cart-btn'>
                <img className='cart-btn-svg' src="/imgs/shopping.svg" alt="" />
                <CartCountIcon itemCount={this.props.itemCount} />
            </button>
        );
    }
}
 
export default CartMenuBtn;