/* eslint-disable @typescript-eslint/no-explicit-any */
import { NestedKeyOf } from "./nestedProps";
import { FormFieldOption, InputType } from "./fieldType";

// ### Lib ###

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
  // fieldsMeta: ReturnType<
  //   <U extends InputType>(params: FieldMeta<T, U>[]) => typeof params
  // >;
}

export type FielMetaBaseProps = IFieldGroupMetaBase<never>["fieldsMeta"][0];
// ### Lib ###
