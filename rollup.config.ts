import { defineConfig } from "rollup";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import shebang from "rollup-plugin-preserve-shebang";
import path from "path";

const projectRootDir = path.resolve(__dirname);

const rollupConfig = defineConfig([
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "cjs",
      minifyInternalExports: true
    },
    plugins: [
      esbuild({
        // All options are optional
        // include: [
        //   "src/**/*.js",
        // ],
        sourceMap: false,
        include: ["src/**/*.ts"],
        // exclude: ["node_modules"],
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
      shebang({ shebang: "#!/usr/bin/env node" }),
      // nodeResolve({
      //   exportConditions: ["node"] // https://github.com/uuidjs/uuid/issues/544#issuecomment-740394448
      // })
    ],
    external: [
      "fs/promises",
      "fsevents",
    ]
  }
]);

export default rollupConfig;
