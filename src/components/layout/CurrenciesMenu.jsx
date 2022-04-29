import React, { Component } from 'react';

class CurrenciesMenu extends Component {
    state = { 
        optionsRef: React.createRef(),
        toggleBtnRef: React.createRef(),
        showCurrencyOptions: false
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
    }

    toggleCurrencyMenu = () => {
        this.setState({ showCurrencyOptions: !this.state.showCurrencyOptions })
    }

    handleClickOutside = ({ target }) => {
        if (!this.state.optionsRef.current.contains(target) && target !== this.state.toggleBtnRef.current)
            this.setState({ showCurrencyOptions: false })
    }

    render() { 
        return (
            <>
                <div className='currencies-wrapper'>
                    <p className='active-currency'>{this.props.activeCurrency}</p>
                    <div ref={this.state.optionsRef} className={this.state.showCurrencyOptions? 'currency-options-wrapper':'hide-currency-menu'}>
                        {this.props.currencies.map(option => 
                            <div 
                                key={option.symbol} 
                                id={option.symbol}
                                onClick={this.props.onCurrencySelect}
                                className='currency'>
                                    {option.symbol + ' ' + option.label}
                            </div>
                        )}
                    </div>
                </div>
                <button 
                    className='currency-toggle-btn'  
                    ref={this.state.toggleBtnRef}
                    onClick={this.toggleCurrencyMenu}>
                        <img 
                            src={this.state.showCurrencyOptions? '/imgs/arrow-down.svg' : '/imgs/arrow-up.svg'} 
                            className='arrow-toggle-currencies'/>
                </button>
            </> 
        );
    }
}
 
export default CurrenciesMenu;