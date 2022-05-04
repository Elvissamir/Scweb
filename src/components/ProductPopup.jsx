import React, { Component } from "react";
import AttributeOptions from './AttributeOptions';

class ProductPopup extends Component {
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
            <div className={this.props.showProductWindow? 'plp-popup':'hide'}>
                <div className='plp-popup-top'>
                    <button onClick={this.props.onClose} className='plp-popup-close-btn'>X</button>
                </div>
                <div className='plp-popup-content'>
                    
                </div>
            </div>
        );
    }
}
 
export default ProductPopup;