var Entity = ring.create({
	
    constructor: function()
	{
		this.parent = null;
		this.state = null;
	
		this.position = new Point(0, 0);
		this.dimensions = new Point(0, 0);
	
		this.speed = 0;
	
		this.renderedManually = false;
		this.zIndex = 0;
	
		this.clickable = false;
		this.draggable = false;
    },
	
	remove: function()
	{
		this.state.removeEntity(this);
	},
	
	getRenderer: function()
	{
		return this.state.statemanager.gamemanager.renderer;
	},

	isInParentBounds: function()
	{
		if (!this.parent) { return true; }
	
		var position = this.position;
		var parentPosition = this.parent.position;
		var parentDimensions = this.parent.dimensions;
	
		return position.x >= parentPosition.x && position.x <= parentPosition.x + parentDimensions.x && position.y >= parentPosition.y && position.y <= parentPosition.y + parentDimensions.y;
	},

	isUnderPoint: function(point)
	{
		var x = point.x;
		var y = point.y;
		
		var posX = this.getX();
		var posY = this.getY();
	
		var dimX = this.getWide();
		var dimY = this.getTall();
		
		return x >= posX && x <= posX + dimX && y >= posY && y <= posY + dimY;
	},

	getPosition: function(t)
	{
		var object = this, parent = null, x = object.position.x, y = object.position.y;
		
		while (parent = object.parent)
		{
			x += parent.position.x;
			y += parent.position.y;
			
			object = parent;
		}
		
		return new Point(x, y);
	},

	setPosition: function(x, y)
	{
		this.position.x = x;
		this.position.y = y;
	
		return this;
	},

	getLocalPosition: function()
	{
		return this.position.clone();
	},

	moveTowards: function(point, speed)
	{
		if (this.getPosition().distance(point) < 2)
		{
			return false;
		}
	
		var direction = point.subtract(this.getPosition());
	
		var norm = direction.normalize().multiply(speed);
	
		this.position.x += norm.x;
		this.position.y += norm.y;
	
		return true;
	},

	setSize: function(width, height)
	{
		this.dimensions.x = width;
		this.dimensions.y = height;
		this.resize();
	
		return this;
	},

	getSize: function()
	{
		return this.dimensions;
	},

	getWide: function()
	{
		return this.dimensions.x;
	},

	getTall: function()
	{
		return this.dimensions.y;
	},

	// Utils

	setX: function(x)
	{
		this.position.x = x;
	
		return this;
	},

	setY: function(y)
	{
		this.position.y = y;
	
		return this;
	},

	getX: function(t)
	{
		return this.getPosition().x;
	},

	getY: function()
	{
		return this.getPosition().y;
	},

	setWidth: function(width)
	{
		this.dimensions.x = width;
	
		return this;
	},

	setHeight: function(height)
	{
		this.dimensions.y = height;
	
		return this;
	},

	getWidth: function()
	{
		return this.dimensions.x;
	},

	getHeight: function()
	{
		return this.dimensions.y;
	},

	//

	getMouseOffset: function()
	{
		var mouse = this.state.statemanager.gamemanager.renderer.mouse;
	
		return new Point(mouse.x - this.getX(), mouse.Y - this.getY());
	},

	getCenter: function()
	{
		return new Point(this.getX() + (this.dimensions.x / 2), this.getY() + (this.dimensions.y / 2));
	},

	getLocalCenter: function()
	{
		return new Point(this.dimensions.x / 2, this.dimensions.y / 2);
	},

	center: function()
	{
		this.centerX();
		this.centerY();
	},

	centerX: function()
	{
		var center = this.getLocalCenter();
		var parentCenter = this.parent.getLocalCenter();
	
		this.position.x = parentCenter.x - center.x;
	},

	centerY: function()
	{
		var center = this.getLocalCenter();
		var parentCenter = this.parent.getLocalCenter();
	
		this.position.y = parentCenter.y - center.y;
	},

	is: function(object)
	{
		return this.entityIndex == object.entityIndex;
	},

	// Internals

	update: function()
	{
		this.onUpdate();
	},

	draw: function(context)
	{
		if (this.renderedManually) { return; }
	
		this.onDraw(context);
	},

	resize: function()
	{
		this.onResize();
	},

	resized: function()
	{
		this.onResized();
	},

	// To override

	onCreated: function()
	{
	
	},
	
	onRemoved: function()
	{
		//console.log('Removed Entity', this.entityName);
		//console.trace();
	},

	onUpdate: function()
	{
	
	},

	onDraw: function(context, delta)
	{
	
	},

	onResize: function() // When the objects dimensions are changed
	{
	
	},

	onResized: function() // When the renderers dimensions are changed
	{
	
	},

	onMouseUp: function() // When the mouse is released after a click, onClicked is also called
	{
		//console.log('onMouseUp:', this);
	},

	onMouseDown: function() // When the mouse is released after a click, onClicked is also called
	{
		//console.log('onMouseDown:', this);
	},

	onDragStart: function() // When the object is dragged
	{
		//console.log('onDragStart:', this);
	},

	onDragStop: function() // When the object is dropped after dragging
	{
		//console.log('onDragStop:', this);
	},

	onClicked: function()
	{
		//console.log('onClicked:', this);
	}
	
});