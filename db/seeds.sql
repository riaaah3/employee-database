\c company_zp;

INSERT INTO department (department_name)
VALUES ('Sales'),('Human Resources'),('Security');

INSERT INTO roles (title, salary, department_id)
VALUES
('Manager for Sales',120000,1),
('Manager for Human Resources', 120000,2),
('Manager for Security', 1200000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
('Ashley','Burks',1),
('Tiffany', 'Stevenson', 2),
('Jackson', 'Allgood', 3);
