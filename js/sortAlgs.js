
function bubbleSort(arr) {
    let animations = [];
    for(let i =0; i<arr.length; i++){
        for(let j=0; j<arr.length-i-1; j++){
            if(arr[j] > arr[j+1]){
                swap(arr, j, j+1);
                //Returns a coppy of the arrray instead of a reference
                animations.push(arr.slice(0)); 
            }
        }
    }        
    return animations;
}



function selectionSort(arr){

    let animations = [];
    for(let i=0; i<arr.length-1; i++){
        let minimum = i;
        for(let j = i+1, counter=0; j<arr.length; j++, counter++){
            if(arr[j] < arr[minimum]){
                minimum = j; 

            }
        }

        swap(arr, i, minimum);
        animations.push(arr.slice(0));
    }

    return animations
}



function insertionSort(arr){

    let animations = [];

    for(let i=0; i<arr.length; i++){
        let temp = arr[i],
            pos = i

        while(pos>0 && temp<arr[pos-1]){
            arr[pos] = arr[pos-1];
            animations.push(arr.slice(0));
            pos--;
        }
        
        arr[pos] = temp;
        animations.push(arr.slice(0));
    }

    return animations;
}



function animateQuickSort(arr){

    let animations = [];

    quickSort(arr, 0, arr.length - 1, animations);

    return animations;

}

function quickSort(arr, start, end, animations){
    if(start >= end){
        return;
    }

    let pivotIndex = partition(arr, start, end, animations);
    quickSort(arr, start, pivotIndex-1, animations);
    quickSort(arr, pivotIndex+1, end, animations);
}

function partition(arr, start, end, animations){

    let pivotValue = arr[end],
        i = start;

    for(let j=start; j<end; j++){
        if(arr[j] < pivotValue){
            
            swap(arr, j, i);
            animations.push(arr.slice(0));
            i++
        }     
    }
    
    // animations["pos"].push([i,end]);
    // animations["pivot"].push([i,end]);
    // animations["counter"].push(animations["pos"].length);
    swap(arr, i, end);
    animations.push(arr.slice(0));
    
    return i; 
}



function animateMergeSort(arr) {
    let animations = [];
    mergeSort(arr, 0, arr.length - 1, animations);

    return animations
}

function mergeSort(arr, start, end, animations){
    
    if(start>=end){
        return;
    }

    const mid = Math.floor((start+end)/2);

    this.mergeSort(arr, start, mid, animations);
    this.mergeSort(arr, mid+1, end, animations);
    this.merge(arr, start, mid, end, animations);
}

function merge(arr, start, mid, end, animations) {
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

    for(let i = 0; i<tempArr.length;i++){
        arr[start] = tempArr[i];
        start++;
    }

    animations.push(arr.slice(0));
}



function beadSort(arr){
    
    let animations = [];
    
    let beadMatrix = numberToBead(arr);
        
    for(let i = Math.min(...arr); i<beadMatrix.length;i++){
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

        animations.push(beadToNumber(beadMatrix));
    }
    
    return animations;

}

function numberToBead(arr){
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

function beadToNumber(beadMatrix){
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




function heapSort(arr){
        
    let animations = [],
        n = arr.length;

    //Create initial max heap
    for(let i = Math.floor(n/2)-1; i>=0;i--){
        this.heapify(arr, n, i, animations);
    }

    //swap root node with last element
    for(let j = n-1; j>=0; j--){
        this.swap(arr, j, 0);
        animations.push(arr.slice(0));
        this.heapify(arr, j, 0, animations);
    }

    return animations;
}

function heapify(arr, n, i, animations){
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
        animations.push(arr.slice(0));
        this.heapify(arr, n, largest, animations);
    }
}



function radixSort(arr){
    let maxNum = Math.max(...arr),
        divisor = 1,
        animations = [];
       
    while (Math.trunc(maxNum)>0){
        let buckets = [...Array(10)].map(() => []),
            tempDiv = divisor;
        arr.forEach(num=>{
            buckets[Math.floor((num/tempDiv))%10].push(num);
        });

        let temp = arr.slice(0);

        // Reconstruct the array by concatinating all sub arrays
        arr = [].concat(...buckets);
        for(let i = 0; i<arr.length; i++){
            animations.push(arr.slice(0,i+1).concat(...temp.slice(i+1)));
        }
        

        maxNum/=10;
        divisor *= 10;
        
    }

    return animations;
}



function swap(arr, i, j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
