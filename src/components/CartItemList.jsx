import React, { Component } from 'react';
import CartItem from './CartItem';

class CartItemList extends Component { 
    render() { 
        return (
            <div className='cart-item-list-wrapper'>
                {this.props.cartItems.map((item, index) => 
                    <CartItem 
                        key={index} 
                        data={item}
                        onSelectAttribute={this.props.onSelectAttribute}
                        activeCurrency={this.props.activeCurrency} 
                        onIncreaseCount={this.props.onIncreaseCount}/>
                )}
            </div>
        );
    }
}
 
export default CartItemList;