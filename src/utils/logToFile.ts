/* eslint-disable import/prefer-default-export */
import { writeFile } from "fs/promises";

export const logToFile = async (filePath: string, data: unknown) => {
  const formate = (_data: unknown) => {
    if (typeof _data !== "object") {
      return { log: _data };
    }
    return _data;
  };

  await writeFile(filePath, JSON.stringify(formate(data)));
};
