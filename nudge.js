// Alex Norton
// a^N 
// http://alexnortn.com

// Child class constructor
function Nudge(position, radius, range, strength) {
  VerletParticle2D.call(this,position);
  this.r = radius;
  physics.addParticle(this);
  physics.addBehavior(new AttractionBehavior(this, range, strength));

  // // Override the display method
  this.display = function(){
    fill(127);
    stroke(200);
    strokeWeight(2);
    ellipse(this.x,this.y,this.r*2,this.r*2);
  }
}

// Inherit from the parent class
Nudge.prototype = Object.create(VerletParticle2D.prototype);
Nudge.prototype.constructor = Nudge;