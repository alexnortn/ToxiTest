// Alex Norton
// a^N 
// http://alexnortn.com

// Reference to physics world
var physics;

var p1,
    p2,
    aLockVert = [],
    aSpringVert = [],
    aSpringArr = [],
    aCounterLockVert = [],
    aCounterSpringVert = [],
    aCounterSpringArr = [],
    w,h,
    center,
    aVerts = [],
    aCounterVerts = [];

// This will be our JSON object for the phys sim
var vertices;
var nudgeAttractor; 

function preload() {
  vertices = loadJSON("../data/a.json");
}

function setup() {
  noStroke();
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  w = windowWidth;
  h = windowHeight;
  center = createVector(w/2, h/2);

  // Load the arrays
  loadArrays(vertices);

  // Initialize the physics
  physics=new VerletPhysics2D();
  physics.setDrag (0.01);
  physics.addBehavior(new GravityBehavior(new Vec2D(0,0.5)));

  // Set the world's bounding box
  physics.setWorldBounds(new Rect(0,0,width,height));

  // Initiate the physics array
  physInit();
  
  // Make our Node Object
  nudgeAttractor = new Nudge(new Vec2D(width/2,height/2),24,width,0.1);

  // Make two particles
  p1 = new Particle(new Vec2D(width/2,height/3));
  p2 = new Particle(new Vec2D(width/2+160,20));
  // Lock one in place
  p1.lock();

  // Make a spring connecting both Particles
  var spring =new VerletSpring2D(p1,p2,160,0.0005);

  // Anything we make, we have to add into the physics world
  physics.addParticle(p1);
  physics.addParticle(p2);
  physics.addSpring(spring);

}

