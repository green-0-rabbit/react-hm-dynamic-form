import { isResolved, path as p } from "../../utils";
import { fs } from "../services";
import { FsCopyOptions } from "../types";

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

const copy = async (options: FsCopyOptions) => {
  const { source, destination } = options;
  const srcExt = p.extname(source);
  const destExt = p.extname(destination);

  if (!srcExt) {
    throw new Error(
      `source path is not valide, please provide a valide file path`
    );
  }
  if (!destExt) {
    throw new Error(
      `destination path is not valide, please provide a valide file path`
    );
  }
  const copyFilePayload = await fs.copyFile(source, destination);
  if (!isResolved(copyFilePayload)) {
    const { error } = copyFilePayload;
    throw new fs.FSError(error);
  }
  return true;
};

const fsCopyActions = {
  copy
};
export default fsCopyActions;
