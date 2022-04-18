/* eslint-disable react/display-name */
/* eslint-disable react/require-default-props */
// eslint-disable-next-line object-curly-newline
import React, { FC } from "react";
import { SmartFieldsRenderInputParams } from "../SmartField";
import SmartField from "../SmartField/SmartField";

const GetSmartField: FC<SmartFieldsRenderInputParams> = ({ ...props }) => {
  const { fieldMeta, renderFields, renderFormControl, ...rest } = props;
  const { inputType, customProps, ...meta } = fieldMeta;
  const fieldProps = {
    customProps: customProps as never,
    ...meta,
    ...rest,
    renderFormControl
  };

  return (
    <SmartField
      renderInput={(inputProps) =>
        renderFields({ inputType: inputType as never, ...inputProps })
      }
      {...fieldProps}
    />
  );
};

export default GetSmartField;
