CREATE DATABASE IF NOT EXISTS MK_cars3;
USE MK_cars3;

CREATE TABLE IF NOT EXISTS Mk_Post (
  PostID INT AUTO_INCREMENT PRIMARY KEY,
  PostName VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Mk_Employees3 (
  EmployeeID INT AUTO_INCREMENT PRIMARY KEY,
  PostID INT,
  FirstName VARCHAR(100) NOT NULL,
  LastName VARCHAR(100) NOT NULL,
  Gender VARCHAR(20),
  DateOfBirth DATE,
  Email VARCHAR(150),
  PhoneNumber VARCHAR(50),
  Position VARCHAR(100),
  HiredDate DATE,
  Salary DECIMAL(12,2),
  Status VARCHAR(50),
  Department VARCHAR(100),
  Address VARCHAR(255),
  FOREIGN KEY (PostID) REFERENCES Mk_Post(PostID)
);

CREATE TABLE IF NOT EXISTS Mk_Users2 (
  UserID INT AUTO_INCREMENT PRIMARY KEY,
  EmployeeID INT,
  UserNmae VARCHAR(100) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  FOREIGN KEY (EmployeeID) REFERENCES Mk_Employees3(EmployeeID)
);

INSERT IGNORE INTO Mk_Post (PostName) VALUES
('Manager'),
('Sales'),
('Marketing'),
('Finance');

INSERT IGNORE INTO Mk_Employees3 (PostID, FirstName, LastName, Gender, DateOfBirth, Email, PhoneNumber, Position, HiredDate, Salary, Status, Department, Address)
VALUES
(1, 'Admin', 'User', 'Other', '1990-01-01', 'admin@example.com', '1234567890', 'Manager', '2022-01-01', 90000, 'Active', 'Management', 'Head Office');

-- Replace password hash after generating with bcrypt
INSERT IGNORE INTO Mk_Users2 (EmployeeID, UserNmae, Password)
VALUES (1, 'admin', '123');
