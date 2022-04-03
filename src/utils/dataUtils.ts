/* eslint-disable import/prefer-default-export */
type Data = string | number | boolean | object | never[] | null | undefined;

export const isNotEmpty = (data: Data) => {
  if (data && typeof data === "object") {
    return !!Object.entries(data).length;
  }

  return !!data;
};
