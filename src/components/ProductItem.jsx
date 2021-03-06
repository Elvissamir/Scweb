import React, { Component } from "react";
import ProductGallery from './ProductGallery';
import AttributeList from "./AttributeList";
import { Markup } from "interweave";
import selectPriceToShow from '../utils/selectPriceToShow';
import { addCartItem } from '../store/features/cart/cartSlice';
import shouldAddToCart from "../validation/Product/AddProductToCart";
import mapProductToCartItem from '../utils/mapProductToCartItem';
import { connect } from "react-redux";

class ProductItem extends Component {
    state = {
        activeIndex: 0,
        product: {options: {}},
        attributeError: {},
    }

    componentDidMount() {
        this.productInit()
    }

    productInit = () => {
        const product = {...this.props.data}
        product.options = {}
        this.setState({ product })
    }

    handleAddToCart = () => {
        const error = shouldAddToCart(this.state.product)

        if (!error) {
            const cartItem = mapProductToCartItem(this.state.product)
            this.props.addCartItem({ item: cartItem })

            this.productInit()
            return this.props.onAddedToCart()
        }

        this.setState({ attributeError: error })
    }

    handleSelectImage = index => {
        this.setState({ activeIndex: index })
    }

    handleSelectAttribute = ({ attribute, value }) => {
        const product = {...this.state.product}
        if (product.options)
            product.options[attribute] = value
        else 
            product.options = { [attribute]: value }

        if (this.state.attributeError.attribute === attribute)
            this.setState({ attributeError: {} })
            
        this.setState({ product })
    }    

    render() { 
        return (
            <div className="product-item">
                <div className="product-item-left">
                    {this.props.showGallery && 
                        <ProductGallery 
                            activeIndex={this.state.activeIndex}
                            onSelectImage={this.handleSelectImage}
                            gallery={this.props.data.gallery} />}
                    <div className={this.props.showGallery? 'product-img-with-gallery': 'product-img-no-gallery'}>
                        {this.props.data.gallery.map((image, index) => 
                            <img 
                                className={this.state.activeIndex === index? 'product-item-img':'hide'} 
                                key={index}
                                src={image} alt="" />
                        )}
                    </div>
                </div>
                <div className='product-item-details'>
                    <p className='product-item-title'>{this.props.data.brand + " - " + this.props.data.name}</p>
                    <div className="product-item-attributes">
                        <AttributeList 
                            productOptions={this.state.product.options}
                            onSelectAttribute={this.handleSelectAttribute} 
                            isInCart={false}
                            attributes={this.props.data.attributes} 
                            error={this.state.attributeError}/>
                    </div>
                    <div className="product-item-price-wrapper">
                        <p className="product-item-price">PRICE: </p>
                        <p className="product-item-amount">{selectPriceToShow(this.props.data.prices, this.props.activeCurrency)}</p>
                    </div>
                    <div className="product-item-btn-wrapper">
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
})

const mapDispatchToProps = dispatch => ({
    addCartItem: (payload) => dispatch(addCartItem(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);