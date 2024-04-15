
DROP DATABASE IF EXISTS company_zp;
CREATE DATABASE company_zp;

\c company_zp;

CREATE TABLE department (
  id SERIAL primary key,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id SERIAL primary key,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL REFERENCES DEPARTMENT (id) on delete CASCADE
);

CREATE TABLE employee (
    id SERIAL primary key,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id) on delete CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee(id) on delete SET NULL
);