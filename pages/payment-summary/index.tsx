import React, { useState } from "react";
import { Button, Col, Row } from "antd";
import {
  Elements,
  CardExpiryElement,
  CardNumberElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import { DeleteIcon, LockIcon, PaymentSummaryIcon } from "../../public/images";
import InputField from "@generals/InputField";
import { loadStripe } from "@stripe/stripe-js";
import ModalSuccess from "components/StartYourWill/Modal/ModalSuccess";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setMakePayment } from "../../redux/actions/startYourWill";

function PaymentSummary() {
  const [promoCode, setPromoCode] = useState("");
  const [applySuccess, setApplySuccess] = useState(false);
  const [cardHolderName, setCardHolderName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cardNumberComplete, setCartNumberComplete] = useState(false);
  const [expComplete, setExpComplete] = useState(false);
  const [CVVComplete, setCVVComplete] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleApply = () => {
    setApplySuccess(true);
  };
  const handleDeletePromo = () => {
    setApplySuccess(false);
    setPromoCode("");
  };
  const stripePromise = loadStripe(
    "pk_test_51JAn9sI5dgnlrNcIU23Yp4RczCcPO673EJFlUdzewVXZk1g0Fs5U54CWbnNE8CJxK1Os0SjU1CBtEIu9b2QlBAgy00EVpaX6c5"
  );
  //   const stripe = useStripe();
  //   const elements = useElements();
  const handleChangeFieldStripe = (data) => {
    const complete = data.complete;
    const type = data.elementType;
    switch (type) {
      case "cardNumber":
        setCartNumberComplete(complete);
        break;
      case "cardExpiry":
        setExpComplete(complete);
        break;
      case "cardCvc":
        setCVVComplete(complete);
        break;
      default:
        break;
    }
  };

  const handleReturnDashboard = () => {
    dispatch(setMakePayment(true));
    router.push("/start-your-will-upload");
  };

  const handlePay = () => {
    setShowModalSuccess(true);
  };

  return (
    <div className="payment-summary-container">
      {showModalSuccess && (
        <ModalSuccess
          showModal={showModalSuccess}
          setShowModal={setShowModalSuccess}
          title="Payment Successful!"
          textNote="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun."
          handleReturn={handleReturnDashboard}
        />
      )}

      <Row className="item-center">
        <Col
          xs={15}
          sm={15}
          md={11}
          lg={11}
          xl={11}
          xxl={11}
          className="payment-promo"
        >
          <Col span={24} className="center">
            <Col className="mr-16 ">
              <PaymentSummaryIcon />
            </Col>
            <Col>
              <div className="text-title">Payment Summary</div>
              <div className="text-note">
                After purchasing, you'll be able to upload your will.
              </div>
            </Col>
          </Col>
          <Row className="mt-24 ">
            <Col span={14}>
              <span className="text-title">Bernard Soo’s Will</span>
            </Col>
            <Col span={10} className="item-end">
              <span className="text-title">$ 89.00</span>
            </Col>
          </Row>
          {!applySuccess ? (
            <Row className="mt-24 ">
              <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                <InputField
                  inputProps={{
                    placeholder: "Promo Code",
                    value: promoCode,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      setPromoCode(e.target.value),
                  }}
                />
              </Col>

              <Col
                xs={24}
                sm={24}
                md={6}
                lg={6}
                xl={6}
                xxl={6}
                className="item-end"
                style={{ paddingLeft: 16 }}
              >
                <Button className="apply-btn" onClick={handleApply}>
                  Apply
                </Button>
              </Col>
            </Row>
          ) : (
            <Row className="promo-code center mt-24 ">
              <Col span={22}>{promoCode}</Col>
              <Col
                span={2}
                className="item-end"
                style={{ cursor: "pointer" }}
                onClick={handleDeletePromo}
              >
                <DeleteIcon />
              </Col>
            </Row>
          )}
          <hr />
          <Row>
            <Col span={14}>
              <span className="text-title">Promo Code</span>
            </Col>
            <Col span={10} className="item-end">
              <span className="text-title" style={{ color: "#6670A2" }}>
                -$ 89.00
              </span>
            </Col>
          </Row>

          <Row className="mt-24">
            <Col span={14}>
              <span className="text-title">Promo Code</span>
            </Col>
            <Col span={10} className="item-end">
              <span className="text-title">$ 0.00</span>
            </Col>
          </Row>
          <Row>
            <Col span={13} className="text-note mt-16">
              All transactions are secured and encrypted by Stripe Payments
            </Col>
          </Row>
        </Col>
        <Col
          xs={15}
          sm={15}
          md={11}
          lg={11}
          xl={11}
          xxl={11}
          className="payment-card "
        >
          <Row className="text-name mb-16">Cardholder’s Name</Row>
          <Row>
            <InputField
              inputProps={{
                // placeholder: "Promo Code",
                value: cardHolderName,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setCardHolderName(e.target.value),
              }}
            />
          </Row>
          <Elements stripe={stripePromise}>
            <br />
            <Row>
              <Col span={17}>
                <div className="text-name">Card Number</div>
                <div className="card-number mt-16">
                  <CardNumberElement
                    onChange={(e) => handleChangeFieldStripe(e)}
                  />
                </div>
              </Col>

              <Col span={7} style={{ paddingLeft: 16 }}>
                <div className="text-name">Expiration</div>
                <div className="card-number mt-16">
                  <CardExpiryElement
                    onChange={(e) => handleChangeFieldStripe(e)}
                  />
                </div>
              </Col>
            </Row>
            <Row className="mt-24">
              <Col span={12} style={{ paddingRight: 8 }}>
                <div className="text-name">CVV / CVV2</div>
                <div className="card-number mt-16">
                  <CardCvcElement
                    onChange={(e) => handleChangeFieldStripe(e)}
                  />
                </div>
              </Col>
              <Col span={12} style={{ paddingLeft: 8 }}>
                <div className="text-name">Postal Code</div>
                <div className=" mt-16">
                  <InputField
                    inputProps={{
                      placeholder: "6 digit postal code",
                      value: postalCode,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                        setPostalCode(e.target.value),
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Elements>
          <Row className="footer mt-40">
            <Col span={12} className="center">
              <LockIcon />
              <span className="text-name ml-16">Secure Encrypted Form</span>
            </Col>
            <Col span={12} className="item-end">
              <Button
                className="pay-now-btn"
                disabled={
                  cardHolderName &&
                  cardNumberComplete &&
                  expComplete &&
                  CVVComplete &&
                  postalCode
                    ? false
                    : true
                }
                onClick={handlePay}
              >
                Pay Now
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default PaymentSummary;
