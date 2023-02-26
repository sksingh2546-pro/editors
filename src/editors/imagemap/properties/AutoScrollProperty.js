import React from 'react';
import { Select, Form, InputNumber } from 'antd';
import "rc-color-picker/assets/index.css";
import i18n from 'i18next';
import SlideComponent from '../../../components/ace/SlideComponent';

export default {
	render(canvasRef, form, data) {
		const { getFieldDecorator } = form;
		if (!data) {
			return null;
		}

		return (
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
					})(<SlideComponent form={form} code={data.code} />)}
				</Form.Item>
			</div>
		);
	},
};
