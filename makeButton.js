function MakeButton(_x, _y, _buttonWidth) {
  this.x = _x;
  this.y = _y;
  var xPos;
  var yPos;
  var opacity = 0;
  this.buttonWidth = _buttonWidth;

  var sizeOffset = this.buttonWidth / 2;

  this.display = function(_x, _y) {
    this.x = _x;
    this.y = _y;

    xPos = (this.x / 7);
    yPos = this.y - (this.y / 8);

    // Center ellipse
    fill(0,0,0,opacity);
    ellipseMode(CENTER);
    ellipse(xPos,yPos,25,25);

    // Center Cross
    stroke(255,255,255);
    strokeWeight(2);
    line(xPos, yPos+2.5, xPos, yPos-2.5);
    line(xPos-2.5, yPos, xPos+2.5, yPos);

    // Dashed Borders
    /*
    fill(0,0,0);
    noStroke();
    var r = 1;
    var spaces = 30;
    var spacing = this.buttonWidth / spaces;
    for(var i = 0; i < spaces; i+= spacing) {
      ellipse(((xPos - sizeOffset) + (i * spacing)), (yPos - sizeOffset), r, r);
      ellipse(((xPos - sizeOffset) + (i * spacing)), (yPos + sizeOffset), r, r);
      ellipse((xPos - sizeOffset), ((yPos + sizeOffset) - (i * spacing)), r, r);
      ellipse((xPos + sizeOffset), ((yPos + sizeOffset) - (i * spacing)), r, r);
    }
    */
  }

  this.hover = function(_x, _y) {
    this.x = _x;
    this.y = _y;

    xPos = (this.x / 7);
    yPos = this.y - (this.y / 8);

    // Center ellipse
    fill(0,0,0);
    ellipseMode(CENTER);
    ellipse(xPos,yPos,25,25);

    // Center Cross
    stroke(255,255,255);
    strokeWeight(2);
    line(xPos-2.5, yPos, xPos+2.5, yPos);
  }

  this.loc = function() {
    var loc = createVector(xPos, yPos);
    return loc;
  }

  this.opa = function(_opacity) {
    opacity = _opacity;
  }
}

  MakeButton.prototype.constructor = MakeButton;