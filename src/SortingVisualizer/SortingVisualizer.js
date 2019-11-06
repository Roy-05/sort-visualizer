import React from 'react';
import './SortingVisualizer.css';

class SortingVisualizer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            array: []
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];
        for(let i = 0; i<100; i++){
            array.push(this.getRandomInt(1,500))
        }

        this.setState({array});
    }

    //Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    render(){
        const {array} = this.state;

        return( 
            <div className="array-container">
                {array.map((value, idx) => (
                    <div className = "array-elem" key = {idx} style = {{height: `${value}px`}}>
                    </div>
                ))}
            </div>
        );
    }

}

export default SortingVisualizer;