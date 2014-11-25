var AndGate = ring.create([ Gate ], {
	
	constructor: function()
	{
		this.$super();
		
		this.gateType = 'AND';
	},
	
	onCreated: function()
	{
		this.addInputs(2);
		this.addOutput(1);
	},
	
	onClicked: function()
	{
		_.each(this.inputs, function(e)
		{
			e.triggered = !e.triggered;
		});
	},
	
	onUpdate: function()
	{
		var output = this.getOutput(1);
		
		if (this.allInputsAreTriggered())
		{
			output.setTriggered(true);
		}
		else
		{
			output.setTriggered(false);
		}
	},
	
	onDraw: function(context, delta)
	{
		context.beginPath();
	
		context.rect(this.getX(), this.getY(), this.getWide() / 2, this.getTall());
		context.moveTo(this.getX() + this.getWide() / 2, this.getY());
		context.arc(this.getX() + this.getWide() / 2, this.getY() + this.getTall() / 2, this.getTall() / 2, Math.PI * 0.5, Math.PI * 1.5, true);
		
		context.closePath();
		
		context.fillStyle = '#CCC';
		context.fill();
		
		context.font = 'Bold 16px Tahoma';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		
		context.fillStyle = '#555';
		context.fillText(this.gateType, this.getX() + (this.getWide() / 2), this.getY() + (this.getTall() / 2));
	}
	
});