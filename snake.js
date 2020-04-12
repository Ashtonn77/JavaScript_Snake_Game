let canvas; 
let c; 
canvas = document.querySelector('canvas');
c = canvas.getContext('2d');

let length = 30;
let eggSize = 20;
let v = 10;
let snake = [];
    snake[0] = {
    x: 100,
    y: 100
}

let playerScore = 0;
let dead = new Audio();
let eat = new Audio();
let move = new Audio();


dead.src = "audio/crash.mp3";
eat.src = "audio/chomp.wav";
move.src = "audio/zoom.wav";


let newGame = false;
function gameOver(){
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.fillStyle = 'white';
    c.fillText("Game Over", canvas.width / 2 - 50, canvas.height / 2);
    c.fillText("Click to restart", canvas.width / 2 - 50, canvas.height / 2 + 150);
    newGame = true;
    playerScore = 0;
    clearInterval(game);
}


function collision(head, arr){
   for(let i = 0; i < arr.length; i++){
    if(head.x == arr[i].x && head.y == arr[i].y){
        return true;
    }
   }
    return false;
}


function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}



let egg = {
    x: Math.floor(getRandom(0 + eggSize, canvas.width - eggSize)),
    y: Math.floor(getRandom(0 + eggSize, canvas.height - eggSize))
}

function getDistance(x1, y1, x2, y2){
    xDistance = x2 - x1;
    yDistance = y2 - y1;
    
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

//direction
let way;
document.addEventListener('keydown', direction);
function direction(event){
if(event.keyCode == 37 && way != 'Right'){
    way = 'Left';
    move.play();
}else if(event.keyCode == 38 && way != 'Down'){
    way = 'Up';
    move.play();
}else if(event.keyCode == 39 && way != 'Left'){
    way = 'Right';
    move.play();
}else if(event.keyCode == 40 && way != 'Up'){
    way = 'Down';
    move.play();
}
}
//end direction


let keepScore = document.querySelector('.score');

function draw(){   

c.fillStyle = 'green';
c.fillRect(0, 0, canvas.width, canvas.height);

for(let i = 0; i < snake.length; i++){
    c.fillStyle = (i == 0) ? 'white' : 'brown';
c.fillRect(snake[i].x, snake[i].y, length, 30)
}

c.fillStyle = 'red';
c.fillRect(egg.x, egg.y, eggSize, eggSize)

let snake_x = snake[0].x;
let snake_y = snake[0].y

if(way == 'Left') snake_x -= v;
if(way == 'Up') snake_y -= v
if(way == 'Right') snake_x += v;
if(way == 'Down') snake_y += v;


if(getDistance(snake_x, snake_y, egg.x, egg.y) <= length && getDistance(snake_x, snake_y, egg.x, egg.y) >= -length){    
    eat.play();
    playerScore += 5;
    egg = {
        x: getRandom(0 + eggSize, canvas.width - eggSize),
        y: getRandom(0 + eggSize, canvas.height - eggSize)
    }    
}else{
    snake.pop();
}


let newHead = {
    x:snake_x,
    y:snake_y
}

if(snake_x > canvas.width || snake_x < 0 || snake_y < 0 || snake_y > canvas.height || collision(newHead, snake)){
    dead.play();
    gameOver();
}

snake.unshift(newHead)

if(playerScore > 5 && playerScore % 50 == 0) {
    v = 20;
}

keepScore.innerHTML = playerScore;

}

document.addEventListener('mousedown', restart);
function restart(){
   if(newGame){
    location.reload();
   }
}

let game = setInterval(draw, 100);


