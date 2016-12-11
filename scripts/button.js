var Button = function(id,x,y,policy,side){
  this.id = id;
  this.x = x;
  this.y = y;
  this.side = side;
  if (this.side == 0){
    this.width = sideBarLeftX*0.8;
    this.height = textResultVal*2;
  }
  else {
    this.width = 20;
    this.height = 20;
  }
  this.policy = policy;

  this.display = function(){
    if (this.side != 0){
      noStroke();
      fill(0);
      rect(this.x,this.y,this.width,this.height,this.width/5);
      fill(255);
      textSize(10);
      textAlign(CENTER);
      if (this.side > 0) text('+', this.x+this.width/2,this.y+this.height/1.5);
      else text('-', this.x+this.width/2,this.y+this.height/1.5);
    }
    else {
      push();
      fill(150);
      rectMode(CENTER);
      var curve = textResultVal/4;
      rect(this.x, this.y+textResultVal,this.width,this.height,curve,curve);
      fill(0);
      textSize(textResult*0.75);
      text("BOOST!!", sideBarLeftX*0.5, this.y+textResult*0.75);
      pop();
    }
  }

  this.clicked = function(mousex,mousey){
    if (side != 0){
      return (mousex < this.x+this.width && mousex > this.x && mousey < this.y + this.height && mousey > this.y);
    }
    else {
      return (mousex < this.x+this.width/2 && mousex > this.x-this.width/2 && mousey < this.y + this.height/2 && mousey > this.y-this.height/2); 
    }
  }

  this.action = function(){
    this.policy.update(this.side);
  }
}