class Barco{

  constructor(x,y,w,h,posicaodobarco){

    this.body = Bodies.rectangle(x,y,w,h);
    World.add(world,this.body);
    this.w = w;
    this.h = h;
    
    this.posicaodobarco = posicaodobarco;
    this.imge = loadImage("./assets/boat.png");
  }
  show(){

    var angle = this.body.angle;

    var posicao3 = this.body.position;

   push();
   translate(posicao3.x,posicao3.y);
   rotate(angle);
   imageMode(CENTER);
   image(this.imge,0,this.posicaodobarco,this.w,this.h);

   pop();
  }
  remove(){
    setTimeout(
      ()=>{
        Matter.World.remove(world,boat[indece3].body);
        delete boat[indece3];
      },2000
    )
  }
}