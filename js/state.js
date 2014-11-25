var State = ring.create([ Entity ], {
	
	constructor: function(statemanager, name)
	{
		this.$super();
		
		this.statemanager = statemanager;
		this.name = name;
	
		this.children = [];
	
		this.mouseDown = false;
		this.mouseDownPosX = 0;
		this.mouseDownPosY = 0;
		this.mouseDownOffsetX = 0;
		this.mouseDownOffsetY = 0;
		this.mouseDragging = false;
		this.mouseDraggingObject = null;
	},
	
	createEntity: function(type, parent)
	{
		if (!parent)
		{
			parent = this.statemanager.gamemanager.renderer;
		}
	
		var object = this.statemanager.gamemanager.createEntity(type, parent, this);
	
		this.children.push(object);
		this.sortChildrenByZIndex();
	
		return object;
	},
	
	removeEntity: function(entity)
	{
		for (var i = this.children.length; i--;)
		{
			if (this.children[i].entityIndex == entity.entityIndex)
			{
				this.children[i].onRemoved();
				this.children.splice(i, 1);
			}
		}
	},
	
	getChildrenByType: function(entityType)
	{
		var children = [];
		
		for (var i = this.children.length; i--;)
		{
			if (this.children[i].entityType == entityType)
			{
				children.push(this.children[i]);
			}
		}
		
		return children;
	},

	sortChildrenByZIndex: function()
	{
		this.children.sort(function(a, b) { return b.zIndex - a.zIndex; } );
	},

	onUpdate: function()
	{
		for (var i = this.children.length; i--;)
		{
			this.children[i].update();
		}
	},

	onDraw: function(context, delta)
	{
		var renderer = this.statemanager.gamemanager.renderer;
	
		// Remove everything
		context.clearRect(0, 0, renderer.width, renderer.height);
	
		for (var i = this.children.length; i--;)
		{
			this.children[i].draw(context, delta);
		}
	},

	onMouseDown: function()
	{
		var renderer = this.statemanager.gamemanager.renderer;
	
		this.mouseDown = true;
	
		var found = false;
	
		for (var i = this.children.length; i--;)
		{
			if (!found)
			{
				if (this.children[i].draggable && this.children[i].isUnderPoint(renderer.mouse))
				{
					this.mouseDraggingObject = this.children[i];
					found = true;
				}
			}
		}
	
		if (this.mouseDraggingObject)
		{
			this.mouseDownPosX = renderer.mouse.x;
			this.mouseDownPosY = renderer.mouse.y;
		
			this.mouseDownOffsetX = this.mouseDownPosX - this.mouseDraggingObject.getX();
			this.mouseDownOffsetY = this.mouseDownPosY - this.mouseDraggingObject.getY();
		}
	},

	onMouseUp: function()
	{
		var renderer = this.statemanager.gamemanager.renderer;
	
		if (this.mouseDragging && this.mouseDraggingObject)
		{
			this.mouseDraggingObject.onDragStop();
		
			this.mouseDown = false;
			this.mouseDownPosX = 0;
			this.mouseDownPosY = 0;
			this.mouseDownOffsetX = 0;
			this.mouseDownOffsetY = 0;
			this.mouseDragging = false;
			this.mouseDraggingObject = null;
		
			return;
		}
	
		this.mouseDown = false;
		this.mouseDownPosX = 0;
		this.mouseDownPosY = 0;
		this.mouseDownOffsetX = 0;
		this.mouseDownOffsetY = 0;
		this.mouseDragging = false;
		this.mouseDraggingObject = null;
	
		for (var i = 0; i <= this.children.length; i++)
		{
			if (this.children[i].clickable && this.children[i].isUnderPoint(renderer.mouse))
			{
				this.children[i].onMouseUp();
				this.children[i].onClicked();
			
				return;
			}
		}
	},

	onMouseMove: function()
	{
		var renderer = this.statemanager.gamemanager.renderer;
	
		if (this.mouseDown && !this.mouseDragging && this.mouseDraggingObject)
		{
			if (Math.abs(renderer.mouse.x - this.mouseDownPosX) >= 2 || Math.abs(renderer.mouse.y - this.mouseDownPosY) >= 2)
			{
				this.mouseDragging = true;
			
				this.mouseDraggingObject.onDragStart();
			}
		}
	
		if (this.mouseDragging && this.mouseDraggingObject)
		{
			this.mouseDraggingObject.setPosition(renderer.mouse.x - this.mouseDraggingObject.parent.getX() - this.mouseDownOffsetX, renderer.mouse.y - this.mouseDraggingObject.parent.getY() - this.mouseDownOffsetY);
		}
	}
	
});
