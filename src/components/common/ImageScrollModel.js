import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Button } from 'antd';
import './ImageScrollModal.css'


class UrlModal extends Component {
	handlers = {
		onOk: () => {
			const { getData } = this.props;
			
			getData(this.state.data);
			this.setState({
				visible: false,
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
		data:[]
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			url: nextProps.value || '',
		});
	}

    

	render() {
		const { onOk, onCancel, onClick } = this.handlers;
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
					<span style={{ wordBreak: 'break-all' }}>{url}</span>
				</Form.Item>
				<Modal width={1000}
				style={{ height: "500px", top: 20 }}
				 onCancel={onCancel}
				  onOk={onOk} visible={visible}
				  title="Select Image"
				  >
					<ul style={{ listStyleType: "none" }}>
						{mediaData&& mediaData.map((value,i)=>(
						(value.mediaType==="IMAGE"?
						<li style={{ display: "inline-block" }}><input type="checkbox" onLoad={(e)=>{getDuration(e)}} name="image" id={"cb"+(i+1)} onChange={e => {
							console.log("E",e.target.checked)
							if(e.target.checked){
							this.setState(prevState => ({
								data: [...prevState.data,{data:value.original,duration:10}]
							  }))
							}
							else{
								let newArray=[];
								for(var key in this.state.data){
									debugger
									if(this.state.data[key].data!==value.original){
										newArray.push(value.original)
									}
								}
								this.setState({data:newArray})
							}
						}} />
							<label htmlFor={"cb"+(i+1)}><img src={value.thumbnail} /></label>
						</li>
						:
						<li style={{ display: "inline-block" }}>
							<input type="checkbox" name="image" id={"cb"+(i+1)}  onChange={e => {
							console.log("E",e.target.checked)
							if(e.target.checked){
							this.setState(prevState => ({
								data: [...prevState.data,{data:value.original,duration:30}]
							  }))
							}
							else{
								let newArray=[];
								for(var key in this.state.data){
									debugger
									if(this.state.data[key].data!==value.original){
										newArray.push(value.original)
									}
								}
								this.setState({data:newArray})
							}
						}} />
							<label htmlFor={"cb"+(i+1)}><img src={value.thumbnail} /></label>
						</li>
	)))}
					</ul>
				</Modal>
			</React.Fragment>
		);
	}
}

export default UrlModal;
