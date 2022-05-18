import React, { Component } from 'react';
import CartItemList from './CartItemList';
import { Link } from 'react-router-dom';
import routes from '../routes';
import getTotalPrice from '../utils/getTotalPrice';
import getItemsCount from '../utils/getItemsCount';

class CartMenu extends Component {     
    handleIncreaseCount = item => {
        this.props.onAddCartItem(item)
    }

    handleDecreaseCount = item => {
        this.props.onRemoveCartItem(item)
    }

    render() {
        if (this.props.show) {
            return (
                <div className='cart-menu'>
                    <div className='cart-menu-top'>
                        <p className='cart-menu-bag-text'>My Bag</p>
                        <p className='cart-menu-count'>{getItemsCount(this.props.cartItems)} items</p>
                    </div>
                    <div className='cart-menu-items-wrapper'>
                        <CartItemList 
                            cartItems={this.props.cartItems}
                            inMenu={true}
                            onSelectAttribute={this.props.onSelectAttribute}
                            onIncreaseCount={this.handleIncreaseCount}
                            onDecreaseCount={this.handleDecreaseCount}
                            activeCurrency={this.props.activeCurrency} />
                    </div>
                    <div className='cart-menu-total'>
                        <p>Total: </p>
                        <p>{getTotalPrice(this.props.cartItems, this.props.activeCurrency) + this.props.activeCurrency }</p>
                    </div>
                    <div className='cart-menu-bottom-wrapper'>
                        <div className='cart-menu-bottom'>
                            <Link 
                                to={ routes.cart } 
                                replace={true} 
                                className='cart-menu-view-bag'>
                                VIEW BAG
                            </Link>
                            <button 
                                onClick={this.props.onCheckout} 
                                className='cart-menu-checkout'>CHECK OUT</button>
                        </div>
                    </div>
                </div>
            )
        }

        return <div className='hide'></div>
    }
}

export default CartMenu