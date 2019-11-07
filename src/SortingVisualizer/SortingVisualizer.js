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
        const arr = this.state.array;     
        const array_bar = document.getElementsByClassName('array-elem');

        for(let i =0; i<arr.length-1; i++){
            setTimeout(()=>{
                for(let j=0; j<arr.length-i-1; j++){
                    if(arr[j] > arr[j+1]){
                        let temp = arr[j],
                            arr1_height = arr[j],
                            arr2_height = arr[j+1];
                        arr[j] = arr[j+1];
                        arr[j+1] = temp;
                        array_bar[j].style.height = `${arr2_height}px`;
                        array_bar[j+1].style.height = `${arr1_height}px`;
                    }
                }

            }, i*100);  
        }

        console.log(arr);
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