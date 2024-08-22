var cvs = document.getElementById("mycanvas");
var ctx = cvs.getContext("2d");

var DEGREE = Math.PI / 180
var frames = 0;

var sprite = new Image();
sprite.src = "./image/sprite.png";

var state = {
  current :0,
  getReady:0,
  game:1,
  over:2,
}

document.addEventListener("click", clickHandler);
document.addEventListener("keydown", function(e) {
  if (e.key === 32) {
    clickHandler();
  }
});

//----------------------------------------bg-----------------------------------------
var bg = {
  sX:0,
  sY:150,
  w:139,
  h:100,
  x:0,
  y: cvs.height -120,
  draw : function(){
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (this.w*2), this.y, this.w, this.h);
  }
}
// ---------------------getready-----------------------------------------------------
var getReady = {
  sX:292,
  sY:80,
  w:58,
  h:80,
  x:cvs.width/2 -50/2,
  y: 130,
  draw : function(){
    if(state.current === state.getReady){
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
  }
}
// ---------------------getover-----------------------------------------------------
var gameOver = {
  sX:3,
  sY:257,
  w:113,
  h:60,
  x:cvs.width/2 -100/2,
  y: 130,
  draw : function(){
    if(state.current === state.over){
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);

    }
  }
}
// ---------------------bg2-----------------------------------------------------
var bg2 = {
  sX:300,
  sY:0,
  w:132,
  h:58,
  x:0,
  dx:2,
  y: cvs.height - 56,
  draw : function(){
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (this.w*2), this.y, this.w, this.h);
  },
  update : function (){
    if(state.current === state.game){
      this.x = (this.x -this.dx) % (this.w/2);
    }
  }
}
// ---------------------pipes-----------------------------------------------------
var pipes = {
  botton : {
    sX : 82,
    sY : 321,
  },
  top : {
    sX : 56,
    sY : 321,
  },
  w : 29,
  h : 163,
  dx : 2,
  gap : 90,
  position : [],
  maxYPos : -10,
  draw : function (){
    for(let i=0; i < this.position.length; i++ ){
      let p = this.position[i];

      let topYPos = p.y;
      let bottomYPos = p.y + this.h + this.gap;
      ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);
      ctx.drawImage(sprite, this.botton.sX, this.botton.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);


    }
  },
  update : function (){
    if(state.current !== state.game) return;
    if(frames % 100 === 0){
      this.position.push({
        x : cvs.width,
        y: this.maxYPos * (Math.random() + 1),
      })

    }
    for(let i=0; i < this.position.length; i++ ){
      let p = this.position[i];
      p.x -= this.dx;

      let bottomPipesPos = p.y + this.h + this.gap;

      if(bird.x + bird.radius  > p.x  && bird.x - bird.radius  < p.x + this.w
        &&  bird.y + bird.radius  > p.y &&  bird.y - bird.radius < p.y + this.h){
        state.current = state.over;
      }
      if(bird.x + bird.radius  > p.x  && bird.x - bird.radius  < p.x + this.w
        &&  bird.y + bird.radius  > bottomPipesPos &&  bird.y - bird.radius < bottomPipesPos + this.h){
        state.current = state.over;
      }

      if(p.x + this.w  <= 0){
        this.position.shift()
      }
    }
  },
}
// ---------------------bird-----------------------------------------------------
var bird = {
  animation : [
    {sX:113,sY:404},
    {sX:113,sY:432},
    {sX:113,sY:379},
    {sX:113,sY:404},
  ],
  w:20,
  h:20,
  x:50,
  y: 200,
  speed: 0,
  gravity: 0.25,
  animationIndex:0,
  rotation : 0,
  jump : 4.6,
  radius : 12,
  draw : function(){
    let bird = this.animation[this.animationIndex];
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.rotation);
    ctx.drawImage(sprite, bird.sX, bird.sY,this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
    ctx.restore();

  },
  update : function(){
    let period = state.current ===state.getReady ? 10 : 5;
    this.animationIndex += frames % period === 0 ? 1 : 0;
    this.animationIndex =  this.animationIndex % this.animation.length
    if(state.current === state.getReady){
      this.y = 200;
    }else{
      this.speed += this.gravity;
      this.y += this.speed;
      if(this.speed < this.jump){
        this.rotation = - 25 * DEGREE

      }else{
        this.rotation = 60 * DEGREE
      }
    }

    if(this.y + this.h/2 >= cvs.height - bg2.h){
      this.y = cvs.height - bg2.h  - this.h/2;
      this.animationIndex = 1;
      if(state.current === state.game){
        state.current = state.over;
      }

    }
  },
  flap:function (){
    this.speed = -this.jump;
  }
}





// ============================================== functions ============================================

//--------------------F-handler--------------------
function clickHandler(){
  switch(state.current){
    case state.getReady:
      state.current = state.game;
      break;
    case state.game:
      bird.flap();
      break;
    default:
      bird.speed = 0;
      this.rotation = 0;
      pipes.position = [],
        state.current = state.getReady;
      break;
  }
}
//--------------------F-update--------------------

function update(){
  bird.update();
  bg2.update();
  pipes.update();
}
//--------------------F-draw--------------------

function draw(){
  ctx.fillStyle = "#4ec0ca"; //#4ec0ca
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  bg.draw();
  pipes.draw();
  bg2.draw();
  bird.draw();
  getReady.draw();
  gameOver.draw();
}
//--------------------F-animate--------------------

function animate(){
  update();
  draw();
  frames++;
  requestAnimationFrame(animate);

}

animate()


























