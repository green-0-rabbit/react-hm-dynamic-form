import { ReactElement } from "react";
import { FielMetaBaseProps } from "../types";
import { ErrorFormType, FormFieldOption, InputType, PartialMethodsType } from "../types/fieldType";
export declare type PartialISmartField = Pick<ISmartField<never>, "errors" | "isParentList" | "methods">;
declare type PartialISmartFormControl<T> = Omit<IFormControl<T>, "label" | "inputHelperText" | "renderInput" | "methods" | "isSubmitted">;
export interface SmartInputType<T> extends PartialISmartFormControl<T>, PartialMethodsType {
    helperId?: string;
}
export interface IFormControl<T> extends Omit<ISmartField<T>, "data"> {
    renderInput: (inputProps: SmartInputType<T>) => React.ReactNode;
}
export declare type SmartFieldsRenderInputParams = {
    fieldMeta: FielMetaBaseProps;
    renderFields: (params: SmartInputType<any> & {
        inputType: Exclude<InputType, "list">;
    }) => ReactElement;
    renderFormControl?: <U extends object>(params: ISmartField<U> & {
        renderInput: IFormControl<U>["renderInput"];
    }) => ReactElement<U>;
} & PartialISmartField;
/**
 * type helper for DynamicFields renderFields
 */
export declare type SmartFieldType<T extends InputType | string> = {
    [K in Exclude<T, "list">]: SmartFieldsRenderInputParams["renderFields"];
};
export interface ISmartField<T> {
    /** inputKey is used for register, input id and array map key */
    inputKey: string;
    /** label is used for the input displayed name */
    label: string;
    /** label is used for the input displayed name */
    labelDirection?: "top" | "right";
    /** react-hook-form register's options  */
    options?: FormFieldOption;
    /** text placed below the input, it serve as helper for error or input value */
    inputHelperText?: string;
    /** check whether the input has an List parent or not */
    isParentList?: boolean;
    errors?: ErrorFormType | Record<string, any>;
    methods: PartialMethodsType["methods"];
    customProps: T;
}
export {};
