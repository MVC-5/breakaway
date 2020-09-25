USE breakaway_db;

INSERT INTO departments
    (name, createdAt, updatedAt)
VALUES
    ('Administration', '2021-02-21 10:53:45', '2021-02-21 10:53:45'),
    ('Customer Support', '2021-02-21 10:53:45', '2021-02-21 10:53:46'),
    ('Design', '2021-02-21 10:53:45', '2021-02-21 10:53:46'),
    ('Development', '2021-02-21 10:53:45', '2021-02-21 10:53:46'),
    ('Sales', '2021-02-21 10:53:45', '2021-02-21 10:53:46');


INSERT INTO roles
    (title, createdAt, updatedAt, dept_id)
VALUES
    ('Manager', '2021-02-21 11:53:45', '2021-02-21 11:53:46', 1),
    ('Tech. Support', '2021-02-21 11:54:46', '2021-02-21 11:54:46', 2),
    ('Designer', '2021-02-21 11:53:45', '2021-02-21 11:53:47', 3),
    ('Tester', '2021-02-21 11:53:45', '2021-02-21 11:53:48', 4),
    ('Sales Associate', '2021-02-21 11:53:45', '2021-02-21 11:53:59', 5);

INSERT INTO employees
    (employee_first, employee_last, email, bank, createdAt, updatedAt, role_id, manager_id)
VALUES
    ('Geoffrey', 'Hamilton', 'zappone.josh@gmail.com', 20, '2015-01-21 6:53:51', '2015-01-21 6:53:52', 1, null),
    ('Melanie', 'Miller', 'mmiller@me.com', 14, '2015-02-21 6:53:51', '2015-02-21 6:53:52', 1, null),
    ('Karen', 'Blauser', 'kblauser@me.com', 23, '2015-03-21 6:53:51', '2015-08-21 6:53:52', 2, 2),
    ('Nancy', 'Fritz', 'lshepherd234@gmail.com', 31, '2015-04-21 6:53:51', '2015-04-21 6:53:52', 2, 1),
    ('Charles', 'Kleiber', 'ckleiber@me.com', 22, '2015-05-21 6:53:51', '2015-05-21 6:53:52', 2, 3),
    ('Renita', 'Panos', 'lshepherd234@gmail.com', 21, '2015-06-21 6:53:51', '2015-06-21 6:53:52', 3, 1),
    ('Walter', 'Ray', 'wray@me.com', 19, '2015-07-21 6:53:51', '2015-07-21 6:53:52', 1, null),
    ('Ann', 'Marte', 'amarte@me.com', 11, '2015-08-21 6:53:51', '2015-08-21 6:53:52', 3, 2),
    ('Frank', 'Folkes', 'ffolkes@me.com', 41, '2015-09-21 6:53:51', '2015-09-21 6:53:52', 4, 1),
    ('Sandra', 'Rodriguez', 'srodriguez@me.com', 37, '2015-10-21 6:53:51', '2015-10-21 6:53:52', 5, 3),
    ('Mark', 'Ayers', 'mayers@me.com', 22, '2015-11-21 6:53:51', '2015-11-21 6:53:52', 3, 3),
    ('Ila', 'Womack', 'iwomack@me.com', 15, '2015-12-21 6:53:51', '2015-12-21 6:53:52', 4, 2),
    ('Drew', 'Schofield', 'dschofield@me.com', 55, '2016-01-21 6:53:51', '2015-01-21 6:53:52', 5, 1);

INSERT INTO requests
    (start, end, reason, approved, createdAt, updatedAt, employeeId, duration)
VALUES
    ('2021-02-21', '2021-02-24', 'Not breaking away makes Danny a dull boy', 1, '2021-01-21 10:53:49', '2021-01-21 10:53:50', 1, 12),
    ('2021-02-26', '2021-02-27', null, null, '2021-02-21 10:53:51', '2021-02-21 10:53:52', 2, 2),
    ('2021-06-21', '2021-07-07', 'Getting Married', 1, '2021-02-21 10:53:55', '2021-02-21 10:53:56', 3 , 44),
    ('2021-04-26', '2021-05-27', null, null, '2021-02-21 10:55:51', '2021-02-21 10:59:52', 4, 3),
    ('2021-05-21', '2021-05-27', 'Using all my remaining PTO before I quit', 0, '2021-08-21 6:53:51', '2021-08-21 6:53:52', 5, 4),
    ('2021-03-26', '2021-03-27', null, null, '2021-02-21 8:53:51', '2021-02-21 10:51:50', 6, 3);

INSERT INTO feeds
    (description, pic_link, location, createdAt, updatedAt, employeeId)
VALUES
    ('Went to Emerald City!  Beautiful views all around', 'https://res.cloudinary.com/breakbreakaway/image/upload/v1601015236/zykokormmibumwylxcvf.jpg', 'Seattle', '2021-02-21 10:53:49', '2021-02-21 10:53:50', 1),
    ('The food scene in Portland is amazing!', 'https://res.cloudinary.com/breakbreakaway/image/upload/v1601015337/kinsucvgcjufeprkqzap.jpg', 'Portland', '2021-02-21 10:53:51', '2021-02-21 10:53:52', 2),
    ('If you have not been to Montenegro, you need to check it out!', 'https://res.cloudinary.com/breakbreakaway/image/upload/v1601015491/jnbjhw2rogsqwafxwjcm.jpg', 'Montenegro', '2021-02-21 10:53:53', '2021-02-21 10:53:54', 3),
    ('My vacation to Iceland!  Saw the Northern Lights.', 'https://res.cloudinary.com/breakbreakaway/image/upload/v1601015020/vxsfbhu01xdmuakyqcdd.jpg', 'Iceland', '2021-02-21 10:53:55', '2021-02-21 10:53:56', 4),
    ('Skied some epic backcountry pow lines in New Zealand!', 'https://res.cloudinary.com/breakbreakaway/image/upload/v1601015601/kfkw24fmg9dr6kalvj49.jpg', 'New Zealand', '2021-02-21 10:53:57', '2021-02-21 10:53:58', 5),
    ('Went to the moon! Because why not?', 'https://res.cloudinary.com/breakbreakaway/image/upload/v1601015746/ufh6bdfh7begno04igla.jpg', 'The Moon', '2021-02-21 10:53:59', '2021-02-21 10:54:00', 6);