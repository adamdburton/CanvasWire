var GridEntity = ring.create([ Entity ], {
	
	constructor: function()
	{
		this.$super();
		
		this.inputs = [];
		this.outputs = [];
		
		this.clickable = true;
		this.draggable = true;
	},
	
	onCreated: function()
	{
		this.$super();
		
		this.setSize(this.parent.tileSize.x, this.parent.tileSize.y);
	},
	
	addInput: function(name)
	{
		var input = this.state.createEntity('Input', this);
		input.name = name;
		
		this.inputs.push(input);
		
		this.setSize(this.parent.tileSize.x * Math.max(this.inputs.length, this.outputs.length), this.parent.tileSize.y * Math.max(this.inputs.length, this.outputs.length));
		
		input.setSize(this.parent.tileSize.x / 2, this.parent.tileSize.y / 2);
		input.setPosition(-(this.parent.tileSize.x / 4), ((this.inputs.length - 1) * this.parent.tileSize.y) + (this.parent.tileSize.y / 4));
		
		this.onResize();
		
		return this;
	},

	addInputs: function(count)
	{
		var offset = this.inputs.length;
		var offsetCount = offset + (count - 1);
		
		for (var i = offset; i <= offsetCount; i++)
		{
			this.addInput(i);
		}
		
		return this;
	},

	getInput: function(name)
	{
		return this.inputs[name - 1];
	},

	addOutput: function(name)
	{
		var output = this.state.createEntity('Output', this);
		output.name = name;
		
		this.outputs.push(output);
		
		this.setSize(this.parent.tileSize.x * Math.max(this.inputs.length, this.outputs.length), this.parent.tileSize.y * Math.max(this.inputs.length, this.outputs.length));
		
		output.setSize(this.parent.tileSize.x / 2, this.parent.tileSize.y / 2);
		
		this.onResize();
		
		return this;
	},

	addOutputs: function(count)
	{
		var offset = this.outputs.length;
		var offsetCount = offset + (count - 1);
		
		for (var i = offset; i <= offsetCount; i++)
		{
			this.addOutput(i);
		}
		
		return this;
	},

	getOutput: function(name)
	{
		return this.outputs[name - 1];
	},

	allInputsAreTriggered: function()
	{
		for (var i = this.inputs.length; i--;)
		{
			if (!this.inputs[i].triggered)
			{
				return false;
			}
		}
		
		return true;
	},

	anyInputsAreTriggered: function()
	{
		for (var i = this.inputs.length; i--;)
		{
			if (this.inputs[i].triggered)
			{
				return true;
			}
		}
		
		return false;
	},

	snapToGrid: function()
	{
		this.setPosition(Math.round(this.position.x / this.parent.tileSize.x) * this.parent.tileSize.x, Math.round(this.position.y / this.parent.tileSize.y) * this.parent.tileSize.y);
		
		return this;
	},
	
	onDragStop: function()
	{
		this.$super();
		
		this.snapToGrid();
	},
	
	onResize: function()
	{
		this.$super();
		
		// Layout inputs
		
		if (this.inputs.length == 1)
		{
			this.inputs[0].setPosition(-(this.parent.tileSize.x / 4), (this.getTall() / 2) - (this.parent.tileSize.y / 4));
		}
		else
		{
			for (var i = this.inputs.length; i--;)
			{
				this.inputs[i].setPosition(-(this.parent.tileSize.x / 4), (i * this.parent.tileSize.y) + (this.parent.tileSize.y / 4));
			}
		}
		
		// Layout outputs
		
		if (this.outputs.length == 1)
		{
			this.outputs[0].setPosition(this.getWide() - (this.parent.tileSize.x / 4), (this.getTall() / 2) - (this.parent.tileSize.y / 4));
		}
		else
		{
			for (var i = this.outputs.length; i--;)
			{
				this.outputs[i].setPosition(this.getWide() - (this.parent.tileSize.x / 4), (i * this.parent.tileSize.y) + (this.parent.tileSize.y / 4));
			}
		}
	}
	
});