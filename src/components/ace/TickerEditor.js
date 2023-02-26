import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Select, Input } from 'antd';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import ColorPicker from '../../components/common/ColorPicker';

class TickerEditor extends Component {
    handlers = {
        onChangeDirection: debounce((value) => {
            this.setState({
                direction: value,
            }, () => {
                if (this.props.onChangeDirection) {
                    this.props.onChangeDirection(value);
                }
            });
            this.props.onOk();
        }, 500),
        onChangeBackgroundColor: debounce((value) => {
            this.setState({
                background: value,
            }, () => {
                if (this.props.onChangeBackgroundColor) {
                    this.props.onChangeBackgroundColor(value);
                }
            });
            this.props.onOk();
        }, 500),
        onChangeFontColor: debounce((value) => {
            this.setState({
                fontColor: value,
            }, () => {
                if (this.props.onChangeFontColor) {
                    this.props.onChangeFontColor(value);
                }
            });
            this.props.onOk();
        }, 500),
       
        onChangeTickerText: debounce((value) => {
            this.setState({
                tickerText: value,
            }, () => {
                if (this.props.onChangeTickerText) {
                    this.props.onChangeTickerText(value);
                }
            });
            this.props.onOk();
        }, 500),

        onChangeFontSize: debounce((value) => {
            this.setState({
                fontSize: value,
            }, () => {
                if (this.props.onChangeFontSize) {
                    this.props.onChangeFontSize(value);
                }
            });
            this.props.onOk();
        }, 500),

        onChangeFontStyle: debounce((value) => {
            this.setState({
                fontFam: value,
            }, () => {
                if (this.props.onChangeFontStyle) {
                    this.props.onChangeFontStyle(value);
                }
            });
            this.props.onOk();
        }, 500),

        onChangeDuration: debounce((value) => {
            this.setState({
                scrollSpeed: value,
            }, () => {
                if (this.props.onChangeDuration) {
                    this.props.onChangeDuration(value);
                }
            });
            this.props.onOk();
        }, 500),

       
        
        getCodes: () => {
            const { tickerText, fontSize, fontFam,background,scrollSpeed,fontColor,direction } = this.state;
            return {
                tickerText, fontSize, fontFam,background,scrollSpeed,fontColor,direction
            };
        },
    }

    static propTypes = {
        tickerText: PropTypes.string,
        fontSize: PropTypes.string,
        fontFam: PropTypes.string,
        background: PropTypes.string,
        scrollSpeed: PropTypes.string,
        fontColor: PropTypes.string,
        direction: PropTypes.string,
    }

    static defaultProps = {
        tickerText: 'Ticker Text',
		fontSize: '32',
		fontFam: 'Impact',
		background: '#000',
		scrollSpeed: '32',
		fontColor: '#fff',
		direction: 'LEFT'
		
    }

    state = {
        tickerText: this.props.tickerText,
        fontSize: this.props.fontSize,
        fontFam: this.props.fontFam,
        background: this.props.background,
        scrollSpeed: this.props.scrollSpeed,
        fontColor: this.props.fontColor,
        direction: this.props.direction,
    }

   
    render() {
        const { tickerText, fontSize, fontFam,background,scrollSpeed,fontColor,direction } = this.state;
		
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
            <Select showSearch defaultValue={direction} style={{ width: '100%' }} onChange={(e)=>{this.handlers.onChangeDirection(e)}}>
                {directionOption.map((value, i) => {
                    return (
                        <Select.Option key={i + 1} value={value}>
                            {value}
                        </Select.Option>
                    );
                })}
            </Select>
            <label style={{ margin: "auto", fontSize: "initial" }}>Type Here</label>
            <Input placeholder="Enter Ticker Text" defaultValue={tickerText} onChange={(e)=>{this.handlers.onChangeTickerText(e.target.value)}}/>
            <label style={{ margin: "auto", fontSize: "initial" }}>Font Style</label>

            <Select showSearch defaultValue={fontFam} style={{ width: '100%' }} onChange={(e)=>{this.handlers.onChangeFontStyle(e)}}>
                {fontStyleOpion.map((value, i) => {
                    return (
                        <Select.Option key={i + 1} value={value}>
                            {value}
                        </Select.Option>
                    );
                })}
            </Select>
            <label style={{ margin: "auto", fontSize: "initial" }}>Font Size</label>
            <Select showSearch defaultValue={fontSize} style={{ width: '100%' }} onChange={(e)=>{this.handlers.onChangeFontSize(e)}}>
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
            <ColorPicker onChange={this.handlers.onChangeFontColor}
             onClose={closeHandler}
             color={"#fff"}
             alpha={30}
             placement="topLeft"
             className="some-class"
             enableAlpha={false}
             />
            <label style={{ margin: "auto", fontSize: "initial" }}>Background Color</label>

            <ColorPicker
                color={"#000"}
                alpha={30}
                onChange={this.handlers.onChangeBackgroundColor}
                onClose={closeHandler}
                placement="topLeft"
                className="some-class"
                enableAlpha={false}
            >
                <button className="rc-color-picker-trigger"></button>
            </ColorPicker>

            <label style={{ margin: "auto", fontSize: "initial" }}>Duration</label>
            <Select showSearch defaultValue={scrollSpeed} style={{ width: '100%' }} onChange={(e)=>{this.handlers.onChangeDuration(e)}} >
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

export default TickerEditor;
