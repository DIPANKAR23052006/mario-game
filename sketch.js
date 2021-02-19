var ground, mario, bg, marioRuning;
var obstacles, obstaclesImage, obstaclesgroup;
var gameState = "play";
var collided;
var gameover, gameoverImage;
var diesound, jumpsound, checkpointsound;
var score = 0;


function preload() {
  bg = loadImage("bg.png");
  marioRuning = loadAnimation("mario00.png", "mario01.png", "mario02.png", "mario03.png");
  obstaclesImage = loadAnimation("obstacle1.png", "obstacle2.png", "obstacle3.png",
    "obstacle4.png")
  collided = loadAnimation("collided.png");
  gameoverImage = loadImage("gameOver.png");
  jumpsound = loadSound("jump.mp3");
  diesound = loadSound("die.mp3");
  checkpointsound = loadSound("checkPoint.mp3");

}
function setup() {
  createCanvas(1000, 600);
  ground = createSprite(500, 535, 2000, 50);
  ground.velocityX = -3;
  ground.visible = false;

  mario = createSprite(50, 515, 65, 35);
  mario.addAnimation("running", marioRuning);
  mario.addAnimation("collided", collided);
  mario.scale = 2;
  // mario.debug = true;

  gameover = createSprite(500, 300, 10, 10);
  gameover.addImage("gameOver", gameoverImage);

  obstaclesgroup = new Group()
}

function draw() {
  background(bg);

  textSize(26);
  fill("white");
  text("Score: " + score, 440, 50);

  if (gameState === "play") {
    score = score + Math.round(getFrameRate()/60);
    
    if(score % 500 === 0 && score > 0){
      checkpointsound.play(); 
    }
    gameover.visible = false;

    if (ground.x < 0) {
      ground.x = 500;
    }
    console.log(mario.y)
    if (keyDown("space") && mario.y >= 440) {
      mario.velocityY = -12;
      jumpsound.play();
      
    }

    mario.velocityY = mario.velocityY + 0.9;

    mario.collide(ground);

    spawnObstacles()
    if (obstaclesgroup.isTouching(mario)) {
      gameState = "end";
      diesound.play();
    }
  }
  else if (gameState === "end") {
    gameover.visible = true;
    mario.changeAnimation("collided", collided);
    ground.velocityX = 0;
    mario.velocityY = 2;
    obstaclesgroup.setVelocityXEach(0);
    obstaclesgroup.setLifetimeEach(-1);
  }
  drawSprites()
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    obstacles = createSprite(1000, 480, 10, 40);
    obstacles.velocityX = -5;
    obstacles.addAnimation("obstacle", obstaclesImage)
    obstaclesgroup.add(obstacles);
    obstacles.lifetime = 200;
  }
}
