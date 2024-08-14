let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext("2d")

this.screen = {
    width: window.innerWidth,
    height: window.innerHeight
}
this.mouse = {
    x : screen.width / 2,
    y : screen.height / 2,
}

class Ball{
    constructor(x,y) {
        this.baseR = 10
        this.r = this.baseR;
        this.x = x || randomTntFromInterval(0+this.r,window.innerWidth-this.r)
        this.y = y || randomTntFromInterval(0+this.r,window.innerHeight-this.r)
        this.vx = (Math.random() - 0.5) * 5
        this.vy = (Math.random() - 0.5) * 5
        this.draw();
    }
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);

        c.fill();
    }
    update(){
        if(this.x + this.r > window.innerWidth || this.x - this.r < 0){
            this.vx = -this.vx
        }
        if(this.y + this.r > window.innerHeight || this.y - this.r < 0){
            this.vy = -this.vy
        }
        this.x += this.vx
        this.y += this.vy
        this.draw();
    }

}





class  Canvas{
    constructor() {
        this.balls = []
        for(let i = 0; i < 100; i++ ){
            this.ball
        }
    }
}











// objects--------------------------------------------------------
let balls =[];
for (let i = 0; i < 100; i++){
    balls.push(new Ball());
    c.fillStyle = randomColorHex();
}
// objects--------------------------------------------------------
function animate(){
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    balls.forEach(ball => {
        ball.update();
    })
    requestAnimationFrame(animate);
}


// -------------------click create ball-----------------
window.addEventListener('click', function(e){
    balls.push(new Ball(e.clientX, e.clientY));
    c.fillStyle = randomColorHex();
});
// -------------------click create ball-----------------


// ---------------change size during hover----------------------
window.addEventListener("mousemove", function(e){
    balls.forEach(ball =>{
        let distance = Math.sqrt(Math.pow(e.clientX - ball.x,2) + Math.pow(e.clientY - ball.y,2));
        if (distance < 100 && ball.r < ball.baseR * 4){
            ball.r +=1;
        }else if (ball.r > ball.baseR){
            ball.r -=1;
        }
    })
})
// --------------- endchange size during hover----------------------
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    c.fillStyle = randomColorHex();
})
animate();

function randomTntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// ----------random color---------------------------
function randomColorHex(){
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
// ----------end random color---------------------------
