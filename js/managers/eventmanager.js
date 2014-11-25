var EventManager = ring.create({
	
	constructor: function(gamemanager)
	{
		this.gamemanager = gamemanager;
		
		this.events = [];
	},
	
	trigger: function(event)
	{
		if (!this.events[event]) return;
	
		var args = [].slice.apply(arguments).slice(1);
	
		if (event !== 'update' && event !== 'draw')
		{
			//console.log(event, args);
		}
	
		for (var name in this.events[event])
		{
			var callback = this.events[event][name][0];
			var context = this.events[event][name][1];
		
			callback.apply(context, args);
		}
	},

	add: function(event, name, callback, context)
	{
		if (!this.events[event]) this.events[event] = {};
	
		this.events[event][name] = [ callback, context ];
	},

	remove: function(event, name)
	{
		if (!this.events[event]) return;
	
		delete this.events[event][name];
	}
	
});