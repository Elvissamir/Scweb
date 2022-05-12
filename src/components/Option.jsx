import { Component } from "react"

class Option extends Component {
    selectAttributeOptionCss = (attribute, option, productOptions) => {
        const baseCss = 'attribute-option'
        const swatchCss = 'option-swatch'
        const textCss = 'option-text'
        const attributeCss = attribute.type === 'text'? `${baseCss} ${textCss}` : `${baseCss} ${swatchCss}`

       
    }

    render() { 
        return (
            <button 
                //onClick={this.props.onSelectAttributeOption(this.props.attribute.name, this.props.data.value)}
                key={this.props.data.value} 
                className='attribute-option option-text'>
                Hola
            </button>
        )
    }
}

export default Option