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

