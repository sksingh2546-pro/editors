import { fabric } from 'fabric';
import { FabricElement, toObject } from '../utils';

export interface ClockObject extends FabricElement {
	setSource: (source: string) => void;
	setSrc: (src: string) => void;
	src: string;
	iframeElement: HTMLIFrameElement;
}

const Clock = fabric.util.createClass(fabric.Rect, {
	type: 'iframe',
	superType: 'element',
	hasRotatingPoint: false,
	initialize(src: string = '', options: any) {
		options = options || {};
		this.callSuper('initialize', options);
		this.set({
			src:src?sessionStorage.getItem("clockUrl"):"https://summitsignage.com/pub/plugins/clock.html?set=true&timezone_1=Asia~Kolkata&timezone_2=America~Toronto&timezone_3=Asia~Dubai&timezone_4=Europe~Andorra&bg=000000&fontfam=DS-Digital&count=4",
			fill: 'rgba(255, 255, 255, 0)',
			stroke: 'rgba(255, 255, 255, 0)',
		});
	},
	setSource(source: any) {
		this.setSrc(source?sessionStorage.getItem("clockUrl"):"https://summitsignage.com/pub/plugins/clock.html?set=true&timezone_1=Asia~Kolkata&timezone_2=America~Toronto&timezone_3=Asia~Dubai&timezone_4=Europe~Andorra&bg=000000&fontfam=DS-Digital&count=4");
	},
	setSrc(src: string) {
		src=src?sessionStorage.getItem("clockUrl"):"https://summitsignage.com/pub/plugins/clock.html?set=true&timezone_1=Asia~Kolkata&timezone_2=America~Toronto&timezone_3=Asia~Dubai&timezone_4=Europe~Andorra&bg=000000&fontfam=DS-Digital&count=4"
		this.set({
			src,
		});
		this.iframeElement.src = src;
	},
	toObject(propertiesToInclude: string[]) {
		return toObject(this, propertiesToInclude, {
			src: this.get('src'),
			container: this.get('container'),
			editable: this.get('editable'),
		});
	},
	_render(ctx: CanvasRenderingContext2D) {
		this.callSuper('_render', ctx);
		if (!this.element) {
			const { id, scaleX, scaleY, width, height, angle, editable, src } = this;
			const zoom = this.canvas.getZoom();
			const left = this.calcCoords().tl.x;
			const top = this.calcCoords().tl.y;
			const padLeft = (width * scaleX * zoom - width) / 2;
			const padTop = (height * scaleY * zoom - height) / 2;
			this.iframeElement = fabric.util.makeElement('iframe', {
				id,
				src,
				width: '100%',
				height: '100%',
			});
			this.element = fabric.util.wrapElement(this.iframeElement, 'div', {
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
			const container = document.getElementById(this.container);
			container.appendChild(this.element);
		}
	},
});

Clock.fromObject = (options: ClockObject, callback: (obj: ClockObject) => any) => {
	return callback(new Clock(options.src, options));
};

// @ts-ignore
window.fabric.Iframe = Clock;

export default Clock;
