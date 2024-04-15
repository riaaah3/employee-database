const inquirer = require('inquirer');
const { Pool } = require('pg');
require("console.table")

const pool = new Pool(
    {
        // TODO: Enter PostgreSQL username
        user: 'Zariah',
        // TODO: Enter PostgreSQL password
        password: 'Mercurial1729',
        host: 'localhost',
        database: 'company_zp',
        port: 5432
    },
    console.log(`Connected to the company_zp; database.`)
)

pool.connect();

function startFunction() {
    inquirer.prompt([
        {
            type: "list",
            message: "what would you like to do?",
            name: "option",
            choices: ["Add Department", "Add Role", "Add Employee", "View Department", "View Roles", "View Employees", "Exit App", "Update an Employee role"]
        }
    ]).then(({ option }) => {
        switch (option) {
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "View Department":
                viewDepartment();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Employees":
                viewEmployees();
                break;
            case "Exit App":
                pool.end()
                process.exit(0)

            case "Update an Employee role":
                updateRole();
                break;

        }
    })
}

function viewDepartment() {
    pool.query("SELECT * FROM department;", function (err, data) {
        if (err) throw err;
        console.table(data.rows);
        startFunction()
    })
}

function viewRoles() {
    pool.query("SELECT * FROM roles;", function (err, data) {
        if (err) throw err;

        // console.log(data)
        console.table(data.rows);
        startFunction()
    })
}

function viewEmployees() {
    pool.query("SELECT * FROM employee;", function (err, data) {
        if (err) throw err;
        // console.log(data)
        console.table(data.rows);
        startFunction()
    })
}

startFunction()