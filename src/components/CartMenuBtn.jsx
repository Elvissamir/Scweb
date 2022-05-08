import React, { Component } from 'react';
import CartCountIcon from './CartCountIcon';

class CartMenuBtn extends Component {
    handleShowCartMenu = () => {
        console.log('Show cart menu')
    }

    render() { 
        return (
            <button onClick={this.handleShowCartMenu} className='cart-btn'>
                <img className='cart-btn-svg' src="/imgs/shopping.svg" alt="" />
                <CartCountIcon productCount={this.props.productCount} />
            </button>
        );
    }
}
 
export default CartMenuBtn;