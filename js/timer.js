function Timer()
{
	this.currentTime = (new Date).getTime();
	this.lastTime = (new Date).getTime();
	
	this.deltaTime = 0;
}

Timer.prototype.reset = function()
{
	this.currentTime = (new Date).getTime();
	this.lastTime = (new Date).getTime();
	
	this.deltaTime = 0;
}

Timer.prototype.update = function()
{
	this.currentTime = (new Date).getTime();
	this.deltaTime = (this.currentTime - this.lastTime) / 1000;
	
	this.lastTime = this.currentTime;
}