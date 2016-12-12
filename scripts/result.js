var Result = function(name,value,lower,upper,message){
  this.name = name;
  this.value = value;
  this.lower = lower;
  this.upper = upper;
  this.message = message;
  this.sign = 0;

  this.check = function(number){
    if (number > 0 && this.value < this.upper-number) this.value += number;
    else if (number < 0 && this.value > this.lower+number) this.value -= number;  
  }

  this.compare = function(first_val,second_val){
  	if (first_val > second_val) this.sign = 1;
  	else if (first_val == second_val) this.sign = 0;
  	else this.sign = -1;
  }

  this.update = function(new_value){
  	this.compare(new_value,this.value);
  	this.value = new_value;
  }

  this.displayInfo = function(){
     bottomMessage = this.message;
  }
}