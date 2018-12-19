### Schema

CREATE DATABASE wedding_db;
USE wedding_db;

CREATE TABLE weddings
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	essentials BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
