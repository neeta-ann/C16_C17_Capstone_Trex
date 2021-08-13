//boilerplate
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
//
function preload(){
  ///boilerplate
  //Animation:TA1:seperate game C16
  //Trex:SA1 - C16
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground.png");//boilerplate
  
  cloudImage = loadImage("cloud.png");//boilerplate
  //boilerplate
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  //boilerplate
  restartImg = loadImage("restart.png")//project?
  gameOverImg = loadImage("gameOver.png")
  //boilerplate
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  //
}

function setup() {
  createCanvas(600, 200);
  //trex: SA1 : animation :C16
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" ,trex_collided);
  trex.scale = 0.5;
  //ground:boilerplate
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;//infinite ground:boilerplate
  //game over:SA-C17
  gameOver = createSprite(300,100);//boilerplate
  gameOver.addImage(gameOverImg);//boilerplate
  gameOver.scale = 0.5;
  //restart:project?
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  //to set a boundary:
  /*
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  */
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();//
  cloudsGroup = createGroup();//boilerplate
  //trex skin:boundary
  //trex.setCollider("circle",0,0,40);
  //trex.debug = true //debugger
  //score
  score = 0;
}

function draw() {
  //setting the background
  background(255);
  //displaying score
  text("Score: "+ score, 500,50);
  
  if(gameState == PLAY){//gamestates:TA-C17
    gameOver.visible = false;//boilerplate
    restart.visible = false;//boilerplate
    
    //move the ground:SA
    ground.velocityX = -4;//SA
    
    //Update score:SA
    score = score + Math.round(getFrameRate()/60);//SA
    
    //boilerplate
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    //:SA2:C16
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -12;
        jumpSound.play();
    }
    
    //add gravity:SA2:C16
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();//boilerplate
  
    //spawn obstacles on the ground
    spawnObstacles();//function call:SA
    
    //boilerplate
    if(obstaclesGroup.isTouching(trex)){
        dieSound.play();
        gameState = END;
    }
  }
  //SAc17
   else if (gameState == END) {
     //display Game Over and Restart logo
      gameOver.visible = true;
      restart.visible = true;
     //stop animation
      ground.velocityX = 0;
      trex.velocityY = 0
     
      //change the trex animation
      trex.changeAnimation("collided", trex_collided);
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     //stop movement
    //boilerplate
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     //restart:
     //boilerplate
     if (mousePressedOver(restart)){
      restart1();
    }//
   }
  //stop trex from falling off the screen
  trex.collide(ground);//boilerplate
  
  drawSprites();
}
function restart1(){////boilerplate?project
  gameOver.visible=false;
  restart.visible=false;
  
  gameState=PLAY;
  
  trex.changeAnimation("running", trex_running);//boilerplate
  trex.scale=0.5;
  
  cloudsGroup.destroyEach();//boilerplate
  obstaclesGroup.destroyEach();//boilerplate
  Score=0;
}

//SA
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(800,165,10,40);//boilerplate
   obstacle.velocityX = -6;
   obstacle.addImage(obstacle1);//boilerplate
    //generate random obstacles
    //SA:c16
    var rand = Math.round(random(1,6));
    switch(rand) {//SA3 - C16
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }//
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;//boilerplate
    obstacle.lifetime = 300;//boilerplate
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);//boilerplate
 }
}
//boilerplate
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 == 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
    cloudsGroup.add(cloud);
  }
}

