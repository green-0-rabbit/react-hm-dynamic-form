import React, { ReactElement } from "react";
import { ISmartField, SmartFieldsRenderInputParams, SmartInputType } from "./types";
interface SmartFieldProps extends ISmartField<any> {
    renderInput: <U extends object>(params: SmartInputType<U>) => ReactElement<U>;
    renderFormControl: SmartFieldsRenderInputParams["renderFormControl"];
}
declare const _default: React.NamedExoticComponent<SmartFieldProps>;
export default _default;
