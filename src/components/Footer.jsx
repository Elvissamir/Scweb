import React, { Component } from 'react';

class Footer extends Component {
    render() { 
        return (
            <div className='footer-container'>
                <footer className='footer'>
                    <div className='footer-content'>
                        <div className="top">
                            <p>React Store App</p>
                            <p>Scandiweb 2022</p>
                        </div>
                        <div className="bottom">
                            <p>Junior Front end Developer</p>
                            <p>Developed by Elvis Carrasco</p>
                        </div>
                    </div>
                </footer> 
            </div>
        );
    }
}
 
export default Footer;