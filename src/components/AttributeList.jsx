import React, { Component } from 'react';
import Attribute from './Attribute';

class AttributeList extends Component {
    componentDidMount () {
        console.log('attribute list', this.props.productOptions)
    }

    isSelectedOption = (attribute) => {
        if (this.props.productOptions && this.props.productOptions[attribute.name])
            return this.props.productOptions[attribute.name]
        return null
    }

    hasError = (attribute) => {
        console.log('hasError', this.props.error.attribute)
        if (this.props.error.attribute === attribute.name)
            return this.props.error.message
        return null
    }

    render() { 
        return (
            <div className="attribute-list">
                {this.props.attributes.map(attribute => 
                    <Attribute 
                        key={attribute.name}
                        error={this.hasError(attribute)}
                        selectedOption={this.isSelectedOption(attribute)} 
                        onSelectAttribute={this.props.onSelectAttribute}
                        data={attribute} />
                )}
            </div>
        );
    }
}
 
export default AttributeList;