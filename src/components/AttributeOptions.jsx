import React, { Component } from 'react';

class AttributeOptions extends Component {

    componentDidMount() {
        console.log(this.props)
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
            <div className='attribute-options-wrapper'>
                {this.props.attribute.items.map(option => 
                    <button 
                        onClick={this.props.onSelectAttributeOption(this.props.attribute.name, option.value)}
                        key={option.value} 
                        className={this.selectAttributeOptionCss(this.props.attribute, option, this.props.productOptions)}
                        style={this.props.attribute.type === 'swatch'? {backgroundColor: option.value} : {}}>
                        {this.props.attribute.type !== 'swatch' && option.value}
                    </button>
                )}

                <div>{this.props.attribute.items[0].value}</div>
            </div>
        );
    }
}
 
export default AttributeOptions;