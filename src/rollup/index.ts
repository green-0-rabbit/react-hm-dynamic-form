/* eslint-disable no-unreachable-loop */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ms from "pretty-ms";
import {
  InputOption,
  MergedRollupOptions,
  OutputOptions,
  rollup,
  RollupBuild
} from "rollup";
import { bold, cyan, green, relativeId } from "../utils";
import batchWarnings from "./batchWarnings";
import { stderr } from "./logging";
import { printTimings } from "./timings";

const warnings = batchWarnings();
type ReturnTypeAsync<T extends (...args: any) => any> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

// see below for details on these options
// you can create multiple outputs from the same input to generate e.g.
// different formats like CommonJS and ESM

const printBundleOutput = (
  bundleOutput: Exclude<ReturnTypeAsync<typeof generateOutputs>, undefined>
) => {
  let source: string | Uint8Array;
  for (const file of bundleOutput) {
    if (file.type === "asset") {
      source = file.source;
      if (bundleOutput.length > 1) {
        process.stdout.write(`\n${cyan(bold(` ${file.fileName}:`))}\n`);
      }
      process.stdout.write(source as Buffer);
    }
  }
};

const isStdout = (outputConfigs: OutputOptions[]) => {
  const useStdout = !outputConfigs[0].file && !outputConfigs[0].dir;
  const files = useStdout
    ? ["stdout"]
    : outputConfigs.map((t) => relativeId(t.file || t.dir!));
  return files;
};

const isOutputOptions = (
  outputConfig: OutputOptions | OutputOptions[]
): outputConfig is OutputOptions =>
  (outputConfig as OutputOptions).dir !== undefined;

const build = async (
  options: MergedRollupOptions,
  silent: boolean,
  files: string[]
) => {
  let generatedOutput;
  let bundle: RollupBuild;
  const start = Date.now();

  const { output, ...rest } = options;
  try {
    bundle = await rollup(rest);
    const isStdout = files[0] === "stdout";
    if (output) {
      generatedOutput = await generateOutputs(bundle, output, isStdout);
    }
    if (bundle) {
      // closes the bundle
      await bundle.close();
      if (!silent) {
        warnings.flush();
        stderr(
          green(
            `created ${bold(files.join(", "))} in ${bold(
              ms(Date.now() - start)
            )}`
          )
        );
        if (bundle && bundle.getTimings) {
          printTimings(bundle.getTimings());
        }
      }
      return generatedOutput;
    }
  } catch (err) {
    console.log("test", err);
    return undefined;
  }
};

const generateOutputs = async (
  bundle: RollupBuild,
  outputConfigs: OutputOptions | OutputOptions[],
  isStdout: boolean
) => {
  try {
    if (isOutputOptions(outputConfigs)) {
      if (!isStdout) {
        const { output } = await bundle.write(outputConfigs);
        return output;
      }
      const { output } = await bundle.generate(outputConfigs);
      return output;
    }
    for await (const outputConfig of outputConfigs) {
      if (!isStdout) {
        const { output } = await bundle.write(outputConfig);
        return output;
      }
      const { output } = await bundle.generate(outputConfig);
      return output;
    }
  } catch (err) {
    console.log("generateOutputs", err);
  }
};

const printInputToStderr = (
  input: InputOption,
  silent: boolean,
  files: string[]
) => {
  if (!silent) {
    let inputFiles: string | undefined;
    if (typeof input === "string") {
      inputFiles = input;
    } else if (input instanceof Array) {
      inputFiles = input.join(", ");
    } else if (typeof input === "object") {
      inputFiles = Object.values(input).join(", ");
    }
    stderr(cyan(`\n${bold(inputFiles!)} → ${bold(files.join(", "))}...`));
  }
};

const rollupBuild = async (options: MergedRollupOptions, silent = false) => {
  const modifiedOptions = { ...options, onwarn: warnings.add };
  const { input, output } = modifiedOptions;
  let buildFailed = false;
  try {
    // create a bundle
    const files = isStdout(output);
    if (input) {
      printInputToStderr(input, silent, files);
    }
    const bundleOutput = await build(modifiedOptions, silent, files);
    if (bundleOutput) {
      printBundleOutput(bundleOutput);
    }
    if (!silent) {
      warnings.flush();
    }
    return { data: bundleOutput, error: undefined };
  } catch (error) {
    buildFailed = true;
    // do some error reporting
    return { data: undefined, error };
  }
};

export default rollupBuild;
