import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Button, notification } from 'antd';
import Icon from '../icon/Icon';
import SlideEditor from './SlideEditor';

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
			const code = this.aceRef.handlers.getCodes1();
			onChange(code);
			this.setState({
				visible: false,
				code,
			});
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
			data: 'https://summitsignage.com/design-editor/2.png,https://summitsignage.com/design-editor/1.png',
			duration: "10",
			animation: 'slideRightReturn'
		 },
		visible: false,
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			code: nextProps.value || { data: 'https://summitsignage.com/design-editor/2.png,https://summitsignage.com/design-editor/1.png',
			duration: "10",
			animation: 'slideRightReturn' },
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
					<SlideEditor
						ref={(c) => {
							this.aceRef = c;
						}}
						data={code.data}
						animation={code.animation}
						duration={code.duration}
						onOk={onOk}
					/>
			</React.Fragment>
		);
	}
}

export default AceModal;
