

window.onload = init;
var audioContext;
var bufferLoader;
var body = document.querySelector("body");

function init() {
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  audioContext = new AudioContext();

  bufferLoader = new BufferLoader(
    audioContext,
    [
      'loops/0.mp3',
      'loops/1.mp3',
      'loops/2.mp3',
      'loops/3.mp3',
      'loops/4.mp3',
      'loops/5.mp3',
      'loops/6.mp3',
      'loops/7.mp3',
      'loops/8.mp3',
            'loops/lead.mp3',
      'loops/rap/r0.mp3',
      'loops/rap/r1.mp3',
      'loops/rap/r2.mp3',
      'loops/rap/r3.mp3',
      'loops/rap/r4.mp3',
      'loops/rap/r5.mp3',
      'loops/rap/r6.mp3'
      // 'loops/7.mp3',
      // 'loops/8.mp3',
    ],
    finishedLoading
    );

  bufferLoader.load();
}

function finishedLoading(bufferList) {
  // Create a gain node
  var gainNode0 = audioContext.createGain();
  var gainNode1 = audioContext.createGain();
  var gainNode2 = audioContext.createGain();
  var gainNode3 = audioContext.createGain();
  var gainNode4 = audioContext.createGain();
  var gainNode5 = audioContext.createGain();
  var gainNode6 = audioContext.createGain();
  var gainNode7 = audioContext.createGain();
  var gainNode8 = audioContext.createGain();

  var gainNodeLead = audioContext.createGain();

  var gainNodeRap0 = audioContext.createGain();
  var gainNodeRap1 = audioContext.createGain();
  var gainNodeRap2 = audioContext.createGain();
  var gainNodeRap3 = audioContext.createGain();
  var gainNodeRap4 = audioContext.createGain();
  var gainNodeRap5 = audioContext.createGain();
  var gainNodeRap6 = audioContext.createGain();

  var multiGain = [
  gainNode0, gainNode1, gainNode2, gainNode3, gainNode4, gainNode5, gainNode6, gainNode7, gainNode8, gainNodeLead,  gainNodeRap0,  gainNodeRap1,  gainNodeRap2,  gainNodeRap3,  gainNodeRap4,  gainNodeRap5,  gainNodeRap6
  ]

  // this is matrix allows you to set the gain for especific coords
  var matrix = [
    [gainNode0, gainNode1, gainNode2],
    [gainNode3, gainNode4, gainNode5],
    [gainNode6, gainNode7, gainNode8]
  ]

  // this array goes random later

  var rapSounds =
  [gainNodeRap0, gainNodeRap1, gainNodeRap2, gainNodeRap3, gainNodeRap4, gainNodeRap5, gainNodeRap6];

  // set the start volume as 0 or mute
  var initialVol = 0;
  for (var i = 0; i < multiGain.length; i++) {
    multiGain[i].gain.value = initialVol;
  }

  // Creating buffer variables
  var  source0 = audioContext.createBufferSource();
  var  source1 = audioContext.createBufferSource();
  var  source2 = audioContext.createBufferSource();
  var  source3 = audioContext.createBufferSource();
  var  source4 = audioContext.createBufferSource();
  var  source5 = audioContext.createBufferSource();
  var  source6 = audioContext.createBufferSource();
  var  source7 = audioContext.createBufferSource();
  var  source8 = audioContext.createBufferSource();

  var  sourceLead = audioContext.createBufferSource();

  var  sourceR0 = audioContext.createBufferSource();
  var  sourceR1 = audioContext.createBufferSource();
  var  sourceR2 = audioContext.createBufferSource();
  var  sourceR3 = audioContext.createBufferSource();
  var  sourceR4 = audioContext.createBufferSource();
  var  sourceR5 = audioContext.createBufferSource();
  var  sourceR6 = audioContext.createBufferSource();

  var source = [ source0, source1, source2, source3, source4, source5, source6, source7, source8, sourceLead, sourceR0, sourceR1, sourceR2, sourceR3, sourceR4, sourceR5, sourceR6]

  // connecting buffer to gain and audio context
  for (var i = 0; i < bufferList.length; i++) {
    source[i].buffer = bufferList[i];
    source[i].connect(multiGain[i]);
    multiGain[i].connect(audioContext.destination);
      // source[i].start(0);
  }



  // select our restart button
  const restartButton = document.querySelector('#reiniciar');
  restartButton.addEventListener('click', function() {
  document.getElementById('playStop').setAttribute('data-playing', 'false');
  for (var i = 0; i < source.length; i++) {
    source[i].stop(0);
    source[i].currentTime = 0;
  }
  });

  // select our play button
  const playButton = document.querySelector('#playStop');
  playButton.addEventListener('click', function() {

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
      for (var i = 0; i < source.length; i++) {
        source[i].start(0);
      }

      gainNodeLead.gain.setValueAtTime(volumenLead, audioContext.currentTime);

      this.dataset.playing = 'true';

    } else if (this.dataset.playing === 'true') {
      for (var i = 0; i < source.length; i++) {
        source[i].stop(0);
      }

      this.dataset.playing = 'false';
    }
  }, false);



