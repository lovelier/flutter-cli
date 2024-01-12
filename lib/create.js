// const fs = require("fs-extra");
// const path = require("path");
// const inquirer = require("inquirer");
// const Creator = require("./Creator");
// const { clearConsole } = require("./util/clearConsole");
// const { getPromptModules } = require("./util/createTools");
// const { chalk, error, stopSpinner, exit } = require("@vue/cli-shared-utils");
// const validateProjectName = require("validate-npm-package-name");

async function create(projectName, options) {
  console.log(projectName, options);
}

module.exports = (...args) => {
  return create(...args).catch((err) => {
    //   stopSpinner(false) // do not persist
    error(err);
    // if (!process.env.VUE_CLI_TEST) {
    process.exit(1);
    // }
  });
};
