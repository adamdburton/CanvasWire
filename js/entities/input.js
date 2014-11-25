var Input = ring.create([ Entity ], {
	
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
	
	onDraw: function(context)
	{
		context.beginPath();
		context.arc(this.getX() + this.getWide() / 2, this.getY() + this.getTall() / 2, this.getWide() / 2, Math.PI / 2, Math.PI * 1.5);
		context.fillStyle = this.triggered ? '#74C93B' : '#C93B3B';
		context.fill();
		
		/* // debug
		context.beginPath();
		context.rect(this.getX(), this.getY(), this.getWide(), this.getTall());
		context.strokeStyle = 'red';
		context.stroke();
		*/
	},
	
	onClicked: function()
	{
		if (this.wire && this.wire.output)
		{
			//console.log('removing wire from', this.parent.entityName, '(through', this.wire.input.entityName, ') to', this.wire.output.parent.entityName, '(through', this.wire.output.entityName, ')');
			
			this.wire.output.wire = null;
			this.wire.remove();
		}
		
		if (this.state.pendingWire)
		{
			//console.log('removing pending wire from', this.parent.entityName, '(through', this.wire.input.entityName, ')');
			
			this.state.pendingWire.remove();
			this.state.pendingWire = null;
		}
		
		this.state.pendingWire = this.state.createEntity('Wire', this);
		this.state.pendingWire.input = this;
		
		this.wire = this.state.pendingWire;
	}
	
});