import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Select, InputNumber,Form } from 'antd';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import ColorPicker from '../common/ColorPicker';
import ImageScrollModel from '../../components/common/ImageScrollModel';

class TickerEditor extends Component {
    
    handlers = {
        onChangeAnimation: debounce((value) => {
            this.setState({
                animation: value,
            }, () => {
                if (this.props.onChangeAnimation) {
                    this.props.onChangeAnimation(value);
                }
            });
            this.props.onOk();
        }, 500),
        onChangeImageData: debounce((value) => {
            this.setState({
                data: value,
            }, () => {
                if (this.props.onChangeImageData) {
                    this.props.onChangeImageData(value);
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
        getImageData:(data)=>{
            console.log("Data",data);
            this.handlers.onChangeImageData(data.toString());

           },
        getCodes1: () => {
            const { animation,data,duration } = this.state;
            return {
                animation,data,duration
            };
        },
    }

    static propTypes = {
        data: PropTypes.string,
        duration: PropTypes.string,
        animation: PropTypes.string,
    }

    static defaultProps = {
        data: 'https://summitsignage.com/design-editor/2.png,https://summitsignage.com/design-editor/1.png',
        duration: "10",
        animation: 'slideRightReturn'
		
    }

    state = {
        data: this.props.data,
        animation: this.props.animation,
        duration: this.props.duration,
        
    }

   
    render() {
        const { data,animation,duration } = this.state;
        const {form} =this.props
		const closeHandler = (colors) => {
			console.log(colors);
		};
        
		const directionOption = ["Slide Right", "Slide Left", "Slide Up", "Swash","Space In"];
		
        return (
            <React.Fragment>
					<ImageScrollModel getData={this.handlers.getImageData} form={form} />
                <label style={{ margin: "auto", fontSize: "initial" }}>Duration (*Sec)</label>

				<InputNumber min={1} defaultValue={parseInt(duration)}  />
            <label style={{ margin: "auto", fontSize: "initial" }}>Animation</label>
            <Select showSearch defaultValue={animation} style={{ width: '100%' }} onChange={(e)=>{this.handlers.onChangeDirection(e)}}>
                {directionOption.map((value, i) => {
                    return (
                        <Select.Option key={i + 1} value={value}>
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
