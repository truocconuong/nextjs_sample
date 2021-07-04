import { Input, InputProps } from "antd";
import TextArea, { TextAreaProps } from "antd/lib/input/TextArea";
import React from "react";
interface InputFieldPropsInterface {
  label?: string;
  displayLabel?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  value?: string;
  isError?: boolean;
  displayErrorText?: boolean;
  errorTextStr?: string;
  multipleLines?: boolean;
  limitLines?: number;
  displaySupportText?: boolean;
  supportText?: string;
}
const InputField = (props: InputFieldPropsInterface) => {
  const {
    displayLabel,
    label,
    inputProps,
    isError,
    errorTextStr,
    displayErrorText,
    multipleLines,
    limitLines,
    displaySupportText,
    supportText,
  } = props;
  const className =
    "input-field " +
    (inputProps?.className || "") +
    (inputProps?.disabled ? " disabled " : "") +
    (isError
      ? " error "
      : inputProps?.value && !inputProps?.disabled
      ? " box-shadow "
      : "") +
    (inputProps?.value ? " typing " : "");
  return (
    <div className="input-field-container">
      {displayLabel && (
        <label htmlFor="input" className="paragraph-3 label-input-field">
          {label}
        </label>
      )}
      {multipleLines ? (
        <TextArea
          {...((inputProps as unknown) as TextAreaProps)}
          autoSize={{ minRows: 2, maxRows: limitLines }}
          className={className}
        />
      ) : (
        <Input
          {...((inputProps as unknown) as InputProps)}
          className={className}
        />
      )}
      {displayErrorText && <div className="error-text">{errorTextStr}</div>}
      {displaySupportText && <div className="support-text">{supportText}</div>}
    </div>
  );
};

export default React.memo(InputField);
