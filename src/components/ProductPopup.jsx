import React, { Component } from "react";
import ProductItem from './ProductItem';

class ProductPopup extends Component {
    render() { 
        return (
            <div className={this.props.showProductWindow? 'plp-popup':'hide'}>
                <div className='plp-popup-top'>
                    <button onClick={this.props.onClose} className='plp-popup-close-btn'>X</button>
                </div>
                <div className='plp-popup-content'>
                    <ProductItem 
                        data={this.props.currentProduct} 
                        showSelectOptionsMessage={this.props.showSelectOptionsMessage}
                        showGallery={false}
                        onSelectAttributeOption={this.props.onSelectAttributeOption}
                        onAddToCart={this.props.onAddToCart}
                        selectOptionsMessage={this.props.selectOptionsMessage}/>
                </div>
            </div>
        );
    }
}
 
export default ProductPopup;