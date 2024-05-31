// parameters
let canvasSize = 300;
let boundaryCircleSize = canvasSize - 10;
let trackInitBeginAng = 0;  // degree [0, 360)
let trackBaseSpacing = 1;  // pixel
let trackLengthUnit = 300;
let trackMaxStrokeSize = boundaryCircleSize / 50;  // pixel
let eafNoiseFactorX = 1000;
let eafNoiseFactorY = 300;
let basNoiseFactorX = 1000;
let basNoiseFactorY = 800;
let beginAngStepUnit = 15;  // degree [0, 360)
let invTrackDoFillMode = false;
let invTrackAngOfs = 180;  // degree [0, 360)
let invTrackColorAlphaFactor = 0.25;
let colorMinAlpha = 127;  // RGB [0, 255]
let backgroundGreyColor = 255;  // RGB [0, 255]
let doAnimateDraw = true;
let baseAnimationDt = 0.1;

// global variables
let centerPos;
let tracks;
let invTracks;
let lusters;
let randAniDtFactors;


function randomColor(doGenAlpha=false) {
  let r, g, b, a = 255;
  if (doGenAlpha) {
    a = random(colorMinAlpha, 256);
  }
  r = random(0, 256);
  g = random(0, 256);
  b = random(0, 256);
  return color(r, g, b, a);
}


function drawBoundaryCircle() {
  strokeWeight(1);
  stroke();
  circle(centerPos.x, centerPos.y, boundaryCircleSize);
}


// callee of p5
function keyPressed() {
  if (key === 's') {
    saveGif('new_sketch', 60);
  }
}


// callee of p5
function setup() {
  createCanvas(canvasSize, canvasSize);
  if (!doAnimateDraw) {
    noLoop();
  }
  
  centerPos = createVector(canvasSize / 2, canvasSize / 2);
  
  // generate tracks
  tracks = [];
  let baseRadius = Math.floor(boundaryCircleSize / 2);
  let accumuRadius = 0;
  let prevStrokeSize = 0, curStrokeSize = 0;
  let beginAng = trackInitBeginAng;
  let endAngFactor;
  while (true) {
    curStrokeSize = random(1, trackMaxStrokeSize);
    accumuRadius += trackBaseSpacing + prevStrokeSize / 2 + curStrokeSize / 2;
    if (accumuRadius >= baseRadius) { break; }
    prevStrokeSize = curStrokeSize;
    endAngFactor = noise(baseRadius / eafNoiseFactorX, accumuRadius / eafNoiseFactorY);
    let track = new Track(
      accumuRadius,
      beginAng,
      beginAng + endAngFactor * trackLengthUnit,
      curStrokeSize,
      randomColor(true)
    );
    beginAng += beginAngStepUnit * noise(baseRadius / basNoiseFactorX, accumuRadius / basNoiseFactorY);
    tracks.push(track);
  }
  
  // generate inverse tracks
  invTracks = [];
  for (let t of tracks) {
    let invTrack = new Track(
      t.radius,
      t.beginAng - invTrackAngOfs,
      t.endAng + invTrackAngOfs,  
      t.strokeSize,
      color(
        255 - red(t.color),
        255 - green(t.color),
        255 - blue(t.color),
        alpha(t.color) * invTrackColorAlphaFactor
      )
    );
    invTracks.push(invTrack);
  }

  // generate random factors of animate
  randAniDtFactors = [];
  for (let i = 0; i < 4; i++) {
    randAniDtFactors.push(random([-1, 1]) * random(1, 10));
  }
}


// callee of p5
function draw() {
  background(backgroundGreyColor);

  //drawBoundaryCircle();
  
  // draw tracks
  noFill();
  for (let t of tracks) {
    strokeWeight(t.strokeSize);
    stroke(t.color);
    arc(
      centerPos.x,
      centerPos.y,
      t.radius * 2,
      t.radius * 2,
      radians(t.beginAng + (frameCount - 1) * baseAnimationDt * randAniDtFactors[0]),
      radians(t.endAng - (frameCount - 1) * baseAnimationDt * randAniDtFactors[1])
    );
  }
  
  // draw invTracks
  for (let invT of invTracks) {
    if (invTrackDoFillMode) {
      noStroke();
      let fillColor = color(
        red(invT.color), green(invT.color), blue(invT.color),
        alpha(invT.color) * invTrackColorAlphaFactor
      );
      fill(fillColor);
    } else {
      strokeWeight(invT.strokeSize);
      stroke(invT.color);
    }
    arc(
      centerPos.x,
      centerPos.y,
      invT.radius * 2,
      invT.radius * 2,
      radians(invT.beginAng + (frameCount - 1) * baseAnimationDt * randAniDtFactors[2]),
      radians(invT.endAng - (frameCount - 1) * baseAnimationDt * randAniDtFactors[3])
    );
  }
}