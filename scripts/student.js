var Student = function(x,y,rad,affirmative,enrolled){
  this.x = x;
  this.y = y;
  this.rad = rad;
  this.enrolled = enrolled;
  this.maxAgitation = 10;
  this.minAgitation = 0;
  this.mismatched = false;
  this.agitation = this.enrolled ? random(0,3) : random(5,10);
  this.color;
  this.curve;
  this.colors = [color(50,50,255),color(255,255,0)];
  this.affirmative = affirmative;
  this.newPoint = [this.x,this.y];
  this.transitioning = false;
  this.speed = [0,0];
  this.initializeTime = frameCount;

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

  this.time = function(){
    frameCount - this.initializeTime;
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

  this.update = function(){
    var reservation_coefficient = (reservation.value/bluePercent <= 1) ? 1 : map(reservation.value/bluePercent,1,8,1,-1);
    var minority_reservation_coefficient = map(reservation.value/bluePercent,0,8,0,1);
    var education_coefficient = education_programs.scale();
    var aid_coefficient = aid_programs.scale();
    var university_coefficient = universities.scale();
    var segregation_coefficient = -(map(segregation,0,100,0,1));
    var mismatched_coefficient = -(map(mismatches.value,0,100,0,1));
    var growth_coefficient = gdp.sign;

    // console.log('1: '+ reservation_coefficient);
    // console.log('2: '+ minority_reservation_coefficient);
    // console.log('3: '+ education_coefficient);
    // console.log('4: '+ aid_coefficient);
    // console.log('5: '+ university_coefficient);
    // console.log('6: '+ segregation_coefficient);
    // console.log('7: '+ mismatched_coefficient);
    // console.log('8: '+ growth_coefficient);

    if (!this.affirmative){
      this.agitation = this.enrolled*5 + reservation_coefficient + education_coefficient + 
                       aid_coefficient + university_coefficient  + segregation_coefficient + 
                       mismatched_coefficient + growth_coefficient;
    }
    else {  
      this.agitation = this.enrolled*5 + education_coefficient + aid_coefficient + 
                       university_coefficient + segregation_coefficient + minority_reservation_coefficient + 
                       mismatched_coefficient + growth_coefficient;
    }
    if (this.agitation < this.minAgitation || this.agitation > this.maxAgitation) console.log("error");
  }
}