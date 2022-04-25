import React, { Component } from 'react';
import { findCategories } from '../services/http/ProductListing/ProductListingPage'
import CategoriesBar from '../components/CategoriesBar';

class ProductPage extends Component {
    state = { 
        categories: [], 
        loading: true,
        hasData: false,
        error: false
    }

    async componentDidMount() {
        const result = await findCategories()
        if (!result.error) {
            const categories = result.categories.map(category => category.name)
            this.setState({ categories, hasData: true, loading: false })
        }
        else {
            this.setState({ error:true, loading: false })
        }
    }

    renderBlock() {
        if (!this.state.error) {
            if (!this.state.hasData)
                return this.renderNoDataBlock()
            return this.renderContent()
        }

        return this.renderErrorBlock()
    }

    renderContent() {
        return (
            <CategoriesBar categories={this.state.categories} />
        )
    }

    renderNoDataBlock() {
        return <div>There are no items to show at the moment.</div>
    }

    renderErrorBlock() {
        return <div>Something happened. Try again in a few minutes.</div>
    }

    // Add handleCategoryChange
    render() { 
        return (
            <div className='content-wrapper'>
                { this.renderBlock() }
            </div>
        )
    }
}
 
export default ProductPage;