import React from 'react';
import './SortingVisualizer.css';

class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            array: [],
            startedBubbleSort: false,
            startedSelectionSort: false,
            sorted: false
        };
    }

    componentDidMount(){
        this.setArray();    
    }

    componentDidUpdate(prevProps, prevState){
        let nav_btn = document.getElementsByClassName("nav-btn");
    
        if(this.state.startedBubbleSort ){
            [...nav_btn].forEach((btn)=>{
                btn.disabled = true;
            });
        }

        if(this.state.startedSelectionSort){
            [...nav_btn].forEach((btn)=>{
                btn.disabled = true;
            });
        }

        if(this.state.sorted){
            [...nav_btn].forEach((btn)=>{
                btn.disabled = false;
            });

            this.setState({
                startedBubbleSort: false,
                startedSelectionSort: false,
                sorted: false
            });

            this.resetArray();
        }
    }

    getArraySize(){
        let deviceWidth = window.screen.width,
            arraySize;
        if(deviceWidth < 400){
            arraySize = 50;
        }
        else{
            arraySize = 75;
        }

        return arraySize;
    }

    setArray(){
        const array = [];
        for(let i = 0; i<this.getArraySize(); i++){
            array.push(this.getRandomInt(1,500))
        }

        this.setState({array});
    }

    resetArray(){
        const array = [];
        for(let i = 0; i<this.getArraySize(); i++){
            array.push(this.getRandomInt(1,500))
        }

        this.setState({array});

        const array_bar = document.getElementsByClassName('array-elem');
        for(let i=0;i<array.length;i++){
            setTimeout(()=>{
                array_bar[i].style.backgroundColor = "lightblue";
            }, i*30);
        }
             
    }

    bubbleSort(){
        const arr = this.state.array,    
            array_bar = document.getElementsByClassName('array-elem');

        this.setState({startedBubbleSort: true});

        for(let i =0; i<arr.length-1; i++){
            setTimeout(()=>{ 
                if(i===0){
                    setTimeout(()=>{array_bar[arr.length-i-1].style.backgroundColor = 'green';},400)
                }
                else{
                    array_bar[arr.length-i].style.backgroundColor = 'green';
                }
                for(let j=0; j<arr.length-i-1; j++){
                    setTimeout(()=>{
                        array_bar[j+1].style.backgroundColor = 'red';
                        array_bar[j].style.backgroundColor = 'red';
                        setTimeout(()=>{
                            if(arr[j] > arr[j+1]){
                            
                                let temp = arr[j],
                                    arr1_height = arr[j],
                                    arr2_height = arr[j+1];
                                arr[j] = arr[j+1];
                                arr[j+1] = temp;
                                array_bar[j].style.height = `${arr2_height}px`;
                                array_bar[j+1].style.height = `${arr1_height}px`;
                                array_bar[j+1].style.backgroundColor = 'green';
                                array_bar[j].style.backgroundColor = 'lightblue';
                            }
                            else{
                                array_bar[j+1].style.backgroundColor = 'lightblue';
                                array_bar[j].style.backgroundColor = 'lightblue';
                            }
                        }, 4);

                        if(i===arr.length-2){
                            setTimeout(()=>{
                                array_bar[j+1].style.backgroundColor = 'green';                                    
                            }, 400);

                            setTimeout(()=>{
                                array_bar[j].style.backgroundColor = 'green';                                    
                            }, 800);
                        }
                    }, j*4);
                }
            },i*400);  
        }        

        setTimeout(()=>{
            this.setState({sorted: true})
        }, arr.length*400+1750);

    }    

    selectionSort(){
        const arr = this.state.array,
            array_bar = document.getElementsByClassName("array-elem");
        
        this.setState({startedSelectionSort: true});

        for(let i=0; i<arr.length-1; i++){
            let minimum = i; //Declare minimum here
            setTimeout(()=>{
                for(let j = i+1; j<arr.length; j++){
                    setTimeout(()=>{
                        //Getting a warning for these references:
                        array_bar[j].style.backgroundColor = 'red';
                        array_bar[minimum].style.backgroundColor = 'blue';
                        setTimeout(()=>{
                            if(arr[j] < arr[minimum]){
                            array_bar[minimum].style.backgroundColor = 'lightblue';
                            minimum = j; 
                            }  
                            else{
                                array_bar[j].style.backgroundColor = 'lightblue';
                            }  
                        }, 4);
                    }, (j-1)*4);    
                }
                setTimeout(()=>{
                    let temp = arr[i],
                    arr1_height = arr[minimum],
                    arr2_height = arr[i];

                    arr[i] = arr[minimum];
                    arr[minimum] = temp;

                    array_bar[i].style.height = `${arr1_height}px`;
                    array_bar[minimum].style.height = `${arr2_height}px`;
    
                    array_bar[i].style.backgroundColor = "green";
                    if(i !== minimum){
                        array_bar[minimum].style.backgroundColor = 'lightblue';
                    }
                }, 400);
                

                if(i === arr.length-2){
                    setTimeout(()=>{
                        array_bar[i+1].style.backgroundColor = "green";
                    },800);
                }

            }, i*400);
        }

        setTimeout(()=>{
            this.setState({sorted: true})
        }, arr.length*400+1750);

    }

    insertionSort(){

        const arr = this.state.array,
            array_bar = document.getElementsByClassName("array-elem");
        
        for(let i = 0; i < arr.length ; i++){
            setTimeout(()=>{
                let temp = arr[i],
                pos = i,
                isFirstEntry = true;

                array_bar[i].style.backgroundColor = 'red';
                for(;pos>0;pos--){
                    if(temp<arr[pos-1]){
                        arr[pos] = arr[pos-1];
                        array_bar[pos].style.height = `${arr[pos]}px`;
                        /*if(isFirstEntry){
                            array_bar[pos-1].style.backgroundColor = 'yellow';
                            isFirstEntry = false;
                        }
                        else{ 
                            array_bar[pos+1].style.backgroundColor = 'lightblue';
                            array_bar[pos].style.backgroundColor = 'yellow';
                        }*/
                    }
                    else{
                        //array_bar[pos].style.backgroundColor = 'yellow';
                        //isFirstEntry = true;
                        break;
                    }
                }
                    
                arr[pos] = temp;
                array_bar[pos].style.height = `${arr[pos]}px`;
                array_bar[pos].style.backgroundColor = 'green';

                setTimeout(()=>{array_bar[i].style.backgroundColor = 'lightblue';}, 500);
                
            }, i*500);
        }
    }

    render(){
        const {array} = this.state;
        
        return( 
            <>  
                <nav className = "navbar">
                    <button className="nav-btn" id = "gen-new-arr" onClick = {()=>{this.resetArray()}}>Generate New Array</button>
                    <button className="nav-btn" id = "bubble-sort" onClick = {()=>{this.bubbleSort()}}>Bubble Sort</button>
                    <button className="nav-btn" id = "selection-sort" onClick = {()=>{this.selectionSort()}}>Selection Sort</button>
                    <button className="nav-btn" id = "insertion-sort" onClick = {()=>{this.insertionSort()}}>Insertion Sort</button>
                    <button className="nav-btn" id = "test-algs" onClick = {()=>{this.testAlgorithms()}}>Test!</button>
                </nav>
                <div className="array-container">
                    {
                        array.map((value, idx) => (
                            <div className = "array-elem" key = {idx} style = {{height: `${value}px`}}></div>
                        ))
                    } 
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
                //bSortedArray = bubbleSortAlg(arr),
                //sSortedArray = this.selectionSort(arr),
                iSortedArray = this.insertionSort(arr);


            console.log(this.arraysAreEqual(jsSortedArr, iSortedArray));
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