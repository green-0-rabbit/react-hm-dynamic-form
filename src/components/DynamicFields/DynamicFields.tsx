import React, { Fragment, useMemo, ReactElement } from "react";
import FormGroup, { FormGroupComponentType } from "../FormGroup";
import ISList from "../ISList";
import GetSmartField from "../GetSmartField";
import SmartFieldList from "../SmartFieldList";
import { IFieldGroupMetaBase } from "../types";
import { ISmartField, SmartFieldsRenderInputParams } from "../SmartField";
import FieldsLayout from "../FieldsLayout";
import { ISmartFieldList, UseFieldArrayType } from "../SmartFieldList";

interface IDynamicForm<T extends object> {
  methods: ISmartField<T>["methods"];
  errors: ISmartField<T>["errors"];
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
    useFieldArray
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
                const { inputType, inputKey } = fieldMeta;
                return (
                  <ISList
                    key={inputKey}
                    inputType={inputType}
                    list={
                      useFieldArray ? (
                        <SmartFieldList
                          {...(fieldMeta as never)}
                          methods={methods}
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
                        methods={methods}
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
    [fieldsGroupMeta, errors]
  );
};
export default DynamicFields;
