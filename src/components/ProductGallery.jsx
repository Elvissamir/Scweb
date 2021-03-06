import { Component } from 'react';

class ProductGallery extends Component {
    render() { 
        return (
            <div className="product-item-gallery">
                {this.props.gallery.map((img, index) => 
                    <img 
                        onClick={() => this.props.onSelectImage(index)}
                        className="product-item-gallery-option" 
                        key={index} 
                        src={img} alt="" />    
                )}
            </div>
        );
    }
}
 
export default ProductGallery;