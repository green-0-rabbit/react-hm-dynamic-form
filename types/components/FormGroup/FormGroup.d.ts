import { FC } from "react";
import { FormGroupComponentType } from "./types";
interface IFormGroup {
    groupName: string;
    component?: FormGroupComponentType;
}
declare const FormGroup: FC<IFormGroup>;
export default FormGroup;
