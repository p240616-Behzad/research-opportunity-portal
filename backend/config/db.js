const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool (better than single connection for production)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Use promise-based pool for async/await
const promisePool = pool.promise();

// Test the connection on startup
(async () => {
    try {
        const connection = await promisePool.getConnection();
        console.log('✅ MySQL connected successfully');
        connection.release();
    } catch (err) {
        console.error('❌ MySQL connection failed:', err.message);
    }
})();

module.exports = promisePool;