var PLAY=1;
var END=0;
var gamestate=PLAY;

var StrawberryImage ,appleImage, candyImage,watermelonImage , lollipopImage,gameoverimage;
var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;


function preload(){
  backImage=loadImage("jungle2.jpg");
  
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  obstacle_img = loadImage("stone.png"); 
  StrawberryImage = loadImage("Strawberry.png");
  appleImage = loadImage("apple.png");
  candyImage = loadImage("candy.png");
  lollipopImage = loadImage("lollipop.png");
  gameoverimage = loadImage ("gameover.png");
  
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(50,350,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(200,350,400,20);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  
  gameOver = createSprite(300, 100);
  gameOver.addAnimation("gameOver", gameoverimage);
  gameOver.scale = 0.35;
  gameOver.visible = false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
  if(gamestate===PLAY){
      
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    
    player.velocityY = player.velocityY + 0.8;
      
    if(ground.x<0) {
      ground.x=ground.width/2;
    }
    
    if(backgr.x<0){
      backgr.x=backgr.width/2;
    } 
  
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score = score + 2;
    }
    
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }

    spawnFood();

  }
  
  if(player.isTouching(obstaclesGroup)){ 
        gamestate = END;
  }
  
  if (gamestate===END){
    backgr.velocityX = 0;
    ground.velocityX = 0;
    player.velocityX = 0;
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    var GameOver=createSprite(300,120,40,10);
    GameOver.addImage(gameoverimage);
    GameOver.scale=0.2;
  }
  
  spawnObstacles();
  
  player.collide(ground);
  
  drawSprites();
  
  textSize(20);
  stroke("white");
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnFood() {
   if (frameCount%60 === 0){
    
    var fruit = createSprite(400, 200);
    fruit.y = Math.round(random(120,280));
    fruit.velocityX = -6;
    
    var rand = Math.round(random(1,5));
     
    switch(rand) {
      case 1: fruit.addImage(bananaImage);
              fruit.scale = 0.08;
              break;
      case 2: fruit.addImage(StrawberryImage);
              fruit.scale = 0.2;
              break;
      case 3: fruit.addImage(appleImage);
              fruit.scale = 0.15;
              break;
      case 4: fruit.addImage(candyImage);
              fruit.scale = 0.25;
              break;
      case 5: fruit.addImage(lollipopImage);
              fruit.scale = 0.3;
              break;
      default: break;
    }
     
    fruit.lifetime = 134;
     
    FoodGroup.add(fruit);
  }
}
  
function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(800,320,10,40);
    obstacle.scale = 0.2;
    obstacle.setCollider("rectangle",20,20,40,40);
    obstacle.addImage(obstacle_img);   
    obstacle.velocityX = -4;
    obstacle.lifetime = 5000;

    obstaclesGroup.add(obstacle);
  }
}