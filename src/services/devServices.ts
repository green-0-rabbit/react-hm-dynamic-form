/* eslint-disable import/prefer-default-export */
import { MergedRollupOptions } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import { path } from "../utils";
import rollupBuild from "../rollup";

/**
 * dev hooks
 */
// export const hooks = async (inputPath: string, includePath: string) => {
//   const inputOptions: MergedRollupOptions = {
//     input: inputPath,
//     output: [
//       {
//         dir: 'amplify/hooks',
//         format: 'commonjs',
//         minifyInternalExports: true
//       }
//     ],
//     plugins: [
//       typescript({
//         module: 'node12',
//         include: [includePath.concat('/**/*.ts'), 'src/scripts/utils/**/*.ts']
//       }),
//       commonjs({ sourceMap: false }),
//       // nodeResolve(),
//       terser()
//     ]
//   };
//   try {
//     await rollupBuild(inputOptions);
//     console.log('await');
//   } catch (err) {
//     console.log('test', err);
//   }
// };

/**
 * dev lambda
 */
export const lambda = async (inputPath: string, includePath?: string) => {
  const lambdaName = path.firstDirName(inputPath);
  const inputDirName = path.dirname(inputPath);
  const inputOptions: MergedRollupOptions = {
    input: inputPath,
    output: [
      {
        dir: `amplify/backend/function/${lambdaName}/src`,
        format: "commonjs"
      }
    ],
    plugins: [
      esbuild({
        // All options are optional
        include: [
          inputDirName.concat("/**/*.ts"),
          "src/graphql/**/*.ts",
          "src/services/**/*.ts",
          "src/API.ts",
          "src/config.ts"
        ],
        sourceMap: false,
        exclude: ["src/scripts/**/*.ts", "src/hooks/**/*.ts"],
        minify: false,
        target: "node14.13.0", // default, or 'es20XX', 'esnext'
        tsconfig: "tsconfig.json",
        loaders: {
          ".json": "json"
          // // Enable JSX in .js files too
          // '.js': 'jsx',
        }
      }),
      commonjs({ sourceMap: false })
    ],
    external: [
      "dotenv",
      "@aws-sdk/client-cognito-identity-provider",
      "@aws-sdk/protocol-http",
      "@aws-sdk/signature-v4",
      "@aws-sdk/credential-provider-node",
      "camelcase-keys",
      "@aws-crypto/sha256-js",
      "https",
      "http"
    ]
  };
  try {
    const { data } = await rollupBuild(inputOptions);
    console.log("lambda dev");
  } catch (err) {
    console.log("lambda de failed", err);
  }
};
