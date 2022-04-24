import React, { Component } from 'react';
import { findCategories } from '../services/http/ProductListing/ProductListingPage'

class ProductPage extends Component {
    state = { categories: ['hola'] }

    async componentDidMount() {
        const result = await findCategories()
        if (!result.error) {
            const categories = result.categories.map(category => category.name)
            this.setState({ categories })
        }
    }

    render() { 
        return (
            <>
                <div className='categories-container'>
                    {this.state.categories.map(category => 
                        <button key={category}>{ category.toUpperCase() }</button>
                    )}
                </div>
            </>
        );
    }
}
 
export default ProductPage;