 //SELECTION SORT ANIMATION FUNCTION(S)
 selectionSort(){

    this.setState({startedSort: true});

    const arr = this.state.array,
        array_bar = document.getElementsByClassName("array-elem"),
        TIME = this.state.TIME,
        hMult = this.state.heightMultiplier,
        colors = this.getColors();

    for(let i=0; i<arr.length-1; i++){
        setTimeout(()=>{
            let minimum = i;
            for(let j = i+1, counter=0; j<arr.length; j++, counter++){
                setTimeout(()=>{
                    array_bar[j].style.backgroundColor = colors["primary"];
                    array_bar[minimum].style.backgroundColor = colors["secondary"];
                    setTimeout(()=>{
                        if(arr[j] < arr[minimum]){
                        array_bar[minimum].style.backgroundColor = colors["base"];
                        minimum = j; 
                        }  
                        else{
                            array_bar[j].style.backgroundColor = colors["base"];
                        }  
                    }, TIME/(1.2*(arr.length-i-1)));
                }, counter*TIME/(arr.length-i-1));    
            }

            setTimeout(()=>{

                this.swap(arr, i, minimum);
        
                array_bar[i].style.height = `${arr[i]*hMult}px`;
                array_bar[minimum].style.height = `${arr[minimum]*hMult}px`;
                array_bar[minimum].style.backgroundColor = colors["base"];

            }, TIME);

            

        }, i*TIME);
    }

    this.sortCompleteAnimation(arr.length);

}
//END OF SELECTION SORT ANIMATION FUNCTION(S)

