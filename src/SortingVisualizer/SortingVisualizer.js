import React from 'react';
import './SortingVisualizer.css';

class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            array: [],
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
            for(let i=size-1, counter =0; i>=0; i--, counter++){
                setTimeout(()=>{
                    array_bar[i].style.backgroundColor = "green";
                }, counter*30);
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
    
    /**
     * START OF SORTING ALGORITHM FUNCTIONS
     */


    //BUBBLE SORT ANIMATION FUNCTIONS(S)
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
    //END OF BUBBLE SORT ANIMATION FUNCTIONS(S)    


    //SELECTION SORT ANIMATION FUNCTION(S)
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


    /**
     * END OF SORTING ALGORITHM FUNCTIONS
     */



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
            for(let j=0; j< this.getRandomInt(1,20); j++){
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