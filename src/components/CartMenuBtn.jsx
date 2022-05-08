import React, { Component } from 'react';
import CartCountIcon from './CartCountIcon';

class CartMenuBtn extends Component {
    componentDidMount() {
        console.log('menu btn', this.props)
    }

    render() { 
        return (
            <button onClick={this.props.onShowCartMenu} className='cart-btn'>
                <img className='cart-btn-svg' src="/imgs/shopping.svg" alt="" />
                <CartCountIcon productCount={this.props.productCount} />
            </button>
        );
    }
}
 
export default CartMenuBtn;