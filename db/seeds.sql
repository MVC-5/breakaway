USE breakaway_db;

INSERT INTO departments
    (name, employee_id)
VALUES
    ('Customer Support'),
    ('Design'),
    ('Development'),
    ('Sales');


INSERT INTO roles
    (title, dept_id)
VALUES
    ('Manager', ),
    ('Tech. Support'),
    (),
    ();

INSERT INTO employees
    (employee_first, employee_last, role_id, dept_id, manager_id, bank)
VALUES
    ('Geoffrey', 'Hamilton', 1, 1, 1),
    ('Melanie', 'Miller', 1, 1, 1),
    ('Karen', 'Blauser', 1, 1, 1),
    ('Nancy', 'Fritz', 1, 1, 1),
    ('Charles', 'Kleiber', 1, 1, 1),
    ('Renita', 'Panos', 1, 1, 1),
    ('Walter', 'Ray', 1, 1, 1),
    ('Ann', 'Marte', 1, 1, 1),
    ('Drew', 'Schofield', 1, 1, 1);

INSERT INTO request
    (employee_id, start, end, manager_id)
VALUES
    (),
    (),
    (),
    (),
    (),
    ();

INSERT INTO feed
    (employee_id, description, pic_link)
VALUES
    (),
    (),
    (),
    (),
    (),
    ();