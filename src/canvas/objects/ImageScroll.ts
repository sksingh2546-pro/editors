import { fabric } from 'fabric';
import { FabricElement, toObject } from '../utils';

export interface Code {
	data: string;
	duration: string;
	animation: string;
}

export interface ImageScrollObject extends FabricElement {
	setSource: (source: Code) => void;
	setCode: (code: Code) => void;
	code: Code;
}

const initialCode: Code = {
	data: '',
	duration: "",
	animation: ''
};

const ImageScroll = fabric.util.createClass(fabric.Rect, {
	type: 'element',
	superType: 'element',
	hasRotatingPoint: false,
	initialize(code = initialCode, options: any) {
		options = options || {};
		this.callSuper('initialize', options);
		this.set({
			code,
			fill: 'rgba(255, 255, 255, 0)',
			stroke: 'rgba(255, 255, 255, 0)',
		});
	},
	setSource(source: any) {
		this.setCode(source);
	},
	setCode(code = initialCode) {
		this.set({
			code,
		});
		debugger
		let slideIndex = 0;
		document.getElementsByClassName("page-1")[0].innerHTML='';
		setTimeout(()=>{
			let dataLength1=code.data;
			let dataLength=dataLength1.split(',');
			let div=document.getElementsByClassName("page-1")[0];
		for(var key in dataLength){
			if(dataLength[key].includes('.mp4')){
				var oImg = document.createElement("video");
				oImg.setAttribute('src',dataLength[key] );		
				oImg.setAttribute("autoplay", "true");
				oImg.setAttribute('class','magictime holeOut img1 ${id}_container' );
				div.appendChild(oImg);
			}
			else{
			var oImg = document.createElement("img");
			oImg.setAttribute('src',dataLength[key] );
			oImg.setAttribute('class','magictime holeOut img1 ${id}_container' );
			div.appendChild(oImg);
			}
		}
		
		setTimeout(()=>{
		showSlides();
		
		function showSlides() {
		  let i;
		  let slides = document.getElementsByClassName("magictime");
		  for (i = 0; i < slides.length; i++) {
			slides[i].classList.remove("slideRightReturn")
			slides[i].classList.add('holeOut')   
		  }
		  slideIndex++;
		  if (slideIndex > slides.length) {slideIndex = 1}  
		  console.log(slides[slideIndex-1].nodeName)
		 
		  slides[slideIndex-1].classList.remove('holeOut') 
		  slides[slideIndex-1].classList.add('slideRightReturn')
		  setTimeout(showSlides, 10000);
		  
		
		}
		});
		});
	},
	toObject(propertiesToInclude: string[]) {
		return toObject(this, propertiesToInclude, {
			code: this.get('code'),
			container: this.get('container'),
			editable: this.get('editable'),
		});
	},
	_render(ctx: CanvasRenderingContext2D) {
		this.callSuper('_render', ctx);
		if (!this.element) {
			const { id, scaleX, scaleY, width, height, angle, editable, code } = this;
			const zoom = this.canvas.getZoom();
			const left = this.calcCoords().tl.x;
			const top = this.calcCoords().tl.y;
			const padLeft = (width * scaleX * zoom - width) / 2;
			const padTop = (height * scaleY * zoom - height) / 2;
			this.element = fabric.util.makeElement('div', {
				id: `${id}_container`,
				style: `transform: rotate(${angle}deg) scale(${scaleX * zoom}, ${scaleY * zoom});
                        width: ${width}px;
                        height: ${height}px;
                        left: ${left + padLeft}px;
                        top: ${top + padTop}px;
                        position: absolute;
                        user-select: ${editable ? 'none' : 'auto'};
                        pointer-events: ${editable ? 'none' : 'auto'};`,
			}) as HTMLDivElement;
			this.styleEl = document.createElement('style');
			this.styleEl.id = `${id}_style`;
			this.styleEl.type = 'text/css';
			this.styleEl.innerHTML = `.puffIn {
				-webkit-animation-name: puffIn;
				animation-name: puffIn
			}
			
			@-webkit-keyframes puffIn {
				0% {
					opacity: 0;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(2);
					transform: scale(2);
					-webkit-filter: blur(2px);
					filter: blur(2px)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(1);
					transform: scale(1);
					-webkit-filter: blur(0);
					filter: blur(0)
				}
			}
			
			@keyframes puffIn {
				0% {
					opacity: 0;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(2);
					transform: scale(2);
					-webkit-filter: blur(2px);
					filter: blur(2px)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(1);
					transform: scale(1);
					-webkit-filter: blur(0);
					filter: blur(0)
				}
			}
			
			.puffOut {
				-webkit-animation-name: puffOut;
				animation-name: puffOut
			}
			
			@-webkit-keyframes puffOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(1);
					transform: scale(1);
					-webkit-filter: blur(0);
					filter: blur(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(2);
					transform: scale(2);
					-webkit-filter: blur(2px);
					filter: blur(2px)
				}
			}
			
			@keyframes puffOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(1);
					transform: scale(1);
					-webkit-filter: blur(0);
					filter: blur(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(2);
					transform: scale(2);
					-webkit-filter: blur(2px);
					filter: blur(2px)
				}
			}
			
			.vanishIn {
				-webkit-animation-name: vanishIn;
				animation-name: vanishIn
			}
			
			@-webkit-keyframes vanishIn {
				0% {
					opacity: 0;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(2);
					transform: scale(2);
					-webkit-filter: blur(90px);
					filter: blur(90px)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(1);
					transform: scale(1);
					-webkit-filter: blur(0);
					filter: blur(0)
				}
			}
			
			@keyframes vanishIn {
				0% {
					opacity: 0;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(2);
					transform: scale(2);
					-webkit-filter: blur(90px);
					filter: blur(90px)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(1);
					transform: scale(1);
					-webkit-filter: blur(0);
					filter: blur(0)
				}
			}
			
			.vanishOut {
				-webkit-animation-name: vanishOut;
				animation-name: vanishOut
			}
			
			@-webkit-keyframes vanishOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(1);
					transform: scale(1);
					-webkit-filter: blur(0);
					filter: blur(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(2);
					transform: scale(2);
					-webkit-filter: blur(20px);
					filter: blur(20px)
				}
			}
			
			@keyframes vanishOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(1);
					transform: scale(1);
					-webkit-filter: blur(0);
					filter: blur(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(2);
					transform: scale(2);
					-webkit-filter: blur(20px);
					filter: blur(20px)
				}
			}
			
			.boingInUp {
				-webkit-animation-name: boingInUp;
				animation-name: boingInUp
			}
			
			@-webkit-keyframes boingInUp {
				0% {
					opacity: 0;
					-webkit-transform-origin: 50% 0;
					transform-origin: 50% 0;
					-webkit-transform: perspective(800px) rotateX(-90deg);
					transform: perspective(800px) rotateX(-90deg)
				}
			
				50% {
					opacity: 1;
					-webkit-transform-origin: 50% 0;
					transform-origin: 50% 0;
					-webkit-transform: perspective(800px) rotateX(50deg);
					transform: perspective(800px) rotateX(50deg)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 50% 0;
					transform-origin: 50% 0;
					-webkit-transform: perspective(800px) rotateX(0deg);
					transform: perspective(800px) rotateX(0deg)
				}
			}
			
			@keyframes boingInUp {
				0% {
					opacity: 0;
					-webkit-transform-origin: 50% 0;
					transform-origin: 50% 0;
					-webkit-transform: perspective(800px) rotateX(-90deg);
					transform: perspective(800px) rotateX(-90deg)
				}
			
				50% {
					opacity: 1;
					-webkit-transform-origin: 50% 0;
					transform-origin: 50% 0;
					-webkit-transform: perspective(800px) rotateX(50deg);
					transform: perspective(800px) rotateX(50deg)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 50% 0;
					transform-origin: 50% 0;
					-webkit-transform: perspective(800px) rotateX(0deg);
					transform: perspective(800px) rotateX(0deg)
				}
			}
			
			.boingOutDown {
				-webkit-animation-name: boingOutDown;
				animation-name: boingOutDown
			}
			
			@-webkit-keyframes boingOutDown {
				0% {
					opacity: 1;
					-webkit-transform-origin: 100% 100%;
					transform-origin: 100% 100%;
					-webkit-transform: perspective(800px) rotateX(0deg) rotateY(0deg);
					transform: perspective(800px) rotateX(0deg) rotateY(0deg)
				}
			
				20% {
					opacity: 1;
					-webkit-transform-origin: 100% 100%;
					transform-origin: 100% 100%;
					-webkit-transform: perspective(800px) rotateX(0deg) rotateY(10deg);
					transform: perspective(800px) rotateX(0deg) rotateY(10deg)
				}
			
				30% {
					opacity: 1;
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: perspective(800px) rotateX(0deg) rotateY(0deg);
					transform: perspective(800px) rotateX(0deg) rotateY(0deg)
				}
			
				40% {
					opacity: 1;
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: perspective(800px) rotateX(10deg) rotateY(10deg);
					transform: perspective(800px) rotateX(10deg) rotateY(10deg)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 100% 100%;
					transform-origin: 100% 100%;
					-webkit-transform: perspective(800px) rotateX(90deg) rotateY(0deg);
					transform: perspective(800px) rotateX(90deg) rotateY(0deg)
				}
			}
			
			@keyframes boingOutDown {
				0% {
					opacity: 1;
					-webkit-transform-origin: 100% 100%;
					transform-origin: 100% 100%;
					-webkit-transform: perspective(800px) rotateX(0deg) rotateY(0deg);
					transform: perspective(800px) rotateX(0deg) rotateY(0deg)
				}
			
				20% {
					opacity: 1;
					-webkit-transform-origin: 100% 100%;
					transform-origin: 100% 100%;
					-webkit-transform: perspective(800px) rotateX(0deg) rotateY(10deg);
					transform: perspective(800px) rotateX(0deg) rotateY(10deg)
				}
			
				30% {
					opacity: 1;
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: perspective(800px) rotateX(0deg) rotateY(0deg);
					transform: perspective(800px) rotateX(0deg) rotateY(0deg)
				}
			
				40% {
					opacity: 1;
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: perspective(800px) rotateX(10deg) rotateY(10deg);
					transform: perspective(800px) rotateX(10deg) rotateY(10deg)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 100% 100%;
					transform-origin: 100% 100%;
					-webkit-transform: perspective(800px) rotateX(90deg) rotateY(0deg);
					transform: perspective(800px) rotateX(90deg) rotateY(0deg)
				}
			}
			
			.bombLeftOut {
				-webkit-animation-name: bombLeftOut;
				animation-name: bombLeftOut
			}
			
			@-webkit-keyframes bombLeftOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-filter: blur(0);
					filter: blur(0)
				}
			
				50% {
					opacity: 1;
					-webkit-transform-origin: -100% 50%;
					transform-origin: -100% 50%;
					-webkit-transform: rotate(-160deg);
					transform: rotate(-160deg);
					-webkit-filter: blur(0);
					filter: blur(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: -100% 50%;
					transform-origin: -100% 50%;
					-webkit-transform: rotate(-160deg);
					transform: rotate(-160deg);
					-webkit-filter: blur(20px);
					filter: blur(20px)
				}
			}
			
			@keyframes bombLeftOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-filter: blur(0);
					filter: blur(0)
				}
			
				50% {
					opacity: 1;
					-webkit-transform-origin: -100% 50%;
					transform-origin: -100% 50%;
					-webkit-transform: rotate(-160deg);
					transform: rotate(-160deg);
					-webkit-filter: blur(0);
					filter: blur(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: -100% 50%;
					transform-origin: -100% 50%;
					-webkit-transform: rotate(-160deg);
					transform: rotate(-160deg);
					-webkit-filter: blur(20px);
					filter: blur(20px)
				}
			}
			
			.bombRightOut {
				-webkit-animation-name: bombRightOut;
				animation-name: bombRightOut
			}
			
			@-webkit-keyframes bombRightOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-filter: blur(0);
					filter: blur(0)
				}
			
				50% {
					opacity: 1;
					-webkit-transform-origin: 200% 50%;
					transform-origin: 200% 50%;
					-webkit-transform: rotate(160deg);
					transform: rotate(160deg);
					-webkit-filter: blur(0);
					filter: blur(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 200% 50%;
					transform-origin: 200% 50%;
					-webkit-transform: rotate(160deg);
					transform: rotate(160deg);
					-webkit-filter: blur(20px);
					filter: blur(20px)
				}
			}
			
			@keyframes bombRightOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-filter: blur(0);
					filter: blur(0)
				}
			
				50% {
					opacity: 1;
					-webkit-transform-origin: 200% 50%;
					transform-origin: 200% 50%;
					-webkit-transform: rotate(160deg);
					transform: rotate(160deg);
					-webkit-filter: blur(0);
					filter: blur(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 200% 50%;
					transform-origin: 200% 50%;
					-webkit-transform: rotate(160deg);
					transform: rotate(160deg);
					-webkit-filter: blur(20px);
					filter: blur(20px)
				}
			}
			
			.magic {
				-webkit-animation-name: magic;
				animation-name: magic
			}
			
			@-webkit-keyframes magic {
				0% {
					opacity: 1;
					-webkit-transform-origin: 100% 200%;
					transform-origin: 100% 200%;
					-webkit-transform: scale(1) rotate(0deg);
					transform: scale(1) rotate(0deg)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 200% 500%;
					transform-origin: 200% 500%;
					-webkit-transform: scale(0) rotate(270deg);
					transform: scale(0) rotate(270deg)
				}
			}
			
			@keyframes magic {
				0% {
					opacity: 1;
					-webkit-transform-origin: 100% 200%;
					transform-origin: 100% 200%;
					-webkit-transform: scale(1) rotate(0deg);
					transform: scale(1) rotate(0deg)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 200% 500%;
					transform-origin: 200% 500%;
					-webkit-transform: scale(0) rotate(270deg);
					transform: scale(0) rotate(270deg)
				}
			}
			
			.swap {
				-webkit-animation-name: swap;
				animation-name: swap
			}
			
			@-webkit-keyframes swap {
				0% {
					opacity: 0;
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: scale(0) translate(-700px);
					transform: scale(0) translate(-700px)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 100% 100%;
					transform-origin: 100% 100%;
					-webkit-transform: scale(1) translate(0);
					transform: scale(1) translate(0)
				}
			}
			
			@keyframes swap {
				0% {
					opacity: 0;
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: scale(0) translate(-700px);
					transform: scale(0) translate(-700px)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 100% 100%;
					transform-origin: 100% 100%;
					-webkit-transform: scale(1) translate(0);
					transform: scale(1) translate(0)
				}
			}
			
			.twisterInDown {
				-webkit-animation-name: twisterInDown;
				animation-name: twisterInDown
			}
			
			@-webkit-keyframes twisterInDown {
				0% {
					opacity: 0;
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: scale(0) rotate(1turn) translateY(-100%);
					transform: scale(0) rotate(1turn) translateY(-100%)
				}
			
				30% {
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: scale(0) rotate(1turn) translateY(-100%);
					transform: scale(0) rotate(1turn) translateY(-100%)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 100% 100%;
					transform-origin: 100% 100%;
					-webkit-transform: scale(1) rotate(0deg) translateY(0);
					transform: scale(1) rotate(0deg) translateY(0)
				}
			}
			
			@keyframes twisterInDown {
				0% {
					opacity: 0;
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: scale(0) rotate(1turn) translateY(-100%);
					transform: scale(0) rotate(1turn) translateY(-100%)
				}
			
				30% {
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: scale(0) rotate(1turn) translateY(-100%);
					transform: scale(0) rotate(1turn) translateY(-100%)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 100% 100%;
					transform-origin: 100% 100%;
					-webkit-transform: scale(1) rotate(0deg) translateY(0);
					transform: scale(1) rotate(0deg) translateY(0)
				}
			}
			
			.twisterInUp {
				-webkit-animation-name: twisterInUp;
				animation-name: twisterInUp
			}
			
			@-webkit-keyframes twisterInUp {
				0% {
					opacity: 0;
					-webkit-transform-origin: 100% 0;
					transform-origin: 100% 0;
					-webkit-transform: scale(0) rotate(1turn) translateY(100%);
					transform: scale(0) rotate(1turn) translateY(100%)
				}
			
				30% {
					-webkit-transform-origin: 100% 0;
					transform-origin: 100% 0;
					-webkit-transform: scale(0) rotate(1turn) translateY(100%);
					transform: scale(0) rotate(1turn) translateY(100%)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: scale(1) rotate(0deg) translateY(0);
					transform: scale(1) rotate(0deg) translateY(0)
				}
			}
			
			@keyframes twisterInUp {
				0% {
					opacity: 0;
					-webkit-transform-origin: 100% 0;
					transform-origin: 100% 0;
					-webkit-transform: scale(0) rotate(1turn) translateY(100%);
					transform: scale(0) rotate(1turn) translateY(100%)
				}
			
				30% {
					-webkit-transform-origin: 100% 0;
					transform-origin: 100% 0;
					-webkit-transform: scale(0) rotate(1turn) translateY(100%);
					transform: scale(0) rotate(1turn) translateY(100%)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: scale(1) rotate(0deg) translateY(0);
					transform: scale(1) rotate(0deg) translateY(0)
				}
			}
			
			.foolishIn {
				-webkit-animation-name: foolishIn;
				animation-name: foolishIn
			}
			
			@-webkit-keyframes foolishIn {
				0% {
					opacity: 0;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(0) rotate(1turn);
					transform: scale(0) rotate(1turn)
				}
			
				20% {
					opacity: 1;
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: scale(.5) rotate(0deg);
					transform: scale(.5) rotate(0deg)
				}
			
				40% {
					opacity: 1;
					-webkit-transform-origin: 100% 100%;
					transform-origin: 100% 100%;
					-webkit-transform: scale(.5) rotate(0deg);
					transform: scale(.5) rotate(0deg)
				}
			
				60% {
					opacity: 1;
					-webkit-transform-origin: 0;
					transform-origin: 0;
					-webkit-transform: scale(.5) rotate(0deg);
					transform: scale(.5) rotate(0deg)
				}
			
				80% {
					opacity: 1;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: scale(.5) rotate(0deg);
					transform: scale(.5) rotate(0deg)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(1) rotate(0deg);
					transform: scale(1) rotate(0deg)
				}
			}
			
			@keyframes foolishIn {
				0% {
					opacity: 0;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(0) rotate(1turn);
					transform: scale(0) rotate(1turn)
				}
			
				20% {
					opacity: 1;
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: scale(.5) rotate(0deg);
					transform: scale(.5) rotate(0deg)
				}
			
				40% {
					opacity: 1;
					-webkit-transform-origin: 100% 100%;
					transform-origin: 100% 100%;
					-webkit-transform: scale(.5) rotate(0deg);
					transform: scale(.5) rotate(0deg)
				}
			
				60% {
					opacity: 1;
					-webkit-transform-origin: 0;
					transform-origin: 0;
					-webkit-transform: scale(.5) rotate(0deg);
					transform: scale(.5) rotate(0deg)
				}
			
				80% {
					opacity: 1;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: scale(.5) rotate(0deg);
					transform: scale(.5) rotate(0deg)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(1) rotate(0deg);
					transform: scale(1) rotate(0deg)
				}
			}
			
			.foolishOut {
				-webkit-animation-name: foolishOut;
				animation-name: foolishOut
			}
			
			@-webkit-keyframes foolishOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(1) rotate(1turn);
					transform: scale(1) rotate(1turn)
				}
			
				20% {
					opacity: 1;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: scale(.5) rotate(0deg);
					transform: scale(.5) rotate(0deg)
				}
			
				40% {
					opacity: 1;
					-webkit-transform-origin: 100% 0;
					transform-origin: 100% 0;
					-webkit-transform: scale(.5) rotate(0deg);
					transform: scale(.5) rotate(0deg)
				}
			
				60% {
					opacity: 1;
					-webkit-transform-origin: 0;
					transform-origin: 0;
					-webkit-transform: scale(.5) rotate(0deg);
					transform: scale(.5) rotate(0deg)
				}
			
				80% {
					opacity: 1;
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: scale(.5) rotate(0deg);
					transform: scale(.5) rotate(0deg)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(0) rotate(0deg);
					transform: scale(0) rotate(0deg)
				}
			}
			
			@keyframes foolishOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(1) rotate(1turn);
					transform: scale(1) rotate(1turn)
				}
			
				20% {
					opacity: 1;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: scale(.5) rotate(0deg);
					transform: scale(.5) rotate(0deg)
				}
			
				40% {
					opacity: 1;
					-webkit-transform-origin: 100% 0;
					transform-origin: 100% 0;
					-webkit-transform: scale(.5) rotate(0deg);
					transform: scale(.5) rotate(0deg)
				}
			
				60% {
					opacity: 1;
					-webkit-transform-origin: 0;
					transform-origin: 0;
					-webkit-transform: scale(.5) rotate(0deg);
					transform: scale(.5) rotate(0deg)
				}
			
				80% {
					opacity: 1;
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: scale(.5) rotate(0deg);
					transform: scale(.5) rotate(0deg)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(0) rotate(0deg);
					transform: scale(0) rotate(0deg)
				}
			}
			
			.holeOut {
				-webkit-animation-name: holeOut;
				animation-name: holeOut
			}
			
			@-webkit-keyframes holeOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(1) rotateY(0deg);
					transform: scale(1) rotateY(0deg)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(0) rotateY(180deg);
					transform: scale(0) rotateY(180deg)
				}
			}
			
			@keyframes holeOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(1) rotateY(0deg);
					transform: scale(1) rotateY(0deg)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(0) rotateY(180deg);
					transform: scale(0) rotateY(180deg)
				}
			}
			
			.swashIn {
				-webkit-animation-name: swashIn;
				animation-name: swashIn
			}
			
			@-webkit-keyframes swashIn {
				0% {
					opacity: 0;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(0);
					transform: scale(0)
				}
			
				90% {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(.9);
					transform: scale(.9)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(1);
					transform: scale(1)
				}
			}
			
			@keyframes swashIn {
				0% {
					opacity: 0;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(0);
					transform: scale(0)
				}
			
				90% {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(.9);
					transform: scale(.9)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(1);
					transform: scale(1)
				}
			}
			
			.swashOut {
				-webkit-animation-name: swashOut;
				animation-name: swashOut
			}
			
			@-webkit-keyframes swashOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(1);
					transform: scale(1)
				}
			
				80% {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(.9);
					transform: scale(.9)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(0);
					transform: scale(0)
				}
			}
			
			@keyframes swashOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(1);
					transform: scale(1)
				}
			
				80% {
					opacity: 1;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(.9);
					transform: scale(.9)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%;
					-webkit-transform: scale(0);
					transform: scale(0)
				}
			}
			
			.spaceInDown {
				-webkit-animation-name: spaceInDown;
				animation-name: spaceInDown
			}
			
			@-webkit-keyframes spaceInDown {
				0% {
					opacity: 0;
					-webkit-transform-origin: 50% 100%;
					transform-origin: 50% 100%;
					-webkit-transform: scale(.2) translateY(200%);
					transform: scale(.2) translateY(200%)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 50% 100%;
					transform-origin: 50% 100%;
					-webkit-transform: scale(1) translate(0);
					transform: scale(1) translate(0)
				}
			}
			
			@keyframes spaceInDown {
				0% {
					opacity: 0;
					-webkit-transform-origin: 50% 100%;
					transform-origin: 50% 100%;
					-webkit-transform: scale(.2) translateY(200%);
					transform: scale(.2) translateY(200%)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 50% 100%;
					transform-origin: 50% 100%;
					-webkit-transform: scale(1) translate(0);
					transform: scale(1) translate(0)
				}
			}
			
			.spaceInLeft {
				-webkit-animation-name: spaceInLeft;
				animation-name: spaceInLeft
			}
			
			@-webkit-keyframes spaceInLeft {
				0% {
					opacity: 0;
					-webkit-transform-origin: 0 50%;
					transform-origin: 0 50%;
					-webkit-transform: scale(.2) translate(-200%);
					transform: scale(.2) translate(-200%)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 0 50%;
					transform-origin: 0 50%;
					-webkit-transform: scale(1) translate(0);
					transform: scale(1) translate(0)
				}
			}
			
			@keyframes spaceInLeft {
				0% {
					opacity: 0;
					-webkit-transform-origin: 0 50%;
					transform-origin: 0 50%;
					-webkit-transform: scale(.2) translate(-200%);
					transform: scale(.2) translate(-200%)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 0 50%;
					transform-origin: 0 50%;
					-webkit-transform: scale(1) translate(0);
					transform: scale(1) translate(0)
				}
			}
			
			.spaceInRight {
				-webkit-animation-name: spaceInRight;
				animation-name: spaceInRight
			}
			
			@-webkit-keyframes spaceInRight {
				0% {
					opacity: 0;
					-webkit-transform-origin: 100% 50%;
					transform-origin: 100% 50%;
					-webkit-transform: scale(.2) translate(200%);
					transform: scale(.2) translate(200%)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 100% 50%;
					transform-origin: 100% 50%;
					-webkit-transform: scale(1) translate(0);
					transform: scale(1) translate(0)
				}
			}
			
			@keyframes spaceInRight {
				0% {
					opacity: 0;
					-webkit-transform-origin: 100% 50%;
					transform-origin: 100% 50%;
					-webkit-transform: scale(.2) translate(200%);
					transform: scale(.2) translate(200%)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 100% 50%;
					transform-origin: 100% 50%;
					-webkit-transform: scale(1) translate(0);
					transform: scale(1) translate(0)
				}
			}
			
			.spaceInUp {
				-webkit-animation-name: spaceInUp;
				animation-name: spaceInUp
			}
			
			@-webkit-keyframes spaceInUp {
				0% {
					opacity: 0;
					-webkit-transform-origin: 50% 0;
					transform-origin: 50% 0;
					-webkit-transform: scale(.2) translateY(-200%);
					transform: scale(.2) translateY(-200%)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 50% 0;
					transform-origin: 50% 0;
					-webkit-transform: scale(1) translate(0);
					transform: scale(1) translate(0)
				}
			}
			
			@keyframes spaceInUp {
				0% {
					opacity: 0;
					-webkit-transform-origin: 50% 0;
					transform-origin: 50% 0;
					-webkit-transform: scale(.2) translateY(-200%);
					transform: scale(.2) translateY(-200%)
				}
			
				to {
					opacity: 1;
					-webkit-transform-origin: 50% 0;
					transform-origin: 50% 0;
					-webkit-transform: scale(1) translate(0);
					transform: scale(1) translate(0)
				}
			}
			
			.spaceOutDown {
				-webkit-animation-name: spaceOutDown;
				animation-name: spaceOutDown
			}
			
			@-webkit-keyframes spaceOutDown {
				0% {
					opacity: 1;
					-webkit-transform-origin: 50% 100%;
					transform-origin: 50% 100%;
					-webkit-transform: scale(1) translate(0);
					transform: scale(1) translate(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 100%;
					transform-origin: 50% 100%;
					-webkit-transform: scale(.2) translateY(200%);
					transform: scale(.2) translateY(200%)
				}
			}
			
			@keyframes spaceOutDown {
				0% {
					opacity: 1;
					-webkit-transform-origin: 50% 100%;
					transform-origin: 50% 100%;
					-webkit-transform: scale(1) translate(0);
					transform: scale(1) translate(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 100%;
					transform-origin: 50% 100%;
					-webkit-transform: scale(.2) translateY(200%);
					transform: scale(.2) translateY(200%)
				}
			}
			
			.spaceOutLeft {
				-webkit-animation-name: spaceOutLeft;
				animation-name: spaceOutLeft
			}
			
			@-webkit-keyframes spaceOutLeft {
				0% {
					opacity: 1;
					-webkit-transform-origin: 0 50%;
					transform-origin: 0 50%;
					-webkit-transform: scale(1) translate(0);
					transform: scale(1) translate(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 0 50%;
					transform-origin: 0 50%;
					-webkit-transform: scale(.2) translate(-200%);
					transform: scale(.2) translate(-200%)
				}
			}
			
			@keyframes spaceOutLeft {
				0% {
					opacity: 1;
					-webkit-transform-origin: 0 50%;
					transform-origin: 0 50%;
					-webkit-transform: scale(1) translate(0);
					transform: scale(1) translate(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 0 50%;
					transform-origin: 0 50%;
					-webkit-transform: scale(.2) translate(-200%);
					transform: scale(.2) translate(-200%)
				}
			}
			
			.spaceOutRight {
				-webkit-animation-name: spaceOutRight;
				animation-name: spaceOutRight
			}
			
			@-webkit-keyframes spaceOutRight {
				0% {
					opacity: 1;
					-webkit-transform-origin: 100% 50%;
					transform-origin: 100% 50%;
					-webkit-transform: scale(1) translate(0);
					transform: scale(1) translate(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 100% 50%;
					transform-origin: 100% 50%;
					-webkit-transform: scale(.2) translate(200%);
					transform: scale(.2) translate(200%)
				}
			}
			
			@keyframes spaceOutRight {
				0% {
					opacity: 1;
					-webkit-transform-origin: 100% 50%;
					transform-origin: 100% 50%;
					-webkit-transform: scale(1) translate(0);
					transform: scale(1) translate(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 100% 50%;
					transform-origin: 100% 50%;
					-webkit-transform: scale(.2) translate(200%);
					transform: scale(.2) translate(200%)
				}
			}
			
			.spaceOutUp {
				-webkit-animation-name: spaceOutUp;
				animation-name: spaceOutUp
			}
			
			@-webkit-keyframes spaceOutUp {
				0% {
					opacity: 1;
					-webkit-transform-origin: 50% 0;
					transform-origin: 50% 0;
					-webkit-transform: scale(1) translate(0);
					transform: scale(1) translate(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 0;
					transform-origin: 50% 0;
					-webkit-transform: scale(.2) translateY(-200%);
					transform: scale(.2) translateY(-200%)
				}
			}
			
			@keyframes spaceOutUp {
				0% {
					opacity: 1;
					-webkit-transform-origin: 50% 0;
					transform-origin: 50% 0;
					-webkit-transform: scale(1) translate(0);
					transform: scale(1) translate(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 0;
					transform-origin: 50% 0;
					-webkit-transform: scale(.2) translateY(-200%);
					transform: scale(.2) translateY(-200%)
				}
			}
			
			.perspectiveDown {
				-webkit-animation-name: perspectiveDown;
				animation-name: perspectiveDown
			}
			
			@-webkit-keyframes perspectiveDown {
				0% {
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: perspective(800px) rotateX(0deg);
					transform: perspective(800px) rotateX(0deg)
				}
			
				to {
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: perspective(800px) rotateX(-180deg);
					transform: perspective(800px) rotateX(-180deg)
				}
			}
			
			@keyframes perspectiveDown {
				0% {
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: perspective(800px) rotateX(0deg);
					transform: perspective(800px) rotateX(0deg)
				}
			
				to {
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: perspective(800px) rotateX(-180deg);
					transform: perspective(800px) rotateX(-180deg)
				}
			}
			
			.perspectiveDownReturn {
				-webkit-animation-name: perspectiveDownReturn;
				animation-name: perspectiveDownReturn
			}
			
			@-webkit-keyframes perspectiveDownReturn {
				0% {
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: perspective(800px) rotateX(-180deg);
					transform: perspective(800px) rotateX(-180deg)
				}
			
				to {
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: perspective(800px) rotateX(0deg);
					transform: perspective(800px) rotateX(0deg)
				}
			}
			
			@keyframes perspectiveDownReturn {
				0% {
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: perspective(800px) rotateX(-180deg);
					transform: perspective(800px) rotateX(-180deg)
				}
			
				to {
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: perspective(800px) rotateX(0deg);
					transform: perspective(800px) rotateX(0deg)
				}
			}
			
			.perspectiveLeft {
				-webkit-animation-name: perspectiveLeft;
				animation-name: perspectiveLeft
			}
			
			@-webkit-keyframes perspectiveLeft {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateY(0deg);
					transform: perspective(800px) rotateY(0deg)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateY(-180deg);
					transform: perspective(800px) rotateY(-180deg)
				}
			}
			
			@keyframes perspectiveLeft {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateY(0deg);
					transform: perspective(800px) rotateY(0deg)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateY(-180deg);
					transform: perspective(800px) rotateY(-180deg)
				}
			}
			
			.perspectiveLeftReturn {
				-webkit-animation-name: perspectiveLeftReturn;
				animation-name: perspectiveLeftReturn
			}
			
			@-webkit-keyframes perspectiveLeftReturn {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateY(-180deg);
					transform: perspective(800px) rotateY(-180deg)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateY(0deg);
					transform: perspective(800px) rotateY(0deg)
				}
			}
			
			@keyframes perspectiveLeftReturn {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateY(-180deg);
					transform: perspective(800px) rotateY(-180deg)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateY(0deg);
					transform: perspective(800px) rotateY(0deg)
				}
			}
			
			.perspectiveRight {
				-webkit-animation-name: perspectiveRight;
				animation-name: perspectiveRight
			}
			
			@-webkit-keyframes perspectiveRight {
				0% {
					-webkit-transform-origin: 100% 0;
					transform-origin: 100% 0;
					-webkit-transform: perspective(800px) rotateY(0deg);
					transform: perspective(800px) rotateY(0deg)
				}
			
				to {
					-webkit-transform-origin: 100% 0;
					transform-origin: 100% 0;
					-webkit-transform: perspective(800px) rotateY(180deg);
					transform: perspective(800px) rotateY(180deg)
				}
			}
			
			@keyframes perspectiveRight {
				0% {
					-webkit-transform-origin: 100% 0;
					transform-origin: 100% 0;
					-webkit-transform: perspective(800px) rotateY(0deg);
					transform: perspective(800px) rotateY(0deg)
				}
			
				to {
					-webkit-transform-origin: 100% 0;
					transform-origin: 100% 0;
					-webkit-transform: perspective(800px) rotateY(180deg);
					transform: perspective(800px) rotateY(180deg)
				}
			}
			
			.perspectiveRightReturn {
				-webkit-animation-name: perspectiveRightReturn;
				animation-name: perspectiveRightReturn
			}
			
			@-webkit-keyframes perspectiveRightReturn {
				0% {
					-webkit-transform-origin: 100% 0;
					transform-origin: 100% 0;
					-webkit-transform: perspective(800px) rotateY(180deg);
					transform: perspective(800px) rotateY(180deg)
				}
			
				to {
					-webkit-transform-origin: 100% 0;
					transform-origin: 100% 0;
					-webkit-transform: perspective(800px) rotateY(0deg);
					transform: perspective(800px) rotateY(0deg)
				}
			}
			
			@keyframes perspectiveRightReturn {
				0% {
					-webkit-transform-origin: 100% 0;
					transform-origin: 100% 0;
					-webkit-transform: perspective(800px) rotateY(180deg);
					transform: perspective(800px) rotateY(180deg)
				}
			
				to {
					-webkit-transform-origin: 100% 0;
					transform-origin: 100% 0;
					-webkit-transform: perspective(800px) rotateY(0deg);
					transform: perspective(800px) rotateY(0deg)
				}
			}
			
			.perspectiveUp {
				-webkit-animation-name: perspectiveUp;
				animation-name: perspectiveUp
			}
			
			@-webkit-keyframes perspectiveUp {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateX(0deg);
					transform: perspective(800px) rotateX(0deg)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateX(180deg);
					transform: perspective(800px) rotateX(180deg)
				}
			}
			
			@keyframes perspectiveUp {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateX(0deg);
					transform: perspective(800px) rotateX(0deg)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateX(180deg);
					transform: perspective(800px) rotateX(180deg)
				}
			}
			
			.perspectiveUpReturn {
				-webkit-animation-name: perspectiveUpReturn;
				animation-name: perspectiveUpReturn
			}
			
			@-webkit-keyframes perspectiveUpReturn {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateX(180deg);
					transform: perspective(800px) rotateX(180deg)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateX(0deg);
					transform: perspective(800px) rotateX(0deg)
				}
			}
			
			@keyframes perspectiveUpReturn {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateX(180deg);
					transform: perspective(800px) rotateX(180deg)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateX(0deg);
					transform: perspective(800px) rotateX(0deg)
				}
			}
			
			.rotateDown {
				-webkit-animation-name: rotateDown;
				animation-name: rotateDown
			}
			
			@-webkit-keyframes rotateDown {
				0% {
					opacity: 1;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateX(0deg) translateZ(0);
					transform: perspective(800px) rotateX(0deg) translateZ(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 100%;
					transform-origin: 50% 100%;
					-webkit-transform: perspective(800px) rotateX(-180deg) translateZ(300px);
					transform: perspective(800px) rotateX(-180deg) translateZ(300px)
				}
			}
			
			@keyframes rotateDown {
				0% {
					opacity: 1;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateX(0deg) translateZ(0);
					transform: perspective(800px) rotateX(0deg) translateZ(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 100%;
					transform-origin: 50% 100%;
					-webkit-transform: perspective(800px) rotateX(-180deg) translateZ(300px);
					transform: perspective(800px) rotateX(-180deg) translateZ(300px)
				}
			}
			
			.rotateLeft {
				-webkit-animation-name: rotateLeft;
				animation-name: rotateLeft
			}
			
			@-webkit-keyframes rotateLeft {
				0% {
					opacity: 1;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateY(0deg) translateZ(0);
					transform: perspective(800px) rotateY(0deg) translateZ(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 0;
					transform-origin: 50% 0;
					-webkit-transform: perspective(800px) rotateY(-180deg) translateZ(300px);
					transform: perspective(800px) rotateY(-180deg) translateZ(300px)
				}
			}
			
			@keyframes rotateLeft {
				0% {
					opacity: 1;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateY(0deg) translateZ(0);
					transform: perspective(800px) rotateY(0deg) translateZ(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 0;
					transform-origin: 50% 0;
					-webkit-transform: perspective(800px) rotateY(-180deg) translateZ(300px);
					transform: perspective(800px) rotateY(-180deg) translateZ(300px)
				}
			}
			
			.rotateRight {
				-webkit-animation-name: rotateRight;
				animation-name: rotateRight
			}
			
			@-webkit-keyframes rotateRight {
				0% {
					opacity: 1;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateY(0deg) translate3d(0);
					transform: perspective(800px) rotateY(0deg) translate3d(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 0;
					transform-origin: 50% 0;
					-webkit-transform: perspective(800px) rotateY(180deg) translateZ(150px);
					transform: perspective(800px) rotateY(180deg) translateZ(150px)
				}
			}
			
			@keyframes rotateRight {
				0% {
					opacity: 1;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateY(0deg) translate3d(0);
					transform: perspective(800px) rotateY(0deg) translate3d(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 0;
					transform-origin: 50% 0;
					-webkit-transform: perspective(800px) rotateY(180deg) translateZ(150px);
					transform: perspective(800px) rotateY(180deg) translateZ(150px)
				}
			}
			
			.rotateUp {
				-webkit-animation-name: rotateUp;
				animation-name: rotateUp
			}
			
			@-webkit-keyframes rotateUp {
				0% {
					opacity: 1;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateX(0deg) translateZ(0);
					transform: perspective(800px) rotateX(0deg) translateZ(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 0;
					transform-origin: 50% 0;
					-webkit-transform: perspective(800px) rotateX(180deg) translateZ(100px);
					transform: perspective(800px) rotateX(180deg) translateZ(100px)
				}
			}
			
			@keyframes rotateUp {
				0% {
					opacity: 1;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: perspective(800px) rotateX(0deg) translateZ(0);
					transform: perspective(800px) rotateX(0deg) translateZ(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: 50% 0;
					transform-origin: 50% 0;
					-webkit-transform: perspective(800px) rotateX(180deg) translateZ(100px);
					transform: perspective(800px) rotateX(180deg) translateZ(100px)
				}
			}
			
			.slideDown {
				-webkit-animation-name: slideDown;
				animation-name: slideDown
			}
			
			@-webkit-keyframes slideDown {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateY(0);
					transform: translateY(0)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateY(100%);
					transform: translateY(100%)
				}
			}
			
			@keyframes slideDown {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateY(0);
					transform: translateY(0)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateY(100%);
					transform: translateY(100%)
				}
			}
			
			.slideDownReturn {
				-webkit-animation-name: slideDownReturn;
				animation-name: slideDownReturn
			}
			
			@-webkit-keyframes slideDownReturn {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateY(100%);
					transform: translateY(100%)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateY(0);
					transform: translateY(0)
				}
			}
			
			@keyframes slideDownReturn {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateY(100%);
					transform: translateY(100%)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateY(0);
					transform: translateY(0)
				}
			}
			
			.slideLeft {
				-webkit-animation-name: slideLeft;
				animation-name: slideLeft
			}
			
			@-webkit-keyframes slideLeft {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateX(0);
					transform: translateX(0)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateX(-100%);
					transform: translateX(-100%)
				}
			}
			
			@keyframes slideLeft {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateX(0);
					transform: translateX(0)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateX(-100%);
					transform: translateX(-100%)
				}
			}
			
			.slideLeftReturn {
				-webkit-animation-name: slideLeftReturn;
				animation-name: slideLeftReturn
			}
			
			@-webkit-keyframes slideLeftReturn {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateX(-100%);
					transform: translateX(-100%)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateX(0);
					transform: translateX(0)
				}
			}
			
			@keyframes slideLeftReturn {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateX(-100%);
					transform: translateX(-100%)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateX(0);
					transform: translateX(0)
				}
			}
			
			.slideRight {
				-webkit-animation-name: slideRight;
				animation-name: slideRight
			}
			
			@-webkit-keyframes slideRight {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateX(0);
					transform: translateX(0)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateX(100%);
					transform: translateX(100%)
				}
			}
			
			@keyframes slideRight {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateX(0);
					transform: translateX(0)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateX(100%);
					transform: translateX(100%)
				}
			}
			
			.slideRightReturn {
				-webkit-animation-name: slideRightReturn;
				animation-name: slideRightReturn
			}
			
			@-webkit-keyframes slideRightReturn {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateX(100%);
					transform: translateX(100%)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateX(0);
					transform: translateX(0)
				}
			}
			
			@keyframes slideRightReturn {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateX(100%);
					transform: translateX(100%)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateX(0);
					transform: translateX(0)
				}
			}
			
			.slideUp {
				-webkit-animation-name: slideUp;
				animation-name: slideUp
			}
			
			@-webkit-keyframes slideUp {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateY(0);
					transform: translateY(0)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateY(-100%);
					transform: translateY(-100%)
				}
			}
			
			@keyframes slideUp {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateY(0);
					transform: translateY(0)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateY(-100%);
					transform: translateY(-100%)
				}
			}
			
			.slideUpReturn {
				-webkit-animation-name: slideUpReturn;
				animation-name: slideUpReturn
			}
			
			@-webkit-keyframes slideUpReturn {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateY(-100%);
					transform: translateY(-100%)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateY(0);
					transform: translateY(0)
				}
			}
			
			@keyframes slideUpReturn {
				0% {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateY(-100%);
					transform: translateY(-100%)
				}
			
				to {
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: translateY(0);
					transform: translateY(0)
				}
			}
			
			.openDownLeft {
				-webkit-animation-name: openDownLeft;
				animation-name: openDownLeft
			}
			
			@-webkit-keyframes openDownLeft {
				0% {
					-webkit-transform-origin: bottom left;
					transform-origin: bottom left;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			
				to {
					-webkit-transform-origin: bottom left;
					transform-origin: bottom left;
					-webkit-transform: rotate(-110deg);
					transform: rotate(-110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			}
			
			@keyframes openDownLeft {
				0% {
					-webkit-transform-origin: bottom left;
					transform-origin: bottom left;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			
				to {
					-webkit-transform-origin: bottom left;
					transform-origin: bottom left;
					-webkit-transform: rotate(-110deg);
					transform: rotate(-110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			}
			
			.openDownLeftReturn {
				-webkit-animation-name: openDownLeftReturn;
				animation-name: openDownLeftReturn
			}
			
			@-webkit-keyframes openDownLeftReturn {
				0% {
					-webkit-transform-origin: bottom left;
					transform-origin: bottom left;
					-webkit-transform: rotate(-110deg);
					transform: rotate(-110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			
				to {
					-webkit-transform-origin: bottom left;
					transform-origin: bottom left;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			}
			
			@keyframes openDownLeftReturn {
				0% {
					-webkit-transform-origin: bottom left;
					transform-origin: bottom left;
					-webkit-transform: rotate(-110deg);
					transform: rotate(-110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			
				to {
					-webkit-transform-origin: bottom left;
					transform-origin: bottom left;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			}
			
			.openDownRight {
				-webkit-animation-name: openDownRight;
				animation-name: openDownRight
			}
			
			@-webkit-keyframes openDownRight {
				0% {
					-webkit-transform-origin: bottom right;
					transform-origin: bottom right;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			
				to {
					-webkit-transform-origin: bottom right;
					transform-origin: bottom right;
					-webkit-transform: rotate(110deg);
					transform: rotate(110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			}
			
			@keyframes openDownRight {
				0% {
					-webkit-transform-origin: bottom right;
					transform-origin: bottom right;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			
				to {
					-webkit-transform-origin: bottom right;
					transform-origin: bottom right;
					-webkit-transform: rotate(110deg);
					transform: rotate(110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			}
			
			.openDownRightReturn {
				-webkit-animation-name: openDownRightReturn;
				animation-name: openDownRightReturn
			}
			
			@-webkit-keyframes openDownRightReturn {
				0% {
					-webkit-transform-origin: bottom right;
					transform-origin: bottom right;
					-webkit-transform: rotate(110deg);
					transform: rotate(110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			
				to {
					-webkit-transform-origin: bottom right;
					transform-origin: bottom right;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			}
			
			@keyframes openDownRightReturn {
				0% {
					-webkit-transform-origin: bottom right;
					transform-origin: bottom right;
					-webkit-transform: rotate(110deg);
					transform: rotate(110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			
				to {
					-webkit-transform-origin: bottom right;
					transform-origin: bottom right;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			}
			
			.openUpLeft {
				-webkit-animation-name: openUpLeft;
				animation-name: openUpLeft
			}
			
			@-webkit-keyframes openUpLeft {
				0% {
					-webkit-transform-origin: top left;
					transform-origin: top left;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			
				to {
					-webkit-transform-origin: top left;
					transform-origin: top left;
					-webkit-transform: rotate(110deg);
					transform: rotate(110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			}
			
			@keyframes openUpLeft {
				0% {
					-webkit-transform-origin: top left;
					transform-origin: top left;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			
				to {
					-webkit-transform-origin: top left;
					transform-origin: top left;
					-webkit-transform: rotate(110deg);
					transform: rotate(110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			}
			
			.openUpLeftReturn {
				-webkit-animation-name: openUpLeftReturn;
				animation-name: openUpLeftReturn
			}
			
			@-webkit-keyframes openUpLeftReturn {
				0% {
					-webkit-transform-origin: top left;
					transform-origin: top left;
					-webkit-transform: rotate(110deg);
					transform: rotate(110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			
				to {
					-webkit-transform-origin: top left;
					transform-origin: top left;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			}
			
			@keyframes openUpLeftReturn {
				0% {
					-webkit-transform-origin: top left;
					transform-origin: top left;
					-webkit-transform: rotate(110deg);
					transform: rotate(110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			
				to {
					-webkit-transform-origin: top left;
					transform-origin: top left;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			}
			
			.openUpRight {
				-webkit-animation-name: openUpRight;
				animation-name: openUpRight
			}
			
			@-webkit-keyframes openUpRight {
				0% {
					-webkit-transform-origin: top right;
					transform-origin: top right;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			
				to {
					-webkit-transform-origin: top right;
					transform-origin: top right;
					-webkit-transform: rotate(-110deg);
					transform: rotate(-110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			}
			
			@keyframes openUpRight {
				0% {
					-webkit-transform-origin: top right;
					transform-origin: top right;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			
				to {
					-webkit-transform-origin: top right;
					transform-origin: top right;
					-webkit-transform: rotate(-110deg);
					transform: rotate(-110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			}
			
			.openUpRightReturn {
				-webkit-animation-name: openUpRightReturn;
				animation-name: openUpRightReturn
			}
			
			@-webkit-keyframes openUpRightReturn {
				0% {
					-webkit-transform-origin: top right;
					transform-origin: top right;
					-webkit-transform: rotate(-110deg);
					transform: rotate(-110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			
				to {
					-webkit-transform-origin: top right;
					transform-origin: top right;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			}
			
			@keyframes openUpRightReturn {
				0% {
					-webkit-transform-origin: top right;
					transform-origin: top right;
					-webkit-transform: rotate(-110deg);
					transform: rotate(-110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			
				to {
					-webkit-transform-origin: top right;
					transform-origin: top right;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			}
			
			.openDownLeftOut {
				-webkit-animation-name: openDownLeftOut;
				animation-name: openDownLeftOut
			}
			
			@-webkit-keyframes openDownLeftOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: bottom left;
					transform-origin: bottom left;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: bottom left;
					transform-origin: bottom left;
					-webkit-transform: rotate(-110deg);
					transform: rotate(-110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			}
			
			@keyframes openDownLeftOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: bottom left;
					transform-origin: bottom left;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: bottom left;
					transform-origin: bottom left;
					-webkit-transform: rotate(-110deg);
					transform: rotate(-110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			}
			
			.openDownRightOut {
				-webkit-animation-name: openDownRightOut;
				animation-name: openDownRightOut
			}
			
			@-webkit-keyframes openDownRightOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: bottom right;
					transform-origin: bottom right;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: bottom right;
					transform-origin: bottom right;
					-webkit-transform: rotate(110deg);
					transform: rotate(110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			}
			
			@keyframes openDownRightOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: bottom right;
					transform-origin: bottom right;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: bottom right;
					transform-origin: bottom right;
					-webkit-transform: rotate(110deg);
					transform: rotate(110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			}
			
			.openUpLeftOut {
				-webkit-animation-name: openUpLeftOut;
				animation-name: openUpLeftOut
			}
			
			@-webkit-keyframes openUpLeftOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: top left;
					transform-origin: top left;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: top left;
					transform-origin: top left;
					-webkit-transform: rotate(110deg);
					transform: rotate(110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			}
			
			@keyframes openUpLeftOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: top left;
					transform-origin: top left;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: top left;
					transform-origin: top left;
					-webkit-transform: rotate(110deg);
					transform: rotate(110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			}
			
			.openUpRightOut {
				-webkit-animation-name: openUpRightOut;
				animation-name: openUpRightOut
			}
			
			@-webkit-keyframes openUpRightOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: top right;
					transform-origin: top right;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: top right;
					transform-origin: top right;
					-webkit-transform: rotate(-110deg);
					transform: rotate(-110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			}
			
			@keyframes openUpRightOut {
				0% {
					opacity: 1;
					-webkit-transform-origin: top right;
					transform-origin: top right;
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
					-webkit-animation-timing-function: ease-out;
					animation-timing-function: ease-out
				}
			
				to {
					opacity: 0;
					-webkit-transform-origin: top right;
					transform-origin: top right;
					-webkit-transform: rotate(-110deg);
					transform: rotate(-110deg);
					-webkit-animation-timing-function: ease-in-out;
					animation-timing-function: ease-in-out
				}
			}
			
			.tinDownIn {
				-webkit-animation-name: tinDownIn;
				animation-name: tinDownIn
			}
			
			@-webkit-keyframes tinDownIn {
				0% {
					opacity: 0;
					-webkit-transform: scale(1) translateY(900%);
					transform: scale(1) translateY(900%)
				}
			
				50%,
				70%,
				90% {
					opacity: 1;
					-webkit-transform: scale(1.1) translateY(0);
					transform: scale(1.1) translateY(0)
				}
			
				60%,
				80%,
				to {
					opacity: 1;
					-webkit-transform: scale(1) translateY(0);
					transform: scale(1) translateY(0)
				}
			}
			
			@keyframes tinDownIn {
				0% {
					opacity: 0;
					-webkit-transform: scale(1) translateY(900%);
					transform: scale(1) translateY(900%)
				}
			
				50%,
				70%,
				90% {
					opacity: 1;
					-webkit-transform: scale(1.1) translateY(0);
					transform: scale(1.1) translateY(0)
				}
			
				60%,
				80%,
				to {
					opacity: 1;
					-webkit-transform: scale(1) translateY(0);
					transform: scale(1) translateY(0)
				}
			}
			
			.tinDownOut {
				-webkit-animation-name: tinDownOut;
				animation-name: tinDownOut
			}
			
			@-webkit-keyframes tinDownOut {
			
				0%,
				20%,
				40%,
				50% {
					opacity: 1;
					-webkit-transform: scale(1) translateY(0);
					transform: scale(1) translateY(0)
				}
			
				10%,
				30% {
					opacity: 1;
					-webkit-transform: scale(1.1) translateY(0);
					transform: scale(1.1) translateY(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform: scale(1) translateY(900%);
					transform: scale(1) translateY(900%)
				}
			}
			
			@keyframes tinDownOut {
			
				0%,
				20%,
				40%,
				50% {
					opacity: 1;
					-webkit-transform: scale(1) translateY(0);
					transform: scale(1) translateY(0)
				}
			
				10%,
				30% {
					opacity: 1;
					-webkit-transform: scale(1.1) translateY(0);
					transform: scale(1.1) translateY(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform: scale(1) translateY(900%);
					transform: scale(1) translateY(900%)
				}
			}
			
			.tinLeftIn {
				-webkit-animation-name: tinLeftIn;
				animation-name: tinLeftIn
			}
			
			@-webkit-keyframes tinLeftIn {
				0% {
					opacity: 0;
					-webkit-transform: scale(1) translateX(-900%);
					transform: scale(1) translateX(-900%)
				}
			
				50%,
				70%,
				90% {
					opacity: 1;
					-webkit-transform: scale(1.1) translateX(0);
					transform: scale(1.1) translateX(0)
				}
			
				60%,
				80%,
				to {
					opacity: 1;
					-webkit-transform: scale(1) translateX(0);
					transform: scale(1) translateX(0)
				}
			}
			
			@keyframes tinLeftIn {
				0% {
					opacity: 0;
					-webkit-transform: scale(1) translateX(-900%);
					transform: scale(1) translateX(-900%)
				}
			
				50%,
				70%,
				90% {
					opacity: 1;
					-webkit-transform: scale(1.1) translateX(0);
					transform: scale(1.1) translateX(0)
				}
			
				60%,
				80%,
				to {
					opacity: 1;
					-webkit-transform: scale(1) translateX(0);
					transform: scale(1) translateX(0)
				}
			}
			
			.tinLeftOut {
				-webkit-animation-name: tinLeftOut;
				animation-name: tinLeftOut
			}
			
			@-webkit-keyframes tinLeftOut {
			
				0%,
				20%,
				40%,
				50% {
					opacity: 1;
					-webkit-transform: scale(1) translateX(0);
					transform: scale(1) translateX(0)
				}
			
				10%,
				30% {
					opacity: 1;
					-webkit-transform: scale(1.1) translateX(0);
					transform: scale(1.1) translateX(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform: scale(1) translateX(-900%);
					transform: scale(1) translateX(-900%)
				}
			}
			
			@keyframes tinLeftOut {
			
				0%,
				20%,
				40%,
				50% {
					opacity: 1;
					-webkit-transform: scale(1) translateX(0);
					transform: scale(1) translateX(0)
				}
			
				10%,
				30% {
					opacity: 1;
					-webkit-transform: scale(1.1) translateX(0);
					transform: scale(1.1) translateX(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform: scale(1) translateX(-900%);
					transform: scale(1) translateX(-900%)
				}
			}
			
			.tinRightIn {
				-webkit-animation-name: tinRightIn;
				animation-name: tinRightIn
			}
			
			@-webkit-keyframes tinRightIn {
				0% {
					opacity: 0;
					-webkit-transform: scale(1) translateX(900%);
					transform: scale(1) translateX(900%)
				}
			
				50%,
				70%,
				90% {
					opacity: 1;
					-webkit-transform: scale(1.1) translateX(0);
					transform: scale(1.1) translateX(0)
				}
			
				60%,
				80%,
				to {
					opacity: 1;
					-webkit-transform: scale(1) translateX(0);
					transform: scale(1) translateX(0)
				}
			}
			
			@keyframes tinRightIn {
				0% {
					opacity: 0;
					-webkit-transform: scale(1) translateX(900%);
					transform: scale(1) translateX(900%)
				}
			
				50%,
				70%,
				90% {
					opacity: 1;
					-webkit-transform: scale(1.1) translateX(0);
					transform: scale(1.1) translateX(0)
				}
			
				60%,
				80%,
				to {
					opacity: 1;
					-webkit-transform: scale(1) translateX(0);
					transform: scale(1) translateX(0)
				}
			}
			
			.tinRightOut {
				-webkit-animation-name: tinRightOut;
				animation-name: tinRightOut
			}
			
			@-webkit-keyframes tinRightOut {
			
				0%,
				20%,
				40%,
				50% {
					opacity: 1;
					-webkit-transform: scale(1) translateX(0);
					transform: scale(1) translateX(0)
				}
			
				10%,
				30% {
					opacity: 1;
					-webkit-transform: scale(1.1) translateX(0);
					transform: scale(1.1) translateX(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform: scale(1) translateX(900%);
					transform: scale(1) translateX(900%)
				}
			}
			
			@keyframes tinRightOut {
			
				0%,
				20%,
				40%,
				50% {
					opacity: 1;
					-webkit-transform: scale(1) translateX(0);
					transform: scale(1) translateX(0)
				}
			
				10%,
				30% {
					opacity: 1;
					-webkit-transform: scale(1.1) translateX(0);
					transform: scale(1.1) translateX(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform: scale(1) translateX(900%);
					transform: scale(1) translateX(900%)
				}
			}
			
			.tinUpIn {
				-webkit-animation-name: tinUpIn;
				animation-name: tinUpIn
			}
			
			@-webkit-keyframes tinUpIn {
				0% {
					opacity: 0;
					-webkit-transform: scale(1) translateY(-900%);
					transform: scale(1) translateY(-900%)
				}
			
				50%,
				70%,
				90% {
					opacity: 1;
					-webkit-transform: scale(1.1) translateY(0);
					transform: scale(1.1) translateY(0)
				}
			
				60%,
				80%,
				to {
					opacity: 1;
					-webkit-transform: scale(1) translateY(0);
					transform: scale(1) translateY(0)
				}
			}
			
			@keyframes tinUpIn {
				0% {
					opacity: 0;
					-webkit-transform: scale(1) translateY(-900%);
					transform: scale(1) translateY(-900%)
				}
			
				50%,
				70%,
				90% {
					opacity: 1;
					-webkit-transform: scale(1.1) translateY(0);
					transform: scale(1.1) translateY(0)
				}
			
				60%,
				80%,
				to {
					opacity: 1;
					-webkit-transform: scale(1) translateY(0);
					transform: scale(1) translateY(0)
				}
			}
			
			.tinUpOut {
				-webkit-animation-name: tinUpOut;
				animation-name: tinUpOut
			}
			
			@-webkit-keyframes tinUpOut {
			
				0%,
				20%,
				40%,
				50% {
					opacity: 1;
					-webkit-transform: scale(1) translateY(0);
					transform: scale(1) translateY(0)
				}
			
				10%,
				30% {
					opacity: 1;
					-webkit-transform: scale(1.1) translateY(0);
					transform: scale(1.1) translateY(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform: scale(1) translateY(-900%);
					transform: scale(1) translateY(-900%)
				}
			}
			
			@keyframes tinUpOut {
			
				0%,
				20%,
				40%,
				50% {
					opacity: 1;
					-webkit-transform: scale(1) translateY(0);
					transform: scale(1) translateY(0)
				}
			
				10%,
				30% {
					opacity: 1;
					-webkit-transform: scale(1.1) translateY(0);
					transform: scale(1.1) translateY(0)
				}
			
				to {
					opacity: 0;
					-webkit-transform: scale(1) translateY(-900%);
					transform: scale(1) translateY(-900%)
				}
			}
			
			.magictime {
				-webkit-animation-duration: 1s;
				animation-duration: 1s;
				-webkit-animation-fill-mode: both;
				animation-fill-mode: both
			}
			
			@media (prefers-reduced-motion),
			(print) {
				.magictime {
					-webkit-animation: unset !important;
					animation: unset !important;
					-webkit-transition: none !important;
					transition: none !important
				}
			}
			
			html {
				width: 100%;
				height: 100%;
				margin: 0;
				padding: 0;
				overflow: hidden;
			}
			
			body {
				width: 100%;
				height: 100%;
				margin: 0;
				padding: 0;
				overflow: hidden;
				position: fixed
			}
			
			.page-1 {
				display: block;
				width: 100%;
				height: 100%;
				text-align: center
			}
			
			.img1{
				left:0;object-fit:contain;top:0;width:100%;height:100%;z-index:100;position:absolute;
			}
			`
			document.head.appendChild(this.styleEl);
			this.scriptEl = document.createElement('script');
			this.scriptEl.id = `${id}_script`;
			this.scriptEl.type = 'text/javascript';
			this.scriptEl.innerHTML =''
	
			document.head.appendChild(this.scriptEl);

			const container = document.getElementById(this.container);

			container.appendChild(this.element);
			this.element.innerHTML = `<div class="page-1">
			</div>`;
		}
	},
});

ImageScroll.fromObject = (options: ImageScrollObject, callback: (obj: ImageScrollObject) => any) => {
	return callback(new ImageScroll(options.code, options));
};

// @ts-ignore
window.fabric.ImageScroll = ImageScroll;

export default ImageScroll;
