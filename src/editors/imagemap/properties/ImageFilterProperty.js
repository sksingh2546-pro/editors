import React from 'react';
import { Row, Col, Form, Tag, Slider } from 'antd';

export default {
    render(canvasRef, form, data) {
        const { getFieldDecorator } = form;
        const { filters } = data;
        return (
            <Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.grayscale', {
                                    valuePropName: 'checked',
                                    initialValue: !!filters[0],
                                })(
                                    <Tag.CheckableTag className="rde-action-tag">
                                        {'G'}
                                    </Tag.CheckableTag>,
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.invert', {
                                    valuePropName: 'checked',
                                    initialValue: !!filters[1],
                                })(
                                    <Tag.CheckableTag className="rde-action-tag">
                                        {'I'}
                                    </Tag.CheckableTag>,
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.sepia', {
                                    valuePropName: 'checked',
                                    initialValue: !!filters[3],
                                })(
                                    <Tag.CheckableTag className="rde-action-tag">
                                        {'S'}
                                    </Tag.CheckableTag>,
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.brownie', {
                                    valuePropName: 'checked',
                                    initialValue: !!filters[4],
                                })(
                                    <Tag.CheckableTag className="rde-action-tag">
                                        {'B'}
                                    </Tag.CheckableTag>,
                                )
                            }
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.vintage', {
                                    valuePropName: 'checked',
                                    initialValue: !!filters[9],
                                })(
                                    <Tag.CheckableTag className="rde-action-tag">
                                        {'V'}
                                    </Tag.CheckableTag>,
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.blackwhite', {
                                    valuePropName: 'checked',
                                    initialValue: !!filters[19],
                                })(
                                    <Tag.CheckableTag className="rde-action-tag">
                                        {'B'}
                                    </Tag.CheckableTag>,
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.technicolor', {
                                    valuePropName: 'checked',
                                    initialValue: !!filters[14],
                                })(
                                    <Tag.CheckableTag className="rde-action-tag">
                                        {'T'}
                                    </Tag.CheckableTag>,
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.polaroid', {
                                    valuePropName: 'checked',
                                    initialValue: !!filters[15],
                                })(
                                    <Tag.CheckableTag className="rde-action-tag">
                                        {'P'}
                                    </Tag.CheckableTag>,
                                )
                            }
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.sharpen', {
                                    valuePropName: 'checked',
                                    initialValue: !!filters[12],
                                })(
                                    <Tag.CheckableTag className="rde-action-tag">
                                        {'S'}
                                    </Tag.CheckableTag>,
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.emboss', {
                                    valuePropName: 'checked',
                                    initialValue: !!filters[13],
                                })(
                                    <Tag.CheckableTag className="rde-action-tag">
                                        {'E'}
                                    </Tag.CheckableTag>,
                                )
                            }
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.gamma.enabled', {
                                    valuePropName: 'checked',
                                    initialValue: !!filters[17],
                                })(
                                    <Tag.CheckableTag className="rde-action-tag">
                                        {'G'}
                                    </Tag.CheckableTag>,
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.gamma.r', {
                                    initialValue: filters[17] ? filters[17].gamma[0] : 1,
                                })(
                                    <Slider disabled={!filters[17]} step={0.01} min={0.01} max={2.2} />,
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.gamma.g', {
                                    initialValue: filters[17] ? filters[17].gamma[1] : 1,
                                })(
                                    <Slider disabled={!filters[17]} step={0.01} min={0.01} max={2.2} />,
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.gamma.b', {
                                    initialValue: filters[17] ? filters[17].gamma[2] : 1,
                                })(
                                    <Slider disabled={!filters[17]} step={0.01} min={0.01} max={2.2} />,
                                )
                            }
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.brightness.enabled', {
                                    valuePropName: 'checked',
                                    initialValue: !!filters[5],
                                })(
                                    <Tag.CheckableTag className="rde-action-tag">
                                        {'B'}
                                    </Tag.CheckableTag>,
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={18}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.brightness.brightness', {
                                    initialValue: filters[5] ? filters[5].brightness : 0.1,
                                })(
                                    <Slider disabled={!filters[5]} step={0.01} min={-1} max={1} />,
                                )
                            }
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.contrast.enabled', {
                                    valuePropName: 'checked',
                                    initialValue: !!filters[6],
                                })(
                                    <Tag.CheckableTag className="rde-action-tag">
                                        {'C'}
                                    </Tag.CheckableTag>,
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={18}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.contrast.contrast', {
                                    initialValue: filters[6] ? filters[6].contrast : 0,
                                })(
                                    <Slider disabled={!filters[6]} step={0.01} min={-1} max={1} />,
                                )
                            }
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.saturation.enabled', {
                                    valuePropName: 'checked',
                                    initialValue: !!filters[7],
                                })(
                                    <Tag.CheckableTag className="rde-action-tag">
                                        {'S'}
                                    </Tag.CheckableTag>,
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={18}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.saturation.saturation', {
                                    initialValue: filters[7] ? filters[7].saturation : 0,
                                })(
                                    <Slider disabled={!filters[7]} step={0.01} min={-1} max={1} />,
                                )
                            }
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.hue.enabled', {
                                    valuePropName: 'checked',
                                    initialValue: !!filters[21],
                                })(
                                    <Tag.CheckableTag className="rde-action-tag">
                                        {'H'}
                                    </Tag.CheckableTag>,
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={18}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.hue.rotation', {
                                    initialValue: filters[21] ? filters[21].rotation : 0,
                                })(
                                    <Slider disabled={!filters[21]} step={0.002} min={-2} max={2} />,
                                )
                            }
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.noise.enabled', {
                                    valuePropName: 'checked',
                                    initialValue: !!filters[8],
                                })(
                                    <Tag.CheckableTag className="rde-action-tag">
                                        {'N'}
                                    </Tag.CheckableTag>,
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={18}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.noise.noise', {
                                    initialValue: filters[8] ? filters[8].noise : 100,
                                })(
                                    <Slider disabled={!filters[8]} step={1} min={0} max={1000} />,
                                )
                            }
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.pixelate.enabled', {
                                    valuePropName: 'checked',
                                    initialValue: !!filters[10],
                                })(
                                    <Tag.CheckableTag className="rde-action-tag">
                                        {'P'}
                                    </Tag.CheckableTag>,
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={18}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.pixelate.blocksize', {
                                    initialValue: filters[10] ? filters[10].blocksize : 4,
                                })(
                                    <Slider disabled={!filters[10]} step={1} min={2} max={20} />,
                                )
                            }
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.blur.enabled', {
                                    valuePropName: 'checked',
                                    initialValue: !!filters[11],
                                })(
                                    <Tag.CheckableTag className="rde-action-tag">
                                        {'B'}
                                    </Tag.CheckableTag>,
                                )
                            }
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={18}>
                        <Form.Item >
                            {
                                getFieldDecorator('filters.blur.value', {
                                    initialValue: filters[11] ? filters[11].value : 0.1,
                                })(
                                    <Slider disabled={!filters[11]} step={0.01} min={0} max={1} />,
                                )
                            }
                        </Form.Item>
                    </Col>
                </Row>
            </Row>
        );
    },
};
