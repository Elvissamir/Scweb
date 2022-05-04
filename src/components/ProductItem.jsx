import React, { Component } from "react";
import AttributeOptions from './AttributeOptions';
import { Markup } from "interweave";
import selectPriceToShow from '../utils/selectPriceToShow';
import { connect } from "react-redux";

class ProductItem extends Component {
    componentDidMount() {
        console.log(this.props.data)
    }

    renderInfoMessage = () => {
        const { showSelectOptionsMessage, selectOptionsMessage } = this.props
        if (showSelectOptionsMessage && selectOptionsMessage.message && !selectOptionsMessage.attribute)
            return selectOptionsMessage.message
    }

    renderAttributeInfo = attribute => {
        const { showSelectOptionsMessage, selectOptionsMessage } = this.props
        if (selectOptionsMessage.attribute && showSelectOptionsMessage) {
            if (attribute.name === selectOptionsMessage.attribute)
                return selectOptionsMessage.message
        }
    }

    render() { 
        return (
            <div className="product-item">
                <div className="product-item-left">
                    <div className="product-item-gallery">
                        {this.props.data.gallery.map((img, index) => 
                            <img className="product-item-gallery-option" key={index} src={img} alt="" />    
                        )}
                    </div>
                    <div className='product-item-img-wrapper'>
                        <img className='product-item-img' src={this.props.data.gallery[0]} alt="" />
                    </div>
                </div>
                <div className='product-item-details'>
                    <p className='product-item-title'>{this.props.data.brand + " - " + this.props.data.name}</p>
                    <div>
                        { this.props.data && this.props.data.attributes.map(attribute => 
                            <div key={attribute.name} className='product-item-attribute'>
                                <p className='attribute-name'>{attribute.name.toUpperCase()}:</p>
                                <div>
                                    <AttributeOptions 
                                        attribute={attribute}
                                        productOptions={this.props.data.options}
                                        onSelectAttributeOption={this.props.onSelectAttributeOption} />
                                </div>
                                <div className="error-message">{this.renderAttributeInfo(attribute)}</div>
                            </div>    
                        )}
                    </div>
                    <div className="product-item-price-wrapper">
                        <p className="product-item-price">PRICE: </p>
                        <p className="product-item-amount">{selectPriceToShow(this.props.data.prices, this.props.activeCurrency)}</p>
                    </div>
                    <div className="product-item-btn-wrapper">
                        <p className="error-message">
                            {this.renderInfoMessage()}
                        </p>
                        <button 
                            onClick={() => this.props.onAddToCart(this.props.data)} 
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
    activeCurrency: state.currency.activeCurrency
})
 
export default connect(mapStateToProps)(ProductItem);