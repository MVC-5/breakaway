DROP DATABASE IF EXISTS breakaway_db;
CREATE DATABASE breakaway_db;

CREATE TABLE employees (
id INT NOT NULL AUTO_INCREMENT,
employee_first VARCHAR (15),
employee_last VARCHAR(20),
role_id INT,
dept_id INT,
manager_id INT,
bank: INT,
PRIMARY KEY (id)
);

ALTER TABLE employees AUTO_INCREMENT=1295129;

CREATE TABLE feed (
id INT NOT NULL AUTO_INCREMENT,
employee_id INT,
time_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
description VARCHAR (300),
pic_link VARCHAR(200),
PRIMARY KEY (id)
);

CREATE TABLE departments (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(50),
employee_id INT,
PRIMARY KEY (id)
);

CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(50),
department_id INT,
PRIMARY KEY (id)
);

