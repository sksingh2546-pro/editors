import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Input } from 'antd';
import ColorPicker from "rc-color-picker";
import "rc-color-picker/assets/index.css";
class AceModal extends Component {
	static propTypes = {
		value: PropTypes.any,
		onChange: PropTypes.func,
		form: PropTypes.any,
	};
	handlers = {
		directionChange: (value) => {
			const { code ,onChange } = this.props;
			onChange(code);
			console.log(code);
			this.setState({
				visible: false,
				code,
			});
		},
		tickerTextChange: (value) => {
			const { code ,onChange } = this.props;
			code.tickerText=value.target.value
			onChange(code);
			console.log(code);
			this.setState({
				code,
			});
		},
		
	};


	state = {
		code: this.props.value || { 
		tickerText: 'Ticker Text',
		fontSize: '32',
		fontFam: 'Impact',
		backgroundColor: '#000',
		duration: '32',
		fontColor: '#fff',
		direction: 'LEFT' },
		visible: false,
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			code: nextProps.value || { 
			tickerText: 'Ticker Text',
			fontSize: '32',
			fontFam: 'Impact',
			backgroundColor: '#000',
			duration: '32',
			fontColor: '#fff',
			direction: 'LEFT' },
		});
	}
	
	render() {
		const { directionChange, tickerTextChange, changeHandler } = this.handlers;
		const { code } = this.props;			
		
		const closeHandler = (colors) => {
			console.log(colors);
		};

		const directionOption = ["LEFT", "RIGHT", "UP", "DOWN"];
		const fontStyleOpion = ["Arial", "Arial Black", "Book Antiqua", "Comic Sans MS",
			"Courier", "Courier New", "Georgia", "Helvetica", "Impact",
			"Lucida Console", "MS Sans Serif", "MS Serif", "New York",
			"Palatino Linotype", "Symbol", "Tahoma", "Times", "Times New Roman",
			"Trebuchet MS", "Verdana", "Abril Fatface", "Alegreya", "Alegreya Sans",
			"Amatic SC", "Be Vietnam Pro", "EB Garamond", "Fjalla One", "Josefin Sans", "Lato",
			"Merriweather", "Montserrat", "Noto Sans", "Open Sans", "Open Sans Condensed", "Oswald",
			"PT Sans", "PT Sans Narrow", "Playfair Display", "Raleway", "Roboto", "Roboto Mono", "Roboto Slab", "Source Sans Pro"]
		return (
			<React.Fragment>
				<label style={{ margin: "auto", fontSize: "initial" }}>Direction</label>
				<Select showSearch defaultValue={code.direction} style={{ width: '100%' }} onChange={(e)=>{directionChange(e)}}>
					{directionOption.map((value, i) => {
						return (
							<Select.Option key={i + 1} value={value}>
								{value}
							</Select.Option>
						);
					})}
				</Select>
				<label style={{ margin: "auto", fontSize: "initial" }}>Type Here</label>
				<Input placeholder="Enter Ticker Text" defaultValue={code.tickerText} onChange={(e)=>{tickerTextChange(e)}}/>
				<label style={{ margin: "auto", fontSize: "initial" }}>Font Style</label>

				<Select showSearch defaultValue={code.fontFam} style={{ width: '100%' }}>
					{fontStyleOpion.map((value, i) => {
						return (
							<Select.Option key={i + 1} value={value}>
								{value}
							</Select.Option>
						);
					})}
				</Select>
				<label style={{ margin: "auto", fontSize: "initial" }}>Font Size</label>
				<Select showSearch defaultValue={code.fontSize} style={{ width: '100%' }}>
							{Array.from({ length: 200 }, (v, k) => {
								const value = k + 1;
								return (
									<Select.Option key={value} value={value}>
										{value}
									</Select.Option>
								);
							})}
						</Select>
				<label style={{ margin: "auto", fontSize: "initial" }}>Font Color</label>

				<ColorPicker
					color={"#fff"}
					alpha={30}
					onChange={changeHandler}
					onClose={closeHandler}
					placement="topLeft"
					className="some-class"
					enableAlpha={true}
				>
					<button className="rc-color-picker-trigger"></button>
				</ColorPicker>

				<label style={{ margin: "auto", fontSize: "initial" }}>Background Color</label>

				<ColorPicker
					color={"#000"}
					alpha={30}
					onChange={changeHandler}
					onClose={closeHandler}
					placement="topLeft"
					className="some-class"
					enableAlpha={false}
				>
					<button className="rc-color-picker-trigger"></button>
				</ColorPicker>

				<label style={{ margin: "auto", fontSize: "initial" }}>Duration</label>
				<Select showSearch defaultValue={code.duration} style={{ width: '100%' }}>
							{Array.from({ length: 200 }, (v, k) => {
								const value = k + 1;
								return (
									<Select.Option key={value} value={value}>
										{value}
									</Select.Option>
								);
							})}
						</Select>

			</React.Fragment>
		);
	}
}

export default AceModal;
