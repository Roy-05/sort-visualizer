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
        }, i*TIME);      
    }
    
    //Give a 300 ms delay to execute completion animation 
    //so that array_bars turning base color does not overlap 
    // with array_bars turning completion color
    setTimeout(()=>{
        this.sortCompleteAnimation(animations["startPos"].length);
    }, 300);
   
}
//END OF MERGESORT ANIMATION FUNCTION(S)

