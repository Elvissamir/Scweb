import React, { Component } from 'react';
import CartItemList from './CartItemList';

class CartMenu extends Component {     
    handleIncreaseCount = item => {
        return this.props.onAddCartItem(item)
    }

    handleDecreaseCount = item => {
        console.log('handle decrease count')
        return this.props.onRemoveCartItem(item)
    }

    render() {
        return (
            <div className='cart-menu'>
                <div className='cart-menu-top'>
                    <p className='cart-menu-bag-text'>My Bag</p>
                    <p className='cart-menu-count'>{this.props.cartItems.length} items</p>
                </div>
                <div className='cart-menu-items-wrapper'>
                    <CartItemList 
                        cartItems={this.props.cartItems}
                        onSelectAttribute={this.props.onSelectAttribute}
                        onIncreaseCount={this.handleIncreaseCount}
                        onDecreaseCount={this.handleDecreaseCount}
                        activeCurrency={this.props.activeCurrency} />
                </div>
                <div className='cart-menu-total'>
                    <p>Total</p>
                    <p>$200</p>
                </div>
                <div className='cart-menu-bottom-wrapper'>
                    <div className='cart-menu-bottom'>
                        <button className='cart-menu-view-bag'>VIEW BAG</button>
                        <button className='cart-menu-checkout'>CHECK OUT</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CartMenu