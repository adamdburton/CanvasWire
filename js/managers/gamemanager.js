var GameManager = ring.create({
	
	constructor: function(config)
	{
		this.timer = new Timer();
		this.eventmanager = new EventManager(this);
		this.statemanager = new StateManager(this);
		
		this.renderer = new Renderer(this);
		
		this.shouldRun = true;
		
		this.nextEntityIndex = 1;
		this.nextGameWorldUpdateTime = 0;
		
		if (config.startState)
		{
			this.statemanager.create(config.startState).switchTo();
		}
		
		if (config.autoStart)
		{
			this.start();
		}
	},

	createEntity: function(entityType, parent, state)
	{
		if (!window[entityType])
		{
			console.error('Attempt to create unknown entity type ' + entityType + '!');
			return null;
		}
		
		var obj = new window[entityType]();
		
		obj.entityType = entityType;
		obj.entityIndex = ++this.nextEntityIndex;
		obj.entityName = entityType + ':' + obj.entityIndex;
		
		obj.parent = parent;
		obj.state = state;
		obj.zIndex = (parent.zIndex || 0) + 1;
		
		obj.onCreated();
		
		return obj;
	},

	// Internals

	run: function()
	{
		if (!this.shouldRun) { return; }
		
		window.requestAnimFrame(this.run.bind(this));
		
		this.timer.update();
		
		var currentTime = this.timer.currentTime;
		
		if (currentTime >= this.nextGameWorldUpdateTime)
		{
			this.nextGameWorldUpdateTime = currentTime + (1 / 30);
			
			this.eventmanager.trigger('update');
		}
		
		this.eventmanager.trigger('draw', this.renderer.context, this.timer.deltaTime);
	},

	start: function()
	{
		this.shouldRun = true;
		
		this.timer.reset();
		this.run();
	},

	stop: function()
	{
		this.shouldRun = false;
	}
	
});