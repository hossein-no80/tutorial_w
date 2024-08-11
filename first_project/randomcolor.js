// hex random
function getRandomHexColor(){
    const letters = '0123456789ABCDEF';
    let color = '#'
    for (let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let seconds = 0;
setInterval(()=>{
    seconds++;

    // change color
    if (seconds % 3 === 0){
        document.querySelector("#login-username").style.borderColor = getRandomHexColor();
    }
    if (seconds % 4 === 0){
        document.querySelector("#login-password").style.borderColor = getRandomHexColor();
    }
    if (seconds % 5 === 0){
        document.querySelector("#login-button").style.backgroundColor = getRandomHexColor();
    }
},1000);