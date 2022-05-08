import React, { Component } from 'react';
import AttributeOptions from './AttributeOptions';

class AttributeList extends Component {
    render() { 
        return (
            <div className="attribute-list">
                { this.props.attributes.map(attribute => 
                    <div key={attribute.name} className='product-item-attribute'>
                        <p className='attribute-name'>{attribute.name.toUpperCase()}:</p>
                        <div>
                            <AttributeOptions 
                                attribute={attribute}
                                productOptions={this.props.options}
                                onSelectAttributeOption={this.props.onSelectAttributeOption} />
                        </div>
                        <div className="error-message">{this.renderAttributeInfo(attribute)}</div>
                    </div>    
                )}
            </div>
        );
    }
}
 
export default AttributeList;