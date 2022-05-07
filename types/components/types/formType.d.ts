import { NestedKeyOf } from "./nestedProps";
import { FormFieldOption, InputType } from "./fieldType";
interface IFieldMetaBase<T extends object, U extends InputType> {
    inputKey: NestedKeyOf<T> | string;
    label: string;
    labelDirection?: "top" | "right";
    inputType: U;
    inputHelperText?: string;
    options?: FormFieldOption;
    customProps?: any;
}
export interface IFieldGroupMetaBase<T extends object> {
    groupName: string;
    fieldsMeta: IFieldMetaBase<T, InputType>[];
}
export declare type FielMetaBaseProps = IFieldGroupMetaBase<never>["fieldsMeta"][0];
export {};
