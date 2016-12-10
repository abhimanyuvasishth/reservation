var Button = function(id,x,y,policy,side){
  this.id = id;
  this.x = x;
  this.y = y;
  this.width = 20;
  this.height = 20;
  this.policy = policy;
  this.side = side;

  this.display = function(){
    noStroke();
    fill(0);
    rect(this.x,this.y,this.width,this.height,this.width/5);
    fill(255);
    textSize(10);
    textAlign(CENTER);
    if (this.side > 0) text('+', this.x+this.width/2,this.y+this.height/1.5);
    else text('-', this.x+this.width/2,this.y+this.height/1.5);
  }

  this.clicked = function(mousex,mousey){
    return (mousex < this.x+this.width && mousex > this.x && mousey < this.y + this.height && mousey > this.y);
  }

  this.action = function(){
    this.policy.update(this.side);
  }
}