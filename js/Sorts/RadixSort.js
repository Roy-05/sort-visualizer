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
