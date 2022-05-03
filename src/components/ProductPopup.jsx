import React, { Component } from "react";
import AttributeOptions from './AttributeOptions';

class ProductPopup extends Component {
    renderInfoMessage = () => {
        const { showSelectOptionsMessage, selectOptionsMessage } = this.props
        if (showSelectOptionsMessage && !selectOptionsMessage.attribute)
            return selectOptionsMessage.message
    }

    render() { 
        return (
            <div className={this.props.showProductWindow? 'plp-popup':'hide'}>
                <div className='plp-popup-top'>
                    <button onClick={this.props.onClose} className='plp-popup-close-btn'>X</button>
                </div>
                <div className='plp-popup-content'>
                    <div className='plp-popup-img-wrapper'>
                        <img className='plp-popup-img' src={this.props.currentProduct.gallery[0]} alt="" />
                    </div>
                    <div className='plp-popup-details'>
                        <p className='plp-popup-title'>{this.props.currentProduct.brand + " - " + this.props.currentProduct.name}</p>
                        <div>
                            {this.props.currentProduct && this.props.currentProduct.attributes.map(attribute => 
                                <div key={attribute.name} className='plp-popup-attribute'>
                                    <p className='attribute-name'>{attribute.name.toUpperCase()}:</p>
                                    <div>
                                        <AttributeOptions 
                                            attribute={attribute}
                                            error={this.props.selectOptionsMessage}
                                            showError={this.props.showSelectOptionsMessage}
                                            productOptions={this.props.currentProduct.options}
                                            onSelectAttributeOption={this.props.onSelectAttributeOption} />
                                    </div>
                                </div>    
                            )}
                        </div>
                        <div className="plp-popup-btn-wrapper">
                            <p>
                                {this.renderInfoMessage()}
                            </p>
                            <button onClick={() => this.props.onAddToCart(this.props.currentProduct)} className="btn action-btn">ADD TO CART</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ProductPopup;