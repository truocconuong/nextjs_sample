import CustomButton from '@generals/Button';
import {
    SmileLagacyMini,
    SmileLagacy,
    LegacyLock,
    IconProperty,
    IconBank,
    IconInsurance,
    LodgeForm,
} from '@images/index';
import { Col, Row } from 'antd';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function YourLegacyLayout(props) {
    const dataChart = {
        labels: [
            'Insurance Policies',
            'Investments',
            'Property',
            'Bank Account',
            'Business Interests',
        ],
        datasets: [
            {
                label: '# of Votes',
                data: [10, 15, 20, 25, 30],
                backgroundColor: [
                    '#D3EDFF',
                    '#BAF0DF',
                    '#FFE9BE',
                    '#FFD9D1',
                    '#D3E1FF',
                ],
                cutout: '80%',
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)',
                // ],
                // borderWidth: 1,
            },
        ],
        // tooltips: {
        //     enabled: false,
        // },
    };

    const settingsSlider = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className='your-lagacy'>
            <div className='lodge-will-banner'>
                <Row align='middle' justify='center' className='lodge-banner'>
                    <Col
                        xl={{ span: 7, order: 1 }}
                        sm={{ span: 24, order: 2 }}
                        xs={{ span: 24, order: 2 }}
                    >
                        <h1>Hello, Bernard</h1>
                        <h2>The legacy you leave behind.</h2>
                        <p>
                            You have spent your entire life building your legacy
                            and estate, and you do not want to neglect
                            distributing it to your beneficiaries according to
                            your wishes.
                        </p>
                        <Row className='lodge-btn'>
                            <Col>
                                <CustomButton
                                    type='ghost'
                                    className='btn-login'
                                >
                                    Download Your Will
                                </CustomButton>
                            </Col>
                            <Col
                                xs={24}
                                order={3}
                                style={{ marginTop: '20px' }}
                            >
                                <Row>
                                    <Col>
                                        <LegacyLock />
                                    </Col>
                                    <Col>
                                        <p style={{ marginLeft: '10px' }}>
                                            Will Registry Number: 0059-38921-40
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col
                        xl={{ offset: 2, order: 2 }}
                        className='lodge-banner-svg'
                    >
                        <SmileLagacy />
                        <SmileLagacyMini />
                    </Col>
                </Row>
                <div className='your-lagacy-body'>
                    <div className='content'>
                        <div className='sub-title'>Your Legacy</div>
                        <div className='description'>
                            You have worked hard to build your legacy. This is
                            section provides you with an overview of your assets
                            and Will to help you manage your legacy.
                        </div>
                        <Row gutter={[32, 0]}>
                            <Col
                                lg={12}
                                xs={24}
                                style={{ marginBottom: '32px' }}
                            >
                                <Col className='sub-content' xs={24}>
                                    <div className='sub-sub-title'>Asset</div>
                                    <div className='chart'>
                                        <Doughnut
                                            data={dataChart}
                                            options={{
                                                plugins: {
                                                    legend: {
                                                        display: false,
                                                    },
                                                },
                                            }}
                                        />
                                        <div className='inner-chart'>
                                            <p>Total Assets</p>
                                            <h5>$ 1,000,000</h5>
                                        </div>
                                    </div>
                                    <div className='legend'>
                                        <Row
                                            className='sub-legend'
                                            justify='space-between'
                                        >
                                            <Col style={{ display: 'flex' }}>
                                                <div
                                                    className='circle'
                                                    style={{
                                                        backgroundColor:
                                                            '#D3EDFF',
                                                    }}
                                                />
                                                <div className='sub-money'>
                                                    <h5>Insurance Policies</h5>
                                                    <h6>$ 100,000.00</h6>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className='sub-percent'>
                                                    10%
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className='legend'>
                                        <Row
                                            className='sub-legend'
                                            justify='space-between'
                                        >
                                            <Col style={{ display: 'flex' }}>
                                                <div
                                                    className='circle'
                                                    style={{
                                                        backgroundColor:
                                                            '#BAF0DF',
                                                    }}
                                                />
                                                <div className='sub-money'>
                                                    <h5>Investments</h5>
                                                    <h6>$ 150,000.00</h6>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className='sub-percent'>
                                                    15%
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className='legend'>
                                        <Row
                                            className='sub-legend'
                                            justify='space-between'
                                        >
                                            <Col style={{ display: 'flex' }}>
                                                <div
                                                    className='circle'
                                                    style={{
                                                        backgroundColor:
                                                            '#FFE9BE',
                                                    }}
                                                />
                                                <div className='sub-money'>
                                                    <h5>Property</h5>
                                                    <h6>$ 100,000.00</h6>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className='sub-percent'>
                                                    20%
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className='legend'>
                                        <Row
                                            className='sub-legend'
                                            justify='space-between'
                                        >
                                            <Col style={{ display: 'flex' }}>
                                                <div
                                                    className='circle'
                                                    style={{
                                                        backgroundColor:
                                                            '#FFD9D1',
                                                    }}
                                                />
                                                <div className='sub-money'>
                                                    <h5>Bank Account</h5>
                                                    <h6>$ 100,000.00</h6>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className='sub-percent'>
                                                    25%
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className='legend'>
                                        <Row
                                            className='sub-legend'
                                            justify='space-between'
                                        >
                                            <Col style={{ display: 'flex' }}>
                                                <div
                                                    className='circle'
                                                    style={{
                                                        backgroundColor:
                                                            '#D3E1FF',
                                                    }}
                                                />
                                                <div className='sub-money'>
                                                    <h5>Business Interests</h5>
                                                    <h6>$ 100,000.00</h6>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className='sub-percent'>
                                                    30%
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Col>
                            <Col lg={12} xs={24}>
                                <Row gutter={[0, 32]}>
                                    <Col className='sub-content' xs={24}>
                                        <div className='sub-sub-title'>
                                            Beneficiaries
                                        </div>
                                        <Row
                                            className='sub-person'
                                            align='middle'
                                        >
                                            <Col className='person-percent'>
                                                60%
                                            </Col>
                                            <Col>
                                                <Row
                                                    style={{
                                                        flexDirection: 'column',
                                                    }}
                                                >
                                                    <div className='name-son'>
                                                        Sunny Jai
                                                    </div>
                                                    <div className='pos-son'>
                                                        Daughter
                                                    </div>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row
                                            className='sub-person'
                                            align='middle'
                                        >
                                            <Col className='person-percent'>
                                                40%
                                            </Col>
                                            <Col>
                                                <Row
                                                    style={{
                                                        flexDirection: 'column',
                                                    }}
                                                >
                                                    <div className='name-son'>
                                                        Keynes Yeo
                                                    </div>
                                                    <div className='pos-son'>
                                                        Son
                                                    </div>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className='sub-content' xs={24}>
                                        <div className='sub-sub-title'>
                                            Executors
                                            <Row
                                                className='sub-person'
                                                align='middle'
                                            >
                                                <Col
                                                    className='person-percent'
                                                    style={{
                                                        backgroundColor:
                                                            '#E9FAF4',
                                                    }}
                                                >
                                                    1
                                                </Col>
                                                <Col>
                                                    <Row
                                                        style={{
                                                            flexDirection:
                                                                'column',
                                                        }}
                                                    >
                                                        <div className='name-son'>
                                                            Raj Smith
                                                        </div>
                                                        <div className='pos-son'>
                                                            Main Executor
                                                        </div>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row
                                                className='sub-person'
                                                align='middle'
                                            >
                                                <Col
                                                    className='person-percent'
                                                    style={{
                                                        backgroundColor:
                                                            '#E9FAF4',
                                                    }}
                                                >
                                                    2
                                                </Col>
                                                <Col>
                                                    <Row
                                                        style={{
                                                            flexDirection:
                                                                'column',
                                                        }}
                                                    >
                                                        <div className='name-son'>
                                                            Red Bull
                                                        </div>
                                                        <div className='pos-son'>
                                                            Alternate Executor
                                                        </div>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <div className='sub-title listing'>
                            Personal Estates Listing
                        </div>
                        <div className='description'>
                            This is section shows your Estate Listing details,
                            you can update any changes to your estate here.
                        </div>
                    </div>
                    <div className='legacy-carousel'>
                        <Slider {...settingsSlider}>
                            <div>
                                <div
                                    className='item-carousel'
                                    style={{ backgroundColor: '#FEF6E7' }}
                                >
                                    <Row style={{ minHeight: '150px' }}>
                                        <IconProperty />
                                    </Row>
                                    <div className='title-pro'>Property</div>
                                    <div className='sub-money'>
                                        $ 150,000.00{' '}
                                    </div>
                                    <Row className='sub-person' align='middle'>
                                        <Col
                                            className='person-percent'
                                            style={{
                                                backgroundColor: '#FFE9BE',
                                                width: '48px',
                                                height: '48px',
                                            }}
                                        >
                                            1
                                        </Col>
                                        <Col>
                                            <Row
                                                style={{
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <div
                                                    className='name-son'
                                                    style={{
                                                        fontSize: '20px',
                                                    }}
                                                >
                                                    Singapore
                                                </div>
                                                <div
                                                    className='pos-son'
                                                    style={{
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    Solely Ownership
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className='sub-person' align='middle'>
                                        <Col
                                            className='person-percent'
                                            style={{
                                                backgroundColor: '#FFE9BE',
                                                width: '48px',
                                                height: '48px',
                                            }}
                                        >
                                            2
                                        </Col>
                                        <Col>
                                            <Row
                                                style={{
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <div
                                                    className='name-son'
                                                    style={{
                                                        fontSize: '20px',
                                                    }}
                                                >
                                                    Thailand
                                                </div>
                                                <div
                                                    className='pos-son'
                                                    style={{
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    Joint Ownership
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                            <div>
                                <div
                                    className='item-carousel'
                                    style={{ backgroundColor: '#FFEDE9' }}
                                >
                                    <Row style={{ minHeight: '150px' }}>
                                        <IconBank />
                                    </Row>
                                    <div className='title-pro'>
                                        Bank Accounts
                                    </div>
                                    <div className='sub-money'>
                                        $ 150,000.00{' '}
                                    </div>
                                    <Row className='sub-person' align='middle'>
                                        <Col
                                            className='person-percent'
                                            style={{
                                                backgroundColor: '#FFD9D1',
                                                width: '48px',
                                                height: '48px',
                                            }}
                                        >
                                            1
                                        </Col>
                                        <Col>
                                            <Row
                                                style={{
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <div
                                                    className='name-son'
                                                    style={{
                                                        fontSize: '20px',
                                                    }}
                                                >
                                                    Citi
                                                </div>
                                                <div
                                                    className='pos-son'
                                                    style={{
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    Solely Ownership
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className='sub-person' align='middle'>
                                        <Col
                                            className='person-percent'
                                            style={{
                                                backgroundColor: '#FFD9D1',
                                                width: '48px',
                                                height: '48px',
                                            }}
                                        >
                                            2
                                        </Col>
                                        <Col>
                                            <Row
                                                style={{
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <div
                                                    className='name-son'
                                                    style={{
                                                        fontSize: '20px',
                                                    }}
                                                >
                                                    ANZ
                                                </div>
                                                <div
                                                    className='pos-son'
                                                    style={{
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    Joint Ownership
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                            <div>
                                <div
                                    className='item-carousel'
                                    style={{ backgroundColor: '#E9F7FF' }}
                                >
                                    <Row style={{ minHeight: '150px' }}>
                                        <IconInsurance />
                                    </Row>
                                    <div className='title-pro'>
                                        Insurance Policies
                                    </div>
                                    <div className='sub-money'>
                                        $ 150,000.00{' '}
                                    </div>
                                    <Row className='sub-person' align='middle'>
                                        <Col
                                            className='person-percent'
                                            style={{
                                                backgroundColor: '#D3EDFF',
                                                width: '48px',
                                                height: '48px',
                                            }}
                                        >
                                            1
                                        </Col>
                                        <Col>
                                            <Row
                                                style={{
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <div
                                                    className='name-son'
                                                    style={{
                                                        fontSize: '20px',
                                                    }}
                                                >
                                                    AKGI
                                                </div>
                                                <div
                                                    className='pos-son'
                                                    style={{
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    Non-Nominated
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className='sub-person' align='middle'>
                                        <Col
                                            className='person-percent'
                                            style={{
                                                backgroundColor: '#D3EDFF',
                                                width: '48px',
                                                height: '48px',
                                            }}
                                        >
                                            2
                                        </Col>
                                        <Col>
                                            <Row
                                                style={{
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <div
                                                    className='name-son'
                                                    style={{
                                                        fontSize: '20px',
                                                    }}
                                                >
                                                    Thailand
                                                </div>
                                                <div
                                                    className='pos-son'
                                                    style={{
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    Joint Ownership
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                            <div>
                                <div
                                    className='item-carousel'
                                    style={{ backgroundColor: '#FEF6E7' }}
                                >
                                    <Row style={{ minHeight: '150px' }}>
                                        <IconProperty />
                                    </Row>
                                    <div className='title-pro'>Property</div>
                                    <div className='sub-money'>
                                        $ 150,000.00{' '}
                                    </div>
                                    <Row className='sub-person' align='middle'>
                                        <Col
                                            className='person-percent'
                                            style={{
                                                backgroundColor: '#FFE9BE',
                                                width: '48px',
                                                height: '48px',
                                            }}
                                        >
                                            1
                                        </Col>
                                        <Col>
                                            <Row
                                                style={{
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <div
                                                    className='name-son'
                                                    style={{
                                                        fontSize: '20px',
                                                    }}
                                                >
                                                    Singapore
                                                </div>
                                                <div
                                                    className='pos-son'
                                                    style={{
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    Solely Ownership
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className='sub-person' align='middle'>
                                        <Col
                                            className='person-percent'
                                            style={{
                                                backgroundColor: '#FFE9BE',
                                                width: '48px',
                                                height: '48px',
                                            }}
                                        >
                                            2
                                        </Col>
                                        <Col>
                                            <Row
                                                style={{
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <div
                                                    className='name-son'
                                                    style={{
                                                        fontSize: '20px',
                                                    }}
                                                >
                                                    Thailand
                                                </div>
                                                <div
                                                    className='pos-son'
                                                    style={{
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    Joint Ownership
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                            <div>
                                <div
                                    className='item-carousel'
                                    style={{ backgroundColor: '#FEF6E7' }}
                                >
                                    <Row style={{ minHeight: '150px' }}>
                                        <IconProperty />
                                    </Row>
                                    <div className='title-pro'>Property</div>
                                    <div className='sub-money'>
                                        $ 150,000.00{' '}
                                    </div>
                                    <Row className='sub-person' align='middle'>
                                        <Col
                                            className='person-percent'
                                            style={{
                                                backgroundColor: '#FFE9BE',
                                                width: '48px',
                                                height: '48px',
                                            }}
                                        >
                                            1
                                        </Col>
                                        <Col>
                                            <Row
                                                style={{
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <div
                                                    className='name-son'
                                                    style={{
                                                        fontSize: '20px',
                                                    }}
                                                >
                                                    Singapore
                                                </div>
                                                <div
                                                    className='pos-son'
                                                    style={{
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    Solely Ownership
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className='sub-person' align='middle'>
                                        <Col
                                            className='person-percent'
                                            style={{
                                                backgroundColor: '#FFE9BE',
                                                width: '48px',
                                                height: '48px',
                                            }}
                                        >
                                            2
                                        </Col>
                                        <Col>
                                            <Row
                                                style={{
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <div
                                                    className='name-son'
                                                    style={{
                                                        fontSize: '20px',
                                                    }}
                                                >
                                                    Thailand
                                                </div>
                                                <div
                                                    className='pos-son'
                                                    style={{
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    Joint Ownership
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Slider>
                    </div>
                    <div className='legacy-amend'>
                        <Row align='middle' justify={'space-between'}>
                            <Col className='center' lg={18} md={16} sm={24}>
                                <Row align='middle'>
                                    <Col>
                                        <Row align='middle' className='header'>
                                            <span>
                                                <LodgeForm />
                                            </span>
                                            <span className='text-title title-hidden'>
                                                Amend Existing Will
                                            </span>
                                        </Row>
                                    </Col>
                                    <Col lg={18} md={20} sm={24}>
                                        <div className='text-title'>
                                            Amend Existing Will
                                        </div>
                                        <h6>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Ut enim ad
                                            minim.
                                        </h6>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <CustomButton
                                    borderLarge
                                    fontWeightLarge
                                    size='large'
                                    // onClick={handleCreateYourWill}
                                >
                                    Amend Existing Will
                                </CustomButton>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YourLegacyLayout;
