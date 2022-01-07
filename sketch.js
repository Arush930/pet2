var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var foodObj, feed,addFood

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
  }

function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 


feed=createButton("Feed the dog");
  feed.position(200,120);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(300,120);
  addFood.mousePressed(addFoods);

foodObj = new Food()

}

function draw() {
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

fill(255,255,254);
  textSize(15);
  

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
}

function readStock(data){
  foodS=data.val();
}

function feedDog(){
dog.addImage(dogImg);

if(foodObj.getFoodStock()<=0){
foodObj.updateFoodStock(foodObj.getFoodStock()*0);
}
else{

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
}
database.ref('/').update({
Food:foodObj.getFoodStock()
})
}


function addFoods(){
foodS++;
database.ref('/').update({
Food:foodS
})
}

