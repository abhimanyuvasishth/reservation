var Policy = function(name,value,lower,upper){
  this.name = name;
  this.value = value;
  this.lower = lower;
  this.upper = upper;

  this.update = function(sign){
    if (sign > 0 && this.value < this.upper) this.value++;
    else if (sign < 0 && this.value > this.lower) this.value--;
  }
}