points = [];
paint = false;

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
var stop = select('#reiniciar');
stop.mousePressed(resetSketch);

function resetSketch() {
  clear();
}

}

function draw(){

  if ( document.getElementById("playStop").getAttribute("data-playing") == "true") {

    if (paint) {
      points.push(createVector(mouseX, mouseY));
    }
    stroke(255);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let i = 0; i < points.length; i++) {
      let x = points[i].x;
      let y = points[i].y;

      vertex(x, y);
    }
    endShape();
  }
}

function mousePressed(){
  paint = true;
  points = [];
}

function mouseReleased() {
  paint = false;
}

// function mouseDragged(){
//     paint = true
//     points = [];
//   return false;
//
// }

// function touchStarted(){
//   paint = true
//   points = [];
//
// // prevent default
// // return false;
// }
//
// function touchEnded(){
//   paint = false;
// }
