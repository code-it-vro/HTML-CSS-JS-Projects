
let string="";
let buttons = document.querySelectorAll('.btn');  // this will select all the buttons 
Array.from(buttons).forEach((buttons)=>{    // travel through all the buttons 
    buttons.addEventListener('click',(e)=>{  // if there is anything in the box thats why 'e' is in the braces
        if(e.target.innerHTML == '='){   // if the text comes out to be an = then evvaluate the expression inside the box eval do this work 
            string=eval(string);
            document.querySelector('input').value=string;  // this will display the output 
        
        }
        else if(e.target.innerHTML == 'C'){
            string = "";
            document.querySelector('input').value = string;
        }
        else{
            console.log(e.target)    // if we are not demanding the answer in that case digits will keep on accumulating 
            string = string+e.target.innerHTML;
            document.querySelector('input').value = string;
        }
    })
})