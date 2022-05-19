/* eslint-disable import/no-cycle */
import {
  RegisterOptions,
  useFormContext,
  UseFormReturn
} from "react-hook-form";
import { ReactElement, Ref } from "react";

export type Methods<T extends Record<string, any>> = UseFormReturn<T>;
export type FormFieldOption = RegisterOptions;

export type PartialMethodsType<T extends Record<string, any>> = { methods: Omit<Methods<T>, "handleSubmit"> };

type Keys = Exclude<InputType, "list">;

export type ErrorFormType = {
  type: string;
  message?: string;
  ref: Ref<HTMLElement>;
};

export type InputType =
  | "text"
  | "password"
  | "range"
  | "switch"
  | "select"
  | "multiSelect"
  | "radio"
  | "checkbox"
  | "list";
