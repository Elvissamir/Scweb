import React, { Component } from 'react';
import Option from './Option';

class OptionsList extends Component {
    render() { 
        return (
            <div className='attribute-options-wrapper'>
                {this.props.options.map(option => 
                   <Option key={option.id} data={option} />
                )}
            </div>
        );
    }
}
 
export default OptionsList;