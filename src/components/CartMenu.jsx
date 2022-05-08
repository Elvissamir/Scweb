import React, { Component } from 'react';
import CartItemList from './CartItemList';

class CartMenu extends Component {     
    render() { 
        return (
            <div className='cart-menu'>
                <div className='cart-menu-top'>
                    <p className='cart-menu-bag-text'>My Bag</p>
                    <p className='cart-menu-count'>{this.props.cartProducts.length}</p>
                </div>
                <div className='cart-menu-items-wrapper'>
                    <CartItemList cartProducts={this.props.cartProducts} />
                </div>
            </div>
        );
    }
}
 
export default CartMenu;