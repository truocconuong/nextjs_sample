import React, {useState} from "react";
import CustomToggle from ".";

function ExampleToggle() {
  const [value, setValue] = useState(false);

  return (
    <>
      <CustomToggle onChangeSwitch={value => setValue(value)} />
    </>
  );
}

export default ExampleToggle;
