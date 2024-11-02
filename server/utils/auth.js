const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Function to authenticate users for Apollo Server
  authMiddleware: function ({ req }) {
    // Allows token to be sent via headers
    let token = req.headers.authorization || '';

    // If the authorization header exists, split it to get the token
    if (token.startsWith('Bearer ')) {
      token = token.split(' ').pop().trim();
    }

    // If no token, return an empty object
    if (!token) {
      return { user: null };
    }

    // Verify token and get user data
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      return { user: data };
    } catch {
      console.log('Invalid token');
      return { user: null };
    }
  },
  
  // Function to sign the token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
