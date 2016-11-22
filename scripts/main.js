var students;

function preload(){

}

function setup(){
	var canvas = createCanvas(windowWidth, windowHeight);
	students = [];
	for (var i = 0; i < 100; i++){
		var student = new Student(random(windowWidth),random(windowHeight), random(20));
		students.push(student);
	}
}

function draw(){
	background(100);
	for(var i = 0; i < students.length; i++){
   	students[i].display();
   	students[i].move();
   	students[i].check();
	}
}

window.onresize = function() {
  canvas.size(windowWidth, windowHeight);
};