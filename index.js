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
    try {
        startFunction();
        console.log("after start function");
    }
    catch (err) { console.log(err) }
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
        startFunction();
    })
};

function viewRoles() {
    pool.query("SELECT * FROM roles;", function (err, data) {
        if (err) throw err;
        // console.log(data)
        console.table(data.rows);
        startFunction();
    })
};

function viewEmployees() {
    pool.query("SELECT * FROM employee;", function (err, data) {
        if (err) throw err;
        // console.log(data)
        console.table(data.rows);
        startFunction();
    })
};


function addRole() {
    pool.query("SELECT * FROM department;", function (err, data) {
        if (err) throw err;
        let departmentId = data.rows.map(element => {
            return ({
                name: element.department_name,
                value: element.id
            })
        })
        prompt([
            {
                type: "input",
                message: "Enter Role Title",
                name: "title"
            },
            {
                type: "input",
                message: "Enter Role Salary",
                name: "salary"
            },
            {
                type: "list",
                message: "Enter Department ID",
                name: "departmentID",
                choices: departmentId
            }
        ]).then(response => {
            pool.query("INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3);",
                [response.title, response.salary, response.departmentID], function (err, data) {
                    if (err) throw err;
                    console.table(data)
                    startFunction()
                })
        })

    })
}

function addDepartment() {
    prompt([

        {
            type: "input",
            message: "Enter Department name",
            name: "departmentName"
        }
    ]).then(response => {
        pool.query("INSERT INTO department (department_name) VALUES ($1);", [response.departmentName], function (err, data) {
            if (err) throw err;
            console.table(data)
            startFunction()
        })
    })
}

function addEmployee() {
    pool.query("SELECT * FROM employee where manager_id is null;", function (err, data) {
        if (err) throw err;
        let managerId = data.rows.map(element => {
            return ({
                name: element.first_name + " " + element.last_name,
                value: element.id
            })
        })
        managerId.push({name:"Manager",value:null})
        console.log(managerId)
        pool.query("SELECT * FROM roles;", function (err, data) {
            if (err) throw err;
            let roleId = data.rows.map(element => {
                return ({
                    name: element.title,
                    value: element.id
                })
            })
            console.log(roleId)
            prompt([
                {
                    type: "input",
                    message: "Enter Employee First Name",
                    name: "title"
                },
                {
                    type: "input",
                    message: "Enter Employee Last Name",
                    name: "salary"
                },
                {
                    type: "list",
                    message: "Enter Role ID",
                    name: "roleID",
                    choices: roleId
                },
                {
                    type: "list",
                    message: "Enter Manager ID",
                    name: "managerID",
                    choices: managerId
                },
            ]).then(response => {
                pool.query("INSERT INTO employee (first_name, last_name, role_id,manager_id) VALUES ($1, $2, $3,$4);",
                    [response.title, response.salary, response.roleID,response.managerId], function (err, data) {
                        if (err) throw err;
                        console.table(data)
                        startFunction()
                    })
            })
        })
    })
}

function updateRole(){


pool.query("SELECT * FROM employee;", function (err, data) {
    if (err) throw err;
    let employeeID = data.rows.map(element => {
        return ({
            name: element.first_name + " " + element.last_name,
            value: element.id
        })
    })
 
  
    pool.query("SELECT * FROM roles;", function (err, data) {
        if (err) throw err;
        let roleId = data.rows.map(element => {
            return ({
                name: element.title,
                value: element.id
            })
        })
        console.log(roleId)
        prompt([
          
            
            {
                type: "list",
                message: "Select epmployee to be updated",
                name: "employeeID",
                choices: employeeID
            },
              
            {
                type: "list",
                message: "Select new role",
                name: "roleID",
                choices: roleId
            }
        ]).then(response => {
            pool.query("UPDATE employee SET role_id = $1 where id = $2;",
                [ response.roleID,response.employeeID], function (err, data) {
                    if (err) throw err;
                    console.table(data)
                    startFunction()
                })
        })
    })
})
}
