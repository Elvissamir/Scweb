import React, { Component } from 'react';
import Attribute from './Attribute';

class AttributeList extends Component {
    componentDidMount () {
        console.log('attribute list', this.props.productOptions)
    }

    render() { 
        return (
            <div className="attribute-list">
                {this.props.attributes.map(attribute => 
                    <Attribute 
                        key={attribute.name}
                        selectedOption={this.props.productOptions && this.props.productOptions[attribute.name]? this.props.productOptions[attribute.name] : null} 
                        onSelectAttribute={this.props.onSelectAttribute}
                        data={attribute} />
                )}
            </div>
        );
    }
}
 
export default AttributeList;