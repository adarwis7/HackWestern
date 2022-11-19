// Get HTML elements
const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");

// Block dimensions
const blockWidth = 100;
const blockHeight = 20;

// Board dimensions
const boardWidth = 780;
const boardHeight = 400;

// Block class
class Block {
  constructor(xAxis, yAxis) {}
}

// Create instances of Block class
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
  new Block(10, 180),
  new Block(120, 180),
  new Block(230, 180),
  new Block(340, 180),
  new Block(450, 180),
  new Block(10, 150),
  new Block(120, 150),
  new Block(230, 150),
  new Block(340, 150),
  new Block(450, 150),
];

// Add blocks
let drawAndAddBlocks = () => {
  for (let i = 0; i < blocks.length + 3; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    let leftMarginCounter = (i * 10 + 10 + i * blockWidth) % 770;
    let topMarginCounter = Math.floor(i / 7) * 10 + 10 + Math.floor(i / 7) * blockHeight;
    block.style.marginLeft = leftMarginCounter + "px";
    block.style.marginTop = topMarginCounter + "px";
    grid.append(block);
  }
};
drawAndAddBlocks();