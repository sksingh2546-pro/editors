import React from 'react';
import PlaylistComponent from '../../../components/ace/PlaylistComponent';
import {Form } from 'antd';

export default {
	render(canvasRef, form, data) {
		console.log("canvasRef",canvasRef);
		const { getFieldDecorator } = form;
		if (!data) {
			return null;
		}
		return (
			<React.Fragment>
				<div>
				<Form.Item>
					{getFieldDecorator('code', {
						rules: [
							{
								required: true,
								message: 'Please input code',
							},
						],
						initialValue: data.code,
					})(<PlaylistComponent form={form} code={data.code} />)}
				</Form.Item>
			</div>
			</React.Fragment>
		);
	},
};
