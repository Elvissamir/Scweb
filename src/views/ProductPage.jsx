import React, { Component } from 'react';
import { findProductById } from '../services/http/Product/ProductPage';
import withRouter from '../components/withRouter';

class ProductPage extends Component {
    state = {
        product: null,
        error: false
    }

    async componentDidMount() {
        const productId = this.props.router.params.product
        await this.fetchProduct(productId)
    }

    fetchProduct = async (id) => {
        const result = await findProductById(id)

        if (!result.error) {
            const product = {...result.product}
            product.options = {}
            return this.setState({ product })
        }

        this.setState({ error: true })
    }

    render() { 
        return (
            <div className='product-wrapper'>
                
            </div>
        );
    }
}
 
export default withRouter(ProductPage);