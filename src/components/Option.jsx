import { Component } from "react"

class Option extends Component {
    selectAttributeOptionCss = () => {
        const baseCss = 'attribute-option'
        const swatchCss = 'option-swatch'
        const textCss = 'option-text'
        const optionCss = this.props.attributeType === 'text'? `${baseCss} ${textCss}` : `${baseCss} ${swatchCss}`

        if (this.props.selected)
            return (this.props.attributeType === 'text'? optionCss + ' attribute-selected-text': optionCss + ' attribute-selected-swatch')
        
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