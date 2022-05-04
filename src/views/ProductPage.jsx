import React, { Component } from 'react';
import { findProductById } from '../services/http/Product/ProductPage';
import withRouter from '../components/withRouter';

class ProductPage extends Component {
    async componentDidMount() {
        console.log(this.props)
        
    }

    render() { 
        return (
            <div>

            </div>
        );
    }
}
 
export default withRouter(ProductPage);