var canvas;
var students;
var pause;
var totalStudents;
var buttons;
var sideBarX;

function preload(){}

function setup(){
	canvas = createCanvas(windowWidth, windowHeight);
	totalStudents = 100;
	canvas.parent('myContainer');
	pause = false;
	students = [];
	buttons = [];
	sideBarX = 0.2*windowWidth
	for (var i = 0; i < 10; i++){
		var x = i%2 == 0 ? sideBarX/6 : 2*sideBarX/3;
		var y = 20 + windowHeight * Math.floor(i/2)/10;
		var role = "something";
		var side = i%2 == 0 ? 1 : -1;
		var button = new Button(i,x,y,role,side);
		buttons.push(button);
	}

	for (var i = 0; i < totalStudents; i++){
		var affirmativeStatus = Math.round(random(1));
		var rad = windowWidth/50;
		var student = new Student(random(sideBarX+rad,windowWidth-rad),
															random(rad,windowHeight-rad),
															rad, affirmativeStatus);
		students.push(student);
	}
}

function draw(){
	background(150);
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
}

function displaySidePanel(){
	fill(100);
	noStroke();
	rect(0,0, sideBarX, windowHeight);
	for (var i = 0; i < buttons.length; i++){
		buttons[i].display();
	}
}

function windowResized() {
  canvas.size(windowWidth, windowHeight);
}

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