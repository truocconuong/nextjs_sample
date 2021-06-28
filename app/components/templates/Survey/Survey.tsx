import Question from "@module/Question/Question";
import Steps from "@module/Steps/Steps";
import React from "react";

const Survey = () => (
    <>
    <div>
      <div className="clearfix" />
      <div className="wrapper">
        <div className="wizard-content-1 pos-flex clearfix">
          <Steps/>
            <div className="step-inner-content clearfix position-relative">
              <span className="bg-shape" />
              <form className="multisteps-form__form" action="action.php.html" id="wizard" method="POST" encType="multipart/form-data">
                <div className="form-area position-relative">
                  <div className="multisteps-form__panel js-active" data-animation="scaleIn">
                    <div className="wizard-forms position-relative">
                      <span className="step-no position-absolute">Step 1</span>
                      <Question/>
                      <div className="actions">
                        <ul>
                          <li><span className="js-btn-next" title="NEXT">NEXT</span></li>
                        </ul>
                      </div>
                    </div>
                    <div className="bottom-vector position-absolute">
                      <img src="/static/assets/img/sd1.png" alt="" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
    );

    export default Survey;
