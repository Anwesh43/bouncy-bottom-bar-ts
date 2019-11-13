const w : number = window.innerWidth 
const h : number = window.innerHeight 
const scGap : number = 0.02 
const strokeFactor : number = 90
const sizeFactor : number = 2.9 
const delay : number = 90
const foreColor : string = "#673AB7"
const backColor : string = "#BDBDBD"
const nodes : number = 5

class Stage {
		
	canvas : HTMLCanvasElement = document.createElement('canvas')
	context : CanvasRenderingContext2D

	initCanvas() {
		this.canvas.width = w 
		this.canvas.height = h 
		this.context = this.canvas.getContext('2d')
		document.body.appendChild(this.canvas)
	}

	render() {
		this.context.fillStyle = backColor 
		this.context.fillRect(0, 0, w, h)
	}

	handleTap() {
		this.canvas.onmousedown = () => {

		}
	}
}

class ScaleUtil {
	
	static sinify(scale : number) : number {
		return Math.sin(scale * Math.PI)
	}
}

class DrawingUtil {
	
	static drawBBNode(context : CanvasRenderingContext2D,  i : number, scale : number) {
		const gap : number = w / (nodes)
		const sf : number = ScaleUtil.sinify(scale)
		const bouncyY : number = (h / 2) * sf
		context.fillStyle = foreColor 
		context.save()
		context.translate(i * gap, h)
		context.fillRect(0, -gap - bouncyY, gap, gap + bouncyY)
		context.restore()
	}
}

class State {
		
	scale : number = 0
	dir : number = 0
	prevScale : number = 0

	update(cb : Function) {
		this.scale += scGap * this.dir 
		if (Math.abs(this.scale - this.prevScale) > 1) {
			this.scale = this.prevScale + this.dir 
			this.dir = 0
			this.prevScale = this.scale 
			cb()
		}
	}

	startUpdating(cb : Function) {
		if (this.dir == 0) {
			this.dir = 1 - 2 * this.prevScale 
			cb()
		}
	}
}
