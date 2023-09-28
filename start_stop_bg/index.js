

// ( get my bg ) button is not working 

const randomColor = function(){
    const reference = "0123456789ABCDEF"
    let color = "#"

    for(let i =0 ;i< 6 ;i++){
        color = color + reference[Math.floor(Math.random() * 16)];
    }
    return color
};

const myColor = document.querySelector("body").style.backgroundColor = randomColor();


let intervalId
const startChangingColor = function(){
    if(!intervalId){
        intervalId = setInterval(newColor,1000)
    }
    function newColor(){
     document.body.style.backgroundColor=randomColor();
        
    }  
}
const stopChangingColor = function(){
    clearInterval(intervalId);
    intervalId=null;
}
const getMyBg = function() {
    document.querySelector("#result").innerHTML=randomColor()
}

document.querySelector("#start").addEventListener('click' , startChangingColor)
document.querySelector("#stop").addEventListener('click' , stopChangingColor)
document.querySelector("#getcode").addEventListener('click' , getMyBg)

