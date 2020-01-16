
const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    canvasContainer = document.getElementById('canvas-container'),
    dropdown = document.getElementsByClassName('dropdown')[0],
    pickASort = document.getElementById('pick-a-sort');
    dropdownContent = document.getElementById('dropdown-content');
    
let array,t,
    cWidth,
    cHeight,
    drawVis,
    animations,
    width = canvasContainer.offsetWidth,
    height = canvasContainer.offsetHeight,
    navbtn = [...document.getElementsByClassName('nav-btn')],
    resizeEnd,
    resizing = false,
    generate = false;

window.addEventListener('DOMContentLoaded', ()=>{
    init();
});

window.addEventListener('resize', ()=>{

    resizing = true;
    width = canvasContainer.offsetWidth;
    height = canvasContainer.offsetHeight;
    navbtn = [...document.getElementsByClassName('nav-btn')];
    init();

    //Change resizing to false once resize is done firing
    clearTimeout(resizeEnd);
    resizeEnd = setTimeout(()=>{
        resizing = false;
    }, 500);
});

dropdown.addEventListener('mouseleave', ()=>{
    dropdownContent.className = 'hidden';
});


navbtn.forEach(button =>{
    button.addEventListener('click', ()=>{
        if(button.id === 'gen-new-arr'){
            generate = true;
            init();
        }
        else if(button.id === 'pick-a-sort'){
            toggleDropdownContent();
        }
        else{
            pickASort.disabled = true;

            generate = false;
            toggleDropdownContent();
            setSortAnimations(button.id)
        }
    });
});

       
function init() {
    pickASort.disabled = false;

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

    return (arraySize<50) ? arraySize : 50;
}

function getArray() {
    const arr = [];

    for(let i = 0; i<getArraySize(); i++){
        arr.push(this.getRandomInt(5,100))
    }

    const MAX = Math.max(...arr),
        hMult = Number(((height-10)/MAX).toFixed(2));

    return arr.map(x => Math.floor(x*hMult));
}

function drawArrayBars(){

    const size = array.length;

    //18 = 12(width of bar) + 6(margin on right)
    //We add a 6 because the last elem leaves behind a 6px margin that we don't want
    let startingPoint = (cWidth-size*18+6)/2; 

    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.fillStyle = "#29a382";

    let x = startingPoint;
    for(let i =0; i<size; i++){
        roundRect(ctx, x, cHeight-array[i], 12, array[i], 4, true);
        x += 18;
    }

}

function setSortAnimations(choice){
    let animations;

    if(choice === "bubble-sort") {
        animations = bubbleSort(array);
    }
    else if(choice === "selection-sort") {
        animations = selectionSort(array);
    }
    else if(choice === "insertion-sort") {
        animations = insertionSort(array);
    }
    else if(choice === "quick-sort") {
        animations = animateQuickSort(array);
    }
    else if(choice === "merge-sort") {
        animations = animateMergeSort(array);
    }
    else if(choice === "bead-sort") {
        animations = beadSort(array);
    }
    else if(choice === "heap-sort") {
        animations = heapSort(array);
    }
    else if(choice === "radix-sort") {
        animations = radixSort(array);
    }

    visualize(animations);
}

function visualize(animations){
    let counter = 0,
        l = array.length,
        startingPoint = (cWidth-l*18+6)/2;

    const draw = () => {
        if(counter === animations.length){
        
            setTimeout(init, 1000);
            return;
        }

        //Stop animation on window resize
        if(resizing === true){
            return;
        }

        //Stop animation on generate new array click
        if(generate === true){
            generate = false;
            init();
            return;
        }

        let x = startingPoint;
        
        setTimeout(()=>{
            requestAnimationFrame(draw)

            ctx.clearRect(0, 0, cWidth, cHeight);
            for(let i = 0; i<l; i++){
                if(i === animations[counter][2] && counter < animations.length -1){
                    ctx.fillStyle = "#38316a";
                }
                else if((i === animations[counter][1] || i === animations[counter][3]) && counter < animations.length -1){
                    ctx.fillStyle = "red";
                }
                else {
                    ctx.fillStyle = "#29a382";
                }
                
                roundRect(ctx, x, cHeight-animations[counter][0][i], 12, animations[counter][0][i], 4, true);
                x += 18;
            }
            
            counter++
        }, 10000/animations.length);
    }

    draw();

}

function toggleDropdownContent() {
    if(dropdownContent.className === "hidden"){
        dropdownContent.className = "show";
    }
    else{
        dropdownContent.className = "hidden";
    }
}

/**
 * Source: https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
 * by Juan Mendes. Edited by Me for the specific use-case.
 * 
 * Draws a rounded rectangle using the current state of the canvas.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} radius The corner radius
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {boolean} fill fillStyle or not
 */
function roundRect(ctx, x, y, width, height, radius, fill) {

    radius = {tl: radius, tr: radius, br: radius, bl: radius};
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if(fill){
        ctx.fill();
    }
    ctx.stroke();
}


//Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * testAlgorithms(){
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
