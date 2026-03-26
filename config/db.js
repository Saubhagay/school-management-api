const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'school_management',
    port: process.env.DB_PORT || 3306,
    ssl: process.env.DB_SSL === 'true' ? {
        rejectUnauthorized: false
    } : undefined,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Initialize the database table if it doesn't exist
const initDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to the MySQL database.');

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS schools (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                address VARCHAR(255) NOT NULL,
                latitude FLOAT NOT NULL,
                longitude FLOAT NOT NULL
            );
        `;

        await connection.query(createTableQuery);
        console.log('Schools table is ready.');
        connection.release();
    } catch (error) {
        console.error('Error initializing database:', error.message);
    }
};

initDB();

module.exports = pool;
