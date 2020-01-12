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
            TIME: 300
        };
    }   

    /**
     * Add event listener
     */
    componentDidMount(){
        this.setArray();
        this.updateDimensions();
        this.setCanvasSize();
        this.drawArrayBars();

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
        this.setCanvasSize();
        this.drawArrayBars();
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

        //18 = 12px(width) + [2px + 2px](margin) + 2px(border)
        let arraySize = Math.floor((width - 100)/18);

        return (arraySize<50) ? arraySize : 50;
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

    setCanvasSize(){
        const canvas = document.getElementById('canvas'),
            width = this.state.width,
            height = this.state.height;

        canvas.height = height;
        canvas.width = width;
    }

    drawArrayBars(){
        const canvas = document.getElementById('canvas'),
            arr = this.state.array,
            hMult = this.state.heightMultiplier,
            width = this.state.width,
            height = this.state.height,
            size = this.getArraySize(),
            ctx = canvas.getContext('2d');

        //18 = width of each bar
        let startingPoint = (width-size*18)/2; 

        ctx.clearRect(0,0,width,height);

        ctx.fillStyle = 'red';
        
        console.log(hMult);

        
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

    render(){
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
                </nav>
                <div className="canvas-container">
                    <canvas id="canvas"></canvas>
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