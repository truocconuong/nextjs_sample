import React from 'react';

function Steps(props) {
    return (
        <div className="steps d-inline-block clearfix">
            <span className="bg-shape" />
            <ul className="tablist multisteps-form__progress">
                <li className="multisteps-form__progress-btn js-active current">
                    <div className="step-btn-icon-text">
                        <span>1</span>
                        <div className="step-btn-icon float-left position-relative">
                            <img src="/static/assets/img/bt1.png" alt="" />
                        </div>
                        <div className="step-btn-text">
                            <h2 className="text-uppercase">Job Board</h2>
                            <span className="text-capitalize">Job Available</span>
                        </div>
                    </div>
                </li>
                <li className="multisteps-form__progress-btn">
                    <div className="step-btn-icon-text">
                        <span>2</span>
                        <div className="step-btn-icon float-left position-relative">
                            <img className="fix-image" src="/static/assets/img/bt2.png" alt="" />
                        </div>
                        <div className="step-btn-text">
                            <h2 className="text-uppercase">Send Details</h2>
                            <span className="text-capitalize">Job Available</span>
                        </div>
                    </div>
                </li>
                <li className="multisteps-form__progress-btn">
                    <div className="step-btn-icon-text">
                        <span>3</span>
                        <div className="step-btn-icon float-left position-relative">
                            <img className="fix-image-2" src="/static/assets/img/bt3.png" alt="" />
                        </div>
                        <div className="step-btn-text">
                            <h2 className="text-uppercase">ThankYou</h2>
                            <span className="text-capitalize">Job Available</span>
                        </div>
                    </div>
                </li>
            </ul>
            <div >
                <span>1 of 3 Completed</span>
                <div className="progress">
                    <div className="progress-bar" style={{ width: '33%' }}>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Steps;