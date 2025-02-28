const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
    const { username, email, password } = req.body;
    User.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ message: 'Existing User'});
            }
            return bcrypt.hash(password, 10);
        })
        .then(hash => {
            const user = new User({ username, email, password: hash });
            return user.save();
        })
        .then(user => res.status(201).json({ message: 'User created sucessfully!', user }))
        .catch(err => res.status(500).json({ error: err.message }));
};

const login = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Authentication failed' });
            }
            return bcrypt.compare(password, user.password)
              .then(result => {
                if (!result) {
                    return res.status(401).json({ message: 'Authentication failed'});
                }
                const token = jwt.sign(
                    { email: user.email, userId: user._id},
                    'secret_key', // Replace with secure key in production.
                    { expiresIn: '1h' }
                );
                return res.status(200).json({ token, userId: user._id });
              });  
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

module.exports = { register, login };