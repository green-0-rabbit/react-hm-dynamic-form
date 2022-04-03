/* eslint-disable no-underscore-dangle */
import { isResolved, path as p } from "../../utils";
import { dev, git, fs } from "../services";
import { DevOptions } from "../types";

const lambda = async (options: DevOptions) => {
  const { path } = options;
  if (!p.isValidePath(path)) throw new Error(`The provided path is not valide`);
  const firstDirName = p.firstDirName(path);
  if (firstDirName === ".") {
    throw new Error(
      `lambda function should be placed in a subdirectory with the same name as the amplify function target`
    );
  }

  const amplifyFunctionPath = p.join(p.__amplifyfunctionpath, firstDirName);

  const readDirPayload = await fs.readDir(amplifyFunctionPath);
  if (!isResolved(readDirPayload)) {
    const { error } = readDirPayload;
    throw new fs.FSError(error);
  }
  const res = await dev.lambda(path);
  console.log(res);
};

const devActions = {
  lambda,
  hooks: () => console.log(" dev hooks"),
  api: () => console.log(" dev api"),
  all: () => console.log("de all")
};
export default devActions;
