import { MergedRollupOptions } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import esbuild from "rollup-plugin-esbuild";
import { path } from "@/utils";
import rollupBuild from "../../rollup";
//  @see https://github.com/egoist/rollup-plugin-esbuild/issues/70#issuecomment-742691119
// To support absolute and alias @see => https://github.com/egoist/rollup-plugin-esbuild/issues/70#issuecomment-742691119
/**
 * build hooks
 */
export const hooks = async (inputPath: string, includePath: string) => {
  const inputOptions: MergedRollupOptions = {
    input: inputPath,
    output: [
      {
        dir: "amplify/hooks",
        format: "commonjs",
        minifyInternalExports: true
      }
    ],
    plugins: [
      esbuild({
        // All options are optional
        include: [includePath.concat("/**/*.ts"), "src/scripts/utils/**/*.ts"],
        sourceMap: false,
        exclude: ["src/scripts/**/*.ts", "src/hooks/**/*.ts", "src/config.ts"],
        minify: true,
        target: "node14.13.0", // default, or 'es20XX', 'esnext'
        tsconfig: "tsconfig.json",
        loaders: {
          ".json": "json"
          // // Enable JSX in .js files too
          // '.js': 'jsx',
        }
      }),
      cjs({ sourceMap: false })
      // nodeResolve(),
    ]
  };
  try {
    await rollupBuild(inputOptions);
    console.log("await");
  } catch (err) {
    console.log("test", err);
  }
};

export const lambda = async (inputPath: string, includePath?: string) => {
  const lambdaName = path.firstDirName(inputPath);
  const inputDirName = path.dirname(inputPath);
  const inputOptions: MergedRollupOptions = {
    input: inputPath,
    output: [
      {
        file: `amplify/backend/function/${lambdaName}/src/index.js`,
        format: "commonjs"
        // minifyInternalExports: true
      }
    ],
    plugins: [
      // typescript({
      //   module: "node12",
      //   include: [
      //     inputDirName.concat("/**/*.ts"),
      //     "src/graphql/**/*.ts",
      //     "src/services/**/*.ts",
      //     "src/API.ts",
      //     "node_modules"
      //   ],
      //   exclude: ["src/scripts/**/*.ts", "src/hooks/**/*.ts", "src/config.ts"]
      // }),
      // commonjs({ sourceMap: false }),
      esbuild({
        // All options are optional
        include: [
          inputDirName.concat("/**/*.ts"),
          "src/graphql/*.ts",
          "src/services/**/*.ts",
          "src/API.ts",
          "node_modules"
        ],
        sourceMap: false,
        exclude: ["src/scripts/**/*.ts", "src/hooks/**/*.ts", "src/config.ts"],
        minify: true,
        target: "node14.13.0", // default, or 'es20XX', 'esnext'
        tsconfig: "tsconfig.json",
        loaders: {
          ".json": "json"
          // // Enable JSX in .js files too
          // '.js': 'jsx',
        }
      }),
      cjs(),
      json(),
      nodeResolve({
        preferBuiltins: true,
        exportConditions: ["node"] // https://github.com/uuidjs/uuid/issues/544#issuecomment-740394448
      })
      // terser()
    ],
    external: [
      "@aws-sdk/protocol-http",
      "@aws-sdk/signature-v4",
      "@aws-sdk/credential-provider-node",
      "camelcase-keys",
      "@aws-crypto/sha256-js"
      // "https",
      // "http"
    ]
  };
  try {
    const { data } = await rollupBuild(inputOptions);
    console.log("lambda build");
  } catch (err) {
    console.log("lambda build filed", err);
  }
};
