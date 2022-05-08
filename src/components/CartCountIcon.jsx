import React, { Component } from 'react';

class CartCountIcon extends Component {
    componentDidMount () {
        console.log(this.props)
    }

    render() { 
        return (
            <div className={this.props.productCount > 0 ? 'show-cart-product-count': 'hide'}>
                {this.props.productCount}
            </div>
        )
    }
}
 
export default CartCountIcon;