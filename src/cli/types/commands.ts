export type BuildOptions = { all: boolean; path: string };
export type BuildArg = "hooks" | "lambda";
export type FsWriteArg = "remove" | "create";
export type FsWriteOptions = { path: string; force: boolean };
export type FsCopyOptions = { source: string; destination: string };
export type DevArg = "hooks" | "lambda" | "api" | "all";
export type DevOptions = { all: boolean; path: string };
