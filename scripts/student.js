var Student = function(x,y,rad){
  this.x = x;
  this.y = y;
  this.rad = rad;
  this.speedX = random(10);
  this.speedY = random(10);
  this.colors = color(random(255), random(255), random(255));

  this.display = function(){
    noStroke();
    fill(this.colors);
    ellipse(this.x, this.y, this.rad, this.rad);
  }

  this.move = function(){
    this.x += this.speedX;
    this.y += this.speedY;
  }

  this.check = function(){
    if (this.x < this.rad/2){
      this.x = this.rad/2;
      this.speedX = -1*this.speedX;
    }
    else if (this.x > windowWidth - this.rad/2){
      this.x = windowWidth - this.rad/2;
      this.speedX = -1*this.speedX; 
    }
    if (this.y < this.rad/2){
      this.y = this.rad/2;
      this.speedY = -1*this.speedY;
    }
    else if (this.y > windowHeight + this.rad/2){
      this.y = windowHeight - this.rad/2;
      this.speedY = -1*this.speedY; 
    }
  }
}