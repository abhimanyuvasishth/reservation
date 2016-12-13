var Student = function(x,y,rad,affirmative,enrolled){
  this.x = x;
  this.y = y;
  this.rad = rad;
  this.affirmative = affirmative;
  this.enrolled = enrolled;
  this.color;

  this.initializeMonth = cur_month;
  this.initializeYear = cur_year;

  this.maxAgitation = 10;
  this.minAgitation = 0;

  this.satisfaction = 0;
  this.agitation = 0;

  this.mismatched = false;
  this.mismatchedMonth;
  this.mismatchedYear;

  this.graduated = false;
  this.newPoint = [this.x,this.y];
  this.transitioning = false;
  this.speed = [0,0];
  this.speedCoefficient = 30;

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

    // Draw graduated
    fill(0);
    if (this.graduated){
      rect(x,y-this.rad*0.5,this.rad/5,this.rad*0.2);
      rect(x,y-this.rad*0.6,this.rad*1.2,this.rad*0.1);
    }

    if (this.isNew()){
      push();
      fill(0,200,0);
      ellipse(x,y-rad/2,rad/5,rad/5);
      pop();
    }

    // Draw mismatched
    if (this.mismatched){
      push();
      stroke(0);
      strokeWeight(1);
      line(x-0.375*this.rad,y-0.125*this.rad,x-0.125*this.rad,y-0.375*this.rad);
      line(x-0.375*this.rad,y-0.375*this.rad,x-0.125*this.rad,y-0.125*this.rad);
      line(x+0.375*this.rad,y-0.125*this.rad,x+0.125*this.rad,y-0.375*this.rad);
      line(x+0.375*this.rad,y-0.375*this.rad,x+0.125*this.rad,y-0.125*this.rad);  
      pop();
    }
    else {
      ellipse(x-0.25*this.rad, y-0.25*this.rad,this.rad/5,this.rad/5);
      ellipse(x+0.25*this.rad, y-0.25*this.rad,this.rad/5,this.rad/5);
    }

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

  this.isNew = function(){
    return (this.time(this.initializeYear,this.initializeMonth) < 2 && !(this.initializeMonth == month() && this.initializeYear == year()));
  }

  this.time = function(year,month){
    var yearDiff = cur_year-year;
    var monthDiff = cur_month-month;
    return yearDiff*12+monthDiff;
  }

  this.clicked = function(mousex,mousey){
    return (mousex < this.x+this.rad/2 && mousex > this.x-this.rad/2 &&
            mousey < this.y+this.rad/2 && mousey > this.y-this.rad/2);
  }

  this.move = function(){
    if (this.transitioning) {
      this.y += this.speed[1];
      this.x += this.speed[0];
      if (this.newPoint[0] < this.x+5 && this.newPoint[0] > this.x-5 && 
          this.newPoint[1] < this.y+5 && this.newPoint[1] > this.y-5){
        if (this.graduated) {
          var index = students.indexOf(this);
          students.splice(index, 1);
          createNewStudent(index);
        }
        else {
          this.transitioning = false;
        }
      }
    }
  }

  this.enroll = function(){
    if (!this.transitioning && !this.mismatched){
      this.newPoint[0] = int(random(sideBarLeftX+rad,sideBarRightX-rad-uniSize));
      this.newPoint[1] = int(random(topBarX+rad,bottomBarX-rad));
      this.speed = [(this.newPoint[0]-this.x)/10,(this.newPoint[1]-this.y)/10];
      this.transitioning = true;
      this.enrolled = true;
    }
  }

  this.graduate = function(){
    this.transitioning = true;
    this.graduated = true;
    this.newPoint[0] = sideBarLeftX;
    this.newPoint[1] = this.y;
    this.mismatched = false;
    this.speed = [(this.newPoint[0]-this.x)/this.speedCoefficient,(this.newPoint[1]-this.y)/this.speedCoefficient];
  }

  this.join = function(){
    // Where this new student goes
    if (this.enrolled){
      this.enroll();
    }
    else {
      this.dropOut();
    }
  }

  this.dropOut = function(mismatched){
    if (mismatched == true && this.graduated == false && this.enrolled == true) {
      this.mismatched = true;
      this.mismatchedYear = cur_year;
      this.mismatchedMonth = cur_month;
    }
    if (!this.transitioning){
      this.newPoint[0] = int(random(width-sideBarLeftX-uniSize+2*rad,sideBarRightX-rad));
      this.newPoint[1] = int(random(topBarX+rad,bottomBarX-rad));
      this.speed = [(this.newPoint[0]-this.x)/this.speedCoefficient,(this.newPoint[1]-this.y)/this.speedCoefficient];
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
    if (this.time(this.mismatchedYear,this.mismatchedMonth) > 3) this.mismatched = false;

    // Values between 0 and 1. Opposite for majority and minority
    if (reservation.value/theoreticalBluePercent <= 1){
      // Takes values between 0 and 1
      var minority_reservation_coefficient = map(reservation.value/theoreticalBluePercent,0,1,0,0.5);
    }
    else {
      // Takes values between 1 and 0
      var minority_reservation_coefficient = map(reservation.value/theoreticalBluePercent,1,8,0.5,1);
    }
    var reservation_coefficient = 1-minority_reservation_coefficient;

    if (boost_active){
      // do math here
      if (this.enrolled){
        var boost_coefficient = 0.3*boost_count;
      }
      else {
        var boost_coefficient = 0.5*boost_count; 
      }
    }
    else {
      var boost_coefficient = 0;
    }

    // Values between 0 and 1
    var university_coefficient = 0.5+universities.scale()/2;
    if (gdp.value > threshold){
      var growth_coefficient = map(gdp.value,gdp.lower,gdp.upper,0,1);
    }
    else {
      var growth_coefficient = 0;
    }

    var mismatched_coefficient = (map(mismatches.value,0,25,0.2,0)); // Minority only

    if (!this.affirmative){
      this.satisfaction = this.enrolled*5 + reservation_coefficient + university_coefficient +
                          growth_coefficient + this.individualHappiness + boost_coefficient;
    }
    else {  
      this.satisfaction = this.enrolled*5 + university_coefficient + growth_coefficient +
                          minority_reservation_coefficient + mismatched_coefficient + 
                          this.individualHappiness + -this.mismatched + boost_coefficient;
    }
    this.agitation = 10-this.satisfaction;
  }
}