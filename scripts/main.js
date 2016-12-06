var canvas;
var students;
var pause;
var totalStudents;
var buttons;
var sideBarLeftX;
var sideBarRightX;
var topBarX;
var bottomBarX;
var policies = ["Reservation","Universities","Education Programs","Vocation Training"];
var results = ["GDP","Graduates","Popularity","Cutoffs"];
var fillers = [25,0,0,0];
var result_fillers = [10000,10000,0,91];
var reservation;
var universities;
var education_programs;
var vocation_training;

function preload(){}

function setup(){
	canvas = createCanvas(windowWidth-10, windowHeight);
	totalStudents = 100;
	canvas.parent('myContainer');
	pause = false;
	students = [];
	buttons = [];
	sideBarLeftX = 0.1*windowWidth;
	sideBarRightX = 0.9*windowWidth;
	topBarX = 0.1*windowHeight;
	bottomBarX = 0.85*windowHeight;
	for (var i = 0; i < 8; i++){
		var x = i%2 == 0 ? sideBarLeftX/6 : 2*sideBarLeftX/3;
		var y = windowHeight/5 * Math.ceil((i+1)/2);
		var role = policies[Math.floor(i/2)];
		var side = i%2 == 0 ? 1 : -1;
		var button = new Button(i,x,y,role,side);
		buttons.push(button);
	}

	for (var i = 0; i < totalStudents; i++){
		var affirmativeStatus = Math.round(random(1));
		var rad = windowWidth/50;
		var student = new Student(random(sideBarLeftX+rad,sideBarRightX-rad),
								  random(topBarX+rad,bottomBarX-rad),
								  rad, affirmativeStatus);
		students.push(student);
	}
}

function draw(){
	// background(150);
	background(250);
	displaySidePanel();
	if (!pause){
		for(var i = 0; i < totalStudents; i++){
   			students[i].move();
		}
	}
	else {
		for(var i = 0; i < totalStudents; i++){
   			students[i].display();
		}
	}
	drawDate();
	drawMessage();
}

function drawDate(){
  fill(0);
  textSize(24);
  textAlign(CENTER);
  noStroke();
  text('6.12.2016', width*0.5, height*0.05);
}

function drawMessage(){
	fill(0);
  textSize(24);
  textAlign(CENTER);
  noStroke();
  text('Your political popularity is very low!', width*0.5, windowHeight-height*0.05);	
}

function displaySidePanel(){
	fill(150);
	noStroke();
	rect(0,0, sideBarLeftX, windowHeight);
	rect(sideBarRightX,0, windowWidth, windowHeight);
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
	}
}

// function windowResized() {
//   canvas.size(windowWidth, windowHeight);
// }

function mouseReleased(){
	// pause = !pause;
	// for(var i = 0; i < totalStudents; i++){
 	//  	students[i].updateAgitation(-1);
	// }	
	for (var i = 0; i < buttons.length; i++){
		if (buttons[i].clicked(mouseX,mouseY)) {
			buttons[i].action();
			break;
		}
	}
}

/* Articles 
 * http://www.thehindu.com/news/national/Reservation-in-higher-education-works-as-intended-Study/article14391741.ece
 * http://www.epw.in/reservations-higher-education
 */

