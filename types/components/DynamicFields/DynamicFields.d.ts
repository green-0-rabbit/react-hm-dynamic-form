/// <reference types="react" />
import { FormGroupComponentType } from "../FormGroup";
import { IFieldGroupMetaBase } from "../types";
import { ISmartField, SmartFieldsRenderInputParams } from "../SmartField";
import { ISmartFieldList, UseFieldArrayType } from "../SmartFieldList";
interface IDynamicForm<T extends object> {
    methods: ISmartField<T>["methods"];
    errors: ISmartField<T>["errors"];
    fieldsGroupMeta: IFieldGroupMetaBase<T>[];
    renderGroup?: (group: Omit<IFieldGroupMetaBase<T>, "fieldsMeta">) => FormGroupComponentType;
    renderLayout?: (group: Omit<IFieldGroupMetaBase<T>, "fieldsMeta">) => FormGroupComponentType;
    renderFields: SmartFieldsRenderInputParams["renderFields"];
    renderFieldList: ISmartFieldList["renderFieldList"];
    renderFormControl: SmartFieldsRenderInputParams["renderFormControl"];
    data?: any;
    useFieldArray?: UseFieldArrayType;
}
declare const DynamicFields: <T extends object>(props: IDynamicForm<T>) => JSX.Element;
export default DynamicFields;
