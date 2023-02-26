import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Button, Input } from 'antd';

class UrlModal extends Component {
	handlers = {
		onOk: () => {
			const { onChange } = this.props;
			onChange({ tempUrl: sessionStorage.getItem("clockUrl") });
			this.setState({
				visible: false,
				url: { tempUrl: sessionStorage.getItem("clockUrl") },
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
		window.addEventListener("message", (event) => {
			// Do we trust the sender of this message?  (might be
			// different from what we originally opened, for example).
			console.log(event.data);
			if (event.origin === "https://summitsignage.com") {
				if (typeof event.data === 'string') {
					if (event.data.includes("ratings.html")) {
						//this.setState({ tempUrl: event.data });
						sessionStorage.setItem("displayUrl", event.data.replace("set=true&", ""));

						return;
					}
					else if (event.data.includes("weather.html")) {
						sessionStorage.setItem("weatherUrl", event.data.replace("set=true&", ""));
						return;
					}
					else if (event.data.includes("clock.html")) {
						sessionStorage.setItem("clockUrl", event.data.replace("set=true&", ""));
						return;
					}
					else {
						return;
					}
				}
				else {
					return;
				}
			}
			else {
				return;
			}
			// event.source is popup
			// event.data is "hi there yourself!  the secret response is: rheeeeet!"
		}, false);
		const label = (
			<React.Fragment>
				<Button onClick={onClick}
					style={{ background: "linear-gradient(-45deg, #87f87b, #b53cc3, #208fed)", color: "white" }}>
					Add Data
				</Button>
			</React.Fragment>
		);
		return (
			<React.Fragment>
				<Form.Item label={label} colon={false}>
					{/* {getFieldDecorator('url', {
						rules: [
							{
								required: true,
								message: i18n.t('validation.enter-property', { arg: i18n.t('common.url') }),
							},
						],
						initialValue: url || '',
					})(<span style={{ wordBreak: 'break-all' }}>{url}</span>)} */}
				</Form.Item>
				<Modal
				width={1000}
				style={{ height: "500px", top: 20 }}
				onCancel={onCancel}
				onOk={onOk}
				okText="Save"
				title="Select And Customization"

				visible={visible}>
				<div
					dangerouslySetInnerHTML={{
						__html: `<iframe 
			  title='WebView'
			  src=${sessionStorage.getItem("clockUrl")?sessionStorage.getItem("clockUrl")+"&set=true":"https://summitsignage.com/pub/plugins/clock.html?set=true&timezone_1=Asia~Kolkata&timezone_2=America~Toronto&timezone_3=Asia~Dubai&timezone_4=Europe~Andorra&bg=000000&fontfam=DS-Digital&count=4"} 
			  height="500px"
			  width="100%" 
			  scrolling={true} 
			  frameBorder='0' 
			  marginHeight='0'
			  marginWidth='0'
			  padding='0'
			  frameborder="no" 
			  allowtransparency="true"
			   allowfullscreen="true"
			/>`
					}}
					></div>
				</Modal>
			</React.Fragment>
		);
	}
}

export default UrlModal;
