var Wire = ring.create([ Entity ], {
	
	constructor: function()
	{
		this.$super();
		
		this.input = null;
		this.output = null;
	},
	
	setInput: function(input)
	{
		this.input = input;
	
		this.onUpdate();
	
		return this;
	},
	
	setOutput: function(output)
	{
		this.output = output;
	
		this.onUpdate();
	
		return this;
	},
	
	onUpdate: function()
	{
		if (this.input && this.output)
		{
			if (this.output.triggered === true)
			{
				this.input.triggered = true;
			}
			else
			{
				this.input.triggered = false;
			}
		}
	},
	
	onDraw: function(context, delta)
	{
		if (this.input && this.output)
		{
			context.beginPath()
			
			context.moveTo(this.input.getX(), this.input.getY() + (this.input.getTall() / 2));
			context.bezierCurveTo(this.input.getX() - 50, this.input.getY() + (this.input.getTall() / 2), this.output.getX() + this.output.getWide() + 50, this.output.getY() + (this.output.getTall() / 2), this.output.getX() + this.output.getWide(), this.output.getY() + (this.output.getTall() / 2));
			//context.lineTo(, );
			
			context.strokeStyle = 'white';
			context.lineWidth = 2;
			context.stroke();
		}
		else if (this.input && !this.output)
		{
			var renderer = this.state.statemanager.gamemanager.renderer;
			
			context.beginPath()
			
			context.moveTo(this.input.getX(), this.input.getY() + (this.input.getTall() / 2));
			context.bezierCurveTo(this.input.getX() - 50, this.input.getY() + (this.input.getTall() / 2), renderer.mouse.x + 50, renderer.mouse.y, renderer.mouse.x, renderer.mouse.y);
			//context.lineTo(renderer.mouse.x, renderer.mouse.y);
			
			context.strokeStyle = 'white';
			context.lineWidth = 2;
			context.stroke();
		}
	}
	
});