var StateManager = ring.create({
	
	constructor: function(gamemanager)
	{
		this.gamemanager = gamemanager;
	
		this.states = [];
	
		this.currentState = null;
		this.lastState = null;
		
		// Listen to some events
	
		this.gamemanager.eventmanager.add('update', 'statemanager.update', this.onUpdate, this);
		this.gamemanager.eventmanager.add('draw', 'statemanager.draw', this.onDraw, this);
	
		this.gamemanager.eventmanager.add('mouseDown', 'statemanager.mouseDown', this.onMouseDown, this);
		this.gamemanager.eventmanager.add('mouseUp', 'statemanager.mouseUp', this.onMouseUp, this);
		this.gamemanager.eventmanager.add('mouseMove', 'statemanager.mouseMove', this.onMouseMove, this);
	},

	create: function(name)
	{
		var state = new window[name + 'State'](this, name);
	
		this.states[name] = state;
	
		return this.states[name];
	},

	switchTo: function(name)
	{
		this.lastState = this.currentState;
		this.currentState = name;
	},

	onUpdate: function()
	{
		if (!this.currentState) { return; }
	
		this.states[this.currentState].onUpdate();
	},

	onDraw: function(context, delta)
	{
		if (!this.currentState) { return; }
	
		this.states[this.currentState].onDraw(context, delta);
	},

	onMouseDown: function()
	{
		if (!this.currentState) { return; }
	
		this.states[this.currentState].onMouseDown();
	},

	onMouseUp: function()
	{
		if (!this.currentState) { return; }
	
		this.states[this.currentState].onMouseUp();
	},

	onMouseMove: function()
	{
		if (!this.currentState) { return; }
	
		this.states[this.currentState].onMouseMove();
	}
	
});