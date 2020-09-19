USE breakaway_db;

INSERT INTO departments
    (name, createdAt, updatedAt)
VALUES
    ('Administration', '2017-02-21 10:53:45', '2017-02-21 10:53:45'),
    ('Customer Support', '2017-02-21 10:53:45', '2017-02-21 10:53:46'),
    ('Design', '2017-02-21 10:53:45', '2017-02-21 10:53:46'),
    ('Development', '2017-02-21 10:53:45', '2017-02-21 10:53:46'),
    ('Sales', '2017-02-21 10:53:45', '2017-02-21 10:53:46');


INSERT INTO roles
    (title, createdAt, updatedAt, dept_id)
VALUES
    ('Manager', '2017-02-21 11:53:45', '2017-02-21 11:53:46', 1),
    ('Tech. Support', '2017-02-21 11:54:46', '2017-02-21 11:54:46', 2),
    ('Designer', '2017-02-21 11:53:45', '2017-02-21 11:53:47', 3),
    ('Tester', '2017-02-21 11:53:45', '2017-02-21 11:53:48', 4),
    ('Sales Associate', '2017-02-21 11:53:45', '2017-02-21 11:53:59', 5);

INSERT INTO employees
    (employee_first, employee_last, email, bank, createdAt, updatedAt, role_id, manager_id)
VALUES
    ('Geoffrey', 'Hamilton', 'ghamilton@me.com', 20, '2015-01-21 6:53:51', '2015-01-21 6:53:52', 1, null),
    ('Melanie', 'Miller', 'mmiller@me.com', 14, '2015-02-21 6:53:51', '2015-02-21 6:53:52', 1, null),
    ('Karen', 'Blauser', 'kblauser@me.com', 23, '2015-03-21 6:53:51', '2015-08-21 6:53:52', 2, 2),
    ('Nancy', 'Fritz', 'nfritz@me.com', 31, '2015-04-21 6:53:51', '2015-04-21 6:53:52', 2, 1),
    ('Charles', 'Kleiber', 'ckleiber@me.com', 22, '2015-05-21 6:53:51', '2015-05-21 6:53:52', 2, 3),
    ('Renita', 'Panos', 'rpanos@me.com', 21, '2015-06-21 6:53:51', '2015-06-21 6:53:52', 3, 1),
    ('Walter', 'Ray', 'wray@me.com', 19, '2015-07-21 6:53:51', '2015-07-21 6:53:52', 1, null),
    ('Ann', 'Marte', 'amarte@me.com', 11, '2015-08-21 6:53:51', '2015-08-21 6:53:52', 3, 2),
    ('Frank', 'Folkes', 'ffolkes@me.com', 41, '2015-09-21 6:53:51', '2015-09-21 6:53:52', 4, 1),
    ('Sandra', 'Rodriguez', 'srodriguez@me.com', 37, '2015-10-21 6:53:51', '2015-10-21 6:53:52', 5, 3),
    ('Mark', 'Ayers', 'mayers@me.com', 22, '2015-11-21 6:53:51', '2015-11-21 6:53:52', 3, 3),
    ('Ila', 'Womack', 'iwomack@me.com', 15, '2015-12-21 6:53:51', '2015-12-21 6:53:52', 4, 2),
    ('Drew', 'Schofield', 'dschofield@me.com', 55, '2016-01-21 6:53:51', '2015-01-21 6:53:52', 5, 1);

INSERT INTO requests
    (start, end, reason, approved, createdAt, updatedAt, employeeId)
VALUES
    ('2017-02-21', '2017-02-24', 'Not breaking away makes Danny a dull boy', 1, '2017-01-21 10:53:49', '2017-01-21 10:53:50', 1),
    ('2017-02-26', '2017-02-27', null, null, '2017-02-21 10:53:51', '2017-02-21 10:53:52', 2),
    ('2017-06-21', '2017-07-07', 'Getting Married', 1, '2017-02-21 10:53:55', '2017-02-21 10:53:56', 3),
    ('2017-04-26', '2017-05-27', null, 0, '2017-02-21 10:55:51', '2017-02-21 10:59:52', 4),
    ('2017-05-21', '2017-05-27', 'Using all my remaining PTO before I quit', 0, '2017-08-21 6:53:51', '2017-08-21 6:53:52', 5),
    ('2017-03-26', '2017-03-27', null, null, '2017-02-21 8:53:51', '2017-02-21 10:51:50', 6);

INSERT INTO feeds
    (description, pic_link, location, createdAt, updatedAt, employeeId)
VALUES
    ('Vacation1', 'https://dummyimage.com/200x200/000/fff&text=Test+me', 'Seattle', '2017-02-21 10:53:49', '2017-02-21 10:53:50', 1),
    ('Vacation2', 'https://dummyimage.com/200x200/000/fff&text=Test+me', 'Portland', '2017-02-21 10:53:51', '2017-02-21 10:53:52', 2),
    ('Vacation3', 'https://dummyimage.com/200x200/000/fff&text=Test+me', 'Montenegro', '2017-02-21 10:53:53', '2017-02-21 10:53:54', 3),
    ('Vacation4', 'https://dummyimage.com/200x200/000/fff&text=Test+me', 'Iceland', '2017-02-21 10:53:55', '2017-02-21 10:53:56', 4),
    ('Vacation5', 'https://dummyimage.com/200x200/000/fff&text=Test+me', 'New Zealand', '2017-02-21 10:53:57', '2017-02-21 10:53:58', 5),
    ('Vacation6', 'https://dummyimage.com/200x200/000/fff&text=Test+me', 'The Moon', '2017-02-21 10:53:59', '2017-02-21 10:54:00', 6);