import React from 'react';
import './SortingVisualizer.css';

class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            array: [],
            width: window.innerWidth,
            height: window.innerHeight*0.7,
            heightMultiplier: 1,
            startedSort: false,
            isSorted: false,
            TIME: 500
        };
    }   

    /**
     * Add event listener
     */
    componentDidMount(){
        this.setArray();
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions.bind(this));    
    }

    /**
     * Remove event listener
     */
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions.bind(this));
    }

    componentDidUpdate(prevProps, prevState){
        let nav_btn = document.getElementsByClassName("nav-btn");

        if(prevState.array !== this.state.array){
            this.setState({
                heightMultiplier: this.setHeightMultiplier()
            })
        }

        if(this.state.startedSort ){
            this.hideDropdown();
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
            this.showDropdown();
            this.setArray();
        }
    }

    //call this function on window resize
    updateDimensions(){
        this.updateBrowserWidth();
        this.updateBrowserHeight();
    }

    updateBrowserWidth(){
        if(Math.abs(this.state.width-window.innerWidth)>12){
            this.setState({
                width: window.innerWidth
            });

            this.setArray();
        }
    }

    updateBrowserHeight(){
        if(this.state.height !== window.innerHeight*0.7){
            this.setState({
                height: window.innerHeight*0.7,
                heightMultiplier: this.setHeightMultiplier()
            })
        }
    }

    getArraySize(){
        let width = this.state.width;

        //12 = 12px(width) + [2px + 2px](margin) + 1px(border)
        let arraySize = Math.floor((width - 100)/17);

        return (arraySize<75) ? arraySize : 75;
    }

    getColors(){
        return {
            "base": "#6DB5E5",
            "primary": "#B94DC4",
            "secondary": "#C47D4D",
            "completion": "#58C44D"
        }
    }

    setArray(){
        const array = [];

        for(let i = 0; i<this.getArraySize(); i++){
            array.push(this.getRandomInt(1,100))
        }

        this.setState({
            array: array
        });
    }

    setHeightMultiplier(){
        const height = this.state.height,
            MAX = Math.max(...this.state.array);

        return (height-10)/MAX;    
    }

    hideDropdown(){
        const dropdown = document.getElementsByClassName("dropdown")[0];
        
        dropdown.className = "dropdown clicked";
    }

    showDropdown(){
        const dropdown = document.getElementsByClassName("dropdown")[0];
        
        dropdown.className = "dropdown";
    }
    
    swap(arr, i, j){
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    

    //Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    sortCompleteAnimation(iterations){
        const array_bar = document.getElementsByClassName("array-elem"),
            size = this.getArraySize(),
            TIME = this.state.TIME,
            colors = this.getColors();

        setTimeout(()=>{
            for(let i=0; i<size; i++){
                setTimeout(()=>{
                    array_bar[i].style.backgroundColor = colors["completion"];
                }, i*30);
            }
        }, (iterations+1)*TIME);

        setTimeout(()=>{
                [...array_bar].forEach(elem=>{
                    setTimeout(()=>{
                        elem.style.backgroundColor = colors["base"];
                    }, 350);

                    setTimeout(()=>{
                        elem.style.backgroundColor = colors["completion"];
                    }, 700);

                    setTimeout(()=>{
                        elem.style.backgroundColor = colors["base"];
                    }, 1000);
                })
        }, iterations*TIME + size*30 + 200); //200ms for delay

        setTimeout(()=>{
            this.setState({isSorted: true});
        }, iterations*TIME + size*30 + 1200 + 500); //1200ms for previous setTimeout to complete + 500ms delay     
    }

 
    /**
    * START OF SORTING ALGORITHM FUNCTIONS
    */


    //BUBBLE SORT ANIMATION FUNCTION(S)
    bubbleSort(){
        this.setState({startedSort: true});

        const arr = this.state.array,    
            array_bar = document.getElementsByClassName('array-elem'),
            TIME = this.state.TIME,
            hMult = this.state.heightMultiplier,
            colors = this.getColors();


        for(let i =0; i<arr.length; i++){
            setTimeout(()=>{ 
                for(let j=0; j<arr.length-i-1; j++){
                    setTimeout(()=>{
                        array_bar[j+1].style.backgroundColor = colors["secondary"];
                        array_bar[j].style.backgroundColor = colors["primary"];
                        setTimeout(()=>{
                            if(arr[j] > arr[j+1]){

                                this.swap(arr, j, j+1);
                            
                                array_bar[j].style.height = `${arr[j]*hMult}px`;
                                array_bar[j+1].style.height = `${arr[j+1]*hMult}px`;

                                array_bar[j+1].style.backgroundColor = colors["base"];
                                array_bar[j].style.backgroundColor = colors["base"];
                            }
                            else{
                                array_bar[j+1].style.backgroundColor = colors["base"];
                                array_bar[j].style.backgroundColor = colors["base"];
                            }
                        }, TIME/(arr.length-i-1));
                    }, j*TIME/(arr.length-i-1));
                }
            },i*TIME);  
        }        

        this.sortCompleteAnimation(arr.length);

    }
    //END OF BUBBLE SORT ANIMATION FUNCTION(S)    


    //SELECTION SORT ANIMATION FUNCTION(S)
    selectionSort(){

        this.setState({startedSort: true});

        const arr = this.state.array,
            array_bar = document.getElementsByClassName("array-elem"),
            TIME = this.state.TIME,
            hMult = this.state.heightMultiplier,
            colors = this.getColors();

        for(let i=0; i<arr.length-1; i++){
            setTimeout(()=>{
                let minimum = i;
                for(let j = i+1, counter=0; j<arr.length; j++, counter++){
                    setTimeout(()=>{
                        array_bar[j].style.backgroundColor = colors["primary"];
                        array_bar[minimum].style.backgroundColor = colors["secondary"];
                        setTimeout(()=>{
                            if(arr[j] < arr[minimum]){
                            array_bar[minimum].style.backgroundColor = colors["base"];
                            minimum = j; 
                            }  
                            else{
                                array_bar[j].style.backgroundColor = colors["base"];
                            }  
                        }, TIME/(2*(arr.length-i-1)));
                    }, counter*TIME/(arr.length-i-1));    
                }

                setTimeout(()=>{

                    this.swap(arr, i, minimum);
            
                    array_bar[i].style.height = `${arr[i]*hMult}px`;
                    array_bar[minimum].style.height = `${arr[minimum]*hMult}px`;
                    array_bar[minimum].style.backgroundColor = colors["base"];

                }, TIME);

                

            }, i*TIME);
        }

        this.sortCompleteAnimation(arr.length);

    }
    //END OF SELECTION SORT ANIMATION FUNCTION(S)


    //INSERTION SORT ANIMATION FUNCTION(S)
    insertionSort(){

        //Disable nav buttons [AND TO HANDLE OTHER ACTIONS WHEN NEEDED]
        this.setState({startedSort: true});

        const arr = this.state.array,
            array_bar = document.getElementsByClassName("array-elem"),
            TIME = this.state.TIME,
            hMult = this.state.heightMultiplier,
            colors = this.getColors();
        
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
                            array_bar[j-1].style.backgroundColor = colors["primary"];
                            array_bar[j].style.backgroundColor = colors["secondary"];
                            array_bar[pos].style.backgroundColor = colors["completion"];

                            //SWAP Values
                            setTimeout(()=>{
                                array_bar[j].style.height = `${arr[j]*hMult}px`;
                                array_bar[j-1].style.height = `${arr[newPos]*hMult}px`;
                            }, TIME/(2*(pos-newPos)));

                            /*
                            SET current last element to lightblue 
                            so it can be reinitialized next iteration
                            */
                            setTimeout(()=>{
                                array_bar[j].style.backgroundColor = colors["base"] ;
                            
                                if(j===newPos+1){
                                    array_bar[newPos].style.backgroundColor = colors["base"];
                                }
                            }, (TIME/(pos-newPos)));

                            setTimeout(()=>{
                                array_bar[pos].style.backgroundColor = colors["base"] ;
                            }, TIME);

                        }, counter*(TIME/(pos-newPos)));    
                       
                    }
                }
                /*
                Simple Blink animation to indicate 
                that the element does not move position
                */
                else{
                    
                    array_bar[i].style.backgroundColor = colors["completion"];
                    setTimeout(()=>{
                        array_bar[i].style.backgroundColor = colors["base"];
                    }, 150);
                    setTimeout(()=>{
                        array_bar[i].style.backgroundColor = colors["completion"];
                    }, 300);
                    setTimeout(()=>{
                        array_bar[i].style.backgroundColor = colors["base"];
                    }, 450);
                }
            }, i*TIME);
        }

        this.sortCompleteAnimation(arr.length);
    }

    //takes in an array and returns the index where the last element should inserted
    insertionSortHelper(arr, pos){
        let origPos = pos;
        while(pos>0 && arr[origPos]<arr[pos-1]){
            pos--;
        }

        return pos;
    }   
    //END OF INSERTION SORT ANIMATION FUNCTION(S)


    // QUICKSORT ANIMATION FUNCTION(S)
    quickSort(){

        this.setState({startedSort: true});

        const arrCopy = [...this.state.array],  //Create a copy of the original array for manipulations
            start = 0,
            end = arrCopy.length - 1,
            animations = {
                "pos": [],      //store the index of elements that will be swapped
                "pivot": [],    //store the pivots for each run
                "counter": [0]  //count how many swaps take place
            };

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
                animations["pos"].push([j,i]);
                
                this.swap(arr, j, i);
                i++
            }     
        }
        
        animations["pos"].push([i,end]);
        animations["pivot"].push([i,end]);
        animations["counter"].push(animations["pos"].length);
        this.swap(arr, i, end);
        
        return i; 
    }

    animateQSort(animations){

        const array_bar = document.getElementsByClassName("array-elem"),
            arr = this.state.array,
            TIME = this.state.TIME,
            hMult = this.state.heightMultiplier,
            colors = this.getColors();

        for(let i=0; i <animations["counter"].length - 1; i++){
            setTimeout(()=>{
                for(let j=animations["counter"][i], t=0; j<animations["counter"][i+1]; j++, t++){
                    setTimeout(()=>{
                        let idx1 = animations["pos"][j][0],
                            idx2 = animations["pos"][j][1],
                            pivot = animations["pivot"][i][1];
                        
                        array_bar[idx1].style.backgroundColor = colors["primary"];
                        array_bar[idx2].style.backgroundColor = colors["secondary"];

                        array_bar[pivot].style.backgroundColor = colors["completion"];

                        this.swap(arr, idx1, idx2);
                    
                        setTimeout(()=>{
                            array_bar[idx1].style.height = `${arr[idx1]*hMult}px`;
                            array_bar[idx2].style.height = `${arr[idx2]*hMult}px`;
                        }, TIME/(2*(animations["counter"][i+1]-animations["counter"][i])));

                        setTimeout(()=>{
                            array_bar[idx1].style.backgroundColor = colors["base"];
                            array_bar[idx2].style.backgroundColor = colors["base"];
                        }, TIME/(animations["counter"][i+1]-animations["counter"][i]));
                        
                    }, t*TIME/(animations["counter"][i+1]-animations["counter"][i]));
                }
            }, i*TIME);
        }

    this.sortCompleteAnimation(animations["counter"].length - 1);

    }
    //END OF QUICKSORT ANIMATION FUNCTION(S)


    //MERGESORT ANIMATION FUNCTION(S)
    mergeSort(){

        this.setState({startedSort: true})

        const arr = [...this.state.array],
            start = 0,
            end = arr.length-1,
            animations = {
                "startPos": [],
                "values": [],
                "endPos": [],
                "midPos": [],
                "heights": []
            };

        this.mergeSortRecursive(arr,start, end, animations);

        this.animateMSort(animations);
    }

    mergeSortRecursive(arr, start, end, animations){
        if(start>=end){
            return;
        }

        let mid = Math.floor((start+end)/2);

        this.mergeSortRecursive(arr, start, mid, animations);
        this.mergeSortRecursive(arr, mid+1, end, animations);
        this.merge(arr, start, mid, end, animations);
    }

    merge(arr, start, mid, end, animations) {
        let arr1Index = start,
            arr2Index = mid +1,
            tempArr = [];

        for(let i = start; i<=end; i++){
            if(arr1Index > mid){
                tempArr.push(arr[arr2Index]);
                arr2Index++;
            }
            else if(arr2Index > end){
                tempArr.push(arr[arr1Index]);
                arr1Index++;
            }
            else if(arr[arr1Index] < arr[arr2Index]){
                tempArr.push(arr[arr1Index]);
                arr1Index++;
            }
            else{
                tempArr.push(arr[arr2Index]);
                arr2Index++;
            }
        }

        animations["startPos"].push(start);
        animations["values"].push(tempArr);
        animations["midPos"].push(mid);
        animations["endPos"].push(end);
        
        for(let i = 0; i<tempArr.length;i++){
            arr[start] = tempArr[i];
            start++;
        }
    }

    animateMSort(animations){
        const arr = this.state.array,
            array_bar = document.getElementsByClassName("array-elem"),
            TIME = this.state.TIME,
            hMult = this.state.heightMultiplier,
            colors = this.getColors();
            
        for(let i= 0; i<animations["startPos"].length; i++){
            setTimeout(()=>{
                let start = animations["startPos"][i],
                    arrLength = animations["values"][i].length;
                for(let j= start, t=0; j<(start+arrLength); j++, t++){
                    setTimeout(()=>{
                        let mid = animations["midPos"][i],
                            end = animations["endPos"][i];

                        array_bar[start].style.backgroundColor = colors["primary"];
                        array_bar[mid].style.backgroundColor = colors["completion"];
                        array_bar[end].style.backgroundColor = colors["secondary"];

                        setTimeout(()=>{  
                            arr[j] = animations["values"][i][t]; 
                        }, t*(TIME/(6*arrLength)));

                        setTimeout(()=>{  
                            array_bar[j].style.height = `${arr[j]*hMult}px`

                        }, t*(TIME/(3*arrLength)));

                        setTimeout(()=>{    
                            array_bar[start].style.backgroundColor = colors["base"];
                            array_bar[mid].style.backgroundColor = colors["base"];
                            array_bar[end].style.backgroundColor = colors["base"];

                        }, TIME);
                    },t*(TIME/arrLength));                   
                }
            }, i*(TIME+1));      
        }
        
        //Give a TIME ms delay to execute completion animation 
        //so that array_bars turning base color does not overlap 
        // with array_bars turning completion color
        setTimeout(()=>{
            this.sortCompleteAnimation(animations["startPos"].length);
        }, TIME);
       
    }
    //END OF MERGESORT ANIMATION FUNCTION(S)


    //BEADSORT ANIMATION FUNCTION(S)
    beadSort(){
        const arr = this.state.array,
            animations = [];
        
        this.setState({startedSort: true});

        let beadMatrix = this.numberToBead(arr);
            
        for(let i = 0; i<beadMatrix.length;i++){
            let counter = 0;
            for(let j=0; j<beadMatrix.length; j++){
                if(beadMatrix[i][j]===false){
                    beadMatrix[i][j] = true;
                    counter++;
                }
            }

            for(let k=0; k<counter; k++){
                beadMatrix[i][k] = false;
            }

            animations.push(this.beadToNumber(beadMatrix));
        }
        
        this.animateBeadSort(animations);

    }

    animateBeadSort(animations){
        const array_bar = document.getElementsByClassName("array-elem"),
            length = animations.length,
            counter = animations[0].length,
            hMult = this.state.heightMultiplier,
            TIME = this.state.TIME;

        for(let i = 0; i<length; i++){
            setTimeout(()=>{
                for(let j =0; j<counter; j++){
                    setTimeout(()=>{
                        array_bar[j].style.height = `${animations[i][j]*hMult}px`;
                    }, j*TIME*3/(10*counter));
                }
            }, i*TIME*3/10);
        }

       this.sortCompleteAnimation(length*3/10)
    }

    numberToBead(arr){
        let largest = Math.max(...arr),
            numInBeads = [],
            beadMatrix = [];
        
        for(let i=0; i< arr.length; i++){

            let beads = new Array(largest);     //Array.fill() needs an array of a defined length to work
            beads.fill(true, 0,arr[i]);
            beads.fill(false, arr[i],largest);

            numInBeads.push(beads);
        }

        for(let i=0; i<largest;i++){
            let beads = [];
            for(let j=0; j<numInBeads.length; j++){
                beads.push(numInBeads[j][i]);
            }
            beadMatrix.push(beads);
        }

        return beadMatrix;
    }

    beadToNumber(beadMatrix){
        let size = beadMatrix[0].length,
            numbers = [];
        for(let i=0; i<size; i++){
            let counter = 0;
            for(let j=0; j<beadMatrix.length;j++){
                if(beadMatrix[j][i]===true){
                    counter++;
                }
            }
            numbers.push(counter);
        }
    
        return numbers;
    }

    //END OF BEADSORT ANIMATION FUNCTION(S)

    
    //HEAPSORT ANIMATION FUNCTION(S)
    heapSort(){
        
        this.setState({startedSort: true});

        const arr = [...this.state.array],
            n = arr.length,
            animations = [];

        //Create initial max heap
        for(let i = Math.floor(n/2)-1; i>=0;i--){
            this.heapify(arr, n, i, animations);
        }

        //swap root node with last element
        for(let j = n-1; j>=0; j--){
            this.swap(arr, j, 0);
            animations.push([j,0]);
            this.heapify(arr, j, 0, animations);
        }

        this.animateHeapSort(animations);
    }

    heapify(arr, n, i, animations){
        let largest = i,
            left = 2*i+1,
            right = 2*i+2;
        
        if(left<n && arr[left]>arr[largest]){
            largest = left;
        }

        if(right<n && arr[right]>arr[largest]){
            largest = right;
        }

        if(largest !== i){
            this.swap(arr, i, largest);
            animations.push([i,largest]);
            this.heapify(arr, n, largest, animations);
        }

    }

    animateHeapSort(animations){
        const arr = this.state.array,
            array_bar = document.getElementsByClassName("array-elem"),
            TIME = this.state.TIME,
            hMult = this.state.heightMultiplier,
            colors = this.getColors();
        
        for(let i=0; i< animations.length; i++){
            setTimeout(()=>{
                let elem1 = animations[i][0],
                elem2 = animations[i][1];

                array_bar[elem1].style.backgroundColor = colors["primary"];
                array_bar[elem2].style.backgroundColor = colors["secondary"];

                setTimeout(()=>{
                    this.swap(arr, elem1, elem2);
                    array_bar[elem1].style.height = `${hMult*arr[elem1]}px`;
                    array_bar[elem2].style.height = `${hMult*arr[elem2]}px`;
                }, TIME/20);
                
                setTimeout(()=>{
                    array_bar[elem1].style.backgroundColor = colors["base"];
                    array_bar[elem2].style.backgroundColor = colors["base"];
                }, TIME/10 - 10);
            }, i*TIME/10);
        }
    
        this.sortCompleteAnimation(animations.length/10);
    }
    //END OF HEAPSORT ANIMATION FUNCTION(S)


    //RADIX SORT ANIMATION FUNCTION(S)
    radixSort(){

        this.setState({startedSort: true});
        
        let arr = [...this.state.array],
            maxNum = Math.max(...arr),
            divisor = 1,
            animations = [];//{
            //     "arrays": [],
            //     "numOfEach": []
            // };
            // let t = [];
        while (Math.trunc(maxNum)>0){
            let buckets = [...Array(10)].map(() => []),
                tempDiv = divisor;
            arr.forEach(num=>{
                buckets[Math.floor((num/tempDiv))%10].push(num);
            });
            
            // buckets.forEach(elem=>{
            //     t.push(elem.length);
            // });
            // console.log(buckets);
            // console.log(t);
            // Reconstruct the array by concatinating all sub arrays
            animations.push([].concat(...buckets));
            arr = [].concat(...buckets);

            maxNum/=10;
            divisor *= 10;
            
        }

        this.animateRadixSort(animations);
    }

    animateRadixSort(animations){
        const array_bar = document.getElementsByClassName("array-elem"),
            hMult = this.state.heightMultiplier,
            TIME = this.state.TIME;

        let arr = this.state.array,
            max = Math.max(...arr),
            counter = Math.ceil(Math.log10(max+1));

        for(let i=0; i<counter; i++){
            setTimeout(()=>{
                for(let j=0;j<arr.length;j++){
                    setTimeout(()=>{
                        arr[j] = animations[i][j];
                        array_bar[j].style.height  = `${arr[j]*hMult}px`;
                    }, j*(TIME*14/arr.length));
                }
            },i*TIME*14);
        }

        this.sortCompleteAnimation(counter*14);
    }        
    //END OF RADIXSORT ANIMATION FUNCTION(S)


    /**
    * END OF SORTING ALGORITHM FUNCTIONS
    */
    
    
    render(){
        const {array} = this.state,
            hMult = this.state.heightMultiplier;

        return( 
            <>  
                <nav className = "navbar">
                    <button className="nav-btn" id = "gen-new-arr" onClick = {()=>{this.setArray()}}>GENERATE NEW ARRAY</button>
                    <div className="dropdown">
                        <button className="nav-btn pick-a-sort">PICK A SORT:</button>
                        <div className = "dropdown-content">
                            <button className="nav-btn" id = "bubble-sort" onClick = {()=>{this.bubbleSort()}}>BUBBLE SORT</button>
                            <button className="nav-btn" id = "selection-sort" onClick = {()=>{this.selectionSort()}}>SELECTION SORT</button>
                            <button className="nav-btn" id = "insertion-sort" onClick = {()=>{this.insertionSort()}}>INSERTION SORT</button>
                            <button className="nav-btn" id = "quick-sort" onClick = {()=>{this.quickSort()}}>QUICK SORT</button>
                            <button className="nav-btn" id = "merge-sort" onClick = {()=>{this.mergeSort()}}>MERGE SORT</button>
                            <button className="nav-btn" id = "bead-sort" onClick = {()=>{this.beadSort()}}>BEAD SORT</button>
                            <button className="nav-btn" id = "heap-sort" onClick = {()=>{this.heapSort()}}>HEAP SORT</button>
                            <button className="nav-btn" id = "radix-sort" onClick = {()=>{this.radixSort()}}>RADIX SORT</button>
                        </div>
                    </div>
                    {/*<button className="nav-btn" id = "test-algs" onClick = {()=>{this.testAlgorithms()}}>Test!</button>*/}
                </nav>
                <div className="array-container">
                    <div className="array-bars">
                    {
                        array.map((value, idx) => (
                            <div className = "array-elem" key = {idx} style = {{height: `${value*hMult}px`}}></div>
                        ))
                    } 
                    </div>
                </div>
            </>
        );
    }
    
    /*
    testAlgorithms(){
        for(let i= 0; i<100; i++){
            const arr = [];
            for(let j=0; j< this.getRandomInt(1,100); j++){
                arr.push(this.getRandomInt(0,1000));
            }
            let jsSortedArr = arr.slice().sort((a,b)=>a-b),
                //bSortedArray = bubbleSortAlg(arr),
                //sSortedArray = this.selectionSort(arr),
                //iSortedArray = this.insertionSort(arr),
                //qSortedArray = this.quickSortAlg(arr, 0, arr.length - 1),
                //mSortedArray = this.mergeSort(arr),
                //bdSortedArray =  this.beadSort(arr),
                //hSortedArray = this.heapSort(arr),
                rSortedArray = this.radixSort(arr);



            console.log(this.arraysAreEqual(jsSortedArr, rSortedArray));
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
    */
}

export default SortingVisualizer;