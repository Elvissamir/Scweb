import { Component } from "react"

class Option extends Component {
    selectAttributeOptionCss = () => {
        const baseCss = this.props.isInCart? 'attribute-option-cart':'attribute-option'
        const swatchCss = this.props.isInCart? 'option-swatch-cart':'option-swatch'
        const textCss = this.props.isInCart? 'option-text-cart':'option-text'
        const selectedTextCss = 'attribute-selected-text'
        const selectedSwatchCss = 'attribute-selected-swatch'
        const optionCss = this.props.attributeType === 'text'? `${baseCss} ${textCss}` : `${baseCss} ${swatchCss}`

        if (this.props.selected)
            return (this.props.attributeType === 'text'? optionCss + selectedTextCss: optionCss + selectedSwatchCss)
        
        return optionCss
    }

    render() { 
        return (
            <button 
                onClick={() => this.props.onSelectOption(this.props.data.id)}
                key={this.props.data.value}
                className={this.selectAttributeOptionCss()}
                style={this.props.attributeType === 'swatch'? {backgroundColor: this.props.data.value} : {}}>
                {this.props.attributeType !== 'swatch' && this.props.data.value}
            </button>
        )
    }
}

export default Option