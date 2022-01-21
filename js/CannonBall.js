class Boladecanhao{

  constructor(x,y){
    this.r = 30;
    var propriedadedaboladecanhao = {
      isStatic:true
    }
    this.body = Bodies.circle(x,y,this.r,propriedadedaboladecanhao);
    this.imagboladecanhao = loadImage("./assets/cannonball.png");
    World.add(world,this.body);
  }
  
  shoot(){
    //convertendo radianos em graus 
    var newangle = canhao.angle-15;
    
    newangle = newangle*(3.14/180);
    //criando velocidade vetorial
    var velocity = p5.Vector.fromAngle(newangle);
    velocity.mult(0.5);

    //bola em movimento 
    Matter.Body.setStatic(this.body,false);
    //dando velocidade para bola 
    Matter.Body.setVelocity(this.body,{x:velocity.x*(180/3.14),y:velocity.y*(180/3.14)});
  }
  
  show(){
    var posicao = this.body.position;
    push();

    imageMode(CENTER);
    image(this.imagboladecanhao,posicao.x,posicao.y,this.r,this.r)


    pop();
    //tragetoria da bola

    if(this.body.velocity.x>0 && posicao.x>10){
      var posicao2 = [posicao.x,posicao.y];
      this.trajectory.push(posicao2); 
    }
    //loop da tragetoria 
    for (var indice2 = 0; indice2 < this.trajectory.length; indice2= indice2+1) { 
      image(this.imagboladecanhao, this.trajectory[indice2][0], this.trajectory[indice2][1], 5, 5); }
  }
  remove(index){
    Matter.Body.setVelocity(this.body,{x:0,y:0});
    setTimeout(
      ()=>{
        Matter.World.remove(world,balls[index].body);
        delete balls[index];
      },2000
    )
  }
}
