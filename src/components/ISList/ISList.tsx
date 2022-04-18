/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/require-default-props */
import React, { FC, Fragment, ReactElement } from "react";

interface IISList {
  inputType: string;
  list?: ReactElement<any>;
  field?: ReactElement<any>;
}

const ISList: FC<IISList> = (props) => {
  const { field, list, inputType } = props;

  return <Fragment>{inputType === "list" ? list : field}</Fragment>;
};

export default ISList;
