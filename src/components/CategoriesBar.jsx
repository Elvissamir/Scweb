import { Component } from 'react';

class CategoriesBar extends Component {
    render() { 
        return (
            <div className="category-bar">
                {this.props.categories.map(category => 
                    <button 
                        key={category}
                        onClick={this.props.onClick}>
                            { category }
                    </button>
                )}
            </div>
        );
    }
}
 
export default CategoriesBar;