var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions =[];
var divisionHeight=300;
var score =0;
var particle;
var closure1,closure2, closure3;
function preload() {
  dashSound = loadSound("tick.wav");
}
function setup() {
  createCanvas(850, 800);
  engine = Engine.create();
  world = engine.world;


  for (var k = 0; k <=width; k = k + 160) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  //ground = new Ground(400,height, 800,20)
  closure1 = new Ground(80,height,160, 20);
  closure2 = new Ground(400,height,160, 20);
  closure3 = new Ground(720, height,160,20)


  for (var j = 75; j <=width; j=j+50){
       plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,175));
  }

  for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,275));
  }

  for (var j = 50; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,375));
  }
  score = 0;
  Matter.Events.on(engine, 'collisionStart', collision);
  
}
 


function draw() {
  background("black");
 // text("("+mouseX+","+mouseY+")", mouseX, mouseY)
  textSize(20)
  text("Score : "+score,20,30);
  text("100", 60, height-divisionHeight)
  text("200", 370, height-divisionHeight)
  text("300", 690, height-divisionHeight)
  push();
  textSize(120);
  fill("red");
  strokeWeight(20)
  text("x", 210, height-150);
  text("x", 530, height-150);
  pop();

  Engine.update(engine,32);
  //ground.display();
  closure1.display();
  closure2.display();
  closure3.display();
  for (var k = 0; k < divisions.length; k++) {   
    divisions[k].display();
  }

  for (var i = 0; i < plinkos.length; i++) {   
     plinkos[i].display();
  }
  for (var i = 0; i < particles.length; i++) {
    particle = particles[i];
    particle.display();
    if (particle.score === 0) {
      if (ballisIn(particle)) {
        xPos = particle.body.position.x;
        if (xPos > 10 && xPos < 155) {
          particle.score = 100;
        } 
        if (xPos > 327 && xPos < 475) {
          particle.score = 200;
        } 
        if (xPos > 647 && xPos < 795) {
          particle.score = 300;
        }
        console.log(particle.score)
      }
      score += particle.score;
    }
    
  }
 
  
  
}

function ballisIn(object) {
  
  if (object.body.position.y >= (height-divisionHeight) && object.body.position.y <= height) {
    return true;
  }
  else  {
    return false;
  }
}
function mousePressed() {
  particles.push(new Particle(mouseX, 10,10))
}

function collision(event) {
   var pairs = event.pairs;
   for (var i= 0; i < pairs.length; i++) {
     console.log("in collision "+i)
     var labelA = pairs[i].bodyA.label;
     var labelB = pairs[i].bodyB.label;
     if ((labelA === 'particle' && labelB === 'plinko') ||
     (labelA === 'plinko' && labelB === 'particle') ) {
       dashSound.play();
     }
   }
}