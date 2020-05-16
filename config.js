require('dotenv').config()

const port = process.env.PORT;
const dbname = process.env.DB_NAME;
const dbpass = process.env.DB_PASSWORD;

module.exports = {
    port: port,
    //db: process.env.MONGODB || 'mongodb://127.0.0.1:27017/productsApi',
    db: `mongodb+srv://${dbname}:${dbpass}@cluster0-5akub.mongodb.net/test?retryWrites=true&w=majority`,
}