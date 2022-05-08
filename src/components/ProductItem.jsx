import React, { Component } from "react";
import { Markup } from "interweave";
import selectPriceToShow from '../utils/selectPriceToShow';
import AttributeList from "./AttributeList";
import { connect } from "react-redux";

class ProductItem extends Component {
    componentDidMount() {
        console.log(this.props.data)
    }

    renderGallery = () => {
        <div className="product-item-gallery">
            {this.props.data.gallery.map((img, index) => 
                <img className="product-item-gallery-option" key={index} src={img} alt="" />    
            )}
        </div>
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
                    {this.props.showGallery && this.renderGallery()}
                    <div className={this.props.showGallery? 'product-img-with-gallery': 'product-img-no-gallery'}>
                        <img className='product-item-img' src={this.props.data.gallery[0]} alt="" />
                    </div>
                </div>
                <div className='product-item-details'>
                    <p className='product-item-title'>{this.props.data.brand + " - " + this.props.data.name}</p>
                    <div className="product-item-attributes">
                        {this.props.data && 
                            <AttributeList 
                                attributes={this.props.data.attributes}
                                options={this.props.data.options} />}
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