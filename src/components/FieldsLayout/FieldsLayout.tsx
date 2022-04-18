/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  cloneElement,
  CSSProperties,
  FC,
  Fragment,
  ReactElement
} from "react";

interface IFieldsLayout {
  groupName: string;
  component?: ReactElement;
}

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
};

const FieldsLayout: FC<IFieldsLayout> = (props) => {
  const { groupName, children, component, ...rest } = props;

  const bootstrapElement = (reactComponent: IFieldsLayout["component"]) => {
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
          {children}
        </div>
      )}
    </Fragment>
  );
};
export default FieldsLayout;
