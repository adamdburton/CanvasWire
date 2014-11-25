var Button = ring.create([ GridEntity ], {
	
	onCreated: function()
	{
		this.$super();
		
		this.addOutput(1);
	},
	
	onClicked: function()
	{
		this.getOutput(1).toggleTriggered();
	},
	
	onDraw: function(context, delta)
	{
		context.beginPath();
	
		context.rect(this.getX(), this.getY(), this.getWide(), this.getTall());
		context.fillStyle = '#CCC';
		
		context.fill();
		
		context.beginPath();
		
		context.rect(this.getX() + 10, this.getY() + 10, this.getWide() - 20, this.getTall() - 20);
		context.fillStyle = '#EEE';
		
		context.fill();
		
		context.font = 'Bold 16px Tahoma';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		
		context.fillStyle = '#555';
		context.fillText(this.getOutput(1).triggered ? 'ON' : 'OFF', this.getX() + (this.getWide() / 2), this.getY() + (this.getTall() / 2));
	}
	
});