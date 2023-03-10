import React from 'react';
import { Form, Radio, Row, Col, Switch } from 'antd';
import VideoModal from '../../../components/common/VideoModal';
import FileUpload from '../../../components/common/FileUpload';
import UrlModal from '../../../components/common/UrlModal';

export default {
	render(canvasRef, form, data) {
		const { getFieldDecorator } = form;
		if (!data) {
			return null;
		}
		const videoLoadType = data.videoLoadType || 'file';
		return (
			<React.Fragment>
				<Row>
					<Col span={8}>
						<Form.Item label="Auto Play" colon={false}>
							{getFieldDecorator('autoplay', {
								rules: [
									{
										type: 'boolean',
										// required: true,
										// message: 'Please input rotation',
									},
								],
								valuePropName: 'checked',
								initialValue: data.autoplay,
							})(<Switch />)}
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label="Muted" colon={false}>
							{getFieldDecorator('muted', {
								rules: [
									{
										type: 'boolean',
										// required: true,
										// message: 'Please input rotation',
									},
								],
								valuePropName: 'checked',
								initialValue: data.muted,
							})(<Switch />)}
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label="Loop" colon={false}>
							{getFieldDecorator('loop', {
								rules: [
									{
										type: 'boolean',
										// required: true,
										// message: 'Please input rotation',
									},
								],
								valuePropName: 'checked',
								initialValue: data.loop,
							})(<Switch />)}
						</Form.Item>
					</Col>
				</Row>
				
				<Form.Item>
						{getFieldDecorator('src', {
							rules: [
								{
									required: true,
									message: 'Please select image',
								},
							],
							initialValue: data.src,
						})(<VideoModal form={form} />)}
					</Form.Item>
					<Form.Item  colon={false}>
						{getFieldDecorator('file', {
							rules: [
								{
									required: true,
									message: 'Please select video',
								},
							],
							initialValue: data.file,
						})(
							// <FileUpload fileList={data.file ? [data.file] : []} />,
							<FileUpload accept="video/*" />,
						)}
					</Form.Item>
				
					<Form.Item>
						{getFieldDecorator('src', {
							rules: [
								{
									required: true,
									message: 'Please select image',
								},
							],
							initialValue: data.src,
						})(<UrlModal form={form} />)}
					</Form.Item>
					
				
			</React.Fragment>
		);
	},
};
