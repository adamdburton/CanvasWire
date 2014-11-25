var OrGate = ring.create([ Gate ], {
	
	constructor: function()
	{
		this.$super();
		
		this.gateType = 'OR';
	},
	
	onCreated: function()
	{
		this.addInputs(2);
		this.addOutput(1);
	},
	
	onUpdate: function()
	{
		var output = this.getOutput(1);
		
		if (this.anyInputsAreTriggered())
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
		context.fillStyle = '#CCC';
		
		context.beginPath();
		
		context.moveTo(this.getX(), this.getY());
		context.quadraticCurveTo(this.getX() + this.getWide() / 2, this.getY(), this.getX() + this.getWide(), this.getY() + (this.getTall() / 2));
		context.lineTo(this.getX(), this.getY() + (this.getTall() / 2));
		
		context.moveTo(this.getX(), this.getY() + this.getTall());
		context.quadraticCurveTo(this.getX() + this.getWide() / 2, this.getY() + this.getTall(), this.getX() + this.getWide(), this.getY() + (this.getTall() / 2));
		context.lineTo(this.getX(), this.getY() + (this.getTall() / 2));
		
		context.fill();
		
		
		context.font = 'Bold 16px Tahoma';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		
		context.fillStyle = '#555';
		context.fillText(this.gateType, this.getX() + (this.getWide() / 2), this.getY() + (this.getTall() / 2));
	}
	
});