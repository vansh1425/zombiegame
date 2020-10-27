
var monkey , monkey_running
var banana ,bananaImage, obstacle, banana2,ground,groundImage;
var bananaGroup, obstacleGroup
var bananasGroup,obstacleGroup;
var obstacle1,obstacle2,obstacle3;
var surivaltime = 0;
var ground,invisibleground;
var score = 0;
function preload(){
  
  
 /* monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  */
  monkey_running = loadImage("car.png");
  bananaImage = loadImage("diamond.png");
  obstacle1 = loadImage("zombie.png");
  banana2 = loadImage("rifile.png");
  obstacle2 = loadImage("zombie2.png");
  obstacle3 = loadImage("zombie3.png");
  groundImage = loadImage("background1.jpg");
}



function setup() {
   createCanvas(450, 400);
 ground = createSprite(200,200,450,800);
  ground.addImage(groundImage);
  ground.scale=4
  ground.x = ground.width /2;
  
  
  monkey = createSprite(80,300,40,40);  
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.02;
  
  
 
  invisibleGround = createSprite(200,340,900,10);
  invisibleGround.visible = false;
  
  
  
  
  bananasGroup = new Group();
  obstaclesGroup = new Group();
}


function draw() {

  
  //monkey.collide(ground);
  
  ground.velocityX=-3;
   
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
      //jump when the space key is pressed
    if(keyDown("space")&& monkey .y >= 200) {
        monkey.velocityY = -12;
         
    }
  
  
  if(obstaclesGroup.isTouching(monkey))
{
    
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
    monkey.velocityY=0;
    monkey.y = 300;
    ground.velocityX=0; 
}  
  
   if(bananasGroup.isTouching(monkey)){
    bananasGroup.destroyEach();
     score=score+2;
   }
  
  
  //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
 monkey.collide(invisibleGround);
 //  monkey.setCollider("circle",0,0,5);
  monkey.debug = true;
 
  
  drawSprites();
  stroke("black");
  textSize(20);
  fill("black");
  survialtime = Math.ceil(frameCount/frameRate());
  text("SurvialTime = " + survialtime,100,50);
  
  stroke("red");
  textSize(20);
  fill("red");
  text("score: " +score,300,52)
  spawnBananas();
  spawnObstacles();
}


function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,620,40,10);
    banana.y = Math.round(random(180,220));
    
     var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: banana.addImage(bananaImage);
              break;
      case 2: banana.addImage(banana2);
              break;
      default: break;
    }
   // banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
   // banana.depth = monkey.depth;
    //monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananasGroup.add(banana);
  }
}

function spawnObstacles(){
 if (frameCount % 160 === 0){
   var obstacle = createSprite(600,307,10,40);
   obstacle.velocityX = -6 ;
   obstacle.scale=0.2;
   var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              obstacle.scale = 0.1;
              break;
      default: break;
    }
    
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}


