CREATE DATABASE IF NOT EXISTS vote_system;
USE vote_system;
CREATE TABLE IF NOT EXISTS admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS voter (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    document VARCHAR(255) UNIQUE NOT NULL,
    dob DATE NOT NULL,
    is_candidate TINYINT NOT NULL DEFAULT 0,
    address VARCHAR(255) NULL,
    phone VARCHAR(20) NULL,
    gender ENUM('M', 'F', 'O') NULL
);

CREATE TABLE IF NOT EXISTS vote (
    id INT PRIMARY KEY AUTO_INCREMENT,
    voter_id INT NOT NULL,
    candidate_voted_id INT NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (voter_id) REFERENCES voter(id) ON DELETE CASCADE,
    FOREIGN KEY (candidate_voted_id) REFERENCES voter(id) ON DELETE CASCADE
);

-- DATOS DE PRUEBA

INSERT IGNORE INTO voter (name, lastName, document, dob, is_candidate) VALUES 
('Juan', 'Perez', '12345678', '1990-01-01', 1),
('Maria', 'Gomez', '57654321', '1995-03-11', 1),
('Pedro', 'Rodriguez', '12348765', '1992-04-21', 0),
('Ana', 'Martinez', '47561234', '1993-11-15', 0),
('Lucia', 'Garcia', '12345898', '1996-09-04', 0),
('Carlos', 'Lopez', '37686521', '1995-12-24', 0),
('Fernando', 'Gonzalez', '12858765', '1992-06-01', 0),
('Sofia', 'Diaz', '34451234', '1993-08-08', 0),
('Miguel', 'Sanchez', '33345678', '1996-10-12', 0),
('Luis', 'Torres', '45686521', '1995-12-24', 0);
