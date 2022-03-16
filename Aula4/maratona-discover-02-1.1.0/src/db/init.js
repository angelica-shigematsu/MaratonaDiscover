const Database = require('config')

Database()

Database.exec(`CREATE TABLE profile(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_day INT,
    value_hour INT
)`);

Database.exec(`CREATE TABLE jobs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    create_at DATETIME
)`);

Database.run(`INSERT INTO profile (
    name,
    avatar,
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_day,
)VALUES(
    "angelica",
    "https://avatars.githubusercontent.com/u/78798754?v=4",
    3000,
    5,
    5,
    4,
);`);
Database.run(`INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at,
    )VALUES(
        "Pizzaria Guloso,
        2,
        1,
        1617514376018
    )`);

Database.run(`INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at,
    )VALUES(
    "OneTwo Projects",
    3,
    47,
    1617514376018
)`);  


Database.close()