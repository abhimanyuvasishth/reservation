var Student = function(x,y,rad,affirmative,enrolled){
  this.x = x;
  this.y = y;
  this.rad = rad;
  this.affirmative = affirmative;
  this.enrolled = enrolled;
  this.color;

  this.initializeTime = frameCount;

  this.maxAgitation = 10;
  this.minAgitation = 0;

  this.satisfaction = 0;
  this.agitation = 0;

  this.mismatched = false;
  this.newPoint = [this.x,this.y];
  this.transitioning = false;
  this.speed = [0,0];

  this.individualHappiness = random(1);

  this.display = function(legend){
    if (legend) {
      var x = sideBarLeftX+(sideBarRightX-sideBarLeftX)/8;
      var y = bottomBarX+(height-bottomBarX)/2;
    }
    else {
      var x = this.x;
      var y = this.y;
    }
    var multiplier = (this.maxAgitation - this.agitation)*10/this.maxAgitation;
    push();
    rectMode(CENTER);
    noStroke();
    var curve = rad/3;

    if (this.affirmative) {
      // AFFIRMATIVE = BLUE
      this.color = color(50,50,155+multiplier*10);
      fill(this.color);
      rect(x, y, this.rad, this.rad, 0,0,curve,curve);
    }
    else {
      // NOT AFFIRMATIVE = YELLOW
      this.color = color(155+multiplier*10,155+multiplier*10,0);
      fill(this.color);
      rect(x, y, this.rad, this.rad, curve,curve,0,0);
    }

    fill(0);
    ellipse(x-0.25*this.rad, y-0.25*this.rad,this.rad/5,this.rad/5);
    ellipse(x+0.25*this.rad, y-0.25*this.rad,this.rad/5,this.rad/5);

    // Happy arc
    if (this.agitation < this.maxAgitation/3) {
      arc(x, y, this.rad/2, this.rad/2, 0,PI);
    }
    // Neutral line
    else if (this.agitation >= this.maxAgitation/3 && this.agitation < 2*this.maxAgitation/3) {
      rect(x,y+this.rad/8,this.rad/2,this.rad/16);  
    } 
    // Sad curve
    else {
      noFill();
      stroke(0);
      strokeWeight(this.rad/16);
      arc(x, y+this.rad/4, this.rad/2, this.rad/2, PI,PI);
    }
    pop();
  }

  this.time = function(){
    frameCount - this.initializeTime;
  }

  this.clicked = function(mousex,mousey){
    return (mousex < this.x+this.rad/2 && mousex > this.x-this.rad/2 &&
            mousey < this.y+this.rad/2 && mousey > this.y-this.rad/2);
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
      this.speed = [(this.newPoint[0]-this.x)/10,(this.newPoint[1]-this.y)/10];
      console.log(this.newPoint + ": enrolling");
      this.transitioning = true;
      this.enrolled = true;
    }
  }

  this.dropOut = function(){
    if (!this.transitioning && this.enrolled){
      this.newPoint[0] = int(random(width-sideBarLeftX-uniSize+2*rad,sideBarRightX-rad));
      this.newPoint[1] = int(random(topBarX+rad,bottomBarX-rad));
      this.speed = [(this.newPoint[0]-this.x)/10,(this.newPoint[1]-this.y)/10];
      console.log(this.newPoint + ": dropping out");
      this.transitioning = true;
      this.enrolled = false;
    }
  }

  this.show = function(){
    showLegend = true;
    shownPerson = this;
    bottomMessage = "";
  }

  this.update = function(){
    // Values between 0 and 1. Opposite for majority and minority
    if (reservation.value/bluePercent <= 1){
      // Takes values between -1 and 0
      var minority_reservation_coefficient = map(reservation.value/bluePercent,0,1,-2,0);
    }
    else {
      // Takes values between 0 and 1
      var minority_reservation_coefficient = map(reservation.value/bluePercent,1,8,0,1);
    }
    var reservation_coefficient = -minority_reservation_coefficient;

    // Values between 0 and 1
    var education_coefficient = education_programs.scale();
    var university_coefficient = universities.scale();
    if (gdp.value > threshold && gdp.sign > 0){
      var growth_coefficient = 1;  
    }
    else {
      var growth_coefficient = 0;  
    }

    var mismatched_coefficient = -1*(map(mismatches.value,0,100,0,1)); // Minority only
    var segregation_coefficient = 1-(map(segregation,0,100,0,1)); 

    if (!this.affirmative){
      this.satisfaction = this.enrolled*5 + reservation_coefficient + education_coefficient + 
                          university_coefficient  + segregation_coefficient + growth_coefficient +
                          this.individualHappiness;
    }
    else {  
      this.satisfaction = this.enrolled*5 + education_coefficient + university_coefficient + 
                          segregation_coefficient + minority_reservation_coefficient + 
                          mismatched_coefficient + this.individualHappiness - 3*this.mismatched + 
                          growth_coefficient;
    }
    this.agitation = 10-this.satisfaction;
  }
}