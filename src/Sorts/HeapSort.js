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

