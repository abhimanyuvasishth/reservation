var canvas;
var students;
var totalStudents;
var buttons;
var sideBarLeftX;
var sideBarRightX;
var topBarX;
var bottomBarX;
var policies = ["Reservation","Universities","Education Programs","Aid Programs"];
var results = ["GDP","Graduates","Popularity","Cutoffs"];
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

function preload(){
	profile = loadImage('img/profile_50.png');
	uni = loadImage('img/graduate.png');
}

function setup(){
	canvas = createCanvas(windowWidth-20, windowHeight-20);
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

	for (var i = 0; i < 8; i++){
		var x = i%2 == 0 ? sideBarLeftX/6 : 2*sideBarLeftX/3;
		var y = 50+height/5 * Math.ceil((i+1)/2);
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
  text('6.12.2016', width*0.25, height*0.05);
}

function drawMessage(){
	fill(textColor);
  textSize(24);
  textAlign(CENTER);
  noStroke();
  text('Your political popularity is very low!', width*0.6, height*0.05);	
}

function displaySidePanel(){
	// fill(150);
	noStroke();
	fill(250);
	rect(0,0, sideBarLeftX, height);
	fill(250);
	rect(sideBarRightX,0, width, height);
	for (var i = 0; i < buttons.length; i++){
		buttons[i].display();
		fill(0);
		textSize(10);
		if (i%2 == 0 && i == 0) text(fillers[Math.floor(i/2)] + "%", sideBarLeftX*0.5, buttons[i].y+16);
		if (i%2 == 0 && i != 0) text(fillers[Math.floor(i/2)], sideBarLeftX*0.5, buttons[i].y+16);
		textSize(11);
		if (i%2 == 0) text(policies[Math.floor(i/2)], sideBarLeftX*0.5, buttons[i].y-5);
	}
	for (var i = 0; i < results.length; i++){
		fill(0);
		textSize(20);
		if (i < 2) text(result_fillers[i], sideBarRightX+0.5*sideBarLeftX, buttons[i*2].y+16);
		else text(result_fillers[i] + "%", sideBarRightX+0.5*sideBarLeftX, buttons[i*2].y+16);
		textSize(11);
		text(results[i], sideBarRightX+0.5*sideBarLeftX, buttons[i*2].y-5);
		
		if (i%2 < 0.5){
			fill(0,175,0);
			triangle(sideBarRightX+0.5*sideBarLeftX-10, buttons[i*2].y+35,
						 sideBarRightX+0.5*sideBarLeftX+10, buttons[i*2].y+35,
						 sideBarRightX+0.5*sideBarLeftX, buttons[i*2].y+20);
		}
		else {
			fill(175,0,0);
			triangle(sideBarRightX+0.5*sideBarLeftX-10, buttons[i*2].y+20,
						 sideBarRightX+0.5*sideBarLeftX+10, buttons[i*2].y+20,
						 sideBarRightX+0.5*sideBarLeftX, buttons[i*2].y+35);
		}
	}
	push();
	fill(100,0,0);
	noFill();
	fill(200);
	rect(5,5,sideBarLeftX-10,90,5,5);
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
	if (mouseX < sideBarLeftX-5 && mouseX > 5 && mouseY < 95 && mouseY > 5){
		profile.filter(INVERT);
		return;
	}
}

function drawReservationBar(){
	// color(50,50,255),color(255,255,0);
	var barWidth = 150;
	var barHeight = 20;
	var barX = width*0.25;
	var barY = 20;

	fill(255,255,0);
	rect(fillers[0]/100*barWidth+barX,barY,(100-fillers[0])/100*barWidth,barHeight,0,10,10,0);

	fill(50,50,255);
	rect(barX,barY,fillers[0]/100*barWidth,barHeight,10,0,0,10);
}

/* Articles 
 * http://www.thehindu.com/news/national/Reservation-in-higher-education-works-as-intended-Study/article14391741.ece
 * http://www.epw.in/reservations-higher-education
 */