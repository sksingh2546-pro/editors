import React from 'react';
import { Form, Radio } from 'antd';
import i18n from 'i18next';

import ImageModel from '../../../components/common/ImageModel';
import FileUpload from '../../../components/common/FileUpload';

export default {
	render(canvasRef, form, data) {
		const { getFieldDecorator } = form;
		if (!data) {
			return null;
		}
		return (
			<React.Fragment>
					<Form.Item colon={false}>
					{getFieldDecorator('src', {
							initialValue: data.src,
						})(<ImageModel form={form} />)}
						
						{getFieldDecorator('file', {
							rules: [
								{
									required: true,
									message: i18n.t('validation.enter-property', { arg: i18n.t('common.file') }),
								},
							],
							initialValue: data.file,
						})(<FileUpload accept="image/*" />)}
					</Form.Item>
				
					
				
			</React.Fragment>
		);
	},
};
