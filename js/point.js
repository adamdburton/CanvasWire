function Point(x, y)
{
	//this.x = Math.round(x);
	//this.y = Math.round(y);
	
	this.x = x;
	this.y = y;
}

Point.distance = function(point1, point2)
{
	var deltaX = Math.abs(point2.x - point1.x);
	var deltaY = Math.abs(point2.y - point1.y);
	
	return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

Point.prototype.setX = function(x)
{
	this.x = x
}

Point.prototype.setY = function(y)
{
	this.y = y;
}

Point.prototype.add = function(point)
{
	this.x += point.x;
	this.y += point.y;
	
	return this;
}

Point.prototype.subtract = function(point)
{
	this.x -= point.x;
	this.y -= point.y;
	
	return this;
}

Point.prototype.multiply = function(multiplier)
{
	this.x *= multiplier;
	this.y *= multiplier;
	
	return this;
}

Point.prototype.divide = function(divisor)
{
	this.x /= divisor;
	this.y /= divisor;
	
	return this;
}

Point.prototype.equals = function(point)
{
	return Math.ceil(this.x, 2) == Math.ceil(point.x, 2) && Math.ceil(this.y, 2) == Math.ceil(point.y, 2);
}

Point.prototype.normalize = function()
{
	var hyp = Math.sqrt(this.x * this.x + this.y * this.y);
	
	this.x /= hyp;
	this.y /= hyp;
	
	return this;
}

Point.prototype.distanceTo = function(point)
{
	return Point.distance(this.x, this.y, point.x, point.y);
}

Point.prototype.clone = function()
{
	return new Point(this.x, this.y);
}