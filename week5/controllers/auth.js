const jwt = require ('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process. env.DATABASE_USER,
    password: process. env. DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

exports.register = (req,res) => {
    console.log(req.body);

    const {name, email, password, passwordConfirm} = req.body;
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => {
        if (error) {
            console.log(error);
        }

        if (result.length > 0) {
            return res.render('register'), {
                message: 'This email has already been registered.'
            }
        } else if (password !== passwordConfirm) {
            return res.render('register'), {
                message: 'The password do not match.'
            }
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

    });
};

exports.login = (req,res) => {
    try {
        const {email, password} = req.body;

        if( !email || !password ) {
            return res.status(400).render('login', {
                message: 'Please provide an email and password'
            })
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, result) => {
            console.log(result);
            if( !results || !(await.bcrypt.compare(password, results[0]))) {
                return res.status(400).render('login', {
                    message: 'please provide email and password'
                })
            } else {
                const id = results[0].id;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("The token is: " + token);
            }
    
            if (result.length > 0) {
                return res.render('register'), {
                    message: 'This email has already been registered.'
                }
            } else if (password !== passwordConfirm) {
                return res.render('register'), {
                    message: 'The password do not match.'
                }
            }
        });
    }
};

exports.logout = (req,res) => {
    console.log(req.body);

    const {name, email, password, passwordConfirm} = req.body;
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => {
        if (error) {
            console.log(error);
        }

        if (result.length > 0) {
            return res.render('register'), {
                message: 'This email has already been registered.'
            }
        } else if (password !== passwordConfirm) {
            return res.render('register'), {
                message: 'The password do not match.'
            }
        }
    });
};