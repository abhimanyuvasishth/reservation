var canvas;

// Layout
var font;
var sideBarLeftX;
var sideBarRightX;
var topBarX;
var bottomBarX;
var uniSize;
var youSize;

// Text information & colors
var textMessage;
var textResultVal;
var textResult;
var textButtons;
var textColor;
var bottomMessage = "";
var showLegend = false;
var shownPerson;

// Arrays
var buttons = [];
var students = [];
var policies = [];
var results = [];

var previous_voters;
var totalStudents;
var bluePercent;
var framesPerMonth = 100;
var initialBudget = 1000;
var threshold = 2000;

// Policies
var reservation;
var universities;
var education_programs;
var aid_programs;

// Results
var gdp;
var mismatches;
var popularity;
var party_approval;

// Other results
var segregation;
var growth_rate;
var graduates;

// Images
var profile;

// Date
var cur_month;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"];
var cur_year;

function preload(){
	profile = loadImage('img/profile_50.png');
}

function setup(){
	canvas = createCanvas(windowWidth-20, windowHeight-20);
	canvas.parent('myContainer');
	bottomMessage;
	init();
}

function init(){
	initializeFrame();
	initializeValues();
	initializeStudents();
	initializeButtons();
	update();
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

	// Text
	textMessage = width/40;
	textResultVal = textMessage/3;
	textResult = textResultVal*2;
	textButtons = textResult;
	textColor = 125;
	textCost = 0.8*textResultVal;
	// font = loadFont('font-awesome/fonts/FontAwesome.otf');
	// textFont(font);
}

function initializeButtons(){
	buttons = [];
	// Creating buttons
	for (var i = 0; i < policies.length; i++){
		var y = youSize/2 + (bottomBarX-topBarX)/(policies.length+1) * (i+1);	
		var policy = policies[i];
		if (policies[i].type == "numeric" || policies[i].type == "percent"){
			var x_left = sideBarLeftX/6; 
			var x_right = 2*sideBarLeftX/3;			
			var button_left = new Button(2*i,x_left,y,policy,-1);
			var button_right = new Button(2*i+1,x_right,y,policy,1);
			buttons.push(button_left);
			buttons.push(button_right);
			policy.buttons.push(button_left);
			policy.buttons.push(button_right);
		}
		else {
			var x = sideBarLeftX*0.5;	
			var button = new Button(i,x,y,policy,0);
			buttons.push(button);	
			policy.buttons.push(button);
		}
	}
}

function initializeValues(){
	// date
	cur_month = month();
	cur_year = year();

	// policies
	reservation = new Policy("Reservation",25,0,100,1000);
	universities = new Policy("Universities",700,500,900,1000);
	education_programs = new Policy("Public Initiatives",0,0,0,1000);
	//remove this
	policies = [reservation,universities,education_programs];

	//results
	totalStudents = 200;
	growth_rate = 0;
	segregation = 0;

	gdp = new Result("GDP",initialBudget,-9000000,9000000);
	mismatches = new  Result("Mismatches",0,0,100);
	popularity = new Result("Popularity",0,0,100);
	party_approval = new Result("Party Approval",0,0,100);

	results = [gdp,mismatches,popularity,party_approval];
}

