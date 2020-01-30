const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { jwtSecret } = require('../config/secrets');

const Users = require('../users/users-model');


router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 11);
    user.password = hash;

    Users.add(user)
        .then(id => {
            res.status(201).json({ message: `User with id ${id} successfully added to database.` });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'Error registering user to database.' });
        });
});


router.post('/login', (req, res) => {
    let { username, password } = req.body;
    console.log({username, password})
    console.log(username)

    Users.findByUsername(username)
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = signToken(user);
                console.log("token", token);
                res.status(200).json({ token })
            } else {
                res.status(401).json({ errorMessage: 'Invalid credentials.' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'Database error while logging in.' });
        });
});


function signToken(user) {
    const payload = {
        id: user.id
    };

    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, jwtSecret, options);
};

module.exports = router;