import CartMenuBtn from './CartMenuBtn';
import CartCountIcon from './CartCountIcon';
import React, { Component } from 'react';

class CartMenu extends Component {                               
    render() { 
        return (
            <div className="cart-menu">
                <CartCountIcon productCount={this.props.cartProducts.length} />
                <CartMenuBtn />
            </div>
        );
    }
}
 
export default CartMenu;