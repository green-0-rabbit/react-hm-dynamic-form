/* eslint-disable import/no-cycle */
import { ReactElement } from "react";
import { UseFieldArrayProps, UseFieldArrayReturn } from "react-hook-form";
import { SmartFieldsRenderInputParams } from "../SmartField";
import { ErrorFormType, FormFieldOption, InputType } from "./fieldType";
import { FielMetaBaseProps } from "./formType";

type ChildrenFieldsMeta = Omit<FielMetaBaseProps, "labelDirection">;

export interface IListCustomPropsBase {
  fieldsMeta: ChildrenFieldsMeta[];
  defaultValue: Record<string, any>;
}

export type RenderSmartFieldProps = Omit<
  SmartFieldsRenderInputParams,
  "renderFields"
>;
export type UseFieldArrayMethodsType = Omit<UseFieldArrayReturn, "fields">;
type RestrictedType<U extends string> = U extends "list" ? never : U;

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
  renderSmartField: (params: RenderSmartFieldProps) => ReactElement;
  arrayMethods: UseFieldArrayMethodsType;
}

export type UseFieldArrayType = (
  params: UseFieldArrayProps
) => UseFieldArrayReturn;
