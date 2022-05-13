import React, { Component } from "react";
import { Markup } from "interweave";
import selectPriceToShow from '../utils/selectPriceToShow';
import AttributeList from "./AttributeList";
import { addCartProduct } from '../store/features/cart/cartSlice';
import shouldAddToCart from "../validation/Product/AddProductToCart";
import { connect } from "react-redux";

class ProductItem extends Component {
    state = {
        product: {options: {}},
        showSelectOptionsMessage: false
    }

    componentDidMount() {
        console.log('Product item props', this.props)
        const product = {...this.props.data}
        product.options = {}
        this.setState({ product })
    }

    handleAddToCart = () => {
        console.log('add to cart')
        const { valid, error } = shouldAddToCart(this.state.product)

        if (!valid)
            return this.setState({ showSelectOptionsMessage: true })
    }

    handleSelectAttribute = ({ attribute, value }) => {
        console.log('selected attribute', attribute)

        const product = {...this.state.product}
        if (product.options)
            product.options[attribute] = value
        else 
            product.options = { [attribute]: value }
    
        this.setState({ product })
    }    

    renderSelectOptionsMessage = () => {
        if (this.state.showSelectOptionsMessage && Object.keys(this.state.product.options).length === 0)
            return 'Please select all the required options'

        return ''
    }

    renderGallery = () => {
        <div className="product-item-gallery">
            {this.props.data.gallery.map((img, index) => 
                <img className="product-item-gallery-option" key={index} src={img} alt="" />    
            )}
        </div>
    }

    render() { 
        return (
            <div className="product-item">
                <div className="product-item-left">
                    {this.props.showGallery && this.renderGallery()}
                    <div className={this.props.showGallery? 'product-img-with-gallery': 'product-img-no-gallery'}>
                        <img className='product-item-img' src={this.props.data.gallery[0]} alt="" />
                    </div>
                </div>
                <div className='product-item-details'>
                    <p className='product-item-title'>{this.props.data.brand + " - " + this.props.data.name}</p>
                    <div className="product-item-attributes">
                        <AttributeList 
                            productOptions={this.state.product.options}
                            onSelectAttribute={this.handleSelectAttribute} 
                            attributes={this.props.data.attributes} />
                    </div>
                    <div className="product-item-price-wrapper">
                        <p className="product-item-price">PRICE: </p>
                        <p className="product-item-amount">{selectPriceToShow(this.props.data.prices, this.props.activeCurrency)}</p>
                    </div>
                    <div className="product-item-btn-wrapper">
                        <p className="error-message">
                            {this.renderSelectOptionsMessage()}
                        </p>
                        <button 
                            onClick={() => this.handleAddToCart(this.props.data)} 
                            className="btn action-btn">ADD TO CART</button>
                    </div>
                    <div className="product-item-description">
                        <Markup content={this.props.data.description} />
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);