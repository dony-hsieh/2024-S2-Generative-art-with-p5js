// parameters
const CANVAS_SIZE = 300;
const BOUNDARY_CIRCLE_SIZE = CANVAS_SIZE - 10;
const TRACK_INIT_BEGIN_ANG = 45;  // degree [0, 360)
const TRACK_BASE_SPACING = 1;  // pixel
const TRACK_LENGTH_UNIT = 200;
const TRACK_MAX_STROKE_SIZE = BOUNDARY_CIRCLE_SIZE / 30;  // pixel
const EAF_NOISE_FACTOR_X = 1000;
const EAF_NOISE_FACTOR_Y = 300;
const BAS_NOISE_FACTOR_X = 1000;
const BAS_NOISE_FACTOR_Y = 800;
const BEGIN_ANG_STEP_UNIT = 15;  // degree [0, 360)
const INV_TRACK_DO_FILL_MODE = false;
const INV_TRACK_ANG_OFS = 90;  // degree [0, 360)
const INV_TRACK_ALPHA_FACTOR = 0.25;
const RAND_COLOR_MIN_ALPHA = 127;  // RGB [0, 255]
const BACKGROUND_GREY_SCALE = 255;  // Grey scale [0, 255]
const DO_ANIM_DRAW = true;
const BASE_ANIM_DT_SCALE = 0.1;
const MAX_ANIM_DT_SCALE_FACTOR = 8;  // >= 1


// global variables
let centerPos;
let tracks;
let invTracks;
let lusters;
let randAniDtFactors;


function randomColor(doGenAlpha=false) {
  let r, g, b, a = 255;
  if (doGenAlpha) {
    a = random(RAND_COLOR_MIN_ALPHA, 256);
  }
  r = random(0, 256);
  g = random(0, 256);
  b = random(0, 256);
  return color(r, g, b, a);
}


function drawBoundaryCircle() {
  strokeWeight(1);
  stroke();
  circle(centerPos.x, centerPos.y, BOUNDARY_CIRCLE_SIZE);
}


// callee of p5
function keyPressed() {
  let filename = "new_sketch";
  let gifDuration = 60;

  switch(key) {
    case "g":
      saveGif(filename, gifDuration);
      break;
    case "p":
      save(filename);
      break;
    default:
      break;
  }

  return false;
}


// callee of p5
function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  if (!DO_ANIM_DRAW) {
    noLoop();
  }
  
  centerPos = createVector(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
  
  // generate tracks
  tracks = [];
  let baseRadius = Math.floor(BOUNDARY_CIRCLE_SIZE / 2);
  let accumuRadius = 0;
  let prevStrokeSize = 0, curStrokeSize = 0;
  let beginAng = TRACK_INIT_BEGIN_ANG;
  let endAngFactor;
  while (true) {
    curStrokeSize = random(1, TRACK_MAX_STROKE_SIZE);
    accumuRadius += TRACK_BASE_SPACING + prevStrokeSize / 2 + curStrokeSize / 2;
    if (accumuRadius >= baseRadius) { break; }
    prevStrokeSize = curStrokeSize;
    endAngFactor = noise(baseRadius / EAF_NOISE_FACTOR_X, accumuRadius / EAF_NOISE_FACTOR_Y);
    let track = new Track(
      accumuRadius,
      beginAng,
      beginAng + endAngFactor * TRACK_LENGTH_UNIT,
      curStrokeSize,
      randomColor(true)
    );
    beginAng += BEGIN_ANG_STEP_UNIT * noise(baseRadius / BAS_NOISE_FACTOR_X, accumuRadius / BAS_NOISE_FACTOR_Y);
    tracks.push(track);
  }
  
  // generate inverse tracks
  invTracks = [];
  for (let t of tracks) {
    let invTrack = new Track(
      t.radius,
      t.beginAng - INV_TRACK_ANG_OFS,
      t.endAng + INV_TRACK_ANG_OFS,  
      t.strokeSize,
      color(
        255 - red(t.color),
        255 - green(t.color),
        255 - blue(t.color),
        alpha(t.color) * INV_TRACK_ALPHA_FACTOR
      )
    );
    invTracks.push(invTrack);
  }

  // generate random factors of animate
  randAniDtFactors = [];
  for (let i = 0; i < 4; i++) {
    randAniDtFactors.push(random([-1, 1]) * random(1, MAX_ANIM_DT_SCALE_FACTOR));
  }
}


// callee of p5
function draw() {
  background(BACKGROUND_GREY_SCALE);

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
      radians(t.beginAng + (frameCount - 1) * BASE_ANIM_DT_SCALE * randAniDtFactors[0]),
      radians(t.endAng - (frameCount - 1) * BASE_ANIM_DT_SCALE * randAniDtFactors[1])
    );
  }
  
  // draw invTracks
  for (let invT of invTracks) {
    if (INV_TRACK_DO_FILL_MODE) {
      noStroke();
      let fillColor = color(
        red(invT.color), green(invT.color), blue(invT.color),
        alpha(invT.color) * INV_TRACK_ALPHA_FACTOR
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
      radians(invT.beginAng + (frameCount - 1) * BASE_ANIM_DT_SCALE * randAniDtFactors[2]),
      radians(invT.endAng - (frameCount - 1) * BASE_ANIM_DT_SCALE * randAniDtFactors[3])
    );
  }
}