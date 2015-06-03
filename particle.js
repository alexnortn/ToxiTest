// Alex Norton
// a^N 
// http://alexnortn.com

// Child class constructor
function Particle(position) {
  VerletParticle2D.call(this,position);

  // Override the display method
  this.display = function(){
    fill(255,0,0);
    // stroke(200);
    // strokeWeight(2);
    noStroke();
    ellipse(this.x,this.y,1,1);
  }
}

// Inherit from the parent class
Particle.prototype = Object.create(VerletParticle2D.prototype);
Particle.prototype.constructor = Particle;

