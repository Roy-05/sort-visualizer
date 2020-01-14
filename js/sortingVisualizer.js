
const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    canvasContainer = document.getElementById('canvas-container');
    
let array,
    cWidth,
    cHeight,
    drawVis,
    animations,
    width = canvasContainer.offsetWidth,
    height = canvasContainer.offsetHeight,
    navbtn = [...document.getElementsByClassName('nav-btn')],
    resize = false,
    generate = false;

window.addEventListener('DOMContentLoaded', ()=>{
    init()
});

window.addEventListener('resize', ()=>{
    resize = true;
    width = canvasContainer.offsetWidth;
    height = canvasContainer.offsetHeight;
    navbtn = [...document.getElementsByClassName('nav-btn')];
    init();
});

navbtn.forEach(button => {
    button.addEventListener('click', ()=>{
        if(button.id === 'gen-new-arr'){
            generate = true;
            init();
        }
        else if(button.id === 'bubble-sort'){
            setSortAnimations('bubble');
        }
        else if(button.id === 'selection-sort'){
            setSortAnimations('selection');
        }
        else if(button.id === 'insertion-sort'){
            setSortAnimations('insertion');
        }
        else if(button.id === 'quick-sort'){
            setSortAnimations('quick');
        }
        else if(button.id === 'merge-sort'){
            setSortAnimations('merge');
        }
        else if(button.id === 'bead-sort'){
            setSortAnimations('bead');
        }
        else if(button.id === 'heap-sort'){
            setSortAnimations('heap');
        }
        else if(button.id === 'radix-sort'){
            setSortAnimations('radix');
        }
    });
});


function init() {
    array = getArray();
    setCanvasSize();
    drawArrayBars();
}
    
function setCanvasSize() {
    canvas.width = width;
    canvas.height = height;

    cWidth = canvas.width;
    cHeight = canvas.height;
}

function getArraySize(){
    //18 = 12px(width) + 6px(margin)
    let arraySize = Math.floor(width/18);

    return (arraySize<60) ? arraySize : 60;
}

function getArray() {
    const arr = [];

    for(let i = 0; i<getArraySize(); i++){
        arr.push(this.getRandomInt(1,100))
    }

    const MAX = Math.max(...arr),
        hMult = Number(((height-10)/MAX).toFixed(2))

    return arr.map(x => Math.floor(x*hMult));
}

function drawArrayBars(){

    const size = array.length;

    //18 = 12(width of bar) + 6(margin on right)
    //We add a 6 because the last elem leaves behind a 6px margin that we don't want
    let startingPoint = (cWidth-size*18+6)/2; 

    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'black';

    let x = startingPoint;
    for(let i =0; i<size; i++){
        ctx.fillRect(x, cHeight-array[i], 12, array[i]);
        ctx.strokeRect(x, cHeight-array[i], 12, array[i]);
        x += 18;
    }

}

function setSortAnimations(choice){
    let animations;

    if(choice === "bubble") {
        animations = bubbleSort(array);
    }
    else if(choice === "selection") {
        animations = selectionSort(array);
    }
    else if(choice === "insertion") {
        animations = insertionSort(array);
    }
    else if(choice === "quick") {
        animations = animateQuickSort(array);
    }
    else if(choice === "merge") {
        animations = animateMergeSort(array);
    }
    else if(choice === "bead") {
        animations = beadSort(array);
    }
    else if(choice === "heap") {
        animations = heapSort(array);
    }
    else if(choice === "radix") {
        animations = radixSort(array);
    }

    visualize(animations);
}

function visualize(animations){
    let counter = 0,
        l = array.length,
        sP = (cWidth-l*18+6)/2; 

    const draw = () => {
        if(counter === animations.length){
            setTimeout(init, 1000);
            return;
        }

        //Stop animation on window resize
        if(resize === true){
            resize = false;
            return;
        }

        //Stop animation on generate new array click
        if(generate === true){
            generate = false;
            init();
            return;
        }

        let x = sP;
        
        setTimeout(()=>{
            requestAnimationFrame(draw)

            ctx.clearRect(0, 0, cWidth, cHeight);
            ctx.fillStyle = 'red';
            ctx.strokeStyle = 'black';
            for(let i = 0; i<l; i++){
                ctx.fillRect(x, cHeight-animations[counter][i], 12, animations[counter][i]);
                ctx.strokeRect(x, cHeight-animations[counter][i], 12, animations[counter][i]);
                x += 18;
            }
            
            counter++
        }, 20);
    }

    draw();

}


//Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** 


    

    

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
