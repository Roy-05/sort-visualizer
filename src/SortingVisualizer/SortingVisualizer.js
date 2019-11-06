import React from 'react';

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
            array.push(this.getRandomInt(1,1000))
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
            <>
            {array.map((value, idx) => (
                <div className = "array-elem" key = {idx}>{value}</div>
            ))}
            </>
        );
    }

}

export default SortingVisualizer;