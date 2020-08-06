points = [];
paint = false;


function setup(){
  // pixelDensity(3.0);
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
    strokeWeight(3);
var stop = select('#reiniciar');
stop.mousePressed(resetSketch);

function resetSketch() {
  clear();
}

}

function draw(){

  if ( document.getElementById("playStop").getAttribute("data-playing") == "true") {
    stroke(255);
    noFill();
touchMoved();
    }

  }

  // function touchMoved() {
  // 	line(mouseX, mouseY, pmouseX, pmouseY);
  // }

  function touchMoved() {
    line(mouseX, mouseY, pmouseX, pmouseY);
    
  }
