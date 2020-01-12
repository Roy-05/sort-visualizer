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

