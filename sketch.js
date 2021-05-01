var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,bananaImg,bananaGrp;
var stone,stoneImg,stoneGrp;
var score = 0;
var g_o, goImg;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  goImg = loadImage('gameOver.png');
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  bananaGrp = createGroup();
  stoneGrp = createGroup();
}

function draw() {

  if(gameState===PLAY){

    spawnFood();
    spawnObstacles();
    eatFood();
  
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(stoneGrp.isTouching(player)){
      gameState = END;
    }
  }

  else if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;

    bananaGrp.destroyEach();
    stoneGrp.destroyEach();

    g_o = createSprite(400,175,10,10);
    g_o.addImage(goImg);
    g_o.scale=1.2;
  }

  drawSprites();

  fill('white');
  textSize(30);
  text("Score: " + score, 670, 25);
}

function spawnFood(){
  if (frameCount%80===0){
    banana = createSprite(800, 0, 10, 10);
    banana.y = random(120, 200);
    banana.addImage(bananaImg);
    banana.scale=0.05;
    banana.velocityX=-4;

    player.depth = banana.depth + 1;
    banana.lifetime=300;
    bananaGrp.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount%150===0){
    stone = createSprite(800, 330, 20, 20);
    stone.y = random(300,330);
    stone.addImage(stoneImg);
    stone.scale=0.15;
    stone.velocityX=-6;

    player.depth = stone.depth + 1;
    stone.lifetime=300;
    stoneGrp.add(stone);
  }
}

function eatFood(){
  if(bananaGrp.isTouching(player)){
    bananaGrp.destroyEach();
    score = score+2;
    player.scale += 0.1
  }
}