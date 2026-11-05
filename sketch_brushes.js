// Use Ctrl/Cmd + T to automatically format your code

var img;
var initials = 'ar';
var choice = '1';
var screenbg = 250;
var lastscreenshot = 61;

let saveButton;
let clearButton;
let helpButton;
let eraserButton;
let undoButton;
let fileInput;

let importedImage;
let eraserMode = false;
let history = [];

function preload() {
  img = loadImage('hollygpt2.jpg');
}

function setup() {
  createCanvas(600, 600);
  background(screenbg);

  // Buttons placed on the right side of the canvas
  saveButton = createButton('save img');
  saveButton.position(620, 100);
  saveButton.mousePressed(saveme);

  clearButton = createButton('clear canvas');
  clearButton.position(620, 140);
  clearButton.mousePressed(clear_print);

  helpButton = createButton('help text');
  helpButton.position(620, 180);
  helpButton.mousePressed(helpText);

  eraserButton = createButton('eraser: off');
  eraserButton.position(620, 220);
  eraserButton.mousePressed(toggleEraser);

  undoButton = createButton('undo');
  undoButton.position(620, 260);
  undoButton.mousePressed(undoCanvas);

  fileInput = createFileInput(handleFile);
  fileInput.position(620, 310);

  helpText();
}

function draw() {
  if (keyIsPressed) {
    choice = key;
  }

  if (
    mouseIsPressed &&
    mouseX >= 0 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height
  ) {
    if (eraserMode) {
      eraserBrush();
    } else {
      newkeyChoice(choice);
    }
  }
}

function mousePressed() {
  // Save the canvas before drawing so it can be undone
  if (
    mouseX >= 0 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height
  ) {
    saveCanvasState();
  }
}

function newkeyChoice(toolChoice) {
  if (toolChoice == '1') {
    // Very thin black brush
    stroke(0);
    strokeWeight(2);
    line(mouseX, mouseY, pmouseX, pmouseY);

  } else if (toolChoice == '2') {
    // Decently larger black brush
    stroke(0);
    strokeWeight(12);
    line(mouseX, mouseY, pmouseX, pmouseY);

  } else if (toolChoice == '3') {
    // Blue brush
    stroke(0, 0, 255);
    strokeWeight(15);
    line(mouseX, mouseY, pmouseX, pmouseY);

  } else if (toolChoice == '4') {
    // Red brush
    stroke(255, 0, 0);
    strokeWeight(15);
    line(mouseX, mouseY, pmouseX, pmouseY);

  } else if (toolChoice == '5') {
    // Yellow brush
    stroke(255, 220, 0);
    strokeWeight(15);
    line(mouseX, mouseY, pmouseX, pmouseY);

  } else if (toolChoice == '6') {
    // Thin black triangles
    push();

    fill(255);
    stroke(0);
    strokeWeight(1);

    triangle(
      mouseX,
      mouseY - 12,
      mouseX - 10,
      mouseY + 10,
      mouseX + 10,
      mouseY + 10
    );

    pop();

  } else if (toolChoice == '7') {
    // Tiny white squares with black outlines
    push();

    fill(255);
    stroke(0);
    strokeWeight(2);
    square(mouseX, mouseY, 10);

    pop();

  } else if (toolChoice == '8') {
    // Large black squares with white outlines
    push();

    fill(0);
    stroke(255);
    strokeWeight(4);
    square(mouseX, mouseY, 45);

    pop();

  } else if (toolChoice == '9') {
    // Transparent gray circles
    push();

    fill(120, 120, 120, 70);
    stroke(100, 100, 100, 150);
    strokeWeight(2);
    ellipse(mouseX, mouseY, 35, 35);

    pop();

  } else if (toolChoice == '0') {
    // Rough Batman-style logo
    push();

    translate(mouseX, mouseY);
    fill(0);
    noStroke();

    beginShape();
    vertex(-45, -5);
    vertex(-30, -10);
    vertex(-22, -25);
    vertex(-15, -12);
    vertex(0, -20);
    vertex(15, -12);
    vertex(22, -25);
    vertex(30, -10);
    vertex(45, -5);
    vertex(30, 10);
    vertex(18, 8);
    vertex(10, 20);
    vertex(0, 12);
    vertex(-10, 20);
    vertex(-18, 8);
    vertex(-30, 10);
    endShape(CLOSE);

    pop();

  } else if (toolChoice == 'g' || toolChoice == 'G') {
    // Secret bonus image brush
    image(img, mouseX, mouseY, mouseX / 10, mouseX / 16);
  }
}

function eraserBrush() {
  stroke(screenbg);
  strokeWeight(35);
  line(mouseX, mouseY, pmouseX, pmouseY);
}

function toggleEraser() {
  eraserMode = !eraserMode;

  if (eraserMode) {
    eraserButton.html('eraser: on');
  } else {
    eraserButton.html('eraser: off');
  }
}

function saveCanvasState() {
  history.push(get());

  // Keeps the undo history from becoming too large
  if (history.length > 20) {
    history.shift();
  }
}

function undoCanvas() {
  if (history.length > 0) {
    let previousCanvas = history.pop();

    imageMode(CORNER);
    image(previousCanvas, 0, 0);
  }
}

function clear_print() {
  saveCanvasState();
  background(screenbg);
}

function saveme() {
  let filename = initials + day() + hour() + minute() + second();

  if (second() != lastscreenshot) {
    saveCanvas(filename, 'jpg');
  }

  lastscreenshot = second();
}

function keyPressed() {
  if (key === 'x' || key === 'X') {
    clear_print();
  } else if (key === 'p' || key === 'P') {
    saveme();
  }
}

function helpText() {
  fill('black');
  strokeWeight(0.2);
  textSize(15);

  text('Press numerical keys from 1 - 0 for different brushes', 60, 30);
  text('Use the buttons on the right to control the canvas', 60, 45);
  text('Try G for a secret bonus', 60, 60);
}

function handleFile(file) {
  if (file.type === 'image') {
    saveCanvasState();

    loadImage(file.data, function(loadedImage) {
      importedImage = loadedImage;

      imageMode(CORNER);
      image(importedImage, 0, 0, width, height);
    });
  }
}
