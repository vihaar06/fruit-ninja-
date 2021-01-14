var PLAY=1;
var END=0;
var gameState=PLAY;
var sword,fruit,monster,fruitGroup,enemyGroup,score,r,randomFruit;
var swordImage,fruit1,fruit2,fruit3,fruit4,monsterImage,gameOverImage;

function preload(){
  swordImage=loadImage("sword.png");
  monsterImage=loadAnimation("alien1.png","alien2.png");
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  gameOverImage=loadImage("gameover.png");
  
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3");
  gameOverSound=loadSound("gameover.mp3");
 
}


function setup(){ 
 createCanvas(600,600);
  
  sword=createSprite(40,200,100,100);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  score=0;
  sword.setCollider("rectangle",0,0,50,40);
  //sword.debug=true;
  
  
  fruitsGroup=createGroup();
  enemyGroup=createGroup();
  
}




function draw(){
  background("lightblue");
  text("score:"+score,300,30);
    
  if(gameState===PLAY){
    fruits();
    Enemy();
    
  if(fruitsGroup.isTouching(sword)){
    fruitsGroup.destroyEach();
    knifeSwooshSound.play();

    score=score+2
  }
  if(enemyGroup.isTouching(sword)){
    enemyGroup.destroyEach();
     gameState=END;
    gameOverSound.play();
  
  } 
  
  sword.y=World.mouseY;
  sword.x=World.mouseX;
    
  }
  
  if(gameState===END){
    sword.addImage(gameOverImage);
    sword.x=300;
    sword.y=275;
   
  }
  
  
  fruit1Group=new Group();
  fruit2Group=new Group(); 
  fruit3Group=new Group();
  fruit4Group=new Group();
  alien1Group=new Group();
  alien2Group=new Group();
  
  
    drawSprites();
  }
  



function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    r=Math.round(random(1,4));
    if (r == 1){
      fruit.addImage(fruit1);
    }else if(r==2){
       fruit.addImage(fruit2);
    }else if(r==3){
       fruit.addImage(fruit3);
    }else if(r==4){
       fruit.addImage(fruit4);  
    }
    var position=[-7,7];
   
  
    fruit.y=Math.round(random(50,340));
    
    fruit.velocityX=random(position);
    if (random( position)===7){
      fruit.x=0;
    
        fruit.x=400;
      }
      
      
    
    fruit.setlifetime=100;
     
    fruitsGroup.add(fruit);
  }
    
   
  
}

 



 function Enemy(){
   if(World.frameCount%200===0){
  monster=createSprite(400,200,20,20);
   monster.addAnimation("Moving", monsterImage);
   monster.y=Math.round(random(100,300));  
   monster.velocityX=-(8+(score/10));
   monster.setlifetime=50;   
   enemyGroup.add(monster);
   }   
 }



