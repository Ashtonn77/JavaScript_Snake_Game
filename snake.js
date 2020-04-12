let canvas; 
let c; 
canvas = document.querySelector('canvas');
c = canvas.getContext('2d');

let box = 32;

const turf = new Image();
turf.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//ausio files
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";



//snake
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

//food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
}

//score
let score = 0;

//control
let d;
document.addEventListener('keydown', direction);

function direction(event){
    if(event.keyCode == 37 && d != 'Right'){
        d = 'Left';
        left.play();
    }else if(event.keyCode == 38 && d != 'Down'){
        d = 'Up';
        up.play();
    }else if(event.keyCode == 39 && d != 'Left'){
        d = 'Right';
        right.play();
    }else if(event.keyCode == 40 && d != 'Up'){
        d = 'Down';
        down.play();
    }
}


//collision
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

//draw
function draw(){
    c.drawImage(turf, 0, 0);
    for(let i = 0; i < snake.length; i++){
        c.fillStyle = (i == 0) ? 'green' : 'white';
        c.fillRect(snake[i].x, snake[i].y, box, box);

        c.strokeStyle = 'red';
        c.strokeRect(snake[i].x, snake[i].y, box, box)
    }

    c.drawImage(foodImg, food.x, food.y);

    //old head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    
    //direction
    if(d == 'Left') snakeX -= box;
    if(d == 'Up') snakeY -= box;
    if(d == 'Right') snakeX += box;
    if(d == 'Down') snakeY += box;


    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        }
        
    }else{
        //remove tail
        snake.pop();
    }

      //add new head
      let newHead = {
        x: snakeX,
        y: snakeY
    }


    //gameOver
    if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)){
        clearInterval(game);
        dead.play();
    }

  
    snake.unshift(newHead);

    //score label
    c.fillStyle = 'white';
    c.font = "45px monospace"
    c.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 100);

