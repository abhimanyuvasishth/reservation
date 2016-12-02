var Button = function(id,x,y,role,side){
  this.id = id;
  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 50;
  this.role = role;
  this.side = side;

  this.display = function(){
    noStroke();
    if (this.side < 0) fill(200,0,0);
    else fill(0,200,0);
    rect(this.x,this.y,this.width,this.height);
  }

  this.clicked = function(mousex,mousey){
    return (mousex < this.x+this.width && mousex > this.x && mousey < this.y + this.height && mousey > this.y);
  }

  this.action = function(){
    console.log("clicked: " + this.side + " : " + this.id);
  }
}