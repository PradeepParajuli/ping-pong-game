// game mode
const boardWidth = document.querySelector('.game-board').offsetWidth;
const boardHeight = document.querySelector('.game-board').offsetHeight;
const playerWidth = document.querySelector('#player1').offsetWidth;
const playerHeight = document.querySelector('#player1').offsetHeight;

const leftLimit = 20;
const rightLimit = boardWidth - 20;
const topLimit = 1;
const bottomLimit = boardHeight - 1;
var directionLeft = false;
var directionTop = false;
let ballSpeed = 10;

function pause(){
    confirm("Resume");
}
function back(){
    window.location.replace("http://127.0.0.1:5500/Projects/Ping%20Pong%20Game/index.html");
}

function movePlayerUp(playerId){
    let p1 = document.getElementById(playerId);
    let top = p1.offsetTop;
    if((top - playerHeight - 22)>=topLimit){
        p1.style.top = (top - ballSpeed*2)+'px' ;
    }else{
        p1.style.top = '0px' ;
    }
}
function movePlayerDown(playerId){
    let p2 = document.getElementById(playerId);
    let top = p2.offsetTop;
    if((top + playerHeight + ballSpeed*2 +4) <= bottomLimit){
        p2.style.top = (top + ballSpeed*2)+'px' ;
    }else{
        p2.style.top = (bottomLimit - playerHeight - playerHeight*0.2) +'px' ;
    }
}
 
function keyPressed(event){
    let key = event.key;
    console.log(key);
    if(key==='w' || key==='W') movePlayerUp('player1');
    else if(key==='s' || key==='s') movePlayerDown('player1');
    else if(key==='ArrowUp' ||key==='a') movePlayerUp('player2');
    else if(key==='ArrowDown' || key==='d') movePlayerDown('player2');
}
let body = document.querySelector("body").addEventListener('keydown',(key)=>keyPressed(key));


// --- collision managment------
function detectCollision(){
    
    let ball = document.querySelector('#ball');
    let p1 = document.querySelector('#player1');
    let p2 = document.querySelector('#player2');
    let p1t = p1.offsetTop;
    let p1b = p1.offsetTop + p1.offsetHeight;
    let p2t = p2.offsetTop;
    let p2b = p2.offsetTop + p2.offsetHeight;
    let ballTop = ball.offsetTop;
    let ballLeft = ball.offsetLeft;
    
    // top & bottom collision
    if((ballTop-20) <= topLimit){
        // console.log("collosion-top")
        directionTop = true;
    }
    else if((ballTop+40) >= bottomLimit){
        // console.log("collosion-bottom")
        directionTop = false;
    }

    // collision with players
    if((ballLeft-20) <= leftLimit){
        if(p1t-15<=ballTop && p1b+15>=(ballTop-20)){
            console.log('collosion-l')
            directionLeft = true;
        }
        else {
            directionLeft = false;
            changeScore('p2-score','player1');
        }
    }
    else if((ballLeft+45) >= rightLimit){
        console.log('collosion-r')
        if(p2t-5<=ballTop && p2b+5>=(ballTop+20)){
            directionLeft = false;
        }
        else {
            directionLeft = false;
            changeScore('p1-score',player2);
        }
    }    
}


//  -- ball movement --
// let ball = document.getElementById('ball');
function freeBallMovement(){
    let ball = document.querySelector('#ball');
    let ballTop = ball.offsetTop;
    let ballLeft = ball.offsetLeft;

    //free ball movement
    if(directionTop==true){
        ball.style.top = (ballTop+ballSpeed*3)+'px';
        if(directionLeft==true){
            // console.log("top-left"+ball.style.left)
            ball.style.left = (ballLeft+ballSpeed*1.8)+'px';
        }else{
            // console.log("top-right"+ball.style.left)
            ball.style.left = (ballLeft-ballSpeed*.5)+'px';
        }
    }
    else{
        ball.style.top = (ballTop-ballSpeed)+'px';
        if(directionLeft==true){
            // console.log("bottom-left"+ball.style.left)
            ball.style.left = (ballLeft+ballSpeed*1.8)+'px';
        }else{
            // console.log("bottom-right"+ball.style.left)
            ball.style.left = (ballLeft-ballSpeed*.5)+'px';
        }
    }
    detectCollision();
}

function changeScore(id,player){
    let i = document.getElementById(id);
    i.innerText = (i.innerText-1)+2;
    if(i.innerText==10){
        alert(id+" is winner");
    
        setTimeout(()=>{
            window.location.replace("http://127.0.0.1:5500/Projects/Ping%20Pong%20Game/index.html");
        },10);
    }else{
        let ballStyle = document.getElementById('ball').style;
        ballStyle.left = '50%';
        ballStyle.top = '50%';
        ballStyle.marginTop = '-10px';
        ballStyle.marginLeft = '-10px';
    }
    if(player=='player1'){
        directionLeft = true;
    }else{
        directionLeft = false;
    }
}




//  game start
setTimeout(()=>{
    var loop = setInterval(()=>freeBallMovement(),100);
},3000)
