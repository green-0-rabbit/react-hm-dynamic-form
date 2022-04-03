/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from "fs/promises";
import { PathLike } from "fs";
import { errorResponse, isResolved, resAsync, response } from "@/utils";

type Data = Parameters<typeof fs.writeFile>[1];
type Options = Parameters<typeof fs.writeFile>[2];
type BaseError = {
  code: string;
  message: string;
  errno: number;
  syscall: string;
} & unknown;

const options: Options = {
  encoding: "utf8",
  flag: "w", // https://nodejs.org/api/fs.html#file-system-flags
  mode: 0o666 // File Accessibility => https://betterprogramming.pub/node-js-fs-module-check-file-accessibility-appending-data-and-changing-permissions-dbce0f2b373c
};

export class FSError extends Error {
  errno: number;

  syscall: string;

  code: string;

  rest: object;

  constructor(errObj: BaseError, ...params: any[]) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FSError);
    }

    this.message = errObj.message;
    this.errno = errObj.errno;
    this.syscall = errObj.syscall;
    this.code = errObj.code;
    this.rest = { ...errObj };
  }
}

export const copyFile = async (src: PathLike, dest: PathLike) => {
  try {
    await fs.copyFile(src, dest);
    console.log(`${src} was copied to ${dest}`);
    const data = { done: true };
    return response(data);
  } catch (err) {
    return errorResponse(<BaseError>err);
    // const { code, message } = err;
    // if (code === 'ENOENT') {
    //   throw new Error(message);
    // }
    // throw new Error(err);
  }
};

/**
 * Write data to a file, create the file if it doesn't exist
 * fail if the file's directory doesn't exist
 */
export const writeFile = async (file: PathLike, data: Data) => {
  try {
    await fs.writeFile(file, data, options);
    console.log(`${file} have been updated`);
    const Responsedata = { done: true };
    return response(Responsedata);
  } catch (err) {
    return errorResponse(<BaseError>err);
    // const { code, message } = err;
    // if (code === 'ENOENT') {
    //   throw new Error(message);
    // }
    // throw new Error(err);
  }
};

/**
 * Create a directory, fail if the directory exist
 */
export const createDir = async (path: PathLike) => {
  try {
    await fs.mkdir(path);
    const data = { done: true };
    console.log(`${path} was created`);
    return response(data);
  } catch (err) {
    return errorResponse(<BaseError>err);
    // throw new Error(err);
  }
};

/**
 * Create a directory, fail if the directory exist
 */
export const readDir = async (path: PathLike) => {
  try {
    const files = await fs.readdir(path);
    const data = { files };
    return response(data);
  } catch (err) {
    return errorResponse(<BaseError>err);
    // move to actions
    // const { code, message } = err;
    // if (code === 'ENOENT') {
    //   throw new Error(message);
    // }
    // throw new Error(err);
  }
};

/**
 * remove file or directory
 */
export const removeFileOrDir = async (path: PathLike) => {
  try {
    await fs.rm(path, { recursive: true });
    const data = { done: true };
    console.log("file or dir have been removed");
    return response(data);
  } catch (err) {
    return errorResponse(<BaseError>err);
    // move to actions
    // const { code, message } = err;
    // if (code === 'ENOENT') {
    //   throw new Error(message);
    // }
    // throw new Error(err);
  }
};

/**
 * get file data as UTF8
 */
export const readFile = async (path: PathLike) => {
  try {
    const fileData = await fs.readFile(path, "utf8");
    const data = { fileData };
    return response(data);
  } catch (err) {
    return errorResponse(<BaseError>err);
    // move to actions
    // const { code, message } = err;
    // if (code === 'ENOENT') {
    //   throw new Error(message);
    // }
    // throw new Error(err);
  }
};

// resAsync(async () => {
//   //   const data = `
//   // ## Requirement

//   // - git initialized
//   // - remote branche 'origin' preferred
//   // - git pack-refs
//   // `;

//   const payload = await copyFile('MF/TEST.md', 'MF/TESTR.md');
//   // await createDir('MF');
// });