// here we define the number of parts on our beat grid
var sectionsX = 3;
var sectionsY = 3;

var sectionWidth = window.innerWidth / sectionsX;
var sectionHeight = window.innerHeight / sectionsY;

var currentSection = [0, 0];
var previousSection = [0, 0];
// console.log(sectionWidth);

// this function checks where ir your mouse and set the gain of the track by matrix
function coords(e){

  if (currentSection[0] != previousSection[0] || currentSection[1] != previousSection[1]) {
    matrix[ previousSection[0] ][ previousSection [1] ].gain.setValueAtTime(0, audioContext.currentTime);
    previousSection[0] = currentSection[0];
    previousSection[1] = currentSection[1];
  }

  for (var i = 0; i < sectionsY; i++) {

    for (var j = 0; j < sectionsX; j++) {

      if ( (e.clientX >= j * sectionWidth && e.clientX < (j+1) * sectionWidth) &&
      (e.clientY >= i * sectionHeight && e.clientY < (i+1) * sectionHeight) ) {

        // console.log("X " + j + " Y " + i);

        var angleX = ((e.clientX % sectionWidth) / sectionWidth) * Math.PI ;
        var angleY = ((e.clientY % sectionHeight) / sectionHeight) * Math.PI ;

        var volumeX = Math.sin(angleX);
        var volumeY = Math.sin(angleY);
        var volumeMute = 0;
        var volume = (volumeX * volumeY) / 2;

        // setting gain of the beats
        matrix[i][j].gain.setValueAtTime(volume, audioContext.currentTime);
        currentSection[0] = i;
        currentSection[1] = j;

        // console.log(volume);
      }
    }
  }
}

function coordsT(e){

  clickT.ontouchmove = gainNode0.gain.setValueAtTime(volumenRap, audioContext.currentTime);

}

var volumenLead = 0.3;
var volumenRap = 0.3;

const click = document.querySelector('body');
body.addEventListener("mousedown", mouseDown);
const noClick = document.querySelector('body');
body.addEventListener("mouseup", mouseUp);

const clickT = document.querySelector('body');
body.addEventListener("touchstart", touchStarted);
const noClickT = document.querySelector('body');
body.addEventListener("touchend", touchEnded);

function randomNoRepeats(array) {
  var copy = array.slice(0);
  return function() {
    if (copy.length < 1) { copy = array.slice(0); }
    var index = Math.floor(Math.random() * copy.length);
    var item = copy[index];
    copy.splice(index, 1);
    // console.log(item);
    return item;
  };
}

var chooser = randomNoRepeats(rapSounds);

// random beats
// var chooserBeats = randomNoRepeats(matrix);

// these functions make the rap sound when you click
function mouseDown() {
  click.onmousedown = chooser().gain.setValueAtTime(volumenRap, audioContext.currentTime);
}

function mouseUp() {
  for (var i = 0; i < rapSounds.length; i++){
      rapSounds[i].gain.setValueAtTime(initialVol, audioContext.currentTime);
}
}

// The following functions activate rap voices for touch devices
function touchStarted() {
  paint = true
  points = [];
  clickT.ontouchmove = chooser().gain.setValueAtTime(volumenRap, audioContext.currentTime);
  // clickT.ontouchmove = chooserBeats().gain.setValueAtTime(volumenRap, audioContext.currentTime);

}

function touchEnded() {
  paint = false;
  for (var i = 0; i < rapSounds.length; i++){
      rapSounds[i].gain.setValueAtTime(initialVol, audioContext.currentTime);
}
}

body.addEventListener("mousemove", coords);
body.addEventListener("touchmove", coordsT);
}
