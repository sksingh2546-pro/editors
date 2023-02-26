import React from 'react';
import { Form } from 'antd';
import UrlModal from '../../../components/common/UrlModal';
import FileUpload from '../../../components/common/FileUpload';

export default {
	render(canvasRef, form, data) {
		const { getFieldDecorator } = form;
		if (!data) {
			return null;
		}
		return (
			<React.Fragment>

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
				<FileUpload  />,
			)}
		</Form.Item>
		</React.Fragment>

		);
	},
};