import React, { Fragment, useMemo, ReactElement } from "react";
import FormGroup, { FormGroupComponentType } from "../FormGroup";
import ISList from "../ISList";
import GetSmartField from "../GetSmartField";
import SmartFieldList from "../SmartFieldList";
import { IFieldGroupMetaBase } from "../types";
import { ISmartField, SmartFieldsRenderInputParams } from "../SmartField";
import FieldsLayout from "../FieldsLayout";
import { ISmartFieldList, UseFieldArrayType } from "../SmartFieldList";

interface IDynamicForm<T extends Record<string, any>> {
  methods: ISmartField<any, T>["methods"];
  errors: ISmartField<any>["errors"];
  fieldsGroupMeta: IFieldGroupMetaBase<T>[];
  renderGroup?: (
    group: Omit<IFieldGroupMetaBase<T>, "fieldsMeta">
  ) => FormGroupComponentType;
  renderLayout?: (
    group: Omit<IFieldGroupMetaBase<T>, "fieldsMeta">
  ) => FormGroupComponentType;
  renderFields: SmartFieldsRenderInputParams["renderFields"];
  renderFieldList?: ISmartFieldList["renderFieldList"];
  renderFormControl: SmartFieldsRenderInputParams["renderFormControl"];
  data?: any;
  useFieldArray?: UseFieldArrayType;
  currentBreakpoint?: string;
}

const DynamicFields = <T extends object>(props: IDynamicForm<T>) => {
  const {
    fieldsGroupMeta,
    methods,
    errors,
    renderGroup,
    renderLayout,
    renderFields,
    renderFormControl,
    renderFieldList,
    useFieldArray,
    currentBreakpoint
  } = props;

  return useMemo(
    () => (
      <Fragment>
        {fieldsGroupMeta.map(({ fieldsMeta, ...group }) => (
          <FormGroup
            key={group.groupName}
            groupName={group.groupName}
            component={renderGroup ? renderGroup(group) : undefined}>
            <FieldsLayout
              groupName={group.groupName}
              component={renderLayout ? renderLayout(group) : undefined}>
              {fieldsMeta.map((fieldMeta) => {
                const { customProps, ...fieldMetaRest } = fieldMeta;
                return (
                  <ISList
                    key={fieldMeta.inputKey}
                    inputType={fieldMeta.inputType}
                    list={
                      useFieldArray ? (
                        <SmartFieldList
                          {...fieldMetaRest}
                          customProps={customProps}
                          methods={methods as any}
                          errors={errors}
                          useFieldArray={useFieldArray}
                          renderFieldList={renderFieldList}
                          renderFormControl={renderFormControl}
                          renderSmartField={(params) => (
                            <GetSmartField
                              {...params}
                              renderFields={renderFields}
                            />
                          )}
                        />
                      ) : undefined
                    }
                    field={
                      <GetSmartField
                        fieldMeta={fieldMeta}
                        methods={methods as never}
                        errors={errors}
                        renderFields={renderFields}
                        renderFormControl={renderFormControl}
                      />
                    }
                  />
                );
              })}
            </FieldsLayout>
          </FormGroup>
        ))}
      </Fragment>
    ),
    [fieldsGroupMeta, errors, currentBreakpoint]
  );
};
export default DynamicFields;
