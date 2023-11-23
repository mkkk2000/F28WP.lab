const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
dotenv.config({path:'./.env'});

const port = 4000;

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

db.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("MySQL Connection Established.");
    }
});

const publicDirectory = path.join(__dirname, './public');

app.use (express.static(publicDirectory));
app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
