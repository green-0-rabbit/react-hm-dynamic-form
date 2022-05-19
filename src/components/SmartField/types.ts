import { ReactElement } from "react";
import { FielMetaBaseProps } from "../types";
import {
  ErrorFormType,
  FormFieldOption,
  InputType,
  PartialMethodsType
} from "../types/fieldType";

export type PartialISmartField = Pick<
  ISmartField<any>,
  "errors" | "isParentList" | "methods"
>;

type PartialISmartFormControl<
  T,
  U extends Record<string, any> = Record<string, any>
> = Omit<
  IFormControl<T, U>,
  "label" | "inputHelperText" | "renderInput" | "isSubmitted"
>;

export interface SmartInputType<T> extends PartialISmartFormControl<T> {
  helperId?: string;
}

/**
 * T represent customProps and U reprensent Data
 */
export interface IFormControl<
  T,
  U extends Record<string, any> = Record<string, any>
> extends Omit<ISmartField<T, U>, "data"> {
  renderInput: (inputProps: SmartInputType<T>) => React.ReactNode;
}

export type SmartFieldsRenderInputParams = {
  fieldMeta: FielMetaBaseProps;
  renderFields: (
    params: SmartInputType<any> & { inputType: Exclude<InputType, "list"> }
  ) => ReactElement;
  renderFormControl?: <U extends object>(
    params: ISmartField<U> & {
      renderInput: IFormControl<U>["renderInput"];
    }
  ) => ReactElement<U>;
} & PartialISmartField;

/**
 * type helper for DynamicFields renderFields
 */
export type SmartFieldType<T extends InputType | string> = {
  [K in Exclude<T, "list">]: SmartFieldsRenderInputParams["renderFields"];
};

/**
 * T represent customProps, U re
 */
export interface ISmartField<
  T,
  U extends Record<string, any> = Record<string, any>
> {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: ErrorFormType | Record<string, any>;

  methods: PartialMethodsType<U>["methods"];

  customProps: T;
}
