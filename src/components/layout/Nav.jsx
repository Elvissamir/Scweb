import React, { Component } from 'react';

class Nav extends Component {
    render() { 
        return (
            <div className='nav-container'>
                <nav className='nav'>
                    <div className='nav-content'>
                        <ul className='menu'>
                            <li className='menu-link'>WOMEN</li>
                            <li className='menu-link'>MEN</li>
                            <li className='menu-link'>KIDS</li>
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