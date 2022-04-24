import React, { Component } from 'react';
import { findCategories } from '../services/http/ProductListing/ProductListingPage'

class ProductPage extends Component {
    state = { categories: null }

    async componentDidMount() {
        const result = await findCategories()
        if (!result.error) {
            const categories = result.categories.map(category => category.name)
            this.setState({ categories })
        }
    }

    // Add handleCategoryChange

    render() { 
        return (
            <>
                <div className='categories-container'>

                </div>
            </>
        );
    }
}
 
export default ProductPage;