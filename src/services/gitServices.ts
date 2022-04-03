/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import util from "util";
import * as git from "isomorphic-git";
import { errorResponse, path, resAsync, response } from "../utils";
import { ReturnTypeAsync } from "../types/common";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const exec = util.promisify(require("child_process").exec);

// eslint-disable-next-line no-underscore-dangle
const dir = path.__rootpath;

type FileStatus = ReturnTypeAsync<typeof git.status>;
type FilesStatus = { file: string; status: FileStatus }[];
type BaseError = { caller: string } & Partial<
  typeof git.Errors.EmptyServerResponseError
>;

export class GitError extends Error {
  caller: string;

  code: string;

  rest: object;

  constructor(errObj: BaseError, ...params: any[]) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GitError);
    }

    this.caller = errObj.caller;
    this.code = errObj.code as string;
    this.rest = { ...errObj };
  }
}

/**
 * Requirement
 * - ./git//packed-refs if doesn't exist issue <git pack-refs> in terminal @see https://github.com/creationix/node-git/issues/1
 * - git status and statusMatrix track only files with end of lines = lf @see https://github.com/isomorphic-git/isomorphic-git/issues/1275#issuecomment-744013509
 *
 */
// ##### Branches #### Start
/**
 *@see https://isomorphic-git.org/docs/en/listBranches
 */
export const listBranches = async (remote = false) => {
  try {
    const res = await git.listBranches({
      fs,
      dir,
      remote: remote ? "origin" : undefined
    });
    const data = { branchList: res };
    return response(data);
  } catch (err) {
    return errorResponse(<BaseError & unknown>err);
  }
};
/**
 *@see https://isomorphic-git.org/docs/en/currentBranch
 */
export const currentBranch = async () => {
  try {
    const res = await git.currentBranch({
      fs,
      dir
    });
    const data = { branchName: res };
    return response(data);
  } catch (err: unknown) {
    return errorResponse(<BaseError & unknown>err);
  }
};
/**
 *@see https://isomorphic-git.org/docs/en/branch
 */
export const createBranch = async (branchName: string, checkout?: boolean) => {
  try {
    await git.branch({
      fs,
      dir,
      ref: branchName,
      checkout
    });
    const data = { done: true };
    console.log("branch created");
    return response(data);
  } catch (err) {
    return errorResponse(<BaseError & unknown>err);
  }
};
/**
 *@see https://isomorphic-git.org/docs/en/renameBranch
 */
export const renameBranch = async (
  branchName: string,
  oldBranchName: string
) => {
  try {
    await git.renameBranch({
      fs,
      dir,
      ref: branchName,
      oldref: oldBranchName
    });
    const data = { done: true };
    console.log("branch renamed");
    return response(data);
  } catch (err) {
    return errorResponse(<BaseError & unknown>err);
  }
};
// ##### Branches #### End

// ##### Files #### Start
/**
 * list all files except ignored files
 *@see https://isomorphic-git.org/docs/en/listFiles
 */
export const listAllFiles = async () => {
  try {
    const res = await git.listFiles({
      fs,
      dir
    });
    const data = { fileList: res };
    return response(data);
  } catch (err) {
    return errorResponse(<BaseError & unknown>err);
  }
};
/**
 * Tell whether a file has been changed
 *@see https://isomorphic-git.org/docs/en/status
 */
export const getFileStatus = async (filepath: string) => {
  try {
    const res = await git.status({
      fs,
      dir,
      filepath
    });
    const data = { fileStatus: res };
    return response(data);
  } catch (err) {
    return errorResponse(<BaseError & unknown>err);
  }
};
/**
 * list all files status in a given directories
 *@see https://isomorphic-git.org/docs/en/statusMatrix
 */
export const listFilesStatus = async (filepaths: string[]) => {
  const matrixVal = [
    { name: "*added", value: "020" }, // untracked, unstaged
    { name: "added", value: "022" }, // added, staged
    { name: "*added", value: "023" }, // added, staged, with unstaged changes
    { name: "unmodified", value: "111" }, // unmodified
    { name: "*modified", value: "121" }, // modified, unstaged
    { name: "modified", value: "122" }, // modified, staged
    { name: "*modified", value: "123" }, // modified, staged, with unstaged changes
    { name: "deleted", value: "100" }, // deleted, staged
    { name: "*deleted", value: "101" }, // deleted, unstaged
    { name: "*deleted", value: "103" }, // deleted, staged, with unstaged changes
    { name: "*absent", value: "003" }, // deleted, with unstaged changes
    { name: "absent", value: "" }, // will not be displayed in the result
    { name: "ignored", value: "" } // will not be displayed in the result
  ];
  try {
    const res = await git.statusMatrix({
      fs,
      dir,
      filepaths
    });
    // console.log(res);
    // console.log(
    //   filepaths[0].concat('/pre-update-function copy.ts'),
    //   await getFileStatus(filepaths[0].concat('/pre-update-function copy.ts'))
    // );
    const newRes = res.map((row) => {
      const index = [row[1], row[2], row[3]].join("");
      const status = matrixVal.find((item) => item.value === index)
        ?.name as FileStatus;
      return { file: row[0], status };
    });
    return response(newRes);
  } catch (err) {
    return errorResponse(<BaseError & unknown>err);
    // return errorResponse(error);
  }
};
// ##### Files #### End

// ##### Repository #### Start
/**
 * list remote branches
 *@see https://isomorphic-git.org/docs/en/listRemotes
 */
export const listRemotes = async () => {
  try {
    const res = await git.listRemotes({
      fs,
      dir
    });
    const data = { remoteBranches: res };
    return response(data);
  } catch (err) {
    return errorResponse(<BaseError & unknown>err);
  }
};
// ##### Repository #### Start
/**
 * checkout to branch with native git command
 */
export const checkout = async (targetBranchName: string) => {
  try {
    const { stdout, stderr } = await exec(`git checkout ${targetBranchName}`);
    console.log("stdout:", stdout);
    console.error("stderr:", stderr);
    const data = { stdout, stderr };
    return response(data);
  } catch (err) {
    return errorResponse(<BaseError & unknown>err);
  }
};

type FilterType = "updatable" | "removable" | "all";
export const statusParser = (data: FilesStatus, filter: FilterType) => {
  const updatableFilters = ["*modified", "modified", "*added", "added"];
  const removableFilters = ["deleted", "*deleted", "*absent"];
  const allFilters = ["*modified", "modified", "*added", "added", "unmodified"];
  if (!data) {
    return [];
  }
  if (filter === "all") {
    return data?.filter((item) =>
      allFilters.find((val) => val === item.status)
    );
  }
  if (filter === "updatable") {
    return data?.filter((item) =>
      updatableFilters.find((val) => val === item.status)
    );
  }
  return data?.filter((item) =>
    removableFilters.find((val) => val === item.status)
  );
};

export const initRepository = async () => {
  try {
    await git.init({ fs, dir });
    const data = { done: true };
    console.log("git initialized");
    return response(data);
  } catch (err) {
    // console.log('test', err);
    return errorResponse(<BaseError & unknown>err);
  }
};
// ##### Repository #### End

// resAsync(async () => {
//   const val = await listBranches();
//   await initRepository();
//   console.log(val);
//   // console.log(await currentBranch());
//   // const test = 'src/scripts/cli/services';
//   // // await getFileStatus(test);
//   // const val = await listFilesStatus([test]);
//   // console.log(val);
// });
