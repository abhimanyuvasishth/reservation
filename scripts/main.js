var canvas;

var sideBarLeftX;
var sideBarRightX;
var topBarX;
var bottomBarX;
var uniSize;
var youSize;

var students;
var totalStudents;

var buttons;
var textColor = 125;

var policies;
var results;

var previous_voters;

// Policies
var reservation;
var universities;
var education_programs;
var aid_programs;
var costs;

// Results
var gdp;
var graduates;
var popularity;
var party_approval;
var segregation;
var growth_rate;

// Images
var profile;

var bottomMessage = "another message for you";

var month;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"];
var year;

function preload(){
	profile = loadImage('img/profile_50.png');
}

function setup(){
	canvas = createCanvas(windowWidth-20, windowHeight-20);
	canvas.parent('myContainer');

	initializeFrame();
	initializeValues();
	initializeStudents();
	initializeButtons();
}

function initializeFrame(){
	sideBarLeftX = 0.1*width;
	sideBarRightX = 0.9*width;
	profile.x = sideBarLeftX/2-25;
	profile.y = 10;
	uniSize = (sideBarRightX-sideBarLeftX)*0.5;
	topBarX = 0.08*height;
	bottomBarX = 0.9*height;
	youSize = height*0.2;
}

function initializeButtons(){
	buttons = [];
	// Creating buttons
	for (var i = 0; i < policies.length*2; i++){
		var x = i%2 == 0 ? sideBarLeftX/6 : 2*sideBarLeftX/3;
		var y = youSize/2 + (bottomBarX-topBarX)/(policies.length+1) * (Math.floor(i/2)+1);
		var policy = policies[Math.floor(i/2)];
		var side = i%2 == 0 ? -1 : 1;
		var button = new Button(i,x,y,policy,side);
		buttons.push(button);
	}
}

function initializeValues(){
	// date
	month = month();
	year = year();

	// policies
	reservation = new Policy("Reservation",25,0,100);
	universities = new Policy("Universities",0,0,100000);
	education_programs = new Policy("Education Programs",0,0,100000);
	aid_programs = new Policy("Aid Programs",0,0,100000);
	policies = [reservation,universities,education_programs,aid_programs];

	//results
	totalStudents = 100;
	growth_rate = 0;
	segregation = 0;

	gdp = new Result("GDP",0,-10000,10000);
	graduates = new Result("Graduates",0,0,10000);
	popularity = new Result("Popularity",0,0,100);
	party_approval = new Result("Party Approval",0,0,100);

	results = [gdp,graduates,popularity,party_approval];
}

function initializeStudents(){
	students = [];
	for (var i = 0; i < totalStudents; i++){
		var affirmativeStatus = Math.round(random(1));
		var rad = width/50;
		var enrolled = Math.round(random(1));
		if (enrolled){
			var student = new Student(random(sideBarLeftX+rad,sideBarRightX-rad-uniSize),
								  random(topBarX+rad,bottomBarX-rad),
								  rad, affirmativeStatus, true);		
		}
		else {
			var student = new Student(random(width-sideBarLeftX-uniSize+2*rad,sideBarRightX-rad),
								  random(topBarX+rad,bottomBarX-rad),
								  rad, affirmativeStatus, false);
		}
		students.push(student);
	}
}

function draw(){
	background(0);
	displaySidePanel();
	drawUniversityPanels();
	for(var i = 0; i < totalStudents; i++){
			students[i].display();
 			students[i].move();
	}
	drawDate();
	drawMessage();
}

function update(){
	growth_rate = universities.value;
	segregation;
	gdp.update(gdp.value + growth_rate);
	console.log(gdp.sign);
	party_approval;
	popularity;
	results = [gdp,graduates,popularity,party_approval];	
}

function drawUniversityPanels(){
	fill(200);
	rect(sideBarLeftX,topBarX,sideBarRightX-sideBarLeftX-uniSize,bottomBarX-topBarX);
	fill(100);
	rect(sideBarRightX-uniSize,topBarX,uniSize,bottomBarX-topBarX);
	fill(0);
	text("Enrolled", sideBarLeftX+uniSize/2,topBarX+(bottomBarX-topBarX)*0.5);
	text("Not Enrolled", sideBarLeftX+3*uniSize/2,topBarX+(bottomBarX-topBarX)*0.5);
}

