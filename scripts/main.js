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
var partyFill;
var yellow;
var blue;

// Arrays
var buttons = [];
var infoButtons = [];
var students = [];
var policies = [];
var results = [];
var messages = [];

var previous_voters;
var totalStudents;
var bluePercent;
var theoreticalBluePercent = 15;
var framesPerMonth = 100;
var initialBudget = 1000;
var threshold = 0;
var initialReservation = 25;

// Policies
var reservation;
var universities;
var public_incentive_boost;

// Results
var gdp;
var mismatches;
var popularity;
var party_approval;

// Other results
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
	partyFill = random(1) < 0.5 ? blue : yellow;
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
	yellow = color(255,255,0);
	blue = color(50,50,255);

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
	// Creating policy buttons
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
	// Creating result buttons
	for (var i = 0; i < results.length; i++){
		var yVal = (height/5)*(i+1);		
		var x = sideBarRightX+0.5*sideBarLeftX;
		var y = yVal-textResult*2;
		var button = new Button(i,x,y,null,null);
		infoButtons.push(button);
	}
}

function initializeValues(){
	// date
	cur_month = month();
	cur_year = year();

	// policies
	reservation = new Policy("Reservation",initialReservation,0,100,1000);
	universities = new Policy("Universities",700,500,900,1000);
	public_incentive_boost = new Policy("Public Initiatives",0,0,0,1000);
	//remove this
	policies = [reservation,universities,public_incentive_boost];

	//results
	totalStudents = 200;
	growth_rate = 0;

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
		var affirmativeStatus = random(1) < theoreticalBluePercent/100 ? true : false;
		var rand = random(1);
		if (affirmativeStatus) bluePercent++;
		var rad = width/50;
		if (!affirmativeStatus){
			var enrolled = rand < 0.5 ? true : false;
		}
		else {
			var mappedReservation = initialReservation < theoreticalBluePercent ? map(initialReservation,0,theoreticalBluePercent,-0.25,0) : map(initialReservation,theoreticalBluePercent,100,0,0.25);
			var enrolled = rand < 0.5 + mappedReservation ? true : false;	
		}
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
	background(250);
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

	// Graduate
	var ind = int(random(totalStudents));
	while (!students[ind].enrolled){
		ind = int(random(totalStudents));
	}
	students[ind].graduate();

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
		var graduated = shownPerson.graduated ? "graduated. " : "";
		var x = sideBarLeftX+2*(sideBarRightX-sideBarLeftX)/4;
		var newP = shownPerson.isNew() == true ? "new. " : "";
      	var y = bottomBarX+(height-bottomBarX)/2  + textMessage/4;
      	var happiness = Math.round((shownPerson.maxAgitation - shownPerson.agitation)/shownPerson.maxAgitation * 100);
      	push();
      	fill(textColor);
		text(majorityOrNot + mismatched + newP + graduated + happiness + "% happy.",x,y);
		pop();
	}
}

function createNewStudent(index){
	var rad = (index > 1) ? students[0].rad : students[1].rad;
	var affirmative = random(1) < bluePercent/100 ? true : false;
	var rand = random(1);
	if (!affirmative){
		var enrollment = rand < (universities.scale()*25+50)/100 ? true : false;
	}
	else {
		var enrollment = rand < (universities.scale()*25+50)/100 + map(reservation.value,0,100,0,25) ? true : false;
	}
	var student = new Student(sideBarRightX,random(topBarX,bottomBarX), rad, affirmative, enrollment);
	students.splice(index, 0, student);
	students[index].join();
	showLegend = false;
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
		text(results[i].name, sideBarRightX+0.5*sideBarLeftX, yVal-textResult);
		infoButtons[i].display();	
		// Status triangles
		if (results[i].sign > 0){
			// green triangle
			fill(0,175,0);
			triangle(sideBarRightX+0.5*sideBarLeftX-textResultVal, yVal+textResult,
						 sideBarRightX+0.5*sideBarLeftX+textResultVal, yVal+textResult,
						 sideBarRightX+0.5*sideBarLeftX, yVal+textResultVal/2);
		}
		else if (results[i].sign < 0){
			// red triangle
			fill(175,0,0);
			triangle(sideBarRightX+0.5*sideBarLeftX-textResultVal, yVal+textResultVal/2,
						 sideBarRightX+0.5*sideBarLeftX+textResultVal, yVal+textResultVal/2,
						 sideBarRightX+0.5*sideBarLeftX, yVal+textResult);
		}
	}
	createProfile();
	createRestartAndHelpButton();
}

function createProfile(){
	// Your profile
	push();
	fill(100,0,0);
	noFill();
	fill(partyFill);
	rect(textResultVal/2,textResultVal/2,sideBarLeftX-textResultVal,profile.height+1.5*textResult,textResultVal,textResultVal);
	pop();
	fill(0);
	image(profile,profile.x,profile.y);
	textSize(textButtons);
	text("YOU", sideBarLeftX/2, 10+profile.height+20);
}

function createRestartAndHelpButton(){
	push();
	fill(100,0,0);
	noFill();
	fill(200);
	rect(textResultVal/2,bottomBarX+textResultVal/2,sideBarLeftX/2-textResultVal,(height-bottomBarX-10),5,5);
	rect(sideBarLeftX/2+textResultVal/2,bottomBarX+5,sideBarLeftX/2-textResultVal,(height-bottomBarX-10),5,5);
	pop();
	fill(0);
	textSize(textButtons);
	// Replace these with images
	text("R", sideBarLeftX*0.25, bottomBarX+5+(height-bottomBarX)/2);	
	text("H", sideBarLeftX*0.75, bottomBarX+5+(height-bottomBarX)/2);	
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
	// Clicked an infoButton
	for (var i = 0; i < infoButtons.length; i++){
		if (infoButtons[i].clicked(mouseX,mouseY)) {
			infoButtons[i].action();
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
	if (mouseX < sideBarLeftX-textResultVal/2 && mouseX > textResultVal/2 && mouseY > bottomBarX+textResultVal/2 && mouseY < height-textResultVal/2){
		if (mouseX < sideBarLeftX*0.5){
			// Restarted
			bottomMessage = "restarted";
			init();
			showLegend = false;
			return;
		}
		else {
			// Restarted
			bottomMessage = "help 4 u";
			showLegend = false;
			return;	
		}
	}
	for (var i = 0; i < totalStudents; i++){
		if (students[i].clicked(mouseX,mouseY)) {
			students[i].show();
			console.log(students[i].time());
			return;
		}
	}
	showLegend = false;
}

/* Articles 
 * http://www.thehindu.com/news/national/Reservation-in-higher-education-works-as-intended-Study/article14391741.ece
 * http://www.epw.in/reservations-higher-education
 */