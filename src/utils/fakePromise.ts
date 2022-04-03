/* eslint-disable @typescript-eslint/no-explicit-any */
export const fakeAsync = async (callback: () => any, timeout: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(callback()), timeout);
  });

export const resAsync = async (callback: VoidFunction) => {
  callback();
};
