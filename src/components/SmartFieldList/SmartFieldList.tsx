/* eslint-disable react/display-name */
/* eslint-disable react/require-default-props */
// eslint-disable-next-line object-curly-newline
import React, { FC, ReactElement, useMemo } from "react";
import getValuePath from "../../utils/dataUtils";
import { ISmartField, SmartFieldsRenderInputParams } from "../SmartField/types";
import { ErrorFormType } from "../types";
import {
  IListCustomPropsBase,
  UseFieldArrayType,
  RenderSmartFieldProps,
  IRenderFieldList,
  ISmartFieldList
} from "./types";


const SmartFieldList: FC<ISmartFieldList> = (props) => {
  const {
    isParentList,
    errors,
    useFieldArray,
    renderSmartField,
    renderFieldList,
    renderFormControl,
    ...rest
  } = props;
  const { inputKey, customProps, methods, options } = rest;
  const { fieldsMeta, defaultValue } = customProps;
  type GetValuePath = Record<string, ErrorFormType>[] | undefined;
  const paths = inputKey.split(".");
  const hasErrors = errors
    ? (getValuePath(paths, errors) as GetValuePath)
    : undefined;
  const { control } = methods;
  const { fields, ...arrayMethods } = useFieldArray({
    control,
    name: inputKey // unique name for your Field Array
  });

  const ids = fields.map((field) => field.id);
  const renderFieldListProps = {
    fieldsMeta,
    ids,
    defaultValue,
    hasErrors,
    listInputKey: inputKey,
    renderSmartField,
    arrayMethods,
    methods
  };

  const formControlProps = {
    errors: hasErrors,
    ...rest,
    renderInput: () => renderFieldList(renderFieldListProps)
  };
  return useMemo(
    () => (renderFormControl ? renderFormControl(formControlProps) : null),

    // <SmartFormControl
    //   renderInput={() => renderFieldList(renderFieldListProps)}
    //   errors={hasErrors}
    //   {...rest}
    // />
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hasErrors, fields]
  );
};
export default SmartFieldList;
