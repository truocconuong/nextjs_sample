import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Row } from 'antd';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import {
    CloudAWS,
    Download,
    DownloadIcon,
    DownloadMobile,
    FileIcon,
    FileLock,
    LodgeForm,
    MakePayment,
    MakePaymentMobile,
    NoteIcon,
    PenIcon,
    SmallInfoIcon,
    SmallInfoMobileIcon,
    TrashEnabledIcon,
    UploadFile,
    UploadSecure,
    UploadSecureMobile,
} from '@images/index';
import CustomButton from 'generals/Button';
import CustomCheckbox from 'generals/CustomCheckbox';
import ModalSuccess from 'components/StartYourWill/Modal/ModalSuccess';
import { useRouter } from 'next/router';

function PersonalWill() {
    const [personalParticular, setPersonalParticular] = useState(true);
    const [executor, setExecutor] = useState(true);
    const [beneficiary, setBeneficiary] = useState(true);
    const [estateDis, setEstateDis] = useState(true);
    const [personalEstate, setPersonalEstate] = useState(true);
    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [isUpload, setIsUpload] = useState(false);

    const [lodgeWillCheckbox, setLodgeWillCheckbox] = useState(false);

    const router = useRouter();

    const width = useSelector(
        createSelector(
            (state: any) => state?.sizeBrowser,
            (sizeBrowser) => sizeBrowser?.width
        )
    );

    const makePayment = useSelector(
        createSelector(
            (state: any) => state?.startYourWill,
            (startYourWill) => startYourWill?.makePayment
        )
    );

    const renderIconTitle = () => {
        if (isUpload) {
            return width > 768 ? <UploadSecure /> : <UploadSecureMobile />;
        }
        return width > 768 ? <Download /> : <DownloadMobile />;
    };

    const handleDownloadWill = () => {
        setIsUpload(true);
    };

    const handleMakePayment = () => {
        router.push('/payment-summary');
    };

    const onEditPersonalParticular = () => {
        router.push('/personal-information');
    };

    return (
        <>
            <div className='start-your-will-container personal-will-cuong'>
                {showModalSuccess && (
                    <ModalSuccess
                        showModal={showModalSuccess}
                        setShowModal={setShowModalSuccess}
                        title='Account Created'
                        textNote='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun.'
                    />
                )}
                <div className='body'>
                    <div className='your-personal-will'>
                        <Col span={24} className='center'>
                            <NoteIcon />
                            <span className='text-title'>
                                Your Personal Will
                            </span>
                        </Col>
                        <Row className='text-note '>
                            By writing a will, you will be able to take care of
                            your loved ones when you are gone. Having a will
                            allows you to distribute your assets according to
                            your wishes, and also indicate your wishes you might
                            have when you are gone.
                        </Row>
                        <hr />
                        <Row>
                            <Col
                                xs={24}
                                sm={18}
                                md={18}
                                lg={18}
                                xl={18}
                                xxl={18}
                                className='center'
                            >
                                <Col>
                                    <CustomCheckbox
                                        disable
                                        checked={personalParticular}
                                        onChange={setPersonalParticular}
                                    />
                                </Col>
                                <Col className='ml-16'>
                                    <div className='text-fix-now center'>
                                        Personal Particulars &nbsp;
                                        {width > 768 ? (
                                            <SmallInfoIcon />
                                        ) : (
                                            <SmallInfoMobileIcon />
                                        )}
                                    </div>
                                    <div className='text-note-per'>
                                        Estimation of 3-5 minutes to complete
                                    </div>
                                </Col>
                            </Col>
                            <Col
                                xs={0}
                                sm={6}
                                md={6}
                                lg={6}
                                xl={6}
                                xxl={6}
                                className='item-end center'
                            >
                                {width > 600 && (
                                    <Button
                                        className='edit-btn'
                                        onClick={onEditPersonalParticular}
                                    >
                                        <PenIcon />{' '}
                                        <span className='ml-8'>Edit</span>
                                    </Button>
                                )}
                            </Col>
                        </Row>

                        <hr />
                        <Row>
                            <Col
                                xs={24}
                                sm={18}
                                md={18}
                                lg={18}
                                xl={18}
                                xxl={18}
                                className='center'
                            >
                                <Col>
                                    <CustomCheckbox
                                        disable
                                        checked={executor}
                                        onChange={setExecutor}
                                    />
                                </Col>
                                <Col className='ml-16'>
                                    <div className='text-fix-now center'>
                                        Executor Details &nbsp;
                                        {width > 768 ? (
                                            <SmallInfoIcon />
                                        ) : (
                                            <SmallInfoMobileIcon />
                                        )}
                                    </div>
                                    <div className='text-note-per'>
                                        Estimation of 3-5 minutes to complete
                                    </div>
                                </Col>
                            </Col>
                            <Col
                                xs={0}
                                sm={6}
                                md={6}
                                lg={6}
                                xl={6}
                                xxl={6}
                                className='item-end center'
                            >
                                {width > 600 && (
                                    <Button className='edit-btn'>
                                        <PenIcon />{' '}
                                        <span className='ml-8'>Edit</span>
                                    </Button>
                                )}
                            </Col>
                        </Row>

                        <hr />
                        <Row>
                            <Col
                                xs={24}
                                sm={18}
                                md={18}
                                lg={18}
                                xl={18}
                                xxl={18}
                                className='center'
                            >
                                <Col>
                                    <CustomCheckbox
                                        disable
                                        checked={beneficiary}
                                        onChange={setBeneficiary}
                                    />
                                </Col>
                                <Col className='ml-16'>
                                    <div className='text-fix-now center'>
                                        Beneficiary Details &nbsp;
                                        {width > 768 ? (
                                            <SmallInfoIcon />
                                        ) : (
                                            <SmallInfoMobileIcon />
                                        )}
                                    </div>
                                    <div className='text-note-per'>
                                        Estimation of 3-5 minutes to complete
                                    </div>
                                </Col>
                            </Col>
                            <Col
                                xs={0}
                                sm={6}
                                md={6}
                                lg={6}
                                xl={6}
                                xxl={6}
                                className='item-end center'
                            >
                                {width > 600 && (
                                    <Button className='edit-btn'>
                                        <PenIcon />{' '}
                                        <span className='ml-8'>Edit</span>
                                    </Button>
                                )}
                            </Col>
                        </Row>

                        <hr />
                        <Row>
                            <Col
                                xs={24}
                                sm={18}
                                md={18}
                                lg={18}
                                xl={18}
                                xxl={18}
                                className='center'
                            >
                                <Col>
                                    <CustomCheckbox
                                        disable
                                        checked={estateDis}
                                        onChange={setEstateDis}
                                    />
                                </Col>
                                <Col className='ml-16'>
                                    <div className='text-fix-now center'>
                                        Estate Distribution &nbsp;
                                        {width > 768 ? (
                                            <SmallInfoIcon />
                                        ) : (
                                            <SmallInfoMobileIcon />
                                        )}
                                    </div>
                                    <div className='text-note-per'>
                                        Estimation of 3-5 minutes to complete
                                    </div>
                                </Col>
                            </Col>
                            <Col
                                xs={0}
                                sm={6}
                                md={6}
                                lg={6}
                                xl={6}
                                xxl={6}
                                className='item-end center'
                            >
                                {width > 600 && (
                                    <Button className='edit-btn'>
                                        <PenIcon />{' '}
                                        <span className='ml-8'>Edit</span>
                                    </Button>
                                )}
                            </Col>
                        </Row>
                        <Row className='option center'>
                            <span className='optional-text ml-16'>
                                <span>Optional</span> — You can still complete
                                your Will without filling out this section out
                                😉
                            </span>
                        </Row>

                        <Row>
                            <Col
                                xs={24}
                                sm={18}
                                md={18}
                                lg={18}
                                xl={18}
                                xxl={18}
                                className='center'
                            >
                                <Col>
                                    <CustomCheckbox
                                        disable
                                        checked={personalEstate}
                                        onChange={setPersonalEstate}
                                    />
                                </Col>
                                <Col className='ml-16'>
                                    <div className='text-fix-now center'>
                                        Personal Estates Listing &nbsp;
                                        {width > 768 ? (
                                            <SmallInfoIcon />
                                        ) : (
                                            <SmallInfoMobileIcon />
                                        )}
                                    </div>
                                    <div className='text-note-per'>
                                        Estimation of 3-5 minutes to complete
                                    </div>
                                </Col>
                            </Col>
                            <Col
                                xs={0}
                                sm={6}
                                md={6}
                                lg={6}
                                xl={6}
                                xxl={6}
                                className='item-end center'
                            >
                                {width > 600 && (
                                    <Button className='edit-btn'>
                                        <PenIcon />{' '}
                                        <span className='ml-8'>Edit</span>
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </div>
                    <div className='download '>
                        <Row>
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={18}
                                xl={18}
                                xxl={18}
                                className='center'
                            >
                                <span>
                                    <DownloadIcon />
                                </span>
                                <span className='text-title'>
                                    Preview & Download Your Will
                                </span>
                            </Col>
                            <Col
                                xs={0}
                                sm={0}
                                md={24}
                                lg={6}
                                xl={6}
                                xxl={6}
                                className='item-end'
                            >
                                {width > 768 && (
                                    <Button
                                        className='download-btn'
                                        onClick={handleDownloadWill}
                                    >
                                        Download Will
                                    </Button>
                                )}
                            </Col>
                        </Row>
                        <Row
                            className='optional-text mt-16'
                            style={{ color: '#6670A2' }}
                        >
                            By writing a will, you will be able to take care of
                            your loved ones when you are gone. Having a will
                            allows you to distribute your assets according to
                            your wishes, and also indicate your wishes you might
                            have when you are gone.
                        </Row>
                        <Row
                            className='optional-text mt-24'
                            style={{ color: '#6670A2' }}
                        >
                            Last Edited: Tuesday 17 May 2021, 7:04 PM
                        </Row>
                    </div>

                    <div
                        className='download upload'
                        style={{
                            background: '#fff',
                            border: '2px solid #E5E7EF',
                        }}
                    >
                        <Col span={24} className='center'>
                            <span>
                                <UploadFile />
                            </span>
                            <span className='text-title'>
                                Upload Your Signed Will
                            </span>
                        </Col>
                        <Row
                            className='optional-text mt-16'
                            style={{ color: '#6670A2' }}
                        >
                            Once your Will has been signed, your Will is
                            completed and you can upload your signed Will into
                            the iWills platform for future reference. You should
                            store the original Will in a safe location and
                            inform the Executors of their roles and the location
                            of the Will.
                        </Row>
                        <Row className='file-lock'>
                            <Col>
                                <Row align='middle'>
                                    <Col className='icon-file-lock'>
                                        <FileLock />
                                    </Col>
                                    <Col className='content'>
                                        <h3>Bernerd Soo_Scan 001.PDF</h3>
                                        <p>
                                            Uploaded: Tuesday 17 May 2021, 7:04
                                            PM
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className='btn-remove'>
                                <Button icon={<TrashEnabledIcon />}>
                                    Remove
                                </Button>
                            </Col>
                        </Row>
                        {/* <div className='drag-drop-file mt-24'>
                            <Row className='item-center'>
                                <FileIcon />
                            </Row>
                            <Row className='item-center optional-text mt-16'>
                                Drag and Drop files here
                            </Row>
                            <Row className='item-center text-file-support mt-8'>
                                File Supported: PDF only, (Max 3mb)
                            </Row>
                            <Row className='item-center mt-16'>
                                <Button className='upload-btn'>
                                    Upload Will
                                </Button>
                            </Row>
                        </div> */}

                        {/* {!makePayment && (
                            <>
                                <div className='make-overlay'></div>
                                <div className='make-payment'>
                                    <Row>
                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={18}
                                            lg={18}
                                            xl={18}
                                            xxl={18}
                                            className='center'
                                        >
                                            <Col style={{ paddingRight: 10 }}>
                                                {width > 768 ? (
                                                    <MakePayment />
                                                ) : (
                                                    <MakePaymentMobile />
                                                )}
                                            </Col>
                                            <Col>
                                                <div className='text-title'>
                                                    Pay to upload Your Signed
                                                    Will
                                                </div>
                                                <div className='text-note'>
                                                    A secured interface with
                                                    your data encrypted and your
                                                    Will stored safely to
                                                    protect your privacy.
                                                </div>
                                            </Col>
                                        </Col>
                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={6}
                                            lg={6}
                                            xl={6}
                                            xxl={6}
                                            className='col-btn-pay'
                                        >
                                            <Button
                                                className='make-payment-btn'
                                                onClick={handleMakePayment}
                                            >
                                                Make Payment
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </>
                        )} */}
                    </div>
                    <div
                        className='download lodge-form'
                        style={{ background: '#fff' }}
                    >
                        <Row align='middle' justify={'space-between'}>
                            <Col className='center'>
                                <span>
                                    <LodgeForm />
                                </span>
                                <span className='text-title'>
                                    Lodge Your Will
                                </span>
                            </Col>
                            <Col>
                                <p>Optional</p>
                            </Col>
                        </Row>
                        <Row
                            className='optional-text mt-16'
                            style={{ color: '#6670A2' }}
                        >
                            Though It is not compulsory to register your Will
                            with the Wills Registry, you should consider
                            notifying the Wills Registry that your Will has been
                            made to help your loved ones locate your Will.
                        </Row>
                        <Row className='complete-this-form'>
                            <Col
                                xs={24}
                                sm={18}
                                md={18}
                                lg={18}
                                xl={18}
                                xxl={18}
                                className='center'
                            >
                                <Col>
                                    <CustomCheckbox
                                        // disable
                                        checked={lodgeWillCheckbox}
                                        onChange={setLodgeWillCheckbox}
                                    />
                                </Col>
                                <Col className='ml-16'>
                                    <div className='text-fix-now center'>
                                        <div>
                                            Lodge Will into Singapore Will{' '}
                                            <span className='registry'>
                                                Registry
                                                {width > 768 ? (
                                                    <SmallInfoIcon />
                                                ) : (
                                                    <SmallInfoMobileIcon />
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='text-note-per'>
                                        Estimation of 10 minutes to complete
                                    </div>
                                </Col>
                            </Col>
                            <Col
                                xs={0}
                                sm={6}
                                md={6}
                                lg={6}
                                xl={6}
                                xxl={6}
                                className='item-end center'
                            >
                                {width > 600 && (
                                    <Button
                                        className='complete-this'
                                        // onClick={onEditPersonalParticular}
                                    >
                                        Complete This
                                    </Button>
                                )}
                            </Col>
                        </Row>
                        <div className='paste-your'>
                            <h3>
                                Paste your Will Registry verified number below
                                and click ‘confirm’ to proceed
                            </h3>
                            <Row justify='space-between'>
                                <Col xs={24} md={16} lg={18}>
                                    <Input placeholder='000-0000-000' />
                                </Col>
                                <Col
                                    className='btn-lodge-confirm'
                                    md={{ offset: '2' }}
                                >
                                    <CustomButton
                                    // onClick={handleCreateYourWill}
                                    >
                                        Confirm
                                    </CustomButton>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
            <div className='body-1'></div>
        </>
    );
}

export default PersonalWill;
