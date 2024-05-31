class Track {
  constructor(radius, beginAngle, endAngle, strokeSize, strokeColor) {
    this.radius = radius;
    this.strokeSize = strokeSize;
    this.beginAng = beginAngle;
    this.endAng = endAngle;
    this.trackVec = createVector(radius, 0).setHeading(beginAngle);
    this.color = strokeColor;
  }
}