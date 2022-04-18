/* eslint-disable import/no-cycle */
import { RegisterOptions, useFormContext } from "react-hook-form";
import { ReactElement, Ref } from "react";

export type Methods = ReturnType<typeof useFormContext>;
export type FormFieldOption = RegisterOptions;

export type PartialMethodsType = { methods: Omit<Methods, "handleSubmit"> };

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
