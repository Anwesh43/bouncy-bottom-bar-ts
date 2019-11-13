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


class Animator {
		
	animated : boolean = false 
	interval : number 

	start(cb : Function) {
		if (!this.animated) {
			this.animated = true 
			this.interval = setInterval(cb, delay)
		}
	}

	stop() {
		if (this.animated) {
			this.animated = false 
			clearInterval(this.interval)
		}
	}
}

class BBNode {
		
	state : State = new State()
	prev : BBNode
	next : BBNode

	constructor(private i : number) {


	}

	addNeighbor() {
		if (this.i < nodes - 1) {
			this.next = new BBNode(this.i + 1)
			this.next.prev = this
		}
	}

	draw(context : CanvasRenderingContext2D) {
		DrawingUtil.drawBBNode(context, this.i, this.state.scale)
		if (this.next) {
			this.next.draw(context)
		}
	}

	update(cb : Function) {
		this.state.update(cb)
	}

	startUpdating(cb : Function) {
		this.state.startUpdating(cb)
	}

	getNext(dir : number, cb : Function) {
		var curr : BBNode = this.prev 
		if (dir == 1) {
			curr = this.next 
		}
		if (curr) {
			return curr 
		}
		cb()
		return this
	}
}

class BarBouncy {
		
	root : BBNode = new BBNode(0)
	curr : BBNode = this.root 
	dir : number = 1

	draw(context : CanvasRenderingContext2D) {
		this.root.draw(context)
	}

	update(cb : Function) {
		this.curr.update(() => {
			this.curr = this.curr.getNext(this.dir, () => {
				this.dir *= -1
			})
			cb()
		})
	}

	startUpdating(cb : Function) {
		this.curr.startUpdating(cb)
	}
}