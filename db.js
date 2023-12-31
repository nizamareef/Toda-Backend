const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('todos.db');

const createTableQuery = `
CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false
)`;
db.run(createTableQuery, (err) => {
    if (err) {
        console.error('Error creating Table:', err.message);
    } else {
        console.log('Table created successfully');
    }
});

module.exports = db;
