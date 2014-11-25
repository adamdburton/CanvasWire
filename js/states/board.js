var BoardState = ring.create([ State ], {
	
	constructor: function(statemanager, name)
	{
		this.$super(statemanager, name);
		
		this.grid = this.createEntity('Grid');
		this.grid.setPosition(50, 50);
		
		this.andGate = this.createEntity('AndGate', this.grid);
		this.andGate.setPosition(30, 30).snapToGrid();
		
		this.orGate = this.createEntity('OrGate', this.grid);
		this.orGate.setPosition(30, 200).snapToGrid();
		
		this.button = this.createEntity('Button', this.grid);
		this.button.setPosition(200, 200).snapToGrid();
		
		this.eightSegment = this.createEntity('EightSegment', this.grid);
		this.eightSegment.setPosition(400, 200).snapToGrid();
		
		this.pendingWire = null;
	},

	switchTo: function()
	{
		this.statemanager.switchTo(this.name);
	}
	
});