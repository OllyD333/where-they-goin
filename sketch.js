let particles = [];
let num = 2000;

let scale = 0.01;
let speed = 2;

let t = 0;
let holdTime = 120;
let transitionSpeed = 0.005;
let zoff = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); 
  for(let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }
  colors = [
    color(255, 0, 255),  
    color(0, 255, 255), 
    color(255, 0, 0), 
    color(255, 255, 0)  
  ]; 
}

function draw() {
  background(0, 20, 50, 10); 
  let index = floor(t) % colors.length;
  let next = (index + 1) % colors.length;

  let localT = t % 1;

  let eased = (sin(localT * PI - PI/2) + 1) / 2;

  let currentColor = lerpColor(colors[index], colors[next], eased);

  stroke(currentColor);

  t += transitionSpeed;


  for(let i = 0; i < num; i++) {
    let p = particles[i];
    point(p.x, p.y);
    
    let n = noise(p.x * scale, p.y * scale, zoff);
    let a = TAU * (n - 0.5);

    p.x += cos(a) * speed;
    p.y += sin(a) * speed;
    if(!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }
  }
  zoff += 0.003;
}

function mouseReleased() {
  noiseSeed(millis());
  scale = random(0, 0.1);
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >=0 && v.y <= height;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}