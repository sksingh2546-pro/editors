import React from 'react';
import { Form } from 'antd';
import TickerComponent from '../../../components/ace/TickerComponent';

export default {
	render(canvasRef, form, data) {
		const { getFieldDecorator } = form;
		if (!data) {
			return null;
		}
		return (
			<Form.Item>
				{getFieldDecorator('code', {
					rules: [
						{
							required: true,
							message: 'Please input code',
						},
					],
					initialValue: data.code,
				})(<TickerComponent form={form} code={data.code} />)}
			</Form.Item>
		);
	},
};

