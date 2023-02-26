import { fabric } from 'fabric';
import { FabricTicker, toObject } from '../utils';

export interface Code {
	tickerText: string;
	fontSize: string;
	fontFam: string;
	background: string;
	scrollSpeed: string;
	fontColor: string;
	direction: string;

}

export interface FabricObject extends FabricTicker {
	setSource: (source: Code) => void;
	setCode: (code: Code) => void;
	code: Code;
	


}

const initialCode: Code = {
	tickerText: 'Ticker Text',
	fontSize: '32',
	fontFam: 'Impact',
	background: '#000',
	scrollSpeed: '32',
	fontColor: '#fff',
	direction: 'LEFT'
};

const Ticker = fabric.util.createClass(fabric.Rect, {
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
		console.log("source", source);
	},
	setCode(code = initialCode) {
		this.set({
			code,
		});
		debugger
		console.log("source", code);
		const { tickerText, fontSize, fontFam, background, scrollSpeed, fontColor, direction } = code;
		let dr = '', from = '', to = '';
		if (direction === "LEFT") {
			dr = '';
			to = '-';
			from = '';
		}
		else if (direction === "RIGHT") {
			dr = '-';
			from = '-';
			to = '';
		}
		else if (direction === "UP") {
			dr = '';
			from = '';
			to = '-';
		}
		else if (direction === "DOWN") {
			dr = '-';
			from = '-';
			to = '';
		}
		this.styleEl.innerHTML = `.scroll-left {
			height: 100%;
overflow: hidden;
position: relative;
background: ${background};
		  }
#scroll-text{
word-break: keep-all;
white-space: nowrap;
display: flex;
align-items: center;
justify-content: center;
position: absolute;
width: 100%;
height: 100%;
margin: 0;
line-height: 50px;
text-align: center;
-moz-transform: translateX(${dr}100%);
-webkit-transform: translateX(${dr}100%);
transform: translateX(${dr}100%);

-moz-animation: my-animation ${scrollSpeed}s linear infinite;
-webkit-animation: my-animation ${scrollSpeed}s linear infinite;
animation: my-animation ${scrollSpeed}s linear infinite;
}

/* for Firefox */
@-moz-keyframes my-animation {
from { -moz-transform: translateX(${from}100%); }
to { -moz-transform: translateX(${to}100%); }
}

/* for Chrome */
@-webkit-keyframes my-animation {
from { -webkit-transform: translateX(${from}100%); }
to { -webkit-transform: translateX(${to}100%); }
}

@keyframes my-animation {
from {
  -moz-transform: translateX(${from}100%);
  -webkit-transform: translateX(${from}100%);
  transform: translateX(${from}100%);
}
to {
  -moz-transform: translateX(${to}100%);
  -webkit-transform: translateX(${to}100%);
  transform: translateX(${to}100%);
}
} `;


		this.element.innerHTML = `<div id="scroll-container" class="scroll-left">
		  <p id="scroll-text" 
		  style="font-family:${fontFam};
		  color: ${fontColor};
		  font-size: ${fontSize}px;
		  ;">${tickerText ? tickerText : "ticker Text Here ..."}<p>
		</div>`;

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
			const { fontFam, fontColor, fontSize, tickerText, background,  scrollSpeed } = code;
			this.styleEl = document.createElement('style');
			this.styleEl.id = `${id}_style`;
			this.styleEl.type = 'text/css';
			this.styleEl.innerHTML = `.scroll-left {
				height: 100%;
                overflow: hidden;
                position: relative;
                background: ${background};
			  }
			  #scroll-text{
				word-break: keep-all;
				white-space: nowrap;
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				width: 100%;
				height: 100%;
				margin: 0;
				line-height: 50px;
				text-align: center;
				-moz-transform: translateX(100%);
				-webkit-transform: translateX(100%);
				transform: translateX(100%);
				
				-moz-animation: my-animation ${scrollSpeed}s linear infinite;
				-webkit-animation: my-animation ${scrollSpeed}s linear infinite;
				animation: my-animation ${scrollSpeed}s linear infinite;
				}
				
				/* for Firefox */
				@-moz-keyframes my-animation {
				from { -moz-transform: translateX(100%); }
				to { -moz-transform: translateX(-100%); }
				}
				
				/* for Chrome */
				@-webkit-keyframes my-animation {
				from { -webkit-transform: translateX(100%); }
				to { -webkit-transform: translateX(-100%); }
				}
				
				@keyframes my-animation {
				from {
				  -moz-transform: translateX(100%);
				  -webkit-transform: translateX(100%);
				  transform: translateX(100%);
				}
				to {
				  -moz-transform: translateX(-100%);
				  -webkit-transform: translateX(-100%);
				  transform: translateX(-100%);
				}
				} `;

			document.head.appendChild(this.styleEl);
			this.scriptEl = document.createElement('script');
			this.scriptEl.id = `${id}_script`;
			this.scriptEl.type = 'text/javascript';
			this.scriptEl.innerHTML = "";
			document.head.appendChild(this.scriptEl);

			const container = document.getElementById(this.container);
			container.appendChild(this.element);
			this.element.innerHTML = `<div id="scroll-container" class="scroll-left">
			<p id="scroll-text" 
			style="font-family:${fontFam};
			color: ${fontColor};
			font-size: ${fontSize}px;
			;">${tickerText ? tickerText : "ticker Text Here ..."}<p>
		  </div>`;
		}
	},
});

Ticker.fromObject = (options: FabricObject, callback: (obj: FabricObject) => any) => {
	return callback(new Ticker(options.code, options));
};

// @ts-ignore
window.fabric.Ticker = Ticker;

export default Ticker;
