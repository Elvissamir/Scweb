import React, { Component } from 'react';

class CartCountIcon extends Component {
    renderCartProductCount = () => {
        if (this.props.cartProducts.length > 0)
            return <div className='cart-product-count'>{this.props.cartProducts.length}</div>
    }

    render() { 
        return this.renderCartProductCount();
    }
}
 
export default CartCountIcon;