import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  notification } from 'antd';
import PlaylistEditor from './PlaylistEditor';

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
			data: '',
			animation: 'slideRightReturn'
		 },
		visible: false,
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			code: nextProps.value ||
			{
			data: '',
			animation: 'slideRightReturn' },
		});
	}
	
	render() {
		const { onOk,  onClick } = this.handlers;
		const { form,code } = this.props;
		const {
			code: {},
		} = this.state;
		
		return (
			<React.Fragment>
					<PlaylistEditor
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
