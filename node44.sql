# tạo database
CREATE DATABASE node44;
USE node44

# tạo table

CREATE TABLE users(
	user_id INT PRIMARY KEY,
	full_name VARCHAR(100),
	email VARCHAR(100),
	pass_word VARCHAR(100)
)

# tạo data
INSERT INTO users (user_id, full_name, email, pass_word, age) VALUES
(1, 'John Doe', 'johndoe@example.com', 'password123', 28),
(2, 'Jane Smith', 'janesmith@example.com', 'password123', 34),
(3, 'Michael Johnson', 'michaelj@example.com', 'password123', 40),
(4, 'Emily Davis', 'emilyd@example.com', 'password123', 25),
(5, 'Chris Brown', 'chrisb@example.com', 'password123', 31),
(6, 'Sarah Wilson', 'sarahw@example.com', 'password123', 27),
(7, 'David Miller', 'davidm@example.com', 'password123', 45),
(8, 'Jessica Taylor', 'jessicat@example.com', 'password123', 22),
(9, 'Daniel Anderson', 'daniela@example.com', 'password123', 33),
(10, 'Laura Thomas', 'laurat@example.com', 'password123', 29),
(11, 'Paul Moore', 'paulm@example.com', 'password123', 36),
(12, 'Anna Jackson', 'annaj@example.com', 'password123', 24),
(13, 'Mark Lee', 'markl@example.com', 'password123', 38),
(14, 'Sophia Harris', 'sophiah@example.com', 'password123', 26),
(15, 'Peter Clark', 'peterc@example.com', 'password123', 32),
(16, 'Olivia Lewis', 'olivial@example.com', 'password123', 30),
(17, 'James Walker', 'jamesw@example.com', 'password123', 42),
(18, 'Linda Young', 'linday@example.com', 'password123', 37),
(19, 'Robert Hall', 'roberth@example.com', 'password123', 50),
(20, 'Susan Allen', 'susana@example.com', 'password123', 28);

# tương tác data
SELECT * from users

SELECT full_name as 'Họ và Tên' from users

# thêm, xóa, sửa 
ALTER TABLE users
ADD COLUMN age INT

ALTER TABLE users
MODIFY COLUMN full_name VARCHAR(255)

# truy vấn 

SELECT * from users
WHERE age BETWEEN 25 and 30


SELECT * from users
WHERE (full_name like '%John%') AND (age BETWEEN 25 and 30)

# sắp xếp tuổi giảm dần
SELECT * FROM users
ORDER BY age DESC


SELECT * FROM users
ORDER BY age DESC
LIMIT 5


# ràng buộc 
ALTER TABLE users
MODIFY COLUMN full_name VARCHAR(255) NOT NULL,
MODIFY COLUMN email VARCHAR(100) NOT NULL,
MODIFY COLUMN pass_word VARCHAR(100) NOT NULL

# khóa chính tự tăng
ALTER TABLE users
MODIFY COLUMN user_id INT PRIMARY KEY AUTO_INCREMENT



#update data
UPDATE users
SET full_name ='Anh Thai'
where user_id =1

UPDATE users
SET email = 'Nguyennhoanhthai@gmail.com'
where user_id =1

#delete data
DELETE FROM users
WHERE user_id = 2


#soft delete -> thêm flag is_deleted để không show data
ALTER TABLE users
ADD COLUMN is_deleted INT NOT NULL DEFAULT 1 

SELECT * FROM users
WHERE age=(
	SELECT age from users
	ORDER BY age DESC
	LIMIT 1
)


# test git 
# test gop

#inner join

SELECT * from users AS u
INNER JOIN user_like as ul ON u.user_id = ul.user_id

#left join: tất cả các record của table bên trái và phần giao nhau của table trái và table phải

SELECT * from users AS u
LEFT JOIN user_like as ul ON u.user_id = ul.user_id

#right join: tất cả record của table bên phải và phần giao nhau của tbale trái và tbale phải 

SELECT * from users AS u
RIGHT JOIN user_like as ul ON u.user_id = ul.user_id

#full join lấy tất cả các record của table trái và phải

SELECT * from users AS u
LEFT JOIN user_like as ul ON u.user_id = ul.user_id
UNION
SELECT * from users AS u
RIGHT JOIN user_like as ul ON u.user_id = ul.user_id


#self join


CREATE TABLE employees(
	user_id INT PRIMARY KEY AUTO_INCREMENT,
	user_name VARCHAR(50),
	line_manager_id INT
)

-- Insert 20 sample rows into the employees table
INSERT INTO employees (user_name, line_manager_id) VALUES
('John Doe', NULL),         -- Top-level manager, no line manager
('Jane Smith', 1),
('Mike Johnson', 1),
('Emily Davis', 1),
('Chris Brown', 2),
('Anna Wilson', 2),
('James Clark', 3),
('Laura Miller', 3),
('Robert Lewis', 4),
('Jennifer Lee', 4),
('David Walker', 5),
('Emma Hall', 5),
('Daniel Young', 6),
('Sophia Harris', 6),
('Matthew King', 7),
('Olivia Wright', 7),
('Joseph Allen', 8),
('Mia Scott', 8),
('William Green', 9),
('Ava Adams', 9);


SELECT e1.user_name, e2.user_name as line_manager_name FROM employees e1
LEFT JOIN employees e2 ON e1.line_manager_id=e2.user_id
