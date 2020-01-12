//BEADSORT ANIMATION FUNCTION(S)
beadSort(){
    const arr = this.state.array,
        animations = [];
    
    this.setState({startedSort: true});

    let beadMatrix = this.numberToBead(arr);
        
    for(let i = 0; i<beadMatrix.length;i++){
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

        animations.push(this.beadToNumber(beadMatrix));
    }
    
    this.animateBeadSort(animations);

}

animateBeadSort(animations){
    const array_bar = document.getElementsByClassName("array-elem"),
        length = animations.length,
        counter = animations[0].length,
        hMult = this.state.heightMultiplier,
        TIME = this.state.TIME;

    for(let i = 0; i<length; i++){
        setTimeout(()=>{
            for(let j =0; j<counter; j++){
                setTimeout(()=>{
                    array_bar[j].style.height = `${animations[i][j]*hMult}px`;
                }, j*TIME*3/(10*counter));
            }
        }, i*TIME*3/10);
    }

   this.sortCompleteAnimation(length*3/10)
}

numberToBead(arr){
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

beadToNumber(beadMatrix){
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

//END OF BEADSORT ANIMATION FUNCTION(S)

