import { defineConfig } from "rollup";
// import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import shebang from 'rollup-plugin-preserve-shebang';

const rollupConfig = defineConfig([
  {
    input: "src/index.ts",
    output: {
      dir: "scripts",
      format: "commonjs"
    },
    plugins: [
      esbuild({
        // All options are optional
        // include: [
        //   "src/**/*.js",
        // ],
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
      shebang({ shebang: '#!/usr/bin/env node' }),
      nodeResolve({
        preferBuiltins: true,
        exportConditions: ["node"] // https://github.com/uuidjs/uuid/issues/544#issuecomment-740394448
      })
    ]
  }
]);

export default rollupConfig;
