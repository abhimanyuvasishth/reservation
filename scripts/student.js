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
  this.newPoint = [this.x,this.y];
  this.transitioning = false;
  this.speed = [0,0];

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
    if (!this.transitioning){
      // push();
      // if (this.enrolled) this.y += sin(frameCount);
      // else this.x += 0.5*this.agitation*sin(frameCount);
      // pop();
    }
    else {
      this.y += this.speed[1];
      this.x += this.speed[0];
      if (this.newPoint[0] < this.x+5 && this.newPoint[0] > this.x-5 && 
          this.newPoint[1] < this.y+5 && this.newPoint[1] > this.y-5){
        this.transitioning = false;
        console.log("done");
      }
    }
  }

  this.enroll = function(){
    if (!this.transitioning && !this.enrolled){
      this.newPoint[0] = int(random(sideBarLeftX+rad,sideBarRightX-rad-uniSize));
      this.newPoint[1] = int(random(topBarX+rad,bottomBarX-rad));
      this.speed = [(this.newPoint[0]-this.x)/100,(this.newPoint[1]-this.y)/100];
      console.log(this.newPoint + ": enrolling");
      this.transitioning = true;
      this.enrolled = true;
    }
  }

  this.dropOut = function(){
    if (!this.transitioning && this.enrolled){
      this.newPoint[0] = int(random(width-sideBarLeftX-uniSize+2*rad,sideBarRightX-rad));
      this.newPoint[1] = int(random(topBarX+rad,bottomBarX-rad));
      this.speed = [(this.newPoint[0]-this.x)/100,(this.newPoint[1]-this.y)/100];
      console.log(this.newPoint + ": dropping out");
      this.transitioning = true;
      this.enrolled = false;
    }
  }

  this.updateAgitation = function(){
    // Do student math here
  }
}