var canvas;
var students;
var totalStudents;
var buttons;
var sideBarLeftX;
var sideBarRightX;
var topBarX;
var bottomBarX;
var policies = ["Reservation","Universities","Education Programs","Aid Programs"];
var results = ["GDP","Graduates","Popularity","Party Approval"];
var fillers = [25,0,0,0];
var upper_limits = [100,100,10,10];
var lower_limits = [0,0,0,0];
var result_fillers = [10000,10000,0,91];
var reservation;
var universities;
var education_programs;
var vocation_training;
var textColor = 125;
var uniSize;
var profile;
var uni;
var youSize;
var topMessage = "a message for you";
var bottomMessage = " ";

var month;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"];
var year;

function preload(){
	profile = loadImage('img/profile_50.png');
	uni = loadImage('img/graduate.png');
}

function setup(){
	canvas = createCanvas(windowWidth-20, windowHeight-20);
	month = month();
	year = year();
	totalStudents = 100;
	sideBarLeftX = 0.1*width;
	sideBarRightX = 0.9*width;
	profile.x = sideBarLeftX/2-25;
	profile.y = 10;
	canvas.parent('myContainer');
	students = [];
	buttons = [];
	uniSize = (sideBarRightX-sideBarLeftX)*0.5;
	topBarX = 0.08*height;
	bottomBarX = 0.9*height;
	youSize = height*0.2;
	console.log(height);
	for (var i = 0; i < policies.length*2; i++){
		var x = i%2 == 0 ? sideBarLeftX/6 : 2*sideBarLeftX/3;
		var y = youSize/2 + (bottomBarX-topBarX)/(policies.length+1) * (Math.floor(i/2)+1);
		var role = policies[Math.floor(i/2)];
		var side = i%2 == 0 ? -1 : 1;
		var button = new Button(i,x,y,role,side);
		buttons.push(button);
	}

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
 			// students[i].move();
	}
	drawDate();
	drawMessage();
}

function drawUniversityPanels(){
	fill(200);
	rect(sideBarLeftX,topBarX,sideBarRightX-sideBarLeftX-uniSize,bottomBarX-topBarX);
	fill(100);
	rect(sideBarRightX-uniSize,topBarX,uniSize,bottomBarX-topBarX);
	// image(uni,sideBarLeftX+uniSize/2-uni.width/2,topBarX);
	image(uni,sideBarLeftX+uniSize/2-uni.width/2,bottomBarX-uni.height);
}

function drawDate(){
  fill(textColor);
  textSize(24);
  textAlign(CENTER);
  noStroke();
  if (frameCount % 100 == 0){
  	month ++;
  	if (month > 12) {
  		month = 1;
  		year++;
  	}
  }
  text(months[month-1] + " " + year, width*0.25, height*0.05);
}

function drawMessage(){
	fill(textColor);
  textSize(24);
  textAlign(CENTER);
  noStroke();
  text(topMessage, width*0.6, height*0.05);	
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
		if (i == 0) text(fillers[i] + "%", sideBarLeftX*0.5, yVal);
		else text(fillers[i], sideBarLeftX*0.5, yVal);
		textSize(11);
		text(policies[i], sideBarLeftX*0.5, yVal-20);
	}

	// Right sidebar for results
	for (var i = 0; i < results.length; i++){
		fill(0);
		textSize(20);
		// var yVal = buttons[i*2].y+16;
		var yVal = (height/5)*(i+1);
		if (i < 2) text(result_fillers[i], sideBarRightX+0.5*sideBarLeftX, yVal);
		else text(result_fillers[i] + "%", sideBarRightX+0.5*sideBarLeftX, yVal);
		textSize(11);
		text(results[i], sideBarRightX+0.5*sideBarLeftX, yVal-20);
		
		// Status triangles
		if (i%2 < 0.5){
			fill(0,175,0);
			triangle(sideBarRightX+0.5*sideBarLeftX-10, yVal+20,
						 sideBarRightX+0.5*sideBarLeftX+10, yVal+20,
						 sideBarRightX+0.5*sideBarLeftX, yVal+5);
		}
		else {
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
		topMessage = "your popularity is very low";
		return;
	}
	if (mouseX < sideBarLeftX-5 && mouseX > 5 && mouseY > bottomBarX+5 && mouseY < height-5){
		bottomMessage = "here is some text to help you";
		return;
	}
}

/* Articles 
 * http://www.thehindu.com/news/national/Reservation-in-higher-education-works-as-intended-Study/article14391741.ece
 * http://www.epw.in/reservations-higher-education
 */