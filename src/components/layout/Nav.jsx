import React, { Component } from 'react';

class Nav extends Component {
    state = { activeIndex: 0, links: [] }

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
                            {this.state.links.map((link, index) => 
                                <li 
                                    value={index}
                                    key={index} 
                                    onClick={ this.handleLinkSelect }
                                    className={this.isActive(index)? 'menu-link active-link': 'menu-link'}>
                                    { link }
                                </li>
                            )}
                        </ul>
                        <div className="logo-container">
                            <img src="/imgs/logo.svg" alt="logo" />
                        </div>
                        <div className="options-menu">
                            <p>$</p>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
 
export default Nav;