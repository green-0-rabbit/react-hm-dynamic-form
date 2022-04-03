/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { sep, dirname } from "path";
import "dotenv/config"; // to read env var

const absolutePath = /^(?:\/|(?:[A-Za-z]:)?[\\|/])/;
const relativePath = /^\.?\.\//;

const getRootPath = (rootDirName: string) => {
  const regex = new RegExp(rootDirName);
  if (!regex.test(__dirname)) {
    throw Error("Could not find project root.");
  }

  const currentDir = __dirname.split(sep);
  let newPath = "";
  for (const value of currentDir) {
    if (value !== rootDirName) {
      newPath = newPath + value + sep;
    } else {
      newPath += value;
      break;
    }
  }
  return newPath;
};

export const __rootpath = getRootPath(process.env.ROOT!);
export const __amplifyhookspath = process.env.AMPLIFY_HOOKS_PATH!;
export const __amplifyfunctionpath = process.env.AMPLIFY_FUNCTION_PATH!;

export const isAbsolute = (path: string) => absolutePath.test(path);

export const isRelative = (path: string) => relativePath.test(path);

export const isValidePath = (path: string) =>
  isRelative(path) || isAbsolute(path);

export const normalize = (path: string) => {
  if (path.indexOf("\\") === -1) return path;
  return path.replace(/\\/g, "/");
};
/**
 * return the direct directory where the is located
 */
export const firstDirName = (path: string) => {
  const normalizedPath = normalize(path);

  const paths = dirname(normalizedPath).split("/");
  const dirName = paths[paths.length - 1];
  return dirName;
};

export { basename, dirname, extname, relative, resolve, join } from "path";
