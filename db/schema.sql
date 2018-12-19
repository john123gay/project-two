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
