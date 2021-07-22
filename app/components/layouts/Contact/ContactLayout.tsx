import React, { useState } from 'react';
import { Row, Col, Select } from 'antd';
// import { DropdownCollapse, DropupCollapse, PolicyDocument, PolicyDocumentMini } from '@images/index'
import Link from 'next/link'
import FooterLanding from '@module/LandingPage/FooterLanding';
import InputField from '@generals/InputField';
import SelectField from '@generals/SelectField';
import { ContactTwister } from '@images/index';

const { Option } = Select;

function ContactLayout(props) {

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [yourMessage, setYourMessage] = useState<string>("")
  return (
    <div className='landing-page-contact'>
      <Row className="landing-contact">
        <Col xs={24} lg={12}>
          <div className='reach-us'>
            <h6>Reach Us</h6>
            <p>If you have further queries, you can post your questions to us, and we will respond to you shortly.</p>
          </div>
          <div className='contact-learn-more'>
            <h6>Learn more with us @iwillstwitter</h6>
            <p>Find out the latest trends on how you can protect your legacy for tomorrow</p>
            <div className='contact-twister'>
              <ContactTwister/>
            </div>
          </div>
        </Col>
        <Col xs={24} lg={12} className="contact-form">
          <Row >
            <Col xs={24} lg={12} className='form-item'>
              <InputField
                displayLabel
                label="First Name"
                inputProps={{
                  placeholder: "John",
                  value: firstName,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setFirstName(e?.target?.value),
                }}
                wrapperClassName="wrapper-first-name"
              />
            </Col>
            <Col xs={24} lg={12} className='form-item'>
              <InputField
                displayLabel
                label="Last Name"
                inputProps={{
                  placeholder: "John",
                  value: lastName,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setLastName(e?.target?.value),
                }}
                wrapperClassName="wrapper-last-name"
              />
            </Col>
            <Col xs={24} className='form-item'>
              <InputField
                displayLabel
                label="Email"
                inputProps={{
                  placeholder: "John",
                  value: email,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e?.target?.value),
                }}
                wrapperClassName="wrapper-email"
              />
            </Col>
            <Col xs={24} className='form-item'>
              <SelectField
                displayLabel
                label="Reason for reaching out"
                selectProps={{
                  placeholder: "Select the appropriate reason",
                  className: "full-width"
                }}
                wrapperClassName="wrapper-reason"
              >
                <Option value="Zhejiang">Zhejiang</Option>
                <Option value="Jiangsu">Jiangsu</Option>
              </SelectField>
            </Col>
            <Col xs={24} className='form-item'>
              <InputField
                displayLabel
                multipleLines
                label="Your Message"
                inputProps={{
                  placeholder: "Please type your message to us here...",
                  value: yourMessage,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setYourMessage(e?.target?.value),
                }}
                wrapperClassName="wrapper-your-message"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <FooterLanding />
    </div>
  );
}

export default ContactLayout;