var tower,towerImage;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var ghost,ghostAnimation;
var spookyWav;
var invisibleBlockGroup, invisibleBlock;
var gameState="PLAY";
var score;


function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostAnimation=loadAnimation("ghost-standing.png","ghost-jumping.png");
  spookyWav=loadSound("spooky.wav");
}

function setup(){
  createCanvas(550,600);
  score=0;
  tower=createSprite(250,250);
  tower.addImage("tower",towerImage);
  tower.velocityY=1;
  
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleBlockGroup=new Group();
  ghost=createSprite(200,200,40,40);
  ghost.addAnimation("ghost",ghostAnimation);
  ghost.scale=0.35;
  
}

function draw(){
background(1);
fill("yellow");

if(gameState==="PLAY"){
 
  spookyWav.play();
  score = score + Math.round(getFrameRate()/60);
  
  if(keyDown("left_arrow")){
    ghost.x+=-2;
  }
  if(keyDown("right_arrow")){
    ghost.x+=2;
  }
  if(keyDown("space")){
    ghost.velocityY=-10;
  }
  ghost.velocityY+=0.6;

  if(tower.y>400){
    tower.y=300;
  }
  if(climberGroup.isTouching(ghost) || ghost.y > height){
    ghost.velocityY=0;
    
  }

  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > height){
    ghost.destroy();
    gameState = "END";
  }
  
  drawSprites();

  spawnDoor();
}

if(gameState==="END"){
  spookyWav.stop();
  fill("yellow");
  textSize(50);
  text("GAME OVER",90,250);
  tower.velocityY=0;

}
textSize(20);
text("SCORE = "+score,20,20);
}

function spawnDoor(){

  if(frameCount%250===0){
    var door=createSprite(200,-50);

    var climber=createSprite(200,10);

    var invisibleBlock = createSprite(225,15,0.001,0.001);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 1;
    
    door.x=Math.round(random(150,300));
    climber.x=door.x;
    door.addImage(doorImage);
    climber.addImage(climberImage);

    door.velocityY=1.5;
    climber.velocityY=1.5;
    invisibleBlock.velocityY = 1.5;

    door.depth=ghost.depth;
    ghost.depth+=1;

    door.lifetime=500;
    climber.lifetime=500;
    invisibleBlock.lifetime = 500;

    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }

}

