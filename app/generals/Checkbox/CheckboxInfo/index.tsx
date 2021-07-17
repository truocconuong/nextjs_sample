import { Col, Row } from 'antd';
import React from 'react';
import { CheckboxSelectedIcon, CheckboxUnselectedIcon } from '../../../../public/images';

interface IProps {
    checked?: boolean;
    title?: string;
    content?: string;
    onChange?: () => void;
}

function CustomCheckboxInfo(props: IProps) {
    const {checked, title, content, onChange} = props;

    return (
        <Row className="custom-checkbox">
            <Col span={2}>
                <span onClick={onChange}>{checked ? <CheckboxSelectedIcon /> : <CheckboxUnselectedIcon />}</span>
            </Col>
            <Col span={21} className="custom-checkbox__text">
                <Row className="custom-checkbox__text--title">
                    {title}
                </Row>
                <Row className="custom-checkbox__text--content">
                    {content}
                </Row>
            </Col>
        </Row>
    );
}

export default CustomCheckboxInfo;