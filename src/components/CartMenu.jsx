import CartMenuBtn from './CartMenuBtn';
import React, { Component } from 'react';

class CartMenu extends Component {                               
    render() { 
        return (
            <div className="cart-menu">
                <CartMenuBtn productCount={this.props.cartProducts.length} />
            </div>
        );
    }
}
 
export default CartMenu;