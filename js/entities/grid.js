var Grid = ring.create([ Entity ], {
	
	constructor: function()
	{
		this.$super();
		
		this.tileSize = new Point(36, 36);
	
		this.tilesWide = 20;
		this.tilesTall = 16;
		
		this.clickable = true;
	},
	
	onCreated: function()
	{
		this.setSize(this.tileSize.x * this.tilesWide, this.tileSize.y * this.tilesTall);
	
		var renderer = this.state.statemanager.gamemanager.renderer;
	
		var gradient = renderer.context.createRadialGradient(this.getWide() / 2, this.getTall() / 2, 0, this.getWide() / 2, this.getTall() / 2, this.getWide());
		gradient.addColorStop(0, '#8ED6FF');
		gradient.addColorStop(1, '#004CB3');
	
		this.gradient = gradient;
	},
	
	onClicked: function()
	{
		if (this.state.pendingWire)
		{
			//console.log('removing pending wire from', this.state.pendingWire.input.parent.entityName, '(through', this.state.pendingWire.input.entityName, ')');
			this.state.pendingWire.remove();
		}
	},

	onUpdate: function()
	{
		//this.setPosition(this.parent.mouse.x, this.parent.mouse.y);
	},

	onDraw: function(context, delta)
	{
		context.translate(this.getX(), this.getY());
	
		context.beginPath();

		context.rect(0, 0, this.getWide(), this.getTall());
		context.fillStyle = this.gradient;
		context.fill();
		
		/*
		context.beginPath();
	
		for (var x = this.tilesWide + 1; x--;)
		{
			context.moveTo(x * this.tileSize.x, 0);
			context.lineTo(x * this.tileSize.x, this.tilesTall * this.tileSize.y);
		}

		for (var y = this.tilesWide + 1; y--;)
		{
			context.moveTo(0, y * this.tileSize.y);
			context.lineTo(this.tilesWide * this.tileSize.x, y * this.tileSize.y);
		}
		
		context.stroke();
		*/
		
		context.translate(-this.getX(), -this.getY());
	}
	
});