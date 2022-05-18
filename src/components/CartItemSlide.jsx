import { Component } from "react";

class CartItemSlide extends Component {
    state = {
        activeIndex: 0
    }

    componentDidMount() {
        console.log(this.props.inMenu)
    }

    moveLeft = () => {
        if (this.state.activeIndex === 0)
            return this.setState({ activeIndex: this.props.images.length - 1 })
        
        this.setState({ activeIndex: this.state.activeIndex - 1 })
    }

    moveRight = () => {
        if (this.state.activeIndex === this.props.images.length - 1)
            return this.setState({ activeIndex: 0 })
        
        this.setState({ activeIndex: this.state.activeIndex + 1 })
    }

    renderSlider = () => {
        if (this.props.inMenu)
            return <img className="cart-item-single-img" src={this.props.images[0]} alt="" />
        
        return (
            <div className="cart-item-slide">
                {this.props.images.map((image, index) => 
                    <img 
                        key={image}
                        className={this.state.activeIndex === index? 'cart-item-img':'hide'}
                        src={image} alt="" />
                )}
                <div className="cart-item-slide-buttons">
                    <button onClick={this.moveLeft} className="cart-item-slide-left">
                        <img src="/imgs/left.png" alt="" />
                    </button>
                    <button onClick={this.moveRight} className="cart-item-slide-right">
                        <img src="/imgs/right.png" alt="" />
                    </button>
                </div>
            </div>
        )
    }

    render() { 
        return (
            <div className="cart-item-slide-wrapper">
                {this.renderSlider()}
            </div>
        );
    }
}
 
export default CartItemSlide;