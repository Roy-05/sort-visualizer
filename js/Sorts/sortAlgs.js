
function bubbleSort(arr) {
    let animation_arr = [];
    //animation_arr.push(arr);
    for(let i =0; i<arr.length; i++){
        for(let j=0; j<arr.length-i-1; j++){
            if(arr[j] > arr[j+1]){
                swap(arr, j, j+1);
                //Returns a coppy of the arrray instead of a reference
                //Pushing twice to apply time delay
                animation_arr.push(arr.slice(0)); 
                animation_arr.push(arr.slice(0)); 
            }
        }
    }        
    console.log(animation_arr);
    return animation_arr;
}

function swap(arr, i, j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

