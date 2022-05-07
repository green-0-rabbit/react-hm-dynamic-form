/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/require-default-props */
import React, { cloneElement, CSSProperties, FC, Fragment } from "react";
import { FormGroupComponentType } from "./types";

const styles: Record<string, CSSProperties> = {
  container: {
    minWidth:"100%",
  },
  header: {
    marginBlock: "8px"
  }
};

interface IFormGroup {
  groupName: string;
  component?: FormGroupComponentType;
}

const FormGroup: FC<IFormGroup> = (props) => {
  const { groupName, children, component, ...rest } = props;

  const bootstrapElement = (reactComponent: IFormGroup["component"]) => {
    if (reactComponent) {
      return cloneElement(reactComponent, {
        children
      });
    }
    return undefined;
  };

  // component!.children = children;
  // component.props.children = children;
  return (
    <Fragment>
      {bootstrapElement(component) ?? (
        <div style={styles.container} {...rest}>
          <h2 id="group-title" style={styles.header}>
            {groupName}
          </h2>
          <div>{children}</div>
        </div>
      )}
    </Fragment>
  );
};

export default FormGroup;
