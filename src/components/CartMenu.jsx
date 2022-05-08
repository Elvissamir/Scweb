import CartMenuBtn from './CartMenuBtn';
import CartCountIcon from './CartCountIcon';
import React, { Component } from 'react';

class CartMenu extends Component {                               
    render() { 
        return (
            <div className="cart-menu">
                <CartCountIcon />
                <CartMenuBtn />
            </div>
        );
    }
}
 
export default CartMenu;