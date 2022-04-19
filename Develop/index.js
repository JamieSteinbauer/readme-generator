// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const generateMarkdown = require('./utils/generateMarkdown.js');
const fs = require('fs');
const { rejects } = require("assert");
const { resolve } = require("path");

// Create an array of questions for user input
const promptUser = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of your project? (required)",
            validate: (titleInput) => {
                if (titleInput) {
                    return true;
                } else {
                    console.log("Please enter a title!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "description",
            message: "Enter a description about your project. (required)",
            validate: (descriptionInput) => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log("Please enter a description!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "installation",
            message: "Enter the installation instructions for your project.",
            validate: (descriptionInput) => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log("Please enter a description!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "usage",
            message: "Please enter the usage instructions for your project.",
        },
        {
            type: "list",
            name: "license",
            message: "Select a license for your project. (required)",
            choices: ["MIT", "Apache", "GPL", "BSD", "None"],
            validate: (descriptionInput) => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log("Please pick a license!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "contributing",
            message: "Enter the instructions for contributing to your project.",
        },
        {
            type: "input",
            name: "username",
            message: "Enter your GitHub username. (required)",
            validate: (descriptionInput) => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log("Please enter your GitHub username!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email address. (required)",
            validate: (descriptionInput) => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log("Please enter your email address!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "tests",
            message: "Enter the instructions for testing your project.",
        }
    ])
};

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile('./dist/README.md', data, err => {
        if (err) {
            rejects(err)
            return;
        }

        resolve({
            ok: true,
            message: 'File created!'
        })
    })
}

// TODO: Create a function to initialize app
function init() {
    promptUser()
    .then(value => {
        const data = generateMarkdown(value);
        writeToFile('./dist/README.md', data);
    })
}

// Function call to initialize app
init();
