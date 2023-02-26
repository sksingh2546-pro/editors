import { fabric } from 'fabric';
import { FabricElement, toObject } from '../utils';

export interface IframeObject extends FabricElement {
	setSource: (source: string) => void;
	setSrc: (src: string) => void;
    setFile: (file: File) => void;
	src: string;
    file?: File;
	iframeElement: HTMLIFrameElement;
}

const Iframe = fabric.util.createClass(fabric.Rect, {
	type: 'iframe',
	superType: 'element',
	hasRotatingPoint: false,
	initialize(src: string = '', options: any) {
		options = options || {};
		this.callSuper('initialize', options);
		this.set({
			src,
			fill: 'rgba(255, 255, 255, 0)',
			stroke: 'rgba(255, 255, 255, 0)',
		});
	},
	setSource(source: any) {
		if (source instanceof File) {
			this.setFile(source);
		} else {
			this.setSrc(source);
		}
	},
    setFile(file: File) {
		this.set({
			file,
			src: null,
		});
		const reader = new FileReader();
		reader.onload = () => {
			this.iframeElement.src = reader.result;
		};
		reader.readAsDataURL(file);
	},
	setSrc(src: string) {
		this.set({
			src,
		});
		this.iframeElement.src = src;
	},
	toObject(propertiesToInclude: string[]) {
		return toObject(this, propertiesToInclude, {
			src: this.get('src'),
            file: this.get('file'),
			container: this.get('container'),
			editable: this.get('editable'),
		});
	},
	_render(ctx: CanvasRenderingContext2D) {
		this.callSuper('_render', ctx);
		if (!this.element) {
			const { id, scaleX, scaleY, width, height, angle, editable, src,file } = this;
			const zoom = this.canvas.getZoom();
			const left = this.calcCoords().tl.x;
			const top = this.calcCoords().tl.y;
			const padLeft = (width * scaleX * zoom - width) / 2;
			const padTop = (height * scaleY * zoom - height) / 2;
			this.iframeElement = fabric.util.makeElement('iframe', {
				id,
				src,
                allow:"display-capture",
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
            if (src) {
				this.setSrc(src);
			} else if (file) {
				this.setFile(file);
			}
		}
	},
});

Iframe.fromObject = (options: IframeObject, callback: (obj: IframeObject) => any) => {
	return callback(new Iframe(options.src, options));
};

// @ts-ignore
window.fabric.Iframe = Iframe;
export default Iframe;