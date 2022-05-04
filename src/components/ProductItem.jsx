class ProductItem extends Component {
    state = {  } 
    render() { 
        return (
            <div className="product-item">
                <div className='plp-popup-img-wrapper'>
                    <img className='plp-popup-img' src={this.props.currentProduct.gallery[0]} alt="" />
                </div>
                <div className='plp-popup-details'>
                    <p className='plp-popup-title'>{this.props.currentProduct.brand + " - " + this.props.currentProduct.name}</p>
                    <div>
                        {this.props.currentProduct && this.props.currentProduct.attributes.map(attribute => 
                            <div key={attribute.name} className='plp-popup-attribute'>
                                <p className='attribute-name'>{attribute.name.toUpperCase()}:</p>
                                <div>
                                    <AttributeOptions 
                                        attribute={attribute}
                                        productOptions={this.props.currentProduct.options}
                                        onSelectAttributeOption={this.props.onSelectAttributeOption} />
                                </div>
                                <div className="error-message">{this.renderAttributeInfo(attribute)}</div>
                            </div>    
                        )}
                    </div>
                    <div className="plp-popup-btn-wrapper">
                        <p className="error-message">
                            {this.renderInfoMessage()}
                        </p>
                        <button 
                            onClick={() => this.props.onAddToCart(this.props.currentProduct)} 
                            className="btn action-btn">ADD TO CART</button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ProductItem;