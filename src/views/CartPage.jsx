import { Component } from 'react';
import CartItemList from '../components/CartItemList';
import { addCartItem, editCartItemOption, removeCartItem, resetCart } from '../store/features/cart/cartSlice';
import { connect } from 'react-redux';
import getTotalPrice from '../utils/getTotalPrice';

class CartPage extends Component {
    handleIncreaseCount = item => {
        this.props.addCartItem({ item })
    }

    handleDecreaseCount = item => {
        this.props.removeCartItem({ item })
    }

    handleSelectAttribute = (item, selection) => {
        this.props.editCartItemOption({ item, selection })
    }

    render() { 
        return (
            <div className='content-wrapper'>
                <p className='title'>CART </p>
                <div className='cart-list'>
                    <div className='cart-menu-items-wrapper'>
                        <CartItemList 
                            cartItems={this.props.cartItems}
                            onSelectAttribute={this.handleSelectAttribute}
                            onIncreaseCount={this.handleIncreaseCount}
                            onDecreaseCount={this.handleDecreaseCount}
                            activeCurrency={this.props.activeCurrency} />
                    </div>
                </div>
                <div className='cart-info'>
                    <p>Taxes: 23%</p>
                    <p>Items: {this.props.cartItems.length}</p>
                    <p>Total: {getTotalPrice(this.props.cartItems, this.props.activeCurrency)+this.props.activeCurrency}</p>
                    <div className='order-btn-wrapper'>
                        <button className='order-btn'>
                            ORDER
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    activeCurrency: state.currency.activeCurrency,
    cartItems: state.cart.items,
})

const mapDispatchToProps = dispatch => ({
    addCartItem: (payload) => dispatch(addCartItem(payload)),
    editCartItemOption: (payload) => dispatch(editCartItemOption(payload)),
    removeCartItem: (payload) => dispatch(removeCartItem(payload)),
    resetCart: () => dispatch(resetCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);