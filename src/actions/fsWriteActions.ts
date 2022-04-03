import { isResolved, path as p } from "../utils";
import { fs } from "../services";
import { FsWriteOptions } from "../types";

const defaultValue = (ext: string) => {
  switch (ext) {
    case ".js":
    case ".jsx":
    case ".tsx":
    case ".ts":
      return "//your code goes below";
    case ".md":
      return "<!--- your content goes below --->";
    case ".gql":
    case ".graphql":
      return "## your schema goes below";
    default:
      return "## your schema goes below";
  }
};

const create = async (options: FsWriteOptions) => {
  const { path } = options;
  const ext = p.extname(path);
  const dir = p.dirname(path);

  if (ext) {
    const readDirPayload = await fs.readDir(dir);
    if (!isResolved(readDirPayload)) {
      const { error } = readDirPayload;
      if (error.code === "ENOENT") {
        await fs.createDir(dir);
        await fs.writeFile(path, defaultValue(ext));
        return;
      }
      throw new fs.FSError(error);
    }
    const writeFilePayload = await fs.writeFile(path, defaultValue(ext));
    if (!isResolved(writeFilePayload)) {
      const { error } = writeFilePayload;
      throw new fs.FSError(error);
    }
  }
  const readDirPayload = await fs.readDir(path);
  if (isResolved(readDirPayload)) {
    throw new Error("there is already a directory with this name");
  } else {
    const { error } = readDirPayload;
    if (error.code === "ENOENT") {
      const createDirPayload = await fs.createDir(dir);
      if (!isResolved(createDirPayload)) {
        const { error: fsError } = createDirPayload;
        throw new fs.FSError(fsError);
      }
      return;
    }
    throw new fs.FSError(error);
  }
};

const remove = async (options: FsWriteOptions) => {
  const { path, force } = options;
  const ext = p.extname(path);
  if (ext) {
    const removeFileOrDirPayload = await fs.removeFileOrDir(path);
    if (!isResolved(removeFileOrDirPayload)) {
      const { error: fSError } = removeFileOrDirPayload;
      throw new fs.FSError(fSError);
    }
    return;
  }
  const readDirPayload = await fs.readDir(path);
  if (!isResolved(readDirPayload)) {
    const { error } = readDirPayload;
    throw new fs.FSError(error);
  }
  const { data } = readDirPayload;
  console.log(data.files);

  if (data.files.length > 0 && !force) {
    throw new Error(
      "there is at least one file in the directory, please issue --force to force the action"
    );
  }
  const removeFileOrDirPayload = await fs.removeFileOrDir(path);
  if (!isResolved(removeFileOrDirPayload)) {
    const { error: fSError } = removeFileOrDirPayload;
    throw new fs.FSError(fSError);
  }
};

const fsWriteActions = {
  create,
  remove
};
export default fsWriteActions;
