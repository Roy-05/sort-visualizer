import React from 'react';
import './Navbar.css';

class Navbar extends React.Component {
    render(){
        return(
            <nav className = "navbar">
                <button className = "new-array-btn" onClick ={this.props.GNAclick}>Generate New Array</button>
            </nav>
        )
    }
}

export default Navbar;