import { ReactElement } from "react";
import { UseFieldArrayProps, UseFieldArrayReturn } from "react-hook-form";
import { ISmartField, SmartFieldsRenderInputParams } from "../SmartField";
import { ErrorFormType, FormFieldOption, InputType, PartialMethodsType, FielMetaBaseProps } from "../types";
export interface ISmartFieldList extends ISmartField<IListCustomPropsBase> {
    useFieldArray: UseFieldArrayType;
    renderSmartField: (params: RenderSmartFieldProps) => ReactElement;
    renderFieldList: (params: IRenderFieldList) => ReactElement;
    renderFormControl: SmartFieldsRenderInputParams["renderFormControl"];
}
declare type ChildrenFieldsMeta = Omit<FielMetaBaseProps, "labelDirection">;
export interface IListCustomPropsBase {
    fieldsMeta: ChildrenFieldsMeta[];
    defaultValue: Record<string, any>;
}
export declare type RenderSmartFieldProps = Omit<SmartFieldsRenderInputParams, "renderFields">;
export declare type UseFieldArrayMethodsType = Omit<UseFieldArrayReturn, "fields">;
declare type RestrictedType<U extends string> = U extends "list" ? never : U;
/**
 * The generic type of the listField, it can be extended
 */
export interface IFieldListMetaBase<U extends InputType | string> {
    inputKey: string;
    label: string;
    inputType: RestrictedType<U>;
    options?: FormFieldOption;
    customProps?: IListCustomPropsBase | Record<string, any>;
}
export interface IRenderFieldList {
    ids: string[];
    defaultValue?: Record<string, any>;
    fieldsMeta: IFieldListMetaBase<any>[];
    hasErrors?: Record<string, ErrorFormType>[];
    listInputKey: string;
    methods: PartialMethodsType["methods"];
    renderSmartField: (params: RenderSmartFieldProps) => ReactElement;
    arrayMethods: UseFieldArrayMethodsType;
}
export declare type UseFieldArrayType = (params: UseFieldArrayProps) => UseFieldArrayReturn;
export {};
