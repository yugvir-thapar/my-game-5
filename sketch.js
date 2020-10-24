const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;


var sanitizerimg, maskimg, glovesimg;
var virusimg, trubishimg, bg, bgimg;
var virus, sanitizer, mask, gloves, trubish;
var START = 1;
var PLAY = 2;
var WIN = 3;
var gameState = START;
var message = "press up arrow to save the world";
var score = 0;
var sanitizergroup, maskgroup, virusgroup, glovesgroup, trubishgroup;
var checkpointSound,winnerSound,coinSound;
function preload() {

    sanitizerimg = loadImage("images/sanitizer.png");
    maskimg = loadImage("images/mask.png");
    virusimg = loadImage("images/corona.png");
    trubishimg = loadImage("images/trubish.png");
    glovesimg = loadImage("images/gloves.png");
    bgimg = loadImage("images/bgtinted.png");
    checkpointSound=loadSound("sounds/checkpoint.mp3");
    coinSound=loadSound("sounds/coin.mp3");
    winnerSound=loadSound("sounds/winner.mp3");
    //blankImage = 
}

function setup() {
    createCanvas(displayWidth, displayHeight - 40)
    maskgroup = new Group();
    sanitizergroup = new Group();
    virusgroup = new Group();
    glovesgroup = new Group();
    trubishgroup = new Group();
}

function draw() {
    text("score" + score, 100, 100)
    //todo try to tint the background image.

    //alt + shft + f
    //Start will show all info, like which key to press to play the game, which sprite  will make you loose, 
    //which sprite will give how much score

    if (gameState === START) {
        background("blue");
        fill("black");
        textSize(90);
        text(message, 100, 400);
        textSize(60);
        image(sanitizerimg, 200, 500, 200, 200);
        fill("green");
        text("+20", 200, 800,);
        image(maskimg, 400, 500, 200, 200)
        text("+5",400,800)
        image(glovesimg,600,500,200,200)
        text("+10",600,800)
        fill("red")
        image(virusimg,900,500,200,200)
        text("-30",900,800)
        image(trubishimg,1100,500,200,200)
        text("-15",1100,800)
        if (keyDown(UP_ARROW)) {
            gameState = PLAY;
        }
    }
    
    else if (gameState === PLAY) {
        image(bgimg, 0, 0, displayWidth, displayHeight - 40);
        message = "";
        showsanitizer();
        for (var i = 0; i < sanitizergroup.length; i = i + 1) {
            var spriteItr = sanitizergroup.get(i);
            if (mousePressedOver(spriteItr)) {
                score = score + 20;
                spriteItr.lifetime = 0;
                checkpointSound.play();
            }
            else if(spriteItr.y<0){
                score=score-10;
                spriteItr.lifetime=0;
            }
        }
        showmask();
        for (var i = 0; i < maskgroup.length; i = i + 1) {
            var spriteItr = maskgroup.get(i);
            if (mousePressedOver(spriteItr)) {
                score = score + 100
                spriteItr.lifetime = 0;
            }
            else if(spriteItr.y<0){
                score=score-3;
                spriteItr.lifetime=0;
            }
        }
        showtrubish();
        for (var i = 0; i < trubishgroup.length; i = i + 1) {
            var spriteItr = trubishgroup.get(i);
            if (mousePressedOver(spriteItr)) {
                score = score - 15;
                spriteItr.lifetime = 0;
            }
            else if(spriteItr.y<0){
                score=score+1;
                spriteItr.lifetime=0;
            }
        }
        showgloves();
        for (var i = 0; i < glovesgroup.length; i = i + 1) {
            var spriteItr = glovesgroup.get(i);
            if (mousePressedOver(spriteItr)) {
                score = score + 10;
                spriteItr.lifetime = 0;
            }
            else if(spriteItr.y<0){
                score=score-5;
                spriteItr.lifetime=0;
            }
        }
       
        showvirus();
        for (var i = 0; i < virusgroup.length; i = i + 1) {
            var spriteItr = virusgroup.get(i);
            if (mousePressedOver(spriteItr)) {
                score = score - 30;
                spriteItr.lifetime = 0;
            }
            else if(spriteItr.y<0){
                score=score+2;
                spriteItr.lifetime=0;
            }
        }
      
           
       
        if(score===1000){
            gameState=WIN;
            virusgroup.destroyEach();
            trubishgroup.destroyEach();
            sanitizergroup.destroyEach();
            glovesgroup.destroyEach();
            maskgroup.destroyEach();
           winnerSound.play();
        }
    }
    else if(gameState === WIN){
        //game over
        textSize(100);
        background("yellow");
        fill("orange");
        text("You saved the World ",200,400)
        
    }
    fill("black")
    textSize(50);
    fill("white");
    text("Score: " + score, displayWidth - 280, displayHeight - 100);

    drawSprites();
}
function showsanitizer() {
    if (frameCount % 700 === 0) {
        sanitizer = createSprite(random(20, 1180), 810, 50, 50);
        sanitizer.addImage(sanitizerimg);
        sanitizer.scale = 0.15;
        sanitizer.velocityY = -(5+score/50);
        sanitizer.lifetime = 600;
        sanitizergroup.add(sanitizer);
        if (sanitizer.y < 200) {
            // sanitizer.velocityY=sanitizer.velocityY=+2
        }
    
    }
}
function showmask() {
    if (frameCount % 100 === 0) {
        mask = createSprite(random(20, 1180), 850, 50, 50);
        mask.addImage(maskimg);
        mask.scale = 0.16;
        mask.velocityY = -(3+score/50);
        mask.lifetime = 600;
        maskgroup.add(mask);

    }

}
function showvirus() {
    if (frameCount % 500 === 0) {
        virus = createSprite(random(20, 1180), 850, 50, 50);
        virus.addImage(virusimg);
        virus.scale = 0.5;
        virus.velocityY = -(3+score/50);
        mask.lifetime = 700;
        virusgroup.add(virus);
    }
}
function showtrubish() {
    if (frameCount % 300 === 0) {
        trubish = createSprite(random(20, 1180), 850, 50, 50);
        trubish.addImage(trubishimg);
        trubish.scale = 0.07;
        trubish.velocityY = -(3+score/50);
        mask.lifetime = 700;
        trubishgroup.add(trubish);
    }
}
function showgloves() {
    if (frameCount % 200 === 0) {
        gloves = createSprite(random(20, 1180), 850, 50, 50);
        gloves.addImage(glovesimg);
        gloves.scale = 0.1;
        gloves.velocityY =-(3+score/50);
        gloves.lifetime = 700;
        glovesgroup.add(gloves);
    }
}