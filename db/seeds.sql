DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

\c company_db;

CREATE TABLE department (
  id SERIAL primary key,
  department_name VARCHAR(30) NOT NULL,
);

CREATE TABLE role (
    id SERIAL primary key,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL REFERENCES DEPARTMENT (id) on delete CASCADE,
);

CREATE TABLE employee (
    id SERIAL primary key,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER NOT NULL REFERENCES role(id) on delete CASCADE,
    manager_id INTEGER NOT NULL REFERENCES employee(id) on delete SET NULL,
);