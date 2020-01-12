sortCompleteAnimation(iterations){
    const array_bar = document.getElementsByClassName("array-elem"),
        size = this.getArraySize(),
        TIME = this.state.TIME,
        colors = this.getColors();

    setTimeout(()=>{
        for(let i=0; i<size; i++){
            setTimeout(()=>{
                array_bar[i].style.backgroundColor = colors["completion"];
            }, i*30);
        }
    }, (iterations+1)*TIME);

    setTimeout(()=>{
            [...array_bar].forEach(elem=>{
                setTimeout(()=>{
                    elem.style.backgroundColor = colors["base"];
                }, 350);

                setTimeout(()=>{
                    elem.style.backgroundColor = colors["completion"];
                }, 700);

                setTimeout(()=>{
                    elem.style.backgroundColor = colors["base"];
                }, 1000);
            })
    }, iterations*TIME + size*30 + 200); //200ms for delay

    setTimeout(()=>{
        this.setState({isSorted: true});
    }, iterations*TIME + size*30 + 1200 + 500); //1200ms for previous setTimeout to complete + 500ms delay     
}