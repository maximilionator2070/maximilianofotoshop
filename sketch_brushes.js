// Use Ctrl/Cmd + T to automatically format your code

var img;
var initials = 'ar';
var choice = '1';
var screenbg = 250;
var lastscreenshot = 61;

let button;

function preload() {
  img = loadImage('https://arao-sjsu.github.io/images/cat.jpg');
}

function setup() {
  createCanvas(600, 600);
  background(screenbg);

  button = createButton('clear canvas');
  button.position(500, 645);
  button.mousePressed(clear_print);

  button = createButton('save img');
  button.position(500, 620);
  button.mousePressed(saveme);

  button = createButton('help text');
  button.position(500, 670);
  button.mousePressed(helpText);

  helpText();
}

function draw() {
  if (keyIsPressed) {
    choice = key;
  }

  if (mouseIsPressed) {
    newkeyChoice(choice);
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
  }
}

function clear_print() {
  background(screenbg);
}

function saveme() {
  let filename = initials + day() + hour() + minute() + second();

  if (second() != lastscreenshot) {
    saveCanvas(filename, 'jpg');
    key = '';
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
  text('Use buttons to save or clear the canvas, or press X or P', 60, 45);
  text('Try G for a secret bonus', 60, 60);
}
