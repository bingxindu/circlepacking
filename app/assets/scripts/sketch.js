/*****************************
 **		globals
 ******************************/

const NUM_CIRCLES = 100;
const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;
const FRAME_RATE = 60; // default: 60
let circles = [];

/*****************************
 **		Circle
 ******************************/

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    // this.stroke = "#FCFBFC";
    this.growRate = getRandomInt(1, 4);
    this.growing = true;
  }

  show() {
    stroke("#FCFBFC");
    noFill();
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  grow() {
    if (this.growing) {
      this.r += this.growRate * 5;
    }
  }

  isAtEdge() {
    return (
      this.x + this.r > WINDOW_WIDTH ||
      this.x - this.r < 0 ||
      this.y + this.r > WINDOW_HEIGHT ||
      this.y - this.r < 0
    );
  }
}

/*****************************/
// valid means the circle will not overlap any other circle
function isValidSpawnPoint(x, y, r) {
  let isValidSpawnPoint = true;
  for (let i = 0; i < circles.length; i++) {
    // need to sum the two radii first
    // if the distance between input circle and this circle we are iterating over (circles[i])
    // is greater than the sum of the two radii, the position is valid
    let sumOfTwoRadii = r + circles[i].r;
    let a = x - circles[i].x;
    let b = y - circles[i].y;
    let distanceBetweenTwoCircles = Math.sqrt(a * a + b * b);
    if (distanceBetweenTwoCircles < sumOfTwoRadii) {
      isValidSpawnPoint = false;
      break;
    }
  }

  console.log(isValidSpawnPoint);

  return isValidSpawnPoint;
}

/*****************************
 ******************************
 **
 **		setup()
 **
 ******************************
 ******************************/

function setup() {
  background("#323232");
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

  frameRate(FRAME_RATE);
}

/*****************************
 ******************************
 **
 **		draw()
 **
 ******************************
 ******************************/

function draw() {
  background("#323232");

  let x = getRandomInt(0, WINDOW_WIDTH);
  let y = getRandomInt(0, WINDOW_HEIGHT);
  let r = getRandomInt(10, 100);

  if (isValidSpawnPoint(x, y, r)) {
    let circle = new Circle(x, y, r);
    circles.push(circle);
  }

  for (let i = 0; i < circles.length; i++) {
    if (circles[i].isAtEdge()) {
      circles[i].growing = false;
    }
    circles[i].show();
    // circles[i].grow();
  }
}
