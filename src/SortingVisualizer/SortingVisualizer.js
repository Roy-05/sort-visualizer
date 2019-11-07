import React from 'react';
import './SortingVisualizer.css';
import {bubbleSortAlg} from '../SortingAlgorithms/BubbleSort';

class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            array: [],
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

    bubbleSort(){
        const jsSortedArray = this.state.array.slice().sort((a,b) => a-b),
            bSortedArray = bubbleSortAlg(this.state.array);

        console.log(this.arraysAreEqual(jsSortedArray, bSortedArray));
    }
    

    render(){
        const {array} = this.state;
        return( 
            <>  
                <nav className = "navbar">
                    <button className="gen-new-arr" onClick = {()=>{this.resetArray()}}>Generate New Array</button>
                    <button className="bubble-sort" onClick = {()=>{this.bubbleSort()}}>Bubble Sort</button>
                    <button className="test-algs" onClick = {()=>{this.testAlgorithms()}}>Test!</button>
                </nav>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div className = "array-elem" key = {idx} style = {{height: `${value}px`}}>
                        </div>
                    ))}
                </div>
            </>
        );
    }
    
    //Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    testAlgorithms(){
        for(let i= 0; i<100; i++){
            const arr = [];
            for(let j=0; j< this.getRandomInt(1,1000); j++){
                arr.push(this.getRandomInt(-1000,1000));
            }
            let jsSortedArr = arr.slice().sort((a,b)=>a-b),
                bSortedArray = bubbleSortAlg(arr);

            console.log(this.arraysAreEqual(jsSortedArr, bSortedArray));
        }
    }

    arraysAreEqual(arr1, arr2){
        if(arr1.length !== arr2.length){
            return false;
        }

        for(let i =0; i<arr1.length; i++){
            if(arr1[i] !== arr2[i]){
                console.log(arr1[i], arr2[i]);
                return false
            }
        }

        return true;
    }


}

export default SortingVisualizer;