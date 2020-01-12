 //BUBBLE SORT ANIMATION FUNCTION(S)
 bubbleSort(){
    this.setState({startedSort: true});

    const arr = this.state.array,    
        array_bar = document.getElementsByClassName('array-elem'),
        TIME = this.state.TIME,
        hMult = this.state.heightMultiplier,
        colors = this.getColors();


    for(let i =0; i<arr.length; i++){
        setTimeout(()=>{ 
            for(let j=0; j<arr.length-i-1; j++){
                setTimeout(()=>{
                    array_bar[j+1].style.backgroundColor = colors["secondary"];
                    array_bar[j].style.backgroundColor = colors["primary"];
                    setTimeout(()=>{
                        if(arr[j] > arr[j+1]){

                            this.swap(arr, j, j+1);
                        
                            array_bar[j].style.height = `${arr[j]*hMult}px`;
                            array_bar[j+1].style.height = `${arr[j+1]*hMult}px`;

                            array_bar[j+1].style.backgroundColor = colors["base"];
                            array_bar[j].style.backgroundColor = colors["base"];
                        }
                        else{
                            array_bar[j+1].style.backgroundColor = colors["base"];
                            array_bar[j].style.backgroundColor = colors["base"];
                        }
                    }, TIME/(arr.length-i-1));
                }, j*TIME/(arr.length-i-1));
            }
        },i*TIME);  
    }        

    this.sortCompleteAnimation(arr.length);

}