import React, { Component } from 'react';

class CartCountIcon extends Component {
    render() { 
        return (
            <div className={this.props.itemCount > 0 ? 'show-cart-product-count': 'hide'}>
                {this.props.itemCount}
            </div>
        )
    }
}
 
export default CartCountIcon;