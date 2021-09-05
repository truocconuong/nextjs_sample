import CustomButton from '@generals/Button';
import {
  SmileLagacyMini,
  SmileLagacy,
  LegacyLock,
  IconProperty,
  IconBank,
  IconInsurance,
  LodgeForm,
  IconInvestment,
  IconBusinessInterest,
  WatchIcon,
} from '@images/index';
import { Col, Row } from 'antd';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '@redux/actions/profile';
import { IMasterdata, IResponseGetProfile } from '@constant/data.interface';
import { useState } from 'react';
import { createSelector } from 'reselect';
import { find } from 'lodash';
import { useRouter } from 'next/router';

function YourLegacyLayout(props) {
  const route = useRouter();
  const dispatch = useDispatch();
  const [dataProfile, setDataProfile] = useState<IResponseGetProfile>(null);
  const masterdata = useSelector(
    createSelector(
      (state: any) => state?.masterdata,
      (masterdata: IMasterdata[]) => masterdata
    )
  );

  const formatMoney = (n: number) => {
    return n?.toFixed(2)?.replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

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
        data: [
          (
            (dataProfile?.insurance_policies?.total /
              dataProfile?.totalAssets) *
            100
          ).toFixed(2),
          (
            (dataProfile?.investments?.total / dataProfile?.totalAssets) *
            100
          ).toFixed(2),
          (
            (dataProfile?.properties?.total / dataProfile?.totalAssets) *
            100
          ).toFixed(2),
          (
            (dataProfile?.bank_accounts?.total / dataProfile?.totalAssets) *
            100
          ).toFixed(2),
          (
            (dataProfile?.business_interests?.total /
              dataProfile?.totalAssets) *
            100
          ).toFixed(2),
        ],
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

  useEffect(() => {
    dispatch(
      getProfile((res: { data: IResponseGetProfile; success: boolean }) => {
        setDataProfile(res.data);
        console.log(res);
      })
    );
  }, []);
  return (
    <div className='your-lagacy'>
      <div className='lodge-will-banner'>
        <Row align='middle' justify='center' className='lodge-banner'>
          <Col
            xl={{ span: 7, order: 1 }}
            sm={{ span: 24, order: 2 }}
            xs={{ span: 24, order: 2 }}
          >
            <h1>Hello, {dataProfile?.full_legal_name.split(' ')[0]}</h1>
            <h2>The legacy you leave behind.</h2>
            <p>
              You have spent your entire life building your legacy and estate,
              and you do not want to neglect distributing it to your
              beneficiaries according to your wishes.
            </p>
            <Row className='lodge-btn'>
              <Col>
                <a
                  target='_blank'
                  href={`${process.env.NEXT_PUBLIC_API_URL}/${dataProfile?.will_pdf_link}`}
                  target="_blank"
                >
                  <CustomButton type='ghost' className='btn-login'>
                    Download Will
                  </CustomButton>
                </a>
              </Col>
              <Col xs={24} order={3} style={{ marginTop: '20px' }}>
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
          <Col xl={{ offset: 2, order: 2 }} className='lodge-banner-svg'>
            <SmileLagacy />
            <SmileLagacyMini />
          </Col>
        </Row>
        <div className='your-lagacy-body'>
          <div className='content'>
            <div className='sub-title'>Your Legacy</div>
            <div className='description'>
              You have worked hard to build your legacy. This is section
              provides you with an overview of your assets and Will to help you
              manage your legacy.
            </div>
            <Row gutter={[32, 0]}>
              <Col lg={12} xs={24} style={{ marginBottom: '32px' }}>
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
                      <h5>
                        $ {formatMoney(dataProfile?.totalAssets)?.split('.')[0]}
                      </h5>
                    </div>
                  </div>
                  <div className='legend'>
                    <Row className='sub-legend' justify='space-between'>
                      <Col style={{ display: 'flex' }}>
                        <div
                          className='circle'
                          style={{
                            backgroundColor: '#D3EDFF',
                          }}
                        />
                        <div className='sub-money'>
                          <h5>Insurance Policies</h5>
                          <h6>
                            ${' '}
                            {formatMoney(
                              dataProfile?.insurance_policies?.total
                            )}
                          </h6>
                        </div>
                      </Col>
                      <Col>
                        <div className='sub-percent'>
                          {dataProfile?.totalAssets !== 0 &&
                          dataProfile?.totalAssets
                            ? (
                                (dataProfile?.insurance_policies?.total /
                                  dataProfile?.totalAssets) *
                                100
                              ).toFixed(2) + '%'
                            : '%'}
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className='legend'>
                    <Row className='sub-legend' justify='space-between'>
                      <Col style={{ display: 'flex' }}>
                        <div
                          className='circle'
                          style={{
                            backgroundColor: '#BAF0DF',
                          }}
                        />
                        <div className='sub-money'>
                          <h5>Investments</h5>
                          <h6>
                            $ {formatMoney(dataProfile?.investments?.total)}
                          </h6>
                        </div>
                      </Col>
                      <Col>
                        <div className='sub-percent'>
                          {dataProfile?.totalAssets !== 0 &&
                          dataProfile?.totalAssets
                            ? (
                                (dataProfile?.investments?.total /
                                  dataProfile?.totalAssets) *
                                100
                              ).toFixed(2) + '%'
                            : '%'}
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className='legend'>
                    <Row className='sub-legend' justify='space-between'>
                      <Col style={{ display: 'flex' }}>
                        <div
                          className='circle'
                          style={{
                            backgroundColor: '#FFE9BE',
                          }}
                        />
                        <div className='sub-money'>
                          <h5>Property</h5>
                          <h6>
                            $ {formatMoney(dataProfile?.properties?.total)}
                          </h6>
                        </div>
                      </Col>
                      <Col>
                        <div className='sub-percent'>
                          {' '}
                          {dataProfile?.totalAssets !== 0 &&
                          dataProfile?.totalAssets
                            ? (
                                (dataProfile?.properties?.total /
                                  dataProfile?.totalAssets) *
                                100
                              ).toFixed(2) + '%'
                            : '%'}
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className='legend'>
                    <Row className='sub-legend' justify='space-between'>
                      <Col style={{ display: 'flex' }}>
                        <div
                          className='circle'
                          style={{
                            backgroundColor: '#FFD9D1',
                          }}
                        />
                        <div className='sub-money'>
                          <h5>Bank Account</h5>
                          <h6>
                            $ {formatMoney(dataProfile?.bank_accounts?.total)}
                          </h6>
                        </div>
                      </Col>
                      <Col>
                        <div className='sub-percent'>
                          {dataProfile?.totalAssets !== 0 &&
                          dataProfile?.totalAssets
                            ? (
                                (dataProfile?.bank_accounts?.total /
                                  dataProfile?.totalAssets) *
                                100
                              ).toFixed(2) + '%'
                            : '%'}
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className='legend'>
                    <Row className='sub-legend' justify='space-between'>
                      <Col style={{ display: 'flex' }}>
                        <div
                          className='circle'
                          style={{
                            backgroundColor: '#D3E1FF',
                          }}
                        />
                        <div className='sub-money'>
                          <h5>Business Interests</h5>
                          <h6>
                            ${' '}
                            {formatMoney(
                              dataProfile?.business_interests?.total
                            )}
                          </h6>
                        </div>
                      </Col>
                      <Col>
                        <div className='sub-percent'>
                          {dataProfile?.totalAssets !== 0 &&
                          dataProfile?.totalAssets
                            ? (
                                (dataProfile?.business_interests?.total /
                                  dataProfile?.totalAssets) *
                                100
                              ).toFixed(2) + '%'
                            : '%'}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Col>
              <Col lg={12} xs={24}>
                <Row gutter={[0, 32]}>
                  <Col className='sub-content' xs={24}>
                    <div className='sub-sub-title'>Beneficiaries</div>
                    {dataProfile?.beneficiaries?.data?.map((e) => (
                      <Row className='sub-person' align='middle'>
                        <Col className='person-percent'>{e?.percent}%</Col>
                        <Col>
                          <Row
                            style={{
                              flexDirection: 'column',
                            }}
                          >
                            <div className='name-son'>{e?.full_legal_name}</div>
                            <div className='pos-son'>
                              {
                                find(masterdata, { id: e?.relationship_id })
                                  ?.name
                              }
                            </div>
                          </Row>
                        </Col>
                      </Row>
                    ))}
                  </Col>
                  <Col className='sub-content' xs={24}>
                    <div className='sub-sub-title'>
                      Executors
                      {dataProfile?.executors?.data?.map((e) => (
                        <Row className='sub-person' align='middle'>
                          <Col
                            className='person-percent'
                            style={{
                              backgroundColor: '#E9FAF4',
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
                              <div className='name-son'>
                                {e?.full_legal_name}
                              </div>
                              <div className='pos-son'>
                                {
                                  find(masterdata, { id: e?.relationship_id })
                                    ?.name
                                }
                              </div>
                            </Row>
                          </Col>
                        </Row>
                      ))}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className='sub-title listing'>Personal Estates Listing</div>
            <div className='description'>
              This is section shows your Estate Listing details, you can update
              any changes to your estate here.
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
                    $ {formatMoney(dataProfile?.properties?.total)}
                  </div>
                  {dataProfile?.properties?.data?.map((e, index) => (
                    <Row className='sub-person' align='middle'>
                      <Col
                        className='person-percent'
                        style={{
                          backgroundColor: '#FFE9BE',
                          width: '48px',
                          height: '48px',
                        }}
                      >
                        {index + 1}
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
                            {e?.country}
                          </div>
                          <div
                            className='pos-son'
                            style={{
                              fontSize: '16px',
                            }}
                          >
                            {e?.is_solely && 'Solely Ownership'}
                            {e?.is_joint && 'Joint Ownership'}
                          </div>
                        </Row>
                      </Col>
                    </Row>
                  ))}
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
                  <div className='title-pro'>Bank Accounts</div>
                  <div className='sub-money'>
                    $ {formatMoney(dataProfile?.bank_accounts?.total)}
                  </div>
                  {dataProfile?.bank_accounts?.data?.map((e, index) => (
                    <Row className='sub-person' align='middle'>
                      <Col
                        className='person-percent'
                        style={{
                          backgroundColor: '#FFD9D1',
                          width: '48px',
                          height: '48px',
                        }}
                      >
                        {index + 1}
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
                            {
                              find(masterdata, { id: e?.bank_id })?.name?.split(
                                ':'
                              )[0]
                            }
                          </div>
                          <div
                            className='pos-son'
                            style={{
                              fontSize: '16px',
                            }}
                          >
                            {e?.is_solely && 'Solely Ownership'}
                            {e?.is_joint && 'Joint Ownership'}
                          </div>
                        </Row>
                      </Col>
                    </Row>
                  ))}
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
                  <div className='title-pro'>Insurance Policies</div>
                  <div className='sub-money'>
                    $ {formatMoney(dataProfile?.insurance_policies?.total)}
                  </div>
                  {dataProfile?.insurance_policies?.data?.map((e, index) => (
                    <Row className='sub-person' align='middle' key={index}>
                      <Col
                        className='person-percent'
                        style={{
                          backgroundColor: '#D3EDFF',
                          width: '48px',
                          height: '48px',
                        }}
                      >
                        {index + 1}
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
                            {
                              find(masterdata, { id: e?.insurance_company_id })
                                ?.name
                            }
                          </div>
                          <div
                            className='pos-son'
                            style={{
                              fontSize: '16px',
                            }}
                          >
                            {e?.is_nominated && 'Nominated'}
                            {e?.is_non_nomivated && 'Non-Nominated'}
                          </div>
                        </Row>
                      </Col>
                    </Row>
                  ))}
                </div>
              </div>
              <div>
                <div
                  className='item-carousel'
                  style={{ backgroundColor: '#E9F0FF' }}
                >
                  <Row style={{ minHeight: '150px' }}>
                    <IconInvestment />
                  </Row>
                  <div className='title-pro'>Investments</div>
                  <div className='sub-money'>
                    $ {formatMoney(dataProfile?.investments?.total)}
                  </div>
                  {dataProfile?.investments?.data?.map((e, index) => (
                    <Row className='sub-person' align='middle' key={index}>
                      <Col
                        className='person-percent'
                        style={{
                          backgroundColor: '#DED3FF',
                          width: '48px',
                          height: '48px',
                        }}
                      >
                        {index + 1}
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
                            {find(masterdata, { id: e?.type_id })?.name}
                          </div>
                          <div
                            className='pos-son'
                            style={{
                              fontSize: '16px',
                            }}
                          >
                            {e?.financial_institutions}
                          </div>
                        </Row>
                      </Col>
                    </Row>
                  ))}
                </div>
              </div>

              <div>
                <div
                  className='item-carousel'
                  style={{ backgroundColor: '#E3F8F0' }}
                >
                  <Row style={{ minHeight: '150px' }}>
                    <IconBusinessInterest />
                  </Row>
                  <div className='title-pro'>Business Interests</div>
                  <div className='sub-money'>
                    $ {formatMoney(dataProfile?.business_interests?.total)}
                  </div>
                  {dataProfile?.business_interests?.data?.map((e, index) => (
                    <Row className='sub-person' align='middle' key={index}>
                      <Col
                        className='person-percent'
                        style={{
                          backgroundColor: '#BAF0DF',
                          width: '48px',
                          height: '48px',
                        }}
                      >
                        {index + 1}
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
                            {e?.company_name}
                          </div>
                          <div
                            className='pos-son'
                            style={{
                              fontSize: '16px',
                            }}
                          >
                            {e?.company_uen}
                          </div>
                        </Row>
                      </Col>
                    </Row>
                  ))}
                </div>
              </div>

              <div>
                <div
                  className='item-carousel'
                  style={{ backgroundColor: '#FEF6E7' }}
                >
                  <Row style={{ minHeight: '150px' }}>
                    <IconBusinessInterest />
                  </Row>
                  <div className='title-pro'>My Valuables</div>
                  {/* <div className='sub-money'>$ 1000000</div> */}
                  {dataProfile?.valuables?.data?.map((e, index) => (
                    <Row className='sub-person' align='middle' key={index}>
                      <Col
                        className='person-percent'
                        style={{
                          backgroundColor: '#FFE9BE',
                          width: '48px',
                          height: '48px',
                        }}
                      >
                        <WatchIcon />
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
                            {find(masterdata, { id: e?.type_id })?.name}
                          </div>
                          <div
                            className='pos-son'
                            style={{
                              fontSize: '16px',
                            }}
                          >
                            {e?.brand}
                          </div>
                        </Row>
                      </Col>
                    </Row>
                  ))}
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
                    <div className='text-title'>Amend Existing Will</div>
                    <h6>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim.
                    </h6>
                  </Col>
                </Row>
              </Col>
              <Col>
                <CustomButton
                  borderLarge
                  fontWeightLarge
                  size='large'
                  onClick={() => route.push('/start-your-will-create')}
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
