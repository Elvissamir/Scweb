import React, { Component } from 'react';
import { findCategoriesAndCurrencies } from '../../services/http/Nav/Nav';
import { changeCategory } from '../../store/features/category/categorySlice';
import { changeCurrency } from '../../store/features/currency/currencySlice'
import { connect } from 'react-redux';

class Nav extends Component {
    state = { activeIndex: 0, categories: [], currencies: []}
    
    async componentDidMount() {
        const result = await findCategoriesAndCurrencies()

        // console.log(this.props.changeCategory({ category: 'MONEY' }))
        // console.log(this.props.changeCurrency({ currency: 'o' }))
        
        if (!result.error) {
            const categories = result.categories.map(category => category.name)
            const currencies = result.currencies.map(currency => currency.symbol)
            this.setState({ categories, currencies })
        }
        else {
            console.log('error')
        }
    }

    isActive = (index) => {
        return index === this.state.activeIndex
    }

    handleLinkSelect = ({ target }) => {
        const index = target.value
        if (index != this.state.activeIndex)
            this.setState({ activeIndex: index })
    }

    render() { 
        return (
            <div className='nav-container'>
                <nav className='nav'>
                    <div className='nav-content'>
                        <ul className='menu'>
                            {this.state.categories.map((link, index) => 
                                <li 
                                    value={index}
                                    key={index} 
                                    onClick={ this.handleLinkSelect }
                                    className={this.isActive(index)? 'menu-link active-link': 'menu-link'}>
                                    { link.toUpperCase() }
                                </li>
                            )}
                        </ul>
                        <div className="logo-container">
                            <img src="/imgs/logo.svg" alt="logo" />
                        </div>
                        <div className="currencies-menu">
                            {this.state.currencies.map(currency => 
                                <p key={currency}>{currency}</p>    
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    activeCategory: state.category.activeCategory,
    activeCurrency: state.currency.activeCurrency
})

const mapDispatchToProps = dispatch => ({
    changeCategory: (payload) => dispatch(changeCategory(payload)),
    changeCurrency: (payload) => dispatch(changeCurrency(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)