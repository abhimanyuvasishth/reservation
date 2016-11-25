var canvas;
var students;
var pause;

function preload(){}

function setup(){
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('myContainer');
	pause = false;
	students = [];
	for (var i = 0; i < 100; i++){
		var affirmative = Math.round(random(1));
		var rad = windowWidth/50;
		var student = new Student(random(rad,windowWidth-rad),random(rad,windowHeight-rad), rad, affirmative);
		students.push(student);
	}
}

function draw(){
	background(150);
	if (!pause){
		for(var i = 0; i < students.length; i++){
   		students[i].move();
		}
	}
}

function windowResized() {
  canvas.size(windowWidth, windowHeight);
}