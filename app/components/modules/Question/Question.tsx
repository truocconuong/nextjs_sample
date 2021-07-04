import React from 'react';

function Question(props) {
    const answers = [
        {
            title: 'Ux Designer',
            description: 'test',
            image: '/static/assets/img/bt1.png'
        },
        {
            title: 'Ux Designer',
            description: 'test',
            image: '/static/assets/img/bt1.png'
        },
        {
            title: 'Ux Designer',
            description: 'test',
            image: '/static/assets/img/bt1.png'
        },
        {
            title: 'Ux Designer',
            description: 'test',
            image: '/static/assets/img/bt1.png'
        },
        {
            title: 'Ux Designer',
            description: 'test',
            image: '/static/assets/img/bt1.png'
        },
        {
            title: 'Ux Designer',
            description: 'test',
            image: '/static/assets/img/bt1.png'
        }
    ]
    return (
        <div className="wizard-inner-box">
            <div className="inner-title text-center">
                <h2>What kind of Job You Need ?</h2>
                <p>Tation argumentum et usu, dicit viderer evertitur te has. Eu dictas </p>
            </div>
            <div>
                {/* <Carousel>
                    {answers.map(item => (
                        <label className="need-job-icon-text text-center">
                            <input type="radio" name="job_title" defaultValue="Ux designer label" className="j-checkbox" defaultChecked />
                            <span className="need-job-text-inner">
                                <span className="checkbox-circle-mark position-absolute"> </span>
                                <span className="need-job-icon">
                                    <img src={item.image} alt="" />
                                </span>
                                <span className="need-job-text">
                                    <span className="text-uppercase need-job-title">{item.title}</span>
                                    <span className="text-capitalize need-job-text">{item.description}</span>
                                </span>
                            </span>
                        </label>
                    ))}
                </Carousel> */}
            </div>
        </div>
    );
}

export default Question;