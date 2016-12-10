var Result = function(name,value,lower,upper){
  this.name = name;
  this.value = value;
  this.lower = lower;
  this.upper = upper;
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

  this.grow = function(new_value){
  	this.compare(new_value,this.value);
  	this.value = new_value;
  }
}