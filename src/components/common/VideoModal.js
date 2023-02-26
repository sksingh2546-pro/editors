import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Button, Input } from 'antd';
import i18n from 'i18next';
import './ImageModal.css'

class UrlModal extends Component {
	handlers = {
		onOk: () => {
			const { onChange } = this.props;
			const { tempUrl } = this.state;
			onChange(tempUrl);
			this.setState({
				visible: false,
				url: tempUrl,
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

	static propTypes = {
		value: PropTypes.any,
		onChange: PropTypes.func,
		form: PropTypes.any,
	};

	state = {
		url: this.props.value || '',
		tempUrl: '',
		visible: false,
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			url: nextProps.value || '',
		});
	}

	render() {
		const { onOk, onCancel, onClick } = this.handlers;
		const { form } = this.props;
		const { getFieldDecorator } = form;
		const { url, visible } = this.state;
		const mediaData=JSON.parse(sessionStorage.getItem("media"))
		const label = (
			<React.Fragment>
			<Button onClick={onClick} style={{ background: "linear-gradient(-45deg, #87f87b, #b53cc3, #208fed)", color: "white",marginLeft:"-20px" }}>
					Select From Library
				</Button>
			</React.Fragment>
		);
		return (
			<React.Fragment>
				<Form.Item label={label} colon={false}>
					{getFieldDecorator('url', {
						rules: [
							{
								required: true,
								message: i18n.t('validation.enter-property', { arg: i18n.t('common.url') }),
							},
						],
						initialValue: url || '',
					})(<span style={{ wordBreak: 'break-all' }}>{url}</span>)}
				</Form.Item>
				<Modal width={1000}
				style={{ height: "500px", top: 20 }}
				 onCancel={onCancel}
				  onOk={onOk} visible={visible}
				  title="Select Image"
				  >
					{/* <Form.Item label={i18n.t('common.url')} colon={false}>
						<Input
							defaultValue={url}
							onChange={e => {
								this.setState({ tempUrl: e.target.value });
							}}
						/>
					</Form.Item> */}
					<ul style={{ listStyleType: "none" }}>
						{mediaData&& mediaData.map((value,i)=>(
						(value.mediaType==="VIDEO"&&
						<li style={{ display: "inline-block" }}><input type="radio" name="video" id={"cb1"+(i+1)} onChange={e => {
							this.setState({ tempUrl:value.original });
							sessionStorage.setItem("appMedia",sessionStorage.getItem("appMedia")+","+value.original);
						}} />
							<label for={"cb1"+(i+1)}><img src={value.thumbnail} /></label>
						</li>
	)))}
					</ul>
				</Modal>
			</React.Fragment>
		);
	}
}

export default UrlModal;
