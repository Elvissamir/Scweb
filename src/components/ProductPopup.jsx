import React, { Component } from "react";
import ProductItem from './ProductItem';
import { addCartProduct } from '../store/features/cart/cartSlice';
import { connect } from "react-redux";

class ProductPopup extends Component {
    componentDidMount () {
        console.log('product popup', this.props)
    }

    addAttributeValue = (attributeName, value) => e => {
        const product = {...this.state.currentProduct}

        if (product.options)
            product.options[attributeName] = value
        else 
            product.options = { [attributeName]: value }

        this.setState({ currentProduct: product })
    }

    handleAddToCart = () => {
        console.log('add to cart')
    }

    render() {
        return (
            <div className={this.props.showProductWindow? 'plp-popup':'hide'}>
                <div className='plp-popup-top'>
                    <button onClick={this.props.onClose} className='plp-popup-close-btn'>X</button>
                </div>
                <div className='plp-popup-content'>
                    <ProductItem 
                        data={this.props.currentProduct} 
                        showGallery={false}
                        activeCurrency={this.props.activeCurrency}
                        onSelectAttributeOption={this.props.onSelectAttributeOption}
                        onAddToCart={this.handleAddToCart} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    activeCurrency: state.currency.activeCurrency,
    cart: state.cart.products,
})

const mapDispatchToProps = dispatch => ({
    addCartProduct: (payload) => dispatch(addCartProduct(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductPopup);