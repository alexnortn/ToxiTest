// Alex Norton
// a^N 
// http://alexnortn.com

// Reference to physics world
var physics;

var aLockVert = [],
    aSpringVert = [],
    aSpringArr = [],
    aCounterLockVert = [],
    aCounterSpringVert = [],
    aCounterSpringArr = [],
    nLockVert = [],
    nSpringVert = [],
    nSpringArr = [],
    w,h,
    scaleFactor,
    center,
    glyphCenter,
    nOffset,
    aCenterOffset,
    aVerts = [],
    aCounterVerts = [];
    nVerts = [];

// This will be our JSON object for the phys sim
var vertices;
var nudgeAttractor; 

function preload() {
  vertices = loadJSON("data/verts.json");
}

function setup() {
  noStroke();
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  w = windowWidth;
  h = windowHeight;
  scaleFunc(windowWidth,windowHeight);

  // Centering functions
  center = createVector(w/2, h/2);
  glyphCenter = createVector();
  aCenterOffset = createVector();
  centerA(vertices);
  findCenter();

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
  // drawBasicN();

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

    // for(var i in nVerts) {
    //     nSpringVert[i].lock();
    //     nSpringVert[i].x = mouseX;
    //     nSpringVert[i].y = mouseY;
    //     nSpringVert[i].unlock();
    // }

    // Display the Physiscs Particles;
    displayPhys();

  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  scaleFunc(windowWidth,windowHeight);
  // Empty the Physics Sim
  physEmpty();
  findCenter();
  // Reload the Arrays
  loadArrays(vertices);
  // Initiate the physics array
  physInit();
  // console.log("Window Resized!");
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
  fill(128);
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

function drawBasicN(){
  noStroke();
  fill(128);
  beginShape();
    vertex(nSpringVert[0].x, nSpringVert[0].y);
    vertex(nSpringVert[1].x, nSpringVert[1].y);
    vertex(nSpringVert[2].x, nSpringVert[2].y);
    vertex(nSpringVert[3].x, nSpringVert[3].y);
    vertex(nSpringVert[4].x, nSpringVert[4].y);
    vertex(nSpringVert[5].x, nSpringVert[5].y);
    vertex(nSpringVert[6].x, nSpringVert[6].y);
    vertex(nSpringVert[7].x, nSpringVert[7].y);
    vertex(nSpringVert[8].x, nSpringVert[8].y);
    vertex(nSpringVert[9].x, nSpringVert[9].y);
  endShape(CLOSE);
}


// Setup the dynamic arrays --> center them on the page
function loadArrays(vertices) {
  // Always set the arrays to zero, in order to center properly
  aVerts.length = 0;
  aCounterVerts.length = 0;
  console.log("Arrays at Zero");
  for(var i in vertices.a_vertex) {
  aVerts.push(createVector(vertices.a_vertex[i].x, vertices.a_vertex[i].y));
    aVerts[i].x *= scaleFactor;
    aVerts[i].x += (glyphCenter.x);
    aVerts[i].y *= scaleFactor;
    aVerts[i].y += (glyphCenter.y);
  // console.log(aVerts[i].x + " , " + aVerts[i].y);
  }
  for(var j in vertices.counter_vertex) {
  aCounterVerts.push(createVector(vertices.counter_vertex[j].x, vertices.counter_vertex[j].y));
    aCounterVerts[j].x *= scaleFactor;
    aCounterVerts[j].x += (glyphCenter.x);
    aCounterVerts[j].y *= scaleFactor;
    aCounterVerts[j].y += (glyphCenter.y);
  // console.log(aCounterVerts[j].x + " , " + aCounterVerts[j].y);
  }
  for(var k in vertices.n_vertex) {
  nVerts.push(createVector(vertices.n_vertex[k].x, vertices.n_vertex[k].y));
    // nVerts[k].x -= (nVerts[k].x - center.x);
    // nVerts[k].y -= (nVerts[k].y - center.y);
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
    // Display and draw line between the 'N' vertices
    // for(var i in nVerts) {
    //     stroke(255,0,0);
    //     strokeWeight(0.5);
    //     line(nLockVert[i].x,nLockVert[i].y,nSpringVert[i].x,nSpringVert[i].y);
    //     nLockVert[i].display();
    //     nSpringVert[i].display();
    // }
}

function physInit() {
    var springStrength = 0.00025,
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

    // Make our ToxiParticles for 'N'
    for(var i in nVerts) {
        nLockVert.push(new Particle(new Vec2D(nVerts[i].x, nVerts[i].y)));
            nLockVert[i].lock();
        nSpringVert.push(new Particle(new Vec2D(nVerts[i].x, nVerts[i].y)));
        nSpringArr.push(new VerletSpring2D(nLockVert[i], nSpringVert[i],springLength, springStrength));
            physics.addParticle(nLockVert[i]);
            physics.addParticle(nSpringVert[i]);
            physics.addSpring(nSpringArr[i]);
    }
}

function physEmpty() {
  if (aSpringArr.length == aVerts.length) {
    for(var i in aSpringArr) {
      physics.removeSpringElements(aSpringArr[i]);
    } 
    aSpringArr.length  = 0;
    aLockVert.length   = 0;
    aSpringVert.length = 0;
  }
  if (aCounterSpringArr.length == aCounterVerts.length) {
    for(var i in aCounterSpringArr) {
      physics.removeSpringElements(aCounterSpringArr[i]);
    }
    aCounterSpringArr.length  = 0;
    aCounterLockVert.length   = 0;
    aCounterSpringVert.length = 0;
  }

  if (nSpringArr.length == nVerts.length) {
    for(var i in nSpringArr) {
      physics.removeSpringElements(nSpringArr[i]);
    }
    nSpringArr.length  = 0;
    nLockVert.length   = 0;
    nSpringVert.length = 0;
  }
}

function findCenter() {
  w = windowWidth;
  h = windowHeight;
  center.set(w/2, h/2);
  var glyphCenterX = center.x - aCenterOffset.x; 
  var glyphCenterY = center.y + aCenterOffset.y; 
  glyphCenter.set(glyphCenterX, glyphCenterY);
}

function centerA(vertices) {
  var xArray = [];
  var yArray = [];

  for (var i in vertices.a_vertex) xArray.push(vertices.a_vertex[i].x);
  for (var i in vertices.a_vertex) yArray.push(vertices.a_vertex[i].y);

  var xMin = arrayMin(xArray);
  var yMin = arrayMin(yArray);
  var xMax = arrayMax(xArray);
  var yMax = arrayMax(yArray);

  var xCenter = (xMax - xMin) / 2;
  var yCenter = ((yMax - yMin) / 2) - 75;

  aCenterOffset.set(xCenter, yCenter);
  console.log(aCenterOffset);
  return aCenterOffset;

}

//  Calculation Min/Max of any array

function arrayMin(arr) {
  return arr.reduce(function (p, v) {
    return ( p < v ? p : v );
  });
}

function arrayMax(arr) {
  return arr.reduce(function (p, v) {
    return ( p > v ? p : v );
  });
}

// Scaling function

function scaleFunc(w,h) {
  if (h >= 1200) {
      scaleFactor = 1.25;
  } else if (h >= 800) {
      scaleFactor = 1;
  } else if (h >= 600) {
      scaleFactor = 0.75;
  } else {
      scaleFactor = 0.5;
  }
  console.log(scaleFactor);
}
