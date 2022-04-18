import { defineConfig } from "rollup";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import external from "rollup-plugin-peer-deps-external";
import path from "path";
import pkg from "./package.json";
import dts from "rollup-plugin-dts";

const projectRootDir = path.resolve(__dirname);
const name = "ReactHmDynamicForm";
const globals = { react: "React" };
const rollupConfig = defineConfig([
  {
    input: pkg.source,
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
        exports: "auto",
        name
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
        exports: "auto",
        name
      }
    ],
    plugins: [
      esbuild({
        // All options are optional
        // include: [
        //   "src/**/*.js",
        // ],
        sourceMap: false,
        include: ["src/**/*.{ts,tsx}"],
        // exclude: ["node_modules"],
        minify: true,
        target: "esnext", // default, or 'es20XX', 'esnext'
        tsconfig: "tsconfig.json",
        loaders: {
          ".json": "json",
          ".js": "jsx",
          ".ts": "tsx"
        }
      }),
      external(),
      cjs(),
      json(),
      nodeResolve()
    ]
  },
  {
    //declaration .dts input
    // input: "dist/esm/types/index.d.ts",
    input: pkg.source,
    output: [{ file: pkg.types, format: "esm" }],
    plugins: [dts()]
  }
]);

export default rollupConfig;
