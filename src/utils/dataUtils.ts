const getValuePath = (paths: string[], obj: Record<string, any>) => {
  const keys = Object.keys(obj);
  if (keys.length) {
    const key = paths[0];
    const newVal = obj[key];
    const newPaths = paths.slice(1, paths.length);
    let tempVal: Record<string, any> | undefined;
    if (!newPaths.length && typeof newVal === "object") {
      return newVal;
    }
    if (
      typeof newVal === "object" &&
      newPaths.length &&
      !Array.isArray(newVal)
    ) {
      tempVal = getValuePath(newPaths, newVal) as Record<string, any>;
    }
    return tempVal;
  }

  return undefined;
};

export default getValuePath;
