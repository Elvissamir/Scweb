import React, { Component } from 'react';

class CategoriesMenu extends Component {
    isActiveCategory = (category) => {
        return category === this.props.activeCategory
    }

    render() { 
        return (
            <ul className='menu'>
                {this.props.categories.map(category => 
                    <li 
                        id={category}
                        key={category} 
                        onClick={ this.props.onCategorySelect }
                        className={this.isActiveCategory(category)? 'menu-link active-link': 'menu-link'}>
                        { category.toUpperCase() }
                    </li>
                )}
            </ul>
        );
    }
}
 
export default CategoriesMenu;