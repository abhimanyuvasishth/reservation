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
    fill(0);
    ellipse(this.x-0.25*this.rad, this.y-0.25*this.rad,this.rad/5,this.rad/5);
    ellipse(this.x+0.25*this.rad, this.y-0.25*this.rad,this.rad/5,this.rad/5);

    if (this.agitation < 3) arc(this.x, this.y, this.rad/2, this.rad/2, 0,PI);
    else arc(this.x, this.y+0.25*this.rad, this.rad/2, this.rad/2, PI,PI);  
  }

  this.move = function(){
    push();
    translate(this.x, this.y); 
    rotate(radians(this.agitation * frameCount));
    translate(-this.x, -this.y); 
    this.display();
    pop();
  }

  this.updateAgitation = function(num){
    if (num < 0){
      if (this.agitation >= Math.abs(num)){
        this.agitation += num;
      }
    }
    else {
      if (this.agitation < this.maxAgitation - num){
        this.agitation += num;
      }  
    }
  }
}