function drawDate(){
  fill(textColor);
  textSize(24);
  textAlign(CENTER);
  noStroke();
  if (frameCount % 100 == 0){
  	update();
  	month ++;
  	if (month > 12) {
  		month = 1;
  		year++;
  	}
  }
  text(months[month-1] + " " + year, width*0.5, height*0.05);
}

function drawMessage(){
	fill(textColor);
  textSize(24);
  textAlign(CENTER);
  noStroke();
  text(bottomMessage, width*0.5, height*0.95+10);	
}

function displaySidePanel(){
	// fill(150);
	noStroke();
	fill(250);
	rect(0,0, sideBarLeftX, height);
	fill(250);
	rect(sideBarRightX,0, width, height);

	// Left sidebar and buttons
	for (var i = 0; i < policies.length; i++){
		var yVal = buttons[2*i].y+16;
		buttons[2*i].display();
		buttons[2*i+1].display();
		fill(0);
		textSize(10);
		if (i == 0) text(policies[i].value + "%", sideBarLeftX*0.5, yVal);
		else text(policies[i].value, sideBarLeftX*0.5, yVal);
		textSize(11);
		text(policies[i].name, sideBarLeftX*0.5, yVal-20);
	}

	// Right sidebar for results
	for (var i = 0; i < results.length; i++){
		fill(0);
		textSize(20);
		var yVal = (height/5)*(i+1);
		if (i < 2) text(results[i].value, sideBarRightX+0.5*sideBarLeftX, yVal);
		else text(results[i].value + "%", sideBarRightX+0.5*sideBarLeftX, yVal);
		textSize(11);
		text(results[i].name, sideBarRightX+0.5*sideBarLeftX, yVal-20);
		
		// Status triangles
		if (results[i].sign > 0){
			// green triangle
			fill(0,175,0);
			triangle(sideBarRightX+0.5*sideBarLeftX-10, yVal+20,
						 sideBarRightX+0.5*sideBarLeftX+10, yVal+20,
						 sideBarRightX+0.5*sideBarLeftX, yVal+5);
		}
		else if (results[i].sign < 0){
			// red triangle
			fill(175,0,0);
			triangle(sideBarRightX+0.5*sideBarLeftX-10, yVal+5,
						 sideBarRightX+0.5*sideBarLeftX+10, yVal+5,
						 sideBarRightX+0.5*sideBarLeftX, yVal+20);
		}
	}
	createProfile();
	createRestartButton();
}

function createProfile(){
	// Your profile
	push();
	fill(100,0,0);
	noFill();
	fill(200);
	rect(5,5,sideBarLeftX-10,youSize-30,5,5);
	pop();
	fill(0);
	image(profile,profile.x,profile.y);
	textSize(20);
	text("YOU", sideBarLeftX/2, 10+profile.height+20);
}

function createRestartButton(){
	push();
	fill(100,0,0);
	noFill();
	fill(200);
	rect(5,bottomBarX+5,sideBarLeftX-10,(height-bottomBarX-10),5,5);
	pop();
	fill(0);
	textSize(20);
	text("RESTART", sideBarLeftX/2, bottomBarX+5+(height-bottomBarX)/2);	
}

// function windowResized() {
//   canvas.size(windowWidth, windowHeight);
// }

function mouseReleased(){
	for (var i = 0; i < buttons.length; i++){
		if (buttons[i].clicked(mouseX,mouseY)) {
			buttons[i].action();
			return;
		}
	}
	if (mouseX < sideBarLeftX-5 && mouseX > 5 && mouseY < youSize-30 && mouseY > 5){
		profile.filter(INVERT);
		bottomMessage = "your popularity is very low";
		return;
	}
	if (mouseX < sideBarLeftX-5 && mouseX > 5 && mouseY > bottomBarX+5 && mouseY < height-5){
		bottomMessage = "here is some text to help you";
		return;
	}
	var index = int(random(100));
	if (!students[index].enrolled) students[index].enroll();
	else students[index].dropOut();
}

/* Articles 
 * http://www.thehindu.com/news/national/Reservation-in-higher-education-works-as-intended-Study/article14391741.ece
 * http://www.epw.in/reservations-higher-education
 */