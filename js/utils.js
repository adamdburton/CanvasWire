window.requestAnimFrame = (function()
{
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback, element)
		{
			return window.setTimeout(callback, 1000 / 60);
		}
})();

function random(min, max)
{
	if (max <= 1)
	{
		return (Math.random() * max) + min;
	}
	
	return Math.floor(Math.random() * max) + min;
}

function rgbToHex(r, g, b)
{
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function clamp(num, min, max)
{
	return num < min ? min : (num > max ? max : num);
}

function numberToLetter(i)
{
	return String.fromCharCode(96 + i);
}