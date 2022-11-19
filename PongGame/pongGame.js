// Get the canvas element
let board = document.getElementById("board");
let bd = board.getContext('2d');

/****************************************************************************************/
// Initiate the player, computer, the ball, and the score
// Paddle 1 Movement - Player
let playerPaddle = {x : 0, y : (board.height - 100)/2, width : 10, height : 100, score : 0, color : "RED"}

let computerPaddle = {x : board.width - 10, y : (board.height - 100)/2, width : 10, height : 100, score : 0, color : "RED"}

let ball = {x : board.width/2, y : board.height/2, radius : 7, velocityX : 5, velocityY : 5, speed : 5, color : "RED"}

// Draw the paddles
function drawPaddle(x, y, w, h, color) {
    bd.fillStyle = color;
    bd.fillRect(x, y, w, h);
}

// Draw the background
function drawBack(x, y, w, h, color) {
    bd.fillStyle = color;
    bd.fillRect(x, y, w, h);
}

// Draw the ball
function drawBall(x, y, r, color) {
    bd.fillStyle = color;
    bd.beginPath();
    bd.arc(x, y, r, 0, Math.PI*2, true);
    bd.closePath();
    bd.fill();
}

// Reset the ball
function resetBall() {
    ball.x = board.width/2;
    ball.y = board.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}

// Write Down the Scores
function drawText(text, x, y) {
    bd.fillStyle = "#FFF";
    bd.font = "50px mono";
    bd.fillText(text, x, y);
}

/****************************************************************************************/

// Add event listeners to read the user input
document.addEventListener("mousemove", playerMove);

function playerMove(e) {
    let dim = board.getBoundingClientRect();
    playerPaddle.y = e.clientY - dim.top - playerPaddle.height/2;
}

/****************************************************************************************/

// Check that the ball hits anything
function hit(ball, player) {
    player.top = player.y;                          // Top of Player
    player.bottom = player.y + player.height;       // Bottom of Player
    player.left = player.x;                         // Left of Player
    player.right = player.x + player.width;         // Right of Player

    ball.top = ball.y - ball.radius;                // Top of Ball
    ball.bottom = ball.y + ball.radius;             // Bottom of Ball
    ball.left = ball.x - ball.radius;               // Left of Ball
    ball.right = ball.x + ball.radius;              // Right of Ball

    // Return if their is a collision between the ball and the player
    return ball.right > player.left && ball.top < player.bottom && ball.left < player.right && ball.bottom > player.top;
}


// Continuously update the game
function update() {
    // Do computer paddle AI
    computerPaddle.y += ((ball.y - (computerPaddle.y + computerPaddle.height/2))) * 0.1;

    // Ball movement
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Switch the direction of the movement - when ball hits walls
    if(ball.y + ball.radius > board.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    // Check if the left or right paddle was hit
    let player = (ball.x + ball.radius < board.width/2) ? playerPaddle : computerPaddle;

    // Check if the ball hits a paddle
    if(hit(ball, player)) {
        // Check the collision point on the paddle
        let colPt = (ball.y - (player.y + player.height/2));

        colPt = colPt / (player.height/2);

        let changeAng = (Math.PI/4) * colPt;

        // Change the velocity direction when the ball collides
        let dir = (ball.x + ball.radius < board.width/2) ? 1 : -1;
        ball.velocityX = dir * ball.speed * Math.cos(changeAng);
        ball.velocityY = ball.speed * Math.sin(changeAng);

        // Speed up the ball when it hits stuff
        ball.speed += 0.1;
    }

    // Change the score of the players if player or computer wins
    if(ball.x - ball.radius < 0) {
        computerPaddle.score++;
        resetBall();
    } else if (ball.x + ball.radius > board.width) {
        playerPaddle.score++;
        resetBall();
    }

}

/****************************************************************************************/

// Make sure that the drawings actually show up on the site
function draw() {
    // Clear the board
    drawBack(0, 0, board.width, board.height, "#000");

    // Player Paddle
    drawPaddle(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height, playerPaddle.color);

    // Computer Paddle
    drawPaddle(computerPaddle.x, computerPaddle.y, computerPaddle.width, computerPaddle.height, computerPaddle.color);

    // Ball
    drawBall(ball.x, ball.y, ball.radius, ball.color);

    // Draw the user score to the left
    drawText(playerPaddle.score, board.width/4, board.height/5);

    // Draw the user score to the right
    drawText(computerPaddle.score, 3*board.width/4, board.height/5);
}

/****************************************************************************************/

// Render the game
function pong() {
    update();
    draw();
}

let frames = 50;

let loop = setInterval(pong, 1000/frames);