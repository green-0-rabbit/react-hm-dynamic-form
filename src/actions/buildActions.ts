/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
import { isResolved, path as p } from "../utils";
import { build, git, fs } from "../services";
import { BuildOptions } from "../types";

// eslint-disable-next-line consistent-return
const hooks = async (options: BuildOptions) => {
  const { all, path } = options;
  const listFilesStatusPayload = await git.listFilesStatus([path]);
  const buildhooks = async (files: ReturnType<typeof git.statusParser>) => {
    const filteredFiles = git.statusParser(files, "all");
    for await (const file of filteredFiles) {
      await build.hooks(file.file, path);
    }
    return true;
  };

  if (isResolved(listFilesStatusPayload)) {
    const { data } = listFilesStatusPayload;
    const files = data;
    if (all) {
      const readDirPayload = await fs.readDir(p.__amplifyhookspath);

      if (isResolved(readDirPayload)) {
        const removeFileOrDirPayload = await fs.removeFileOrDir(
          p.__amplifyhookspath
        );
        if (isResolved(removeFileOrDirPayload)) {
          const res = await buildhooks(files);
          return res;
        }
        const { error } = removeFileOrDirPayload;
        throw new fs.FSError(error);
      } else {
        const { error } = readDirPayload;
        if (error.code === "ENOENT") {
          const res = await buildhooks(files);
          await buildhooks(files);
          return res;
        }
        throw new fs.FSError(error);
      }
    }
    const filteredFiles = git.statusParser(files, "updatable");
    if (!filteredFiles.length) {
      throw new Error("There is no updatable files");
    }
    for await (const file of filteredFiles) {
      await build.hooks(file.file, path);
    }
  } else {
    const { error } = listFilesStatusPayload;
    throw new git.GitError(error);
  }
};

const lambda = async (options: BuildOptions) => {
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
  const res = await build.lambda(path);
  console.log(res);
};

const buildActions = {
  hooks,
  lambda
};
export default buildActions;
