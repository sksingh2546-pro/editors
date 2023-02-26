import React from 'react';
import { Form } from 'antd';
import RatingsModel from '../../../components/common/RatingsModel';

export default {
	render(canvasRef, form, data) {
		const { getFieldDecorator } = form;
		if (!data) {
			return null;
		}
		return (
			<Form.Item>
				{getFieldDecorator('src', {
					rules: [
						{
							required: true,
							message: 'Please select image',
						},
					],
					initialValue: data.src,
				})(<RatingsModel form={form} />)}
			</Form.Item>
		);
	},
};
