import { Component } from "react";
import OptionsList from "./OptionsList"

class Attribute extends Component {
    componentDidMount() {
        console.log('Attribute', this.props)
    }

    render() { 
        return (
            <div className='product-item-attribute'>
                <p className='attribute-name'>{this.props.data.name.toUpperCase()}:</p>
                <div>
                   <OptionsList options={this.props.data.items} />
                </div>
                <div className="error-message"></div>
            </div>
        ) 
    }
}
 
export default Attribute;