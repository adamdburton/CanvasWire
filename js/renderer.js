var Renderer = ring.create([ Entity ], {
	
	constructor: function(gamemanager)
	{
		this.$super();
		
		this.gamemanager = gamemanager;
		this.mouse = new Point(0, 0);
	
		this.element = document.createElement('canvas');
	
		this.element.setAttribute('width', this.element.width = this.dimensions.x = window.innerWidth);
		this.element.setAttribute('height', this.element.height = this.dimensions.y = window.innerHeight);
	
		document.body.appendChild(this.element); 
	
		this.context = this.element.getContext('2d');
	
		var t = this;
	
		window.onresize = function()
		{
			t.resized();
		}
	
		window.onfocus = function()
		{
			t.focus();
		}

		window.onblur = function()
		{
			t.blur();
		}
	
		window.onmousemove = function(e)
		{
			t.mouseMove(e.clientX, e.clientY);
		}
	
		window.onmousedown = function(e)
		{
			t.mouseDown();
		}
	
		window.onmouseup = function(e)
		{
			t.mouseUp();
		}
	
		this.width = this.element.width;
		this.height = this.element.height;
	},
	
	focus: function()
	{
		this.gamemanager.start();
	},

	blur: function()
	{
		this.gamemanager.stop();
	},

	resized: function()
	{
		this.element.width = this.dimensions.x = window.innerWidth;
		this.element.height = this.dimensions.y = window.innerHeight;
	
		this.width = this.element.width;
		this.height = this.element.height;
	
		this.gamemanager.eventmanager.trigger('resized');
	},

	mouseMove: function(x, y)
	{
		this.mouse.x = x;
		this.mouse.y = y;
	
		this.gamemanager.eventmanager.trigger('mouseMove');
	},

	mouseDown: function()
	{
		this.gamemanager.eventmanager.trigger('mouseDown');
	},

	mouseUp: function()
	{
		this.gamemanager.eventmanager.trigger('mouseUp');
	}
	
});