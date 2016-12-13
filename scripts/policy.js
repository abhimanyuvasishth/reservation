var Policy = function(name,value,lower,upper,cost){
  this.name = name;
  this.value = value;
  this.lower = lower;
  this.upper = upper;
  this.cost = cost;
  this.buttons = [];
  this.type;
  
  if (this.upper == 100 && this.lower == 0){
  	this.type = "percent";
  }
  else if (this.upper == 0 && this.lower == 0){
  	this.type = "boost";	
  }
  else {
  	this.type = "numeric";
  }

  this.update = function(sign){
    if (this.type == "boost"){
      // Do boost math here
      boost_active = true;
      boost_month = cur_month;
      boost_year = cur_year;
      boost_count++;
      gdp.update(gdp.value-this.cost);
    }
    else if (this.type == "percent" || this.type == "numeric") {
      if (sign > 0 && this.value < this.upper) {
        this.value++;
        gdp.update(gdp.value-this.cost);
      }
      else if (sign < 0 && this.value > this.lower) {
        this.value--;
        gdp.update(gdp.value+this.cost*0.9);
      }
    }
  }

  this.scale = function(){
  	if (this.type == "percent"){
  		return this.value/100;
  	}
  	else if (this.type == "numeric"){
  		return map(this.value,this.lower,this.upper,-1,1);
  	}
  	else return 0;
  }
}