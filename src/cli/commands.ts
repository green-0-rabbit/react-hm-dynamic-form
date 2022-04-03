/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command, InvalidArgumentError } from "commander";
import { gray, red, white, yellow } from "../utils";
import {
  buildActions,
  fsWriteActions,
  devActions,
  fsCopyActions
} from "./actions";
import {
  BuildArg,
  BuildOptions,
  DevArg,
  FsCopyOptions,
  FsWriteArg,
  FsWriteOptions
} from "./types";

const program = new Command();

const cliLog = (commandName: string, type?: string) => {
  console.log(
    yellow(
      ` there is no action ${type}, please issue ${white(
        `${commandName}`
      )} ${gray("--help")} to get more details`
    )
  );
};
const cliLogError = (err: string, commandName: string, type?: string) => {
  console.log(gray(` ${commandName} ${type}`), red(`'${err}'`));
};

const build = () => {
  program
    .command("build")
    .argument("<type>", "specify files type to build")
    .option("-l, --all ", "build one or more file(s)", false)
    .requiredOption("-p, --path <path>", "relative files path") // --path=src/hooks or -p src/hooks
    .description("build files with rollup")
    .action(async (type: BuildArg, options: BuildOptions, command) => {
      if (buildActions[`${type}`]) {
        try {
          await buildActions[`${type}`](options);
        } catch (err: any) {
          const { message } = err;
          cliLogError(message, command.name(), type);
        }
      } else {
        cliLog(command.name(), type);
      }
    });
};

const dev = () => {
  program
    .command("dev")
    .argument("<type>", "specify files type to run dev scripts")
    .option("-l, --all ", "build one or more file(s)", false)
    .option("-p, --path <path>", "relative files path") // --path=src/hooks or -p src/hooks
    .description("build files with rollup")
    .action(async (type: DevArg, options: BuildOptions, command) => {
      if (devActions[`${type}`]) {
        try {
          await devActions[`${type}`](options);
        } catch (err: any) {
          const { message } = err;
          cliLogError(message, command.name(), type);
        }
      } else {
        cliLog(command.name(), type);
      }
    });
};

const fsWrite = () => {
  // removeFileOrDir
  // createDir
  // writeFile
  program
    .command("fswrite")
    .argument("<type>", "specify fs type") // remove | create
    .requiredOption("-p, --path <path>", "relative files path") // --path=src/hooks or -p src/hooks/test.ts
    .option(
      "-f, --force",
      "whether we force file remove or not (for remove argument only)",
      false
    )
    .description("create or remove file based on argument")
    .action(async (type: FsWriteArg, options: FsWriteOptions, command) => {
      if (fsWriteActions[`${type}`]) {
        try {
          await fsWriteActions[`${type}`](options);
        } catch (err: any) {
          const { message } = err;
          cliLogError(message, command.name(), type);
        }
      } else {
        cliLog(command.name(), type);
      }
    });
};
const fsCopy = () => {
  // copyFile
  program
    .command("fscopy")
    .requiredOption("-src, --source <path>", "relative source file path") // --source=src/hooks/test.ts or -src src/hooks/test.ts
    .requiredOption(
      "-d, --destination <path>",
      "relative destination file path"
    ) // --destination=src/hooks/test-copy.ts or -p src/hooks/test.ts
    .description("copy data from source to destination file")
    .action(async (options: FsCopyOptions, command) => {
      try {
        await fsCopyActions.copy(options);
      } catch (err: any) {
        const { message } = err;
        cliLogError(message, command.name());
      }
    });
};

const noController = () => {
  program
    .command("nocommand", { isDefault: true, hidden: true })
    .description("No command provided")
    .action(async (...args) => {
      console.log(
        yellow(
          ` The command isn't recognized, please issue ${gray(
            "--help"
          )} to get more details`
        )
      );
    });
};

const bootstrap = () => {
  noController();
  build();
  dev();
  fsWrite();
  fsCopy();
  return program;
};

export default bootstrap;

// const testController = () => {
//   function myParseInt(value: any, dummyPrevious?: any) {
//     // parseInt takes a string and a radix
//     const parsedValue = parseInt(value, 10);
//     // if (isNaN(parsedValue)) {
//     if (Number.isNaN(parsedValue)) {
//       throw new InvalidArgumentError("Not a number.");
//     }
//     return parsedValue;
//   }
//   function mySum(value: any, total: any) {
//     return total + myParseInt(value);
//   }

//   // inline argument
//   // src/scripts/cli clone test tt => 'clone test tt'
//   program
//     .command("clone <source> [destination]")
//     .description("clone a repository into a newly created directory")
//     .action((source, destination) => {
//       console.log(`clone ${source} ${destination}`);
//     });

//   // src/scripts/cli add 1 2 -v --test --optional val2  =>
//   // { test: '--optional', verbose: true } 1 + 2 = 3
//   type Options = { test: string | undefined; verbose: boolean | undefined };
//   program
//     .command("add")
//     .requiredOption("-v, --verbose ", "required boolean option")
//     .option(
//       "-t, --test <value> ",
//       "optional option with required argument",
//       "defaultValue"
//     ) // -t value or --test=value with default value 'defaultValue'
//     .option(
//       "-op, --optional [value] ",
//       "optional option with optional argument"
//     ) // -op value or ---op=value
//     .argument("<first>", "integer argument", myParseInt) // add 1 with custom parser
// eslint-disable-next-line max-len
//     .argument("[second]", "integer argument", myParseInt, 1000) // add firstArgumnent 2 with custom parser
//     .action((first: number, second: number, options: Options, command) => {
//       console.log(options.test);
//       console.log(`${first} + ${second} = ${first + second}`);
//     });

//   program
//     .command("sum")
//     .description("sum description")
//     .argument("<first>", "integer argument", myParseInt, 0)
//     .argument("<second>", "integer argument", myParseInt, 0)
//     .argument("<value...>", "values to be summed", mySum, 0)
//     .action(async (...args) => {
//       args;
//       console.log("first", args);
//     });
// };
