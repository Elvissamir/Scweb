import { Component } from "react";
import OptionsList from "./OptionsList"

class Attribute extends Component {
    handleSelectOption = value => {
        return this.props.onSelectAttribute({ attribute: this.props.data.name, value })
    }

    render() { 
        return (
            <div className='product-item-attribute'>
                <p className={this.props.isInCart? 'attribute-name-cart':'attribute-name'}>{this.props.data.name.toUpperCase()}:</p>
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