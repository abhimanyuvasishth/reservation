var Student = function(x,y,rad,affirmative,enrolled){
  this.x = x;
  this.y = y;
  this.rad = rad;
  this.enrolled = enrolled;
  this.maxAgitation = 10;
  this.agitation = this.enrolled ? random(0,3) : random(5,10);
  this.color;
  this.curve;
  this.colors = [color(50,50,255),color(255,255,0)];
  this.affirmative = affirmative;

  this.display = function(){
    var multiplier = this.maxAgitation - this.agitation;
    push();
    rectMode(CENTER);
    noStroke();
    this.curve = rad/3;

    if (this.affirmative) {
      // AFFIRMATIVE = BLUE
      this.color = color(50,50,155+multiplier*10);
      fill(this.color);
      rect(this.x, this.y, this.rad, this.rad, 0,0,this.curve,this.curve);
    }
    else {
      // NOT AFFIRMATIVE = YELLOW
      this.color = color(155+multiplier*10,155+multiplier*10,0);
      fill(this.color);
      rect(this.x, this.y, this.rad, this.rad, this.curve,this.curve,0,0);
    }

    fill(0);
    ellipse(this.x-0.25*this.rad, this.y-0.25*this.rad,this.rad/5,this.rad/5);
    ellipse(this.x+0.25*this.rad, this.y-0.25*this.rad,this.rad/5,this.rad/5);

    if (this.agitation < 3.3) arc(this.x, this.y, this.rad/2, this.rad/2, 0,PI);
    else if (this.agitation >= 3.3 && this.agitation < 6.6) {
      rect(this.x,this.y+this.rad/8,this.rad/2,this.rad/8);  
    } 
    else arc(this.x, this.y+0.25*this.rad, this.rad/2, this.rad/2, PI,PI);  
    pop();
  }

  this.move = function(){
    push();
    // translate(this.x, this.y); 
    // rotate(radians(this.agitation * frameCount));
    // translate(-this.x, -this.y); 
    if (this.enrolled) this.y += sin(frameCount);
    else this.x += 0.5*this.agitation*sin(frameCount);
    // this.display();
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