import { defineConfig } from "rollup";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import shebang from "rollup-plugin-preserve-shebang";
import alias from "@rollup/plugin-alias";
import path from "path";

const customResolver = nodeResolve({
  extensions: [".ts", ".js", ".json", "/index.ts"]
});
const projectRootDir = path.resolve(__dirname);
console.log("path", path.resolve(projectRootDir, "src/utils"));

const rollupConfig = defineConfig([
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "commonjs"
    },
    plugins: [
      alias({
        customResolver,
        entries: [
          {
            find: "@/utils",
            replacement: path.resolve(projectRootDir, "./src/utils")
            // OR place `customResolver` here. See explanation below.
          }
        ]
      }),
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
      json(),
      cjs({
        requireReturnsDefault: "auto"
      }),
      shebang({ shebang: "#!/usr/bin/env node" }),
      nodeResolve({
        preferBuiltins: true,
        exportConditions: ["node"] // https://github.com/uuidjs/uuid/issues/544#issuecomment-740394448
      })
    ]
  }
]);

export default rollupConfig;
