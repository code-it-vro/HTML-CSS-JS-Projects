const buttons = document.querySelectorAll("button");
const body = document.querySelector("body")

buttons.forEach(function (e){
    e.addEventListener("mouseenter", function (event) {
        if(event.target.id==="red"){
            body.style.backgroundColor=event.target.id;
        }
        if(event.target.id==="green"){
            body.style.backgroundColor=event.target.id;
        }
        if(event.target.id==="yellow"){
            body.style.backgroundColor=event.target.id;
        }
        if(event.target.id==="blue"){
            body.style.backgroundColor=event.target.id;
        }
    });
});