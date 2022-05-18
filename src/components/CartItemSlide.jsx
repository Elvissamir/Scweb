import { Component } from "react";

class CartItemSlide extends Component {
    render() { 
        return (
            <div className="cart-item-slide-wrapper">
                {this.props.images.map(image => 
                    <img 
                        key={image}
                        className='cart-item-img' 
                        src={image} alt="" />
                )}
                <div className="cart-item-slide-buttons">
                    <div className="cart-item-slide-left">
                        <img src="/imgs/left.png" alt="" />
                    </div>
                    <div className="cart-item-slide-right">
                        <img src="/imgs/right.png" alt="" />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default CartItemSlide;