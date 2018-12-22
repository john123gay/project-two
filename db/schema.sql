### Schema

CREATE DATABASE wedding_db;
USE wedding_db;

CREATE TABLE weddings
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	essentials BOOLEAN DEFAULT false,
	amount DECIMAL(10,2) NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	PRIMARY KEY (id)
);