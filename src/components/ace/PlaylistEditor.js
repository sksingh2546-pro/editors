import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Select, InputNumber, Form } from 'antd';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import ImageScrollModal from '../common/ImageScrollModel';
import './playlistProperty.css'

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
                data: JSON.stringify(value),
            }, () => {
                if (this.props.onChangeImageData) {
                    this.props.onChangeImageData(value);
                }
            });
            this.props.onOk();
        }, 500),
       





     
        getImageData: (data) => {
            this.setState({ dataArray: data });
            this.handlers.onChangeImageData(data);

        },

        getCodes1: () => {
            const { animation, data, duration } = this.state;
            return {
                animation, data, duration
            };
        },
    }

    static propTypes = {
        data: PropTypes.string,
        animation: PropTypes.string,
        dataArray: PropTypes.array,


    }

    static defaultProps = {
        data: '',
        animation: '',
        dataArray: [],


    }

    state = {
        data: this.props.data,
        animation: this.props.animation,
        duration: this.props.duration,
        dataArray: JSON.parse(this.props.data),
    }


    render() {
        const {  animation } = this.state;
        const { form } = this.props


        const deleteElement = (value) => {
            
            let newArray = [];
            for (var key in this.state.dataArray) {
                if (value !== this.state.dataArray[key].data) {
                    newArray.push(this.state.dataArray[key])
                }
            }
            this.setState({ dataArray: newArray });
            this.handlers.onChangeImageData(newArray);

        }

        const updateDuration = (value, data) => {
            let newArray = [];
            for (var key in this.state.dataArray) {
                if (data === this.state.dataArray[key].data) {
                    let newData = { data: this.state.dataArray[key].data, duration: value }
                    newArray.push(newData)
                }
                else {
                    newArray.push(this.state.dataArray[key]);
                }
            }
            this.setState({ dataArray: newArray });
            this.setState({data:JSON.stringify(newArray)});
            this.props.onOk();
        }
        const directionOption = [{value:"slideRightReturn",label:"Slide Right"}, {value:"slideLeftReturn",label:"Slide Left"}, {value:"slideUpReturn",label:"Slide Up"}, {value:"swashIn",label:"Swash In"}, 
        {value:"spaceInDown",label:"Space In Down"},{value:"spaceInUp",label:"Space In Up"},{value:"spaceInLeft",label:" Space In Left"},{value:"spaceInRight",label:"Space In Right"},
        {value:"boingInUp",label:"Boing In"},{value:"foolishIn",label:"Foolish In"},{value:"tinRightIn",label:"Tin Right"},{value:"tinLeftIn",label:"Tin Left"},
        {value:"tinUpIn",label:"Tin Up"},{value:"tinDownIn",label:"Tin Down"},{value:"perspectiveDownReturn",label:"Perspective Down"},{value:"perspectiveUpReturn",label:"Perspective Up"},
        {value:"perspectiveLeftReturn",label:"Perspective Left"},{value:"perspectiveRightReturn",label:"Perspective Right"},{value:"openDownLeftReturn",label:"Open Down Left"},
        {value:"openDownRightReturn",label:"Open Down Right"},{value:"openUpLeftReturn",label:"Open Up Left"},{value:"openUpRightReturn",label:"Open Up Right"},{value:"puffIn",label:"Puff In"},
        {value:"vanishIn",label:"Vanish In"},{value:"twisterInDown",label:"Twister In Down"},{value:"twisterInUp",label:"Twister In Up"}, {value:"swap",label:"Swap"},{value:"random",label:"Random Slide"}];

        return (
            <React.Fragment>
                <ul className='ul'>
                    {
                        this.state.dataArray.map((value, i) => (
                            (value.data.includes('.mp4') ?
                                <li className='li' ><table><tr><td><span className='count'>{(i + 1)}</span><video style={{ width: "80%", height: "100%" }} src={value.data}></video></td><td><span  ><InputNumber style={{ width: "70px" }} min={1} onChange={(e) => { updateDuration(e, value.data) }} defaultValue={value.duration} /></span></td>
                                    <td><span style={{ color: "red", marginLeft: "10px" }} onClick={() => { deleteElement(value.data) }}><i class="fa fa-trash" aria-hidden="true"></i></span></td>
                                </tr>
                                </table>
                                </li> :
                                <li className='li' ><table><tr><td><span className='count'>{(i + 1)}</span><img style={{ width: "80%", height: "100%" }} src={value.data}></img></td><td><span  ><InputNumber style={{ width: "70px" }} min={1} onChange={(e) => { updateDuration(e, value.data) }} defaultValue={value.duration} /></span></td>
                                    <td><span style={{ color: "red", marginLeft: "10px" }} onClick={() => { deleteElement(value.data) }}><i class="fa fa-trash" aria-hidden="true"></i></span></td>
                                </tr>
                                </table>
                                </li>

                            )))
                    }
                </ul>
                <ImageScrollModal getData={this.handlers.getImageData} form={form} />
                <label style={{ margin: "auto", fontSize: "initial" }}>Animation</label>
                <Select showSearch defaultValue={animation} style={{ width: '100%' }} onChange={(e) => {this.handlers.onChangeAnimation(e) }}>
                    {directionOption.map((value, i) => {
                        return (
                            <Select.Option key={i + 1} value={value.value}>
                                {value.label}
                            </Select.Option>
                        );
                    })}
                </Select>
            </React.Fragment>
        );
    }
}

export default TickerEditor;
