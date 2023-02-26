import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Button, notification } from 'antd';
import Icon from '../icon/Icon';
import TickerEditor from './TickerEditor';

notification.config({
	top: 80,
	duration: 1,
});

class AceModal extends Component {
	static propTypes = {
		value: PropTypes.any,
		onChange: PropTypes.func,
		form: PropTypes.any,
	};

	handlers = {
		onOk: () => {
			const { onChange } = this.props;
			const code = this.aceRef.handlers.getCodes();
			onChange(code);
			this.setState({
				visible: false,
				code,
			});
			debugger
		},
		onCancel: () => {
			this.modalHandlers.onHide();
		},
		onClick: () => {
			this.modalHandlers.onShow();
		},
	};

	modalHandlers = {
		onShow: () => {
			this.setState({
				visible: true,
			});
		},
		onHide: () => {
			this.setState({
				visible: false,
			});
		},
	};

	state = {
		code: this.props.value || { 
		tickerText: 'Ticker Text',
		fontSize: '32',
		fontFam: 'Impact',
		background: '#000',
		scrollSpeed: '32',
		fontColor: '#fff',
		direction: 'LEFT' },
		visible: false,
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			code: nextProps.value || { tickerText: 'Ticker Text',
			fontSize: '32',
			fontFam: 'Impact',
			background: '#000',
			scrollSpeed: '32',
			fontColor: '#fff',
			direction: 'LEFT' },
		});
	}
	
	render() {
		const { onOk, onCancel, onClick } = this.handlers;
		const { form,code } = this.props;
		const {
			code: {},
			visible,
		} = this.state;
		const label = (
			<React.Fragment>
				<span style={{ marginRight: 8 }}>Code Editor</span>
				<Button onClick={onClick} shape="circle">
					<Icon name="code" />
				</Button>
			</React.Fragment>
		);
		return (
			<React.Fragment>
					<TickerEditor
						ref={(c) => {
							this.aceRef = c;
						}}
						tickerText={code.tickerText}
						fontSize={code.fontSize}
						fontFam={code.fontFam}
						background={code.background}
						duration={code.duration}
						fontColor={code.fontColor}
						scrollSpeed={code.scrollSpeed}
						onOk={onOk}
					/>
			</React.Fragment>
		);
	}
}

export default AceModal;
