/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/display-name */
/* eslint-disable react/require-default-props */
// eslint-disable-next-line object-curly-newline
import React, { FC, memo, ReactElement } from "react";
import getValuePath from "../../utils/dataUtils";
import {
  ISmartField,
  SmartFieldsRenderInputParams,
  SmartInputType
} from "./types";

interface SmartFieldProps extends ISmartField<any> {
  renderInput: <U extends object>(params: SmartInputType<U>) => ReactElement<U>;
  renderFormControl: SmartFieldsRenderInputParams["renderFormControl"];
}

const SmartField: FC<SmartFieldProps> = (props) => {
  const { isParentList, errors, renderInput, renderFormControl, ...rest } =
    props;
  const { inputKey, customProps, methods, options, ...other } = rest;
  const paths = inputKey.split(".");
  let hasErrors;
  if (isParentList) {
    hasErrors = errors || undefined;
  } else {
    hasErrors = errors ? getValuePath(paths, errors) : undefined;
  }

  const inputProps: SmartInputType<any> = {
    inputKey,
    customProps,
    methods,
    isParentList,
    errors: hasErrors,
    options
  };
  const formControlProps = {
    ...inputProps,
    ...other,
    renderInput
  };
  return isParentList || !renderFormControl
    ? renderInput(inputProps)
    : renderFormControl(formControlProps);
};
export default memo(SmartField);