function draw() {

  // Update the physics world
  physics.update();

  // Update the attractor position
  nudgeAttractor.set(mouseX,mouseY);
  nudgeAttractor.display();

  background(255);

  // Draw the bezier Shapes 
  drawBasicA();

  // Draw a line between the particles
  stroke(200);
  strokeWeight(2);
  // line(p1.x,p1.y,p2.x,p2.y);

  // Display the particles
  // p1.display();
  // p2.display();

  // Move the second one according to the mouse
  if (mouseIsPressed) {

    // for(var i in aVerts) {
    //     aSpringVert[i].lock();
    //     aSpringVert[i].x = mouseX;
    //     aSpringVert[i].y = mouseY;
    //     aSpringVert[i].unlock();
    // }

    // for(var i in aCounterVerts) {
    //     aCounterSpringVert[i].lock();
    //     aCounterSpringVert[i].x = mouseX;
    //     aCounterSpringVert[i].y = mouseY;
    //     aCounterSpringVert[i].unlock();
    // }

    // Display the Physiscs Particles;
    displayPhys();

  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  physics.clear();
  // Empty the Physics Sim
  physEmpty();
  findCenter();
  // Reload the Arrays
  loadArrays(vertices);
  // Initiate the physics array
  physInit();
  console.log("Window Resized!");
}

function drawBezier(vertices) {

  beginShape();
  for (var i = 0; i < vertices.a_vertex.length; i++) {
	if(vertices.a_vertex[i].vertexType == true) {
	  bezierVertex(
		vertices.a_vertex[i].x, vertices.a_vertex[i].y,
		vertices.a_vertex[i++].x, vertices.a_vertex[i].y,
		vertices.a_vertex[i++].x, vertices.a_vertex[i].y
		);
	} else {
		vertex(vertices.a_vertex[i].x, vertices.a_vertex[i].y);
	}
  }
  endShape(CLOSE);

}

function drawBasicA(){
  noStroke();
  beginShape();
	vertex(aSpringVert[0].x, aSpringVert[0].y);
	vertex(aSpringVert[1].x, aSpringVert[1].y);
	bezierVertex(aSpringVert[2].x, aSpringVert[2].y, aSpringVert[3].x, aSpringVert[3].y, aSpringVert[4].x, aSpringVert[4].y);
	bezierVertex(aSpringVert[5].x, aSpringVert[5].y, aSpringVert[6].x, aSpringVert[6].y, aSpringVert[7].x, aSpringVert[7].y);
	bezierVertex(aSpringVert[8].x, aSpringVert[8].y, aSpringVert[9].x, aSpringVert[9].y, aSpringVert[10].x, aSpringVert[10].y);
	bezierVertex(aSpringVert[11].x, aSpringVert[11].y, aSpringVert[12].x, aSpringVert[12].y, aSpringVert[13].x, aSpringVert[13].y);
	bezierVertex(aSpringVert[14].x, aSpringVert[14].y, aSpringVert[15].x, aSpringVert[15].y, aSpringVert[16].x, aSpringVert[16].y);
	bezierVertex(aSpringVert[17].x, aSpringVert[17].y, aSpringVert[18].x, aSpringVert[18].y, aSpringVert[19].x, aSpringVert[19].y);
	vertex(aSpringVert[20].x, aSpringVert[20].y);
	bezierVertex(aSpringVert[21].x, aSpringVert[21].y, aSpringVert[22].x, aSpringVert[22].y, aSpringVert[23].x, aSpringVert[23].y);
	bezierVertex(aSpringVert[24].x, aSpringVert[24].y, aSpringVert[25].x, aSpringVert[25].y, aSpringVert[26].x, aSpringVert[26].y);
	bezierVertex(aSpringVert[27].x, aSpringVert[27].y, aSpringVert[28].x, aSpringVert[28].y, aSpringVert[29].x, aSpringVert[29].y);
	bezierVertex(aSpringVert[30].x, aSpringVert[30].y, aSpringVert[31].x, aSpringVert[31].y, aSpringVert[32].x, aSpringVert[32].y);
	bezierVertex(aSpringVert[33].x, aSpringVert[33].y, aSpringVert[34].x, aSpringVert[34].y, aSpringVert[35].x, aSpringVert[35].y);
	bezierVertex(aSpringVert[36].x, aSpringVert[36].y, aSpringVert[37].x, aSpringVert[37].y, aSpringVert[38].x, aSpringVert[38].y);
	bezierVertex(aSpringVert[39].x, aSpringVert[39].y, aSpringVert[40].x, aSpringVert[40].y, aSpringVert[41].x, aSpringVert[41].y);
	bezierVertex(aSpringVert[42].x, aSpringVert[42].y, aSpringVert[43].x, aSpringVert[43].y, aSpringVert[44].x, aSpringVert[44].y);
	bezierVertex(aSpringVert[45].x, aSpringVert[45].y, aSpringVert[46].x, aSpringVert[46].y, aSpringVert[47].x, aSpringVert[47].y);
	vertex(aSpringVert[48].x, aSpringVert[48].y);
	bezierVertex(aSpringVert[49].x, aSpringVert[49].y, aSpringVert[50].x, aSpringVert[50].y, aSpringVert[51].x, aSpringVert[51].y);
	bezierVertex(aSpringVert[52].x, aSpringVert[52].y, aSpringVert[53].x, aSpringVert[53].y, aSpringVert[54].x, aSpringVert[54].y);
  endShape(CLOSE);
  fill(255);
  beginShape();
	vertex(aCounterSpringVert[0].x, aCounterSpringVert[0].y);
	vertex(aCounterSpringVert[1].x, aCounterSpringVert[1].y);
	bezierVertex(aCounterSpringVert[2].x, aCounterSpringVert[2].y, aCounterSpringVert[3].x, aCounterSpringVert[3].y, aCounterSpringVert[4].x, aCounterSpringVert[4].y);
	bezierVertex(aCounterSpringVert[5].x, aCounterSpringVert[5].y, aCounterSpringVert[6].x, aCounterSpringVert[6].y, aCounterSpringVert[7].x, aCounterSpringVert[7].y);
	bezierVertex(aCounterSpringVert[8].x, aCounterSpringVert[8].y, aCounterSpringVert[9].x, aCounterSpringVert[9].y, aCounterSpringVert[10].x, aCounterSpringVert[10].y);
	bezierVertex(aCounterSpringVert[11].x, aCounterSpringVert[11].y, aCounterSpringVert[12].x, aCounterSpringVert[12].y, aCounterSpringVert[13].x, aCounterSpringVert[13].y);
  endShape(CLOSE);
}

// Setup the dynamic arrays --> center them on the page
function loadArrays(vertices) {
  if (aVerts.length > 0 && aCounterVerts.length > 0) {
    aVerts.length = 0;
    aCounterVerts.length = 0;
  }
  for(var i in vertices.a_vertex) {
	aVerts.push(createVector(vertices.a_vertex[i].x, vertices.a_vertex[i].y));
    aVerts[i].x += center.x*.85;
    aVerts[i].y += center.y;
	// console.log(aVerts[i].x + " , " + aVerts[i].y);
  }
  for(var j in vertices.counter_vertex) {
	aCounterVerts.push(createVector(vertices.counter_vertex[j].x, vertices.counter_vertex[j].y));
    aCounterVerts[j].x += center.x*.85;
    aCounterVerts[j].y += center.y;
	// console.log(aCounterVerts[j].x + " , " + aCounterVerts[j].y);
  }
}

function displayPhys() {
    // Display and draw line between the 'a' vertices
    for(var i in aVerts) {
        stroke(255,0,0);
        strokeWeight(0.5);
        line(aLockVert[i].x,aLockVert[i].y,aSpringVert[i].x,aSpringVert[i].y);
        aLockVert[i].display();
        aSpringVert[i].display();
    }
    // Display and draw line between the 'a counter' vertices
    for(var i in aCounterVerts) {
        stroke(255,0,0);
        strokeWeight(0.5);
        line(aCounterLockVert[i].x,aCounterLockVert[i].y,aCounterSpringVert[i].x,aCounterSpringVert[i].y);
        aCounterLockVert[i].display();
        aCounterSpringVert[i].display();
    }
}

function physInit() {
    var springStrength = 0.0005,
        springLength   = 0.05;

      // Make our ToxiParticles for 'a'
      for(var i in aVerts) {
          aLockVert.push(new Particle(new Vec2D(aVerts[i].x, aVerts[i].y)));
              aLockVert[i].lock();
          aSpringVert.push(new Particle(new Vec2D(aVerts[i].x, aVerts[i].y)));
          aSpringArr.push(new VerletSpring2D(aLockVert[i], aSpringVert[i],springLength, springStrength));
              physics.addParticle(aLockVert[i]);
              physics.addParticle(aSpringVert[i]);
              physics.addSpring(aSpringArr[i]);
          // console.log(aSpringVert[i]);
    }

    // Make our ToxiParticles for 'a counter'
    for(var i in aCounterVerts) {
        aCounterLockVert.push(new Particle(new Vec2D(aCounterVerts[i].x, aCounterVerts[i].y)));
            aCounterLockVert[i].lock();
        aCounterSpringVert.push(new Particle(new Vec2D(aCounterVerts[i].x, aCounterVerts[i].y)));
        aCounterSpringArr.push(new VerletSpring2D(aCounterLockVert[i], aCounterSpringVert[i],springLength, springStrength));
            physics.addParticle(aCounterLockVert[i]);
            physics.addParticle(aCounterSpringVert[i]);
            physics.addSpring(aCounterSpringArr[i]);
    }
}

function physEmpty() {
  if (aSpringArr.length == aVerts.length) {
    for(var i in aSpringArr) physics.removeSpringElements(aSpringArr[i]);
  }
  if (aCounterSpringArr.length == aCounterVerts.length) {
    for(var i in aCounterSpringArr) physics.removeSpringElements(aCounterSpringArr[i]);
  }
}

function findCenter() {
  w = windowWidth;
  h = windowHeight;
  center.set(w/2, h/2);
  console.log(center);
}