function initializeStudents(){
	students = [];
	bluePercent = 0;
	for (var i = 0; i < totalStudents; i++){
		var affirmativeStatus = random(1) < 0.15 ? true : false;
		if (affirmativeStatus) bluePercent++;
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
	bluePercent = bluePercent * 100/totalStudents;
}

function draw(){
	background(0);
	displaySidePanel();
	drawUniversityPanels();
	for(var i = 0; i < totalStudents; i++){
			students[i].display(0);
 			students[i].move();
 			students[i].update();
	}
	drawDate();
	drawMessage();
}

function update(){
	growth_rate = universities.value;
	segregation;
	gdp.update(gdp.value + growth_rate);
	party_approval;
	var sum = 0;
	for(var i = 0; i < totalStudents; i++){
			students[i].update();
 			sum += students[i].satisfaction * 1/students[i].maxAgitation;
	}
	popularity.update((sum/totalStudents)*100);
	results = [gdp,mismatches,popularity,party_approval];	
}

function drawUniversityPanels(){
	fill(200);
	rect(sideBarLeftX,topBarX,sideBarRightX-sideBarLeftX-uniSize,bottomBarX-topBarX);
	fill(100);
	rect(sideBarRightX-uniSize,topBarX,uniSize,bottomBarX-topBarX);
	fill(0);
	textSize(textMessage);
	text("Enrolled", sideBarLeftX+uniSize/2,topBarX+(bottomBarX-topBarX)*0.5);
	text("Not Enrolled", sideBarLeftX+3*uniSize/2,topBarX+(bottomBarX-topBarX)*0.5);
	if (showLegend){
		shownPerson.display(1);
		var majorityOrNot = shownPerson.affirmative == true ? "minority. " : "majority. ";
		var mismatched = shownPerson.mismatched ? "mismatched. " : "";
		var x = sideBarLeftX+2*(sideBarRightX-sideBarLeftX)/4;
      	var y = bottomBarX+(height-bottomBarX)/2  + textMessage/4;
      	var happiness = Math.round((shownPerson.maxAgitation - shownPerson.agitation)/shownPerson.maxAgitation * 100);
      	push();
      	fill(textColor);
		text(majorityOrNot + mismatched + happiness + "% happy.",x,y);
		pop();
	}
}

function drawDate(){
  fill(textColor);
  textSize(textMessage);
  textAlign(CENTER);
  noStroke();
  if (frameCount % framesPerMonth == 0){
  	update();
  	cur_month ++;
  	if (cur_month > 12) {
  		cur_month = 1;
  		cur_year++;
  	}
  }
  text(months[cur_month-1] + " " + cur_year, width*0.5, height*0.05);
}

function drawMessage(){
	fill(textColor);
  textSize(textMessage);
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
		var yVal = policies[i].buttons[0].y+16;
		for (var j = 0; j < policies[i].buttons.length; j++){
			policies[i].buttons[j].display();
		}
		
		fill(0);
		textSize(textResultVal);
		if (policies[i].type == "percent") text(policies[i].value + "%", sideBarLeftX*0.5, yVal);
		else if (policies[i].type == "numeric") text(policies[i].value, sideBarLeftX*0.5, yVal);
		textSize(textResultVal);
		text(policies[i].name, sideBarLeftX*0.5, yVal-textResult);
		textSize(textCost);
		fill(100,0,0);
		text("Cost: " + policies[i].cost, sideBarLeftX*0.5, yVal+textResult);
	}

	// Right sidebar for results
	for (var i = 0; i < results.length; i++){
		fill(0);
		textSize(textResult);
		var yVal = (height/5)*(i+1);
		if (i < 1) text(results[i].value, sideBarRightX+0.5*sideBarLeftX, yVal);
		else text(Math.round(results[i].value) + "%", sideBarRightX+0.5*sideBarLeftX, yVal);
		textSize(textResultVal);
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
	textSize(textButtons);
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
	textSize(textButtons);
	text("RESTART", sideBarLeftX/2, bottomBarX+5+(height-bottomBarX)/2);	
}

// function windowResized() {
//   canvas.size(windowWidth, windowHeight);
// }

function mouseReleased(){
	// Clicked a button
	for (var i = 0; i < buttons.length; i++){
		if (buttons[i].clicked(mouseX,mouseY)) {
			buttons[i].action();
			showLegend = false;
			return;
		}
	}
	// Clicked on you
	if (mouseX < sideBarLeftX-5 && mouseX > 5 && mouseY < youSize-30 && mouseY > 5){
		profile.filter(INVERT);
		bottomMessage = "your popularity is very low";
		showLegend = false;
		return;
	}
	// Clicked restart
	if (mouseX < sideBarLeftX-5 && mouseX > 5 && mouseY > bottomBarX+5 && mouseY < height-5){
		bottomMessage = "here is some text to help you";
		init();
		showLegend = false;
		return;
	}
	for (var i = 0; i < totalStudents; i++){
		if (students[i].clicked(mouseX,mouseY)) {
			students[i].show();
			return;
		}
	}
	showLegend = false;
}

/* Articles 
 * http://www.thehindu.com/news/national/Reservation-in-higher-education-works-as-intended-Study/article14391741.ece
 * http://www.epw.in/reservations-higher-education
 */