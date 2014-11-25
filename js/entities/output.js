var Output = ring.create([ Entity ], {
	
	constructor: function()
	{
		this.$super();
		
		this.triggered = false;
		this.clickable = true;
	},
	
	setTriggered: function(bool)
	{
		this.triggered = bool;
	},
	
	toggleTriggered: function()
	{
		this.triggered = !this.triggered;
	},
	
	onDraw: function(context)
	{
		context.beginPath();
		context.arc(this.getX() + this.getWide() / 2, this.getY() + this.getTall() / 2, this.getWide() / 2, Math.PI * 0.5, Math.PI * 1.5, true);
		context.fillStyle = this.triggered ? '#74C93B' : '#C93B3B';
		context.fill();
	},
	
	onClicked: function()
	{
		if (!this.state.pendingWire)
		{
			return;
		}
		
		this.wire = this.state.pendingWire;
		
		this.state.pendingWire.output = this;
		this.state.pendingWire = null;
	}
	
});