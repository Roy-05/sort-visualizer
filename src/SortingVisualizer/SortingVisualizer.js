import React from 'react';
import './SortingVisualizer.css';

class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            array: [],
            animations: [],
            startedSort: false,
            isSorted: false,
            TIME: 500
        };
    }

    componentDidMount(){
        this.setArray();    
    }

    componentDidUpdate(prevProps, prevState){
        let nav_btn = document.getElementsByClassName("nav-btn");
    
        if(this.state.startedSort ){
            [...nav_btn].forEach((btn)=>{
                btn.disabled = true;
            });
        }

        if(this.state.isSorted){
            
            [...nav_btn].forEach((btn)=>{
                btn.disabled = false;
            });

            this.setState({
                startedSort: false,
                isSorted: false
            });

            this.setArray();
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

    sortCompleteAnimation(){
        const array_bar = document.getElementsByClassName("array-elem"),
            size = this.getArraySize(),
            TIME = this.state.TIME; 

        setTimeout(()=>{
            for(let i=0; i<size; i++){
                setTimeout(()=>{
                    array_bar[i].style.backgroundColor = "green";
                }, i*30);
            }
        }, (size+1)*TIME);

        setTimeout(()=>{
                [...array_bar].forEach(elem=>{
                    setTimeout(()=>{
                        elem.style.backgroundColor = "lightblue";
                    }, 350);

                    setTimeout(()=>{
                        elem.style.backgroundColor = "green";
                    }, 700);

                    setTimeout(()=>{
                        elem.style.backgroundColor = "lightblue";
                    }, 1000);
                })
        }, size*(TIME+30) + 200); //200ms for delay

        setTimeout(()=>{
            this.setState({isSorted: true});
        }, size*(TIME+30) + 1200 + 500); //1200ms for previous setTimeout to complete + 500ms delay     
    }

    swap(arr, i, j){
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    /**
    * START OF SORTING ALGORITHM FUNCTIONS
    */


    //BUBBLE SORT ANIMATION FUNCTIONS(S)
    bubbleSort(){
        this.setState({startedSort: true});

        const arr = this.state.array,    
            array_bar = document.getElementsByClassName('array-elem'),
            TIME = this.state.TIME;

        for(let i =0; i<arr.length; i++){
            setTimeout(()=>{ 
                for(let j=0; j<arr.length-i-1; j++){
                    setTimeout(()=>{
                        array_bar[j+1].style.backgroundColor = 'blue';
                        array_bar[j].style.backgroundColor = 'red';
                        setTimeout(()=>{
                            if(arr[j] > arr[j+1]){

                                this.swap(arr, j, j+1);

                                array_bar[j].style.height = `${arr[j]}px`;
                                array_bar[j+1].style.height = `${arr[j+1]}px`;

                                array_bar[j+1].style.backgroundColor = 'lightblue';
                                array_bar[j].style.backgroundColor = 'lightblue';
                            }
                            else{
                                array_bar[j+1].style.backgroundColor = 'lightblue';
                                array_bar[j].style.backgroundColor = 'lightblue';
                            }
                        }, TIME/(arr.length-i-1));
                    }, j*TIME/(arr.length-i-1));
                }
            },i*TIME);  
        }        

        this.sortCompleteAnimation();

    }
    //END OF BUBBLE SORT ANIMATION FUNCTIONS(S)    


    //SELECTION SORT ANIMATION FUNCTION(S)
    selectionSort(){

        this.setState({startedSort: true});

        const arr = this.state.array,
            array_bar = document.getElementsByClassName("array-elem"),
            TIME = this.state.TIME;

        for(let i=0; i<arr.length-1; i++){
            setTimeout(()=>{
                let minimum =i;
                for(let j = i+1; j<arr.length; j++){
                    setTimeout(()=>{
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
                    }, j*4);    
                }
                setTimeout(()=>{

                    this.swap(arr, i, minimum)

                    array_bar[i].style.height = `${arr[i]}px`;
                    array_bar[minimum].style.height = `${arr[minimum]}px`;
                    array_bar[minimum].style.backgroundColor = 'lightblue';

                }, TIME);

            }, i*TIME);
        }

        this.sortCompleteAnimation();

    }
    //END OF SELECTION SORT ANIMATION FUNCTIONS(S)


    //INSERTION SORT ANIMATION FUNCTIONS(S)
    insertionSort(){

        //Disable nav buttons [AND TO HANDLE OTHER ACTIONS WHEN NEEDED]
        this.setState({startedSort: true});

        const arr = this.state.array,
            array_bar = document.getElementsByClassName("array-elem"),
            TIME = this.state.TIME;
        
        for(let i=0; i<arr.length; i++){
            setTimeout(()=>{
                let pos = i;

                /*
                returns the pos where the last element
                of the passed array segment needs to be moved to
                */
                let newPos = this.insertionSortHelper(arr.slice(0,i+1), pos); 

                if(newPos !== pos)
                {
                    //This inserts the value of arr[pos] on index newPos, removing 0 elements
                    arr.splice(newPos,0,arr[pos]);

                    /*
                    This removes 1 element from the array starting at pos+1 
                    [+1 because a new element is added in the previous line]
                    */
                    arr.splice(pos+1,1);
                    
                    /*
                    Animate swapping of element at index j with j-1
                    till it reaches the desired position [newPos]
                    */
                    for(let j=pos, counter=0; j>newPos; j--, counter++){
                        /*
                        The timestamps can be understood as follows:
                        At t=0: Initialize Colors
                        At t=t/2: Swap Values
                        At t=t: Reset colors to original for next Iteration
                        */
                        setTimeout(()=>{

                            //Initialize current and preceding elem to BLUE and RED
                            array_bar[j-1].style.backgroundColor = 'red';
                            array_bar[j].style.backgroundColor = 'blue';

                            //SWAP Values
                            setTimeout(()=>{
                                array_bar[j].style.height = `${arr[j]}px`;
                                array_bar[j-1].style.height = `${arr[newPos]}px`;
                            }, TIME/(2*(pos-newPos)));

                            /*
                            SET current last element to lightblue 
                            so it can be reinitialized next iteration
                            */
                            setTimeout(()=>{
                                array_bar[j].style.backgroundColor = 'lightblue' ;
                                
                                if(j===newPos+1){
                                    array_bar[newPos].style.backgroundColor = 'lightblue';
                                }
                            }, (TIME/(pos-newPos)));

                        
                        }, counter*(TIME/(pos-newPos)));    
                    }
                }
                /*
                Simple Blink animation to indicate 
                that the element does not move position
                */
                else{
                    array_bar[i].style.backgroundColor = 'red';
                    setTimeout(()=>{
                        array_bar[i].style.backgroundColor = 'lightblue';
                    }, 150);
                    setTimeout(()=>{
                        array_bar[i].style.backgroundColor = 'red';
                    }, 300);
                    setTimeout(()=>{
                        array_bar[i].style.backgroundColor = 'lightblue';
                    }, 450);
                }
            }, i*TIME);
        }

        this.sortCompleteAnimation();
    }

    //takes in an array and returns the index where the last element should inserted
    insertionSortHelper(arr, pos){
        let origPos = pos;
        while(pos>0 && arr[origPos]<arr[pos-1]){
            pos--;
        }

        return pos;
    }   
    //END OF INSERTION SORT ANIMATION FUNCTIONS(S)


    // QUICKSORT ANIMATION FUNCTIONS(S)
    quickSort(){

        const arrCopy = [...this.state.array],  //Create a copy of the original array for manipulations
            start = 0,
            end = arrCopy.length - 1,
            animations = [];

        this.quickSortRecursive(arrCopy, start, end, animations);

        this.animateQSort( animations);

    }

    quickSortRecursive(arr, start, end, animations){
        if(start >= end){
            return;
        }

        let pivotIndex = this.partition(arr, start, end, animations);
        this.quickSortRecursive(arr, start, pivotIndex-1, animations);
        this.quickSortRecursive(arr, pivotIndex+1, end, animations);
    }

    partition(arr, start, end, animations){

        let pivotValue = arr[end],
            i = start;

        for(let j=start; j<end; j++){
            if(arr[j] < pivotValue){
                animations.push([j,i]);
                
                this.swap(arr, j, i);
                i++
            }     
        }
        
        animations.push([i,end]);
        this.swap(arr, i, end);
        
        return i; 
    }

    animateQSort(animations){

        const array_bar = document.getElementsByClassName("array-elem"),
            arr = this.state.array;
        
        /*for(let i = 0; i < animations.length; i++){
            if (animations[i].match(/\d+ \d+/)){
                let elems = animations[i].split(' ').map(x => parseInt(x, 10));
                swapIndexes.push(elems);
            }
        }*/

        for(let j=0; j<animations.length; j++){
            setTimeout(()=>{
                let idx1 = animations[j][0],
                idx2 = animations[j][1];
        
                this.swap(arr, idx1, idx2);
            
                array_bar[idx1].style.height = `${arr[idx1]}px`;
                array_bar[idx2].style.height = `${arr[idx2]}px`;
            }, j*20);
        }

    }
    //END OF QUICKSORT ANIMATION FUNCTIONS(S)


    /**
    * END OF SORTING ALGORITHM FUNCTIONS
    */
    
    
    render(){
        const {array} = this.state;
        
        return( 
            <>  
                <nav className = "navbar">
                    <button className="nav-btn" id = "gen-new-arr" onClick = {()=>{this.setArray()}}>Generate New Array</button>
                    <button className="nav-btn" id = "bubble-sort" onClick = {()=>{this.bubbleSort()}}>Bubble Sort</button>
                    <button className="nav-btn" id = "selection-sort" onClick = {()=>{this.selectionSort()}}>Selection Sort</button>
                    <button className="nav-btn" id = "insertion-sort" onClick = {()=>{this.insertionSort()}}>Insertion Sort</button>
                    <button className="nav-btn" id = "quick-sort" onClick = {()=>{this.quickSort()}}>Quick Sort</button>
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
            for(let j=0; j< this.getRandomInt(1,20); j++){
                arr.push(this.getRandomInt(-1000,1000));
            }
            let jsSortedArr = arr.slice().sort((a,b)=>a-b),
                //bSortedArray = bubbleSortAlg(arr),
                //sSortedArray = this.selectionSort(arr),
                //iSortedArray = this.insertionSort(arr),
                qSortedArray = this.quickSortAlg(arr, 0, arr.length - 1);


            console.log(this.arraysAreEqual(jsSortedArr, qSortedArray));
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