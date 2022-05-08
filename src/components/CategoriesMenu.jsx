import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../routes';

class CategoriesMenu extends Component {
    isActiveCategory = (category) => {
        return category === this.props.activeCategory
    }

    render() { 
        return (
            <ul className='menu'>
                {this.props.categories.map(category => 
                    <Link 
                        to={routes.getCategoryRoute(category)}
                        id={category}
                        key={category} 
                        onClick={ this.props.onCategorySelect }
                        className={this.isActiveCategory(category)? 'menu-link active-link': 'menu-link'}>
                        { category.toUpperCase() }
                    </Link>
                )}
            </ul>
        );
    }
}
 
export default CategoriesMenu;