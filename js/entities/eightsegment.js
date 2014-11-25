var EightSegment = ring.create([ GridEntity ], {
	
	constructor: function()
	{
		this.$super();
		
		this.clickable = false;
	},
	
	onCreated: function()
	{
		this.$super();
		
		this.addInputs(9);
		
		this.setSize(this.parent.tileSize.x * 6, this.getTall());
	},

	onDraw: function(context, delta)
	{
		context.beginPath();
		
		context.rect(this.getX(), this.getY(), this.getWide(), this.getTall());
		context.fillStyle = '#CCC';
		
		context.fill();
		
		
	}
	
});