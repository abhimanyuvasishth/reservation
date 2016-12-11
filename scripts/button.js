var Button = function(id,x,y,policy,side){
  this.id = id;
  this.x = x;
  this.y = y;
  this.policy = policy;
  this.side = side;
  if (this.side == 0 && this.policy != null){
    this.width = sideBarLeftX*0.8;
    this.height = textResultVal*2;
  }
  else if (this.side == 1 || this.side == -1){
    this.width = textResult;
    this.height = textResult;
  }
  else if (this.policy == null){
    this.width = textResultVal*1.5,textResultVal*1.5;
    this.height = textResultVal*1.5,textResultVal*1.5;  
  }

  this.display = function(){
    if (this.side == 1 || this.side == -1){
      noStroke();
      fill(0);
      rect(this.x,this.y,this.width,this.height,this.width/5);
      fill(255);
      textSize(10);
      textAlign(CENTER);
      if (this.side > 0) text('+', this.x+this.width/2,this.y+this.height/1.5);
      else text('-', this.x+this.width/2,this.y+this.height/1.5);
    }
    else if (this.side == 0 && this.policy != null){
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
    else if (this.policy == null){
      push();
      fill(120);
      rectMode(CENTER);
      rect(this.x, this.y,textResultVal*1.5,textResultVal*1.5,textResultVal/4,textResultVal/4);
      // ellipse(this.x, this.y,textResultVal*2,textResultVal*2);
      fill(255);
      textSize(textResultVal);
      text("i", this.x, this.y+textResultVal/3);
      pop();
    }
  }

  this.clicked = function(mousex,mousey){
    if (this.side == 1 || this.side == -1){
      return (mousex < this.x+this.width && mousex > this.x && mousey < this.y + this.height && mousey > this.y);
    }
    else if (this.side == 0 && this.policy != null) {
      return (mousex < this.x+this.width/2 && mousex > this.x-this.width/2 && mousey < this.y + this.height/2 && mousey > this.y-this.height/2); 
    }
    else if (this.policy == null){
      return (mousex < this.x+this.width/2 && mousex > this.x-this.width/2 && mousey < this.y + this.height/2 && mousey > this.y-this.height/2);  
    }
  }

  this.action = function(){
    if (this.policy != null){
      this.policy.update(this.side);
    }
    // Result button
    else if (this.policy == null){
      console.log("clicked " + this.id);
    }
  }
}