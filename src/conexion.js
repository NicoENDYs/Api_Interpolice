import "dotenv/config";
import mysql from "mysql2/promise";

const dbCnn = mysql.createPool({
    host: process.env.DB_HOST ?? "localhost",
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASS ?? "",
    database: process.env.DB_NAME ?? "Interpolice",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    supportBigNumbers: true,
    bigNumberStrings: true,
});
export default dbCnn; // exportamos la conexion para usarla en otros archivos
