var Student = function(x,y,rad,affirmative){
  this.x = x;
  this.y = y;
  this.rad = rad;
  this.maxAgitation = 10;
  this.agitation = int(random(10));
  this.color;
  this.colors = [color(50,50,255),color(255,255,0)];
  this.affirmative = affirmative;

  this.display = function(){
    var multiplier = this.maxAgitation - this.agitation;

    if (this.affirmative) this.color = color(50,50,55+multiplier*20);
    else this.color = color(155+multiplier*10,155+multiplier*10,0);

    noStroke();
    fill(this.color);
    rectMode(CENTER);
    rect(this.x, this.y, this.rad, this.rad);
  }

  this.move = function(){
    push();
    translate(this.x, this.y); 
    rotate(radians(this.agitation * frameCount));
    translate(-this.x, -this.y); 
    this.display();
    pop();
  }
}