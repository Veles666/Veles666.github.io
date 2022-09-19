createCanvas();
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;




let ManHeight = 30;
let ManWidth = 30;
let ManY = (canvas.height-ManWidth);
let ManX = (canvas.width-ManWidth);

let ballRadius = 10;
let ballCounter = 0;
let balls = [];
let dx = 3;
let dy = 3;
let enemyX = 50;
let enemyY = 50;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

function Createballs() {
        let ball = { x: 0, y: 0, dx: dx,dy: dy};
        ball.x = getRandomArbitrary(100,canvas.width-100);
        ball.y = getRandomArbitrary(100,canvas.height-100);
        balls.push(ball);
        ballCounter++;
    } 

function drawBall() {
   
    for(let c=0; c<ballCounter; c++) {
        ctx.beginPath();
        ctx.arc(balls[c].x, balls[c].y  , ballRadius,0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}
function createCanvas(){
    let divCanvas = document.querySelector('.canvas');
    let h = divCanvas.offsetHeight;
    let w = divCanvas.offsetWidth;
    
    let canvas = document.createElement("canvas");
    canvas.width=w;
    canvas.height=h;
    canvas.style.width=w+'px';
    canvas.style.height=h+'px';
    canvas.id = 'myCanvas';
    canvas.style.backgroundColor='#eee'
    divCanvas.append(canvas);
}

function drawMan(){
    ctx.beginPath();
    ctx.rect(ManX, ManY, ManWidth, ManHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBall();
    drawMan();
    if(seconds%100==0){
        Createballs();
    }
    for(let c=0; c<ballCounter; c++) {
        
    if(balls[c].x + balls[c].dx > canvas.width-ballRadius || balls[c].x + balls[c].dx< ballRadius) {
        if(seconds%100==0 && balls[c].dx>0){
            
            balls[c].dx+=0.1;
        }
        balls[c].dx = -balls[c].dx;
    }
    
    if(balls[c].y+balls[c].dy  > canvas.height-ballRadius || balls[c].y+balls[c].dy  < ballRadius) {
        balls[c].dy = -balls[c].dy;
        if(seconds%100==0 && balls[c].dy>0){
            
            balls[c].dy+=0.1;
        }
    } 
    
    if( ManX+ManWidth > balls[c].x && balls[c].x > ManX && ManY+ManHeight > balls[c].y && balls[c].y > ManY ) {
        alert("Вы набрали "+seconds+" очков");
    document.location.reload();
    clearInterval(interval); // Needed for Chrome to end game
    }
    
        balls[c].x += balls[c].dx;
        balls[c].y += balls[c].dy;
        
    
}

    if(rightPressed && ManX < canvas.width-ManWidth) {
        ManX +=speedMan;
    }
    if(leftPressed && ManX > 0) {
        ManX -=speedMan;
    }
    if(upPressed && ManY < canvas.height-ManHeight){
        ManY +=speedMan;
    }
    if(downPressed && ManY > 0){
        ManY -=speedMan;   
    }
    
    
}
let speedMan = 5;
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    if(e.keyCode == 37) {
        leftPressed = true;
    }
    if(e.keyCode == 38){
        downPressed = true;
    }
    if(e.keyCode == 40){
        upPressed = true;
    }
}   


function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    if(e.keyCode == 37) {
        leftPressed = false;
    }
    if(e.keyCode == 38){
        downPressed = false;
    }
    if(e.keyCode == 40){
        upPressed = false;
    }
}   
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function timer() {

    var seconds = 20;

    var seconds_timer_id = setInterval(function() {
        
                seconds = "0" + seconds;
                $(".seconds").text(seconds);
      
    }, 1000);

}


let interval = setInterval(draw,10);