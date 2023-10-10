//Objet Connection
const connection = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
    user : process.env.DB_USER,
    password : process.env.DB_PASS
}

module.exports = connection