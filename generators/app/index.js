const Generator = require('yeoman-generator');
const fs = require('fs');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter a name for your project:',
        default: this.appname.replace(/\s+/g, '-'), // Use the default app name as a suggestion
      },
    ]).then((answers) => {
      this.answers = answers;
    });
  }

  writing() {
    const projectName = this.answers.projectName;

    // Create project directory
    this.destinationRoot(projectName);

    // Copy package.json
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { projectName }
    );

    // Copy index.js
    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('index.js')
    );
  }

  install() {
    // Install Express.js
    this.npmInstall(['express'], { 'save': true });

    // Install additional dependencies
    this.npmInstall(['body-parser'], { 'save': true });
  }
};
