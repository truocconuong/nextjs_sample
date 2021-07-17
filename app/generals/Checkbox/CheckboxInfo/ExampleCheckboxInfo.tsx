import React from 'react';
import { useState } from 'react';
import CustomCheckboxInfo from '.';

function ExampleCheckboxInfo(props) {

    const [myCheck, setMyCheck] = useState(false);

    const handClickCheckbox = () => {
        setMyCheck(!myCheck)
    }

    return (
        <div>
            <CustomCheckboxInfo checked={myCheck} title="Choose 1" content="Say something here..." onChange={handClickCheckbox} />
        </div>
    );
}

export default ExampleCheckboxInfo;