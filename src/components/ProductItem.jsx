import React, { Component } from "react";
import AttributeOptions from './AttributeOptions';

class ProductItem extends Component {
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
                <div className='product-item-img-wrapper'>
                    <img className='product-item-img' src={this.props.data.gallery[0]} alt="" />
                </div>
                <div className='product-item-details'>
                    <p className='product-item-title'>{this.props.data.brand + " - " + this.props.data.name}</p>
                    <div>
                        {this.props.data.attributes.map(attribute => 
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
                    <div className="product-item-btn-wrapper">
                        <p className="error-message">
                            {this.renderInfoMessage()}
                        </p>
                        <button 
                            onClick={() => this.props.onAddToCart(this.props.data)} 
                            className="btn action-btn">ADD TO CART</button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ProductItem;