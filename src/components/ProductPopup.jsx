import React, { Component } from "react";

class ProductPopup extends Component {

    renderAttributeOptions = (attribute, productOptions) => {
        console.log('attribute', attribute)
        console.log('options', productOptions)

        return (
            <div className='attribute-options-wrapper'>
                {attribute.items.map(option => 
                    <button 
                        onClick={this.props.onSelectAttributeOption(attribute.name, option.value)}
                        key={option.value} 
                        className={this.selectAttributeOptionCss(attribute, option, productOptions)}
                        style={attribute.type === 'swatch'? {backgroundColor: option.value} : {}}>
                           {attribute.type !== 'swatch' && option.value}
                    </button>
                )}
            </div>
        )
    }

    selectAttributeOptionCss = (attribute, option, productOptions) => {
        const baseCss = 'attribute-option'
        const swatchCss = 'option-swatch'
        const textCss = 'option-text'

        const attributeCss = attribute.type === 'text'? `${baseCss} ${textCss}` : `${baseCss} ${swatchCss}`

        if (productOptions && productOptions[attribute.name] === option.value)
            return (attribute.type === 'text'? attributeCss + ' attribute-selected-text': attributeCss + ' attribute-selected-swatch')
        else 
            return attributeCss
    }

    render() { 
        return (
            <div className={this.props.showProductWindow? 'plp-popup':'hide'}>
                <div className='plp-popup-top'>
                    <button onClick={this.closeProductMenu} className='plp-popup-close-btn'>X</button>
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
                                        { this.renderAttributeOptions(attribute, this.props.currentProduct.options) }
                                    </div>
                                </div>    
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ProductPopup;