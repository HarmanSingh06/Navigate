var canvas;
var bg,bgImg;

var spaceShip,spaceShipImg;


var obstacleCount = 20;
var obstacle,obstaclesGroup;
var obstacle1,obstacle2;

var health = 100;

var PLAY = 1;
var END = 0;
var gameState = 'PLAY';

var dist;
var backGroundSound,rocketSound,safezone;

function preload(){
    bgImg = loadImage("../Assets/Images/bg.png");
    spaceShipImg = loadImage("../Assets/Images/spaceship.png")
    
    obstacle1 = loadImage("../Assets/Images/obstcle1.png");
    obstacle2 = loadImage("../Assets/Images/obstacle2.png");

    backGroundSound = loadSound("../Assets/Sounds/backgroundSound.mp3")

    rocketSound = loadSound("../Assets/Sounds/rocket.wav")

    safezone = loadSound("../Assets/Sounds/safezone.mp3")
}

function setup(){
    canvas  = createCanvas(1200,730);

    //Background
    bg = createSprite(1200,700)
    bg.addImage(bgImg)
    bg.scale = 0.4
    bg.velocityY = 0.6; 
    
    
    

    //SpaceShip
    spaceShip = createSprite(width/2,670 ,100,100);
    spaceShip.addImage(spaceShipImg)
    spaceShip.scale = 0.2
    spaceShip.setCollider("rectangle", 0,0, 300,500);
    spaceShip.debug = true;

    obstaclesGroup = createGroup();

}

function draw(){
background(0);


//rocketSound.play();
if(gameState === 'PLAY'){
camera.position.y = spaceShip.y-180;
camera.position.x = spaceShip.x;

//SpaceShip
right();
left();

if(frameCount === 10){
    safezone.play();
}
if(obstaclesGroup.isTouching(spaceShip)){
    health = health-10;
    obstaclesGroup.destroyEach();
}
    //Background
    if(bg.y > 1200){
        bg.y = 0
    }

    //Spawning Obstacles
    if(frameCount % 180 === 0){
        spawnObstacles();
    }

    //Lets Finish It
    if(frameCount === 5000){
        gameState === 'END'
    }

    //Game IS Having Two Endings----Fix This 
    else if(gameState === 'END'){
        text()
    }
}
drawSprites();

}

//Working On Functions to make the SPaceship Move
function right(){
    if(keyDown(RIGHT_ARROW) && spaceShip.x<1180){
        spaceShip.x = spaceShip.x+5
    }
}
function left(){
    if(keyDown(LEFT_ARROW) && spaceShip.x>0){
        spaceShip.x = spaceShip.x-5
    }
}

//Spawning Obstacles
function spawnObstacles(){

        obstacle = createSprite(random(20,1180),1)
        obstacle.velocityY = 2;
        obstacle.scale = 0.3

        obstaclesGroup.add(obstacle);

        switch(Math.round(random(1,2))){
            case 1: obstacle.addImage(obstacle1)
            break;
            case 2: obstacle.addImage(obstacle2);
            break;
        }
        obstacle.lifetime = 450
}