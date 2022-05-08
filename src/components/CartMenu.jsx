import CartMenuBtn from './CartMenuBtn';
import React, { Component } from 'react';

class CartMenu extends Component {     
    handleShowCartMenu = () => {
        console.log('Show cart menu')
    }

    render() { 
        return (
            <div className='cart-menu'>
                <CartMenuBtn 
                    onShowCartMenu={this.handleShowCartMenu}
                    productCount={this.props.cartProducts.length} />

            </div>
        );
    }
}
 
export default CartMenu;