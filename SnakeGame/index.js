const snakeBoard = document.getElementById('snakeBoard');
const ctx = snakeBoard.getContext('2d');
const score = document.getElementById('score');
const reset = document.getElementById('resetButton');
const gameWidth = snakeBoard.width;
const gameHeight = snakeBoard.height;
const boardBackground = 'white';
const snakeColor = 'red';
const foodColor = 'green';
const unitSize = 20;
let running = false;
let xSpeed = unitSize;
let ySpeed = 0;
let foodX;
let foodY;
let scoreVal = 0;

// Snake
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
];

window.addEventListener('keydown', changeDirection);
reset.addEventListener('click', resetGame);

function gameStart() {
    if (!running) {
        running = true;
        draw();
    }
}
function nextFrame() {
    if (running) {
        draw();
    }
}
function resetGame() {
    running = false;
    xSpeed = unitSize;
    ySpeed = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ];
    scoreVal = 0;
    score.innerHTML = scoreVal;
    draw();
}
function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}