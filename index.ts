const w : number = window.innerWidth 
const h : number = window.innerHeight 
const scGap : number = 0.02 
const strokeFactor : number = 90
const sizeFactor : number = 2.9 
const delay : number = 90
const foreColor : string = "#673AB7"
const backColor : string = "#BDBDBD"

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