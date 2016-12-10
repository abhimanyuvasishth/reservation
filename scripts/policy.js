var Policy = function(name,value,lower,upper,cost){
  this.name = name;
  this.value = value;
  this.lower = lower;
  this.upper = upper;
  this.cost = cost;
  this.percent = (this.upper == 100 && this.lower == 0) ? true : false;

  this.update = function(sign){
    if (sign > 0 && this.value < this.upper) {
    	this.value++;
    	gdp.grow(gdp.value-this.cost);
   	}
    else if (sign < 0 && this.value > this.lower) {
    	this.value--;
    }
  }

  this.scale = function(){
  	if (this.percent){
  		return this.value/100;
  	}
  	else {
  		return 1;
  		// if (gdp < initialBudget) return (this.value*this.cost)/initialBudget;
  		// else return (this.value*this.cost)/gdp.value;
  	}
  }
}