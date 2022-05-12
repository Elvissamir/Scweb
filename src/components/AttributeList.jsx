import React, { Component } from 'react';
import Attribute from './Attribute';

class AttributeList extends Component {
    render() { 
        return (
            <div className="attribute-list">
                {this.props.attributes.map(attribute => 
                    <Attribute key={attribute.name} data={attribute} />
                )}
            </div>
        );
    }
}
 
export default AttributeList;