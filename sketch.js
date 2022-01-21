const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine;
var world;

var solo;

var backgroundImag;

var torre; 
var torreImag;

var canhao;
var angle;
var boladecanhao;
var barco;


var balls=[];
var boat=[];


function preload(){
  backgroundImag = loadImage("./assets/background.gif");
  torreImag = loadImage("./assets/tower.png");
}

function setup(){
  createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  //colocando unidade de medidas
  angleMode(DEGREES);
  angle = 15;

  var propriedadedosolo ={
    isStatic:true
  }
  solo = Bodies.rectangle(0,height-1,width*2,1,propriedadedosolo);
  World.add(world,solo);
  
  var propriedadedatorre = {
    isStatic:true
  } 
  torre = Bodies.rectangle(160,350,160,310,propriedadedatorre);
  World.add(world,torre);

  canhao = new Canhao(180,110,130,100,angle);

}

function draw(){
  background("blue");
  
  image(backgroundImag,0,0,1200,600);
  
  Engine.update(engine);
  
  rect(solo.position.x,solo.position.y,width*2,1);
  push();
  imageMode(CENTER);
  image(torreImag,torre.position.x,torre.position.y,160,310);
  pop();
  canhao.show();
  //"length" é a quantidade de elementos de uma matris 
  for(var indice= 0; indice<balls.length; indice = indice+1){
    boladecanhao.show();
    colisao(indice);
    //if(balls.body.position.x>=width||balls.body.position.y>=height-50){
      //balls.remove(indice);
    //}
  }
  //criando loop de barco
  if(boat.length>0){
    //verifica se a posição do navio é -300
    if(boat[boat.length-1].body.position.x<width-300||boat[boat.length-1]===undefined){
      //decorando matris de posição aleatoria 
      var posicaoaleatoria = [-40,-60,-70,-20];
      var numerodaposicao = random(posicaoaleatoria);
      barco = new Barco(width,height-100,170,170,numerodaposicao);
      boat.push(barco);
    }
    for(var indice2= 0; indice2<boat.length; indice2 = indice2+1){
      if(boat[indice2]){
      //colocando velocidade ao barco 
      Matter.Body.setVelocity(barco.body,{x:-2,y:0})
      boat[indice2].show();
      //continuação
    }
    } 
  }
  else{
    barco = new Barco(width-79,height-60,170,170,-80);
    boat.push(barco);
  }
}

function keyReleased(){
  if(keyCode==DOWN_ARROW){
    balls[balls.length-1].shoot();
  }
}

function keyPressed(){
  if(keyCode==DOWN_ARROW){
    boladecanhao = new Boladecanhao(canhao.x,canhao.y);
    boladecanhao.trajectory = []
    Matter.Body.setAngle(boladecanhao.body, canhao.angle);
    balls.push(boladecanhao);
  }

}

function colisao(index){
  for(var indice3 = 0;indice3<boat.length;indice3 = indice3+1){
    //verificando se a matris não é indefinida 
    if(balls[index]!==undefined && boat[indice3]!==undefined){
      //reconhecendo colisão 
      var colisao2 = Matter.SAT.collides(balls[index].body,boat[indice3].body)
      if(colisao2.collided){
        boat[indice3].remove(indice3);
        Matter.World.remove(world,balls[index].body);
        delete balls[index];
      }
    }
  }
}