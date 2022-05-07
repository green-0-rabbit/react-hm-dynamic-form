import { RegisterOptions, useFormContext } from "react-hook-form";
import { Ref } from "react";
export declare type Methods = ReturnType<typeof useFormContext>;
export declare type FormFieldOption = RegisterOptions;
export declare type PartialMethodsType = {
    methods: Omit<Methods, "handleSubmit">;
};
export declare type ErrorFormType = {
    type: string;
    message?: string;
    ref: Ref<HTMLElement>;
};
export declare type InputType = "text" | "password" | "range" | "switch" | "select" | "multiSelect" | "radio" | "checkbox" | "list";
