import React, { Component } from 'react';
import CartItem from './CartItem';

class CartItemList extends Component { 
    componentDidMount() {
        console.log(this.props.cartProducts)
    }

    render() { 
        return (
            <div>
                {this.props.cartProducts.map((item, index) => 
                    <CartItem key={index} data={item} />    
                )}
            </div>
        );
    }
}
 
export default CartItemList;