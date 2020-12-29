

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground;
var background, backgroundImage;
var score=0;


var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_collided=loadAnimation("sprite_6.png");
  //Banana
  bananaImage = loadImage("banana.png");
  //Obstacle
  obstacleImage = loadImage("obstacle.png");
  backgroundImage= loadImage("forest1.png");
 
}


function setup() {

  createCanvas(400,400);
  
  background = createSprite(120,140,50,30);
  background.addImage(backgroundImage);
  background.scale = 2;
   background.velocityX=-2;
  
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.changeAnimation("monkey",monkey_collided);
  monkey.scale = 0.1;
  

  ground = createSprite(70, 300, 800, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  ground.visible=false;
  

  score = 0;
  survialTime = 0;
  
  
  FoodGroup = createGroup();
  obstaclesGroup = createGroup();
  TimeGroup = createGroup();
  
  
}


function draw() {
  drawSprites();
  
 monkey.collide(ground);
  //PLAY
  if(gameState === PLAY){
      
    
    survialTime = Math.ceil(frameCount/frameRate());
     
    background.velocityX=-2;
    
    if (background.x < 0){
      background.x = background.width/2;
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if(keyDown("space")) {
        monkey.velocityY = -12;
    }    
    
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+1;
    }
   
 
  monkey.velocityY = monkey.velocityY + 0.8;
  
    
  

  obstaclesGroup.setLifetimeEach(-1);
  

  food();
  obstacles();
    
    
      
    
    
    if(obstaclesGroup.isTouching(monkey)){
        
        gameState = END;
      
    }
  }
  //END
   if (gameState === END) {
     
     monkey.changeAnimation("monkey",monkey_collided);
     
      stroke("red");
    fill("red");
       textSize(30);
  text("Game Over", 110, 200);
     
      stroke("black");
    fill("black");
       textSize(30);
     text("Monkey is dead", 100, 240);
  
     
     background.velocityX=0;
     monkey.velocityY=0;
     
     obstaclesGroup.destroyEach();
    FoodGroup.destroyEach();
     
     survialTime.visible = false;
     
    
   
   }

  
   
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,300,50);
  
}
function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,200,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}

//Obstacles
function obstacles() {
  if (frameCount % 100 === 0){
    obstacle = createSprite(250,280,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstaclesGroup.add(obstacle);
    
    if (obstaclesGroup.isTouching(monkey)){
      monkey.scale=0.2;
    }
    
    switch(score){
      
             case 1: obstacle.scale = 0.1;
                     break;
             case 2:obstacle.scale = 0.20;
                    break;
             case 3: obstacle.scale = 0.25;
                     break;
             case 4: obstacle.scale = 0.15;
                     break;
             default:break;
     
     }
     
     obstaclesGroup.add(obstacle);
    
  }
}
      
   
   
  
  




 
 


