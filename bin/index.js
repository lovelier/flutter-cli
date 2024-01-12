#!/usr/bin/env node

// require = require("esm")(module /*, options*/);

const fs = require("fs");
const path = require("path");
// const slash = require("slash");
const chalk = require("chalk");
const minimist = require("minimist");

const { program, Option } = require("commander");

// flt@1.0.0
program
  .version(require("../package.json").version, "-v, --version")
  .usage("<command> [options]");

program
  .command("create <app-name>")
  .description("create a new flutter project by flt")
  .option(
    "-p, --preset <presetName>",
    "Skip prompts and use saved or remote preset"
  )
  .option("-d, --default", "Skip prompts and use default preset")
  //   .option(
  //     "-i, --inlinePreset <json>",
  //     "Skip prompts and use inline JSON string as preset"
  //   )
  //   .option(
  //     "-m, --packageManager <command>",
  //     "Use specified npm client when installing dependencies"
  //   )
  //   .option(
  //     "-r, --registry <url>",
  //     "Use specified npm registry when installing dependencies (only for npm)"
  //   )
  //   .option(
  //     "-g, --git [message]",
  //     "Force git initialization with initial commit message"
  //   )
  //   .option("-n, --no-git", "Skip git initialization")
  //   .option("-f, --force", "Overwrite target directory if it exists")
  //   .option("--merge", "Merge target directory if it exists")
  //   .option("-c, --clone", "Use git clone when fetching remote preset")
  //   .option("-x, --proxy <proxyUrl>", "Use specified proxy when creating project")
  //   .option("-b, --bare", "Scaffold project without beginner instructions")
  //   .option("--skipGetStarted", 'Skip displaying "Get started" instructions')
  .action((name, options) => {
    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(
        chalk.yellow(
          "Info: You provided more than one argument. The first one will be used as the app's name, the rest are ignored."
        )
      );
    }
    // // --git makes commander to default git to true
    // if (process.argv.includes("-g") || process.argv.includes("--git")) {
    //   options.forceGit = true;
    // }
    require("../lib/create")(name, options);
  });

// output help information on unknown commands
program
  .addHelpCommand(false)
  .showHelpAfterError(
    `\n(add ${chalk.cyan("--help")} for additional information)\n`
  );

program.on("command:*", ([cmd]) => {
  console.log(chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
  program.outputHelp();
  process.exitCode = 1;
});

// add some useful info on help
program.on("--help", () => {
  console.log();
  console.log(
    `  Run ${chalk.cyan(
      `"flt <command> --help"`
    )} for detailed usage of given command.`
  );
  console.log();
});

program.commands.forEach((c) => c.on("--help", () => console.log()));

// parse cli
program.parse(process.argv);
