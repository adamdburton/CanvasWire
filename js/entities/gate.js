var Gate = ring.create([ GridEntity ], {
	
	onDraw: function(context, delta)
	{
		context.beginPath();
	
		context.rect(this.getX(), this.getY(), this.getWide(), this.getTall());
		context.fillStyle = '#CCC';
	
		context.fill();
		
		context.font = 'Bold 16px Tahoma';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		
		context.fillStyle = '#555';
		context.fillText(this.gateType, this.getX() + (this.getWide() / 2), this.getY() + (this.getTall() / 2));
	}
	
});