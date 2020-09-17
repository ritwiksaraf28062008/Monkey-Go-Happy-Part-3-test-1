var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var forest_image, forest;
var ground;
var bananaGroup, obstaclesGroup, ropeGroup;
var PLAY = 1; 
var bananaGroup2;
var END = 2;
var gamestate = PLAY;
var gameover_image, gameover;
var restart_image, restart;
var survivalTime = 0;
var collected = 0;
var over, jump, checkpoint, eat, coin;
var backround;
var bananaImage2;

function preload(){
monkey_running=loadAnimation("./sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

monkey_collided = loadAnimation("./sprite_0.png");  

gameover_image = loadImage("./gameover2.png");  
restart_image = loadImage("./restart.png");  
  
bananaImage = loadImage("./banana.png");
bananaImage2 = loadImage("./banana2.png");
obstaceImage = loadImage("./obstacle2.png");
obstaceImage2 = loadImage("./obstacle.png");
forest_image=loadImage("./forest.jpg");

checkpoint = loadSound("./checkpoint.mp3");
eat = loadSound("./eating.mp3");
jump = loadSound("./jump.mp3");  
over = loadSound("./game over.mp3");  
coin = loadSound("./coin.mp3");
  
}



function setup() {
createCanvas(windowWidth, windowHeight)  


ground = createSprite(170, 520, 10000, 10);  
ground.visible=true;  

monkey = createSprite(130, 500, 10, 10); 
monkey.addAnimation("running", monkey_running); 
monkey.addAnimation("collided", monkey_collided);  
monkey.scale=0.25; 
monkey.setCollider("circle", 0, 0, 280);
monkey.debug=false; 


bananaGroup = new Group();
bananaGroup2 = new Group();
obstaclesGroup = new Group();

backround = createSprite(windowWidth/2,windowHeight/2,width,height)
backround.addImage(forest_image);
backround.scale = 5;
backround.visible = false;
}


function draw() {
  
background(32, 219, 116);
stroke(50);
fill("black");  
textSize(25);
text("SURVIVAL TIME : " + survivalTime, 20, 30);  
  
  
stroke(50);
fill("black");  
textSize(25);
text("COLLECTED : " + collected, 20, 70);

if (gamestate===PLAY) {
if (keyDown("space") && monkey.y>=400) {
monkey.velocityY=-30; 
jump.play();  
}
monkey.velocityY = monkey.velocityY + 1.5;   

survivalTime=survivalTime+Math.round(getFrameRate()/60);   
  
if (survivalTime>0 && survivalTime%100===0) {
checkpoint.play();
} 


  
monkey.collide(ground); 
obstacles();
bananaf();  
if (bananaGroup.isTouching(monkey)) {
collected = collected + 1; 
bananaGroup.destroyEach(); 
eat.play();  
} 
if (obstaclesGroup.isTouching(monkey)) {
over.play();  
gamestate = END;
gameover = createSprite(680, 230, 10, 10);
gameover.addImage("over", gameover_image);
gameover.scale=1.8; 

restart = createSprite(690, 312, 10, 10);
restart.addImage("again", restart_image);
restart.scale=1;  
}
if(survivalTime > 200){
    // text("CONGRATULATIONS , YOU HAVE COMPLETED LEVEL 1" , windowWidth/4 , windowHeight/2)
    backround.visible = true;
    background.velocityX = -3;
    if(backround.x  < 0){
        backround.x = backround.width/2
    }
     monkey.depth = backround.depth + 1
 }
}   

if(survivalTime > 100){
    banana2();
 
}

if (bananaGroup2.isTouching(monkey)){
    gamestate = END  
    bananaGroup.destroyEach(); 
} 


 

else if (gamestate===END) {
monkey.changeAnimation("collided", monkey_collided);  

monkey.velocityY=0;
bananaGroup.setLifetimeEach(-1);
bananaGroup.setVelocityXEach(0);
bananaGroup2.setLifetimeEach(-1);
bananaGroup2.setVelocityXEach(0);
obstaclesGroup.setLifetimeEach(-1);
obstaclesGroup.setVelocityXEach(0);
backround.visible = false;
 


if (mousePressedOver(restart)) {
reset();    
}
}
drawSprites(); 
}

function bananaf() {
if (frameCount % 120 === 0) {  
var banana = createSprite(1366, 130, 10, 10);
banana . y = Math.round(random(10, 100));  
banana.addImage("food", bananaImage); 
banana.velocityX=-(5+3*survivalTime/100); 
banana.scale=0.08;  
bananaGroup.add(banana);
banana.lifetime=190;
banana.depth = backround.depth + 1;
}  
}

function banana2() {
    if (frameCount % 120 === 0) {  
    var banana = createSprite(1366, 130, 10, 10);
    banana . y = Math.round(random(10, 100));  
    banana.addImage("food", bananaImage2); 
    banana.velocityX=-(5+3*survivalTime/100); 
    banana.scale=0.08;  
    bananaGroup2.add(banana);
    banana.lifetime=190;
    banana.depth = backround.depth + 1;
    }  
    }


function obstacles() {
if (frameCount % 100 === 0) {
var obstacles = createSprite(windowWidth, 455, 10, 10);
obstacles.addImage("obstacle", obstaceImage);
obstacles.velocityX=-(9+3*survivalTime/100);
obstacles.scale=0.3;
obstaclesGroup.add(obstacles); 
obstacles.lifetime=200; 
obstacles.setCollider("circle", 0, 0, 300);
obstacles.debug=false;  
obstacle = backround.depth + 1;
if(survivalTime > 100){
obstacles.addImage("obstacle", obstaceImage2);
}
}  
}


function reset() {
survivalTime=0; 
collected = 0;  
gamestate=PLAY;
monkey.changeAnimation("running", monkey_running);  
obstaclesGroup.destroyEach();
bananaGroup.destroyEach();  
bananaGroup2.destroyEach();  
 
gameover.visible=false;  
restart.visible=false;  
}