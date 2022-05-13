import { Component } from "react";
import OptionsList from "./OptionsList"

class Attribute extends Component {
    componentDidMount() {
        console.log('Attribute', this.props)
    }

    handleSelectOption = value => {
        console.log('Select option', value)
        return this.props.onSelectAttribute({ attribute: this.props.data.name, value })
    }

    render() { 
        return (
            <div className='product-item-attribute'>
                <p className='attribute-name'>{this.props.data.name.toUpperCase()}:</p>
                <div>
                   <OptionsList 
                        options={this.props.data.items}
                        attributeType={this.props.data.type}
                        selectedOption={this.props.selectedOption}
                        onSelectOption={this.handleSelectOption} />
                </div>
                <div className="error-message">{this.props.error && this.props.error}</div>
            </div>
        ) 
    }
}
 
export default Attribute;