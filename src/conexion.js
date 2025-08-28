import "dotenv/config";
import mysql from "mysql2/promise";
    
const dbCnn = mysql.createPool({
    host: process.env.DB_host,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB_database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    supportBigNumbers: true,
    bigNumberStrings: true,
});
export default dbCnn; // exportamos la conexion para usarla en otros archivos
