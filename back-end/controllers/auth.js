const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({ error: 'Email is already used' });
    }

    const { name, email, password } = req.body;
    let username = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;

    let newUser = new User({ name, email, password, profile, username });
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      res.json({ messasge: 'Signup was successful!' });
    });
  });
};

exports.signin = (req, res) => {
  //grab specific email and password by deconstructing and passing as requested body
  const { email, password } = req.body;

  //check if user exists
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'User with email does not exist' });
    }

    //auth password
    if (!user.authenticate(password)) {
      return res
        .status(400)
        .json({ error: 'Email and Password does not match' });
    }

    // everything passed, now generate jwtoken
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    //create cookie named 'token' with using token up there
    res.cookie('token', token, { expiresIn: '1d' });

    //finally, get all that object, put into user and then res.json spit out
    const { _id, username, name, email, role } = user;
    return res.json({ token, user: { _id, username, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Signout Successful' });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});
