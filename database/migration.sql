CREATE DATABASE IF NOT EXISTS database_bootstrap1;

USE database_bootstrap1;

CREATE TABLE IF NOT EXISTS tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    begin DATETIME,
    end DATETIME,
    status VARCHAR(50)
);

INSERT INTO tasks (title, begin, end, status)
VALUES
    ('task 1', '2020-01-01 20:30:00', '2020-04-10 21:30:00', 'not started'),
    ('task 2', NOW(), '2020-04-07 23:42:00', 'in progress');