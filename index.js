const { prompt } = require('inquirer');
const { Pool } = require('pg');

const pool = new Pool(
    {
        // TODO: Enter PostgreSQL username
        user: 'postgres',
        // TODO: Enter PostgreSQL password
        password: 'Mercurial1729',
        host: 'localhost',
        database: 'company_zp',
        port: 5432
    },
    console.log(`Connected to the company_zp; database.`)
)

init();

function init() {
    pool.connect();
    try { startFunction();
        console.log("after start function");
    }
    catch(err) {console.log(err)}
} 


function startFunction() {
    prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "option",
            choices: ["Add Department", "Add Role", "Add Employee", "View Department", "View Roles", "View Employees", "Exit App", "Update an Employee role"],
        },
    ]).then((res) => {
        console.log(res);
        switch (res.option) {
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
                console.log('exit');
               // process.exit(0)
                break;

            case "Update an Employee role":
                updateRole();
                break;

        }
    }).catch((err) => { console.log(err); });
}

function viewDepartment() {
    pool.query("SELECT * FROM department;", function (err, data) {
        if (err) throw err;
        console.table(data.rows);
    })
    startFunction();
};

function viewRoles() {
    pool.query("SELECT * FROM roles;", function (err, data) {
        if (err) throw err;
        // console.log(data)
        console.table(data.rows);
    })
    startFunction();
};

function viewEmployees() {
    pool.query("SELECT * FROM employee;", function (err, data) {
        if (err) throw err;
        // console.log(data)
        console.table(data.rows);
    })
    startFunction();
};