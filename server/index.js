/*const express = require('express');
const session = require('express-session');
const cors = require('cors');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());
app.use(cors()); // Enables CORS for all routes

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

const PORT = 8080;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
*/





const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const cors = require('cors');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());
app.use(cors()); // Enables CORS for all routes

const jwtSecret = 'your_jwt_secret';

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

app.use("/customer/auth/*", function auth(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
  }

  const tokenPart = token.split(' ')[1];
  console.log('Extracted token:', token);

  jwt.verify(token, jwtSecret, function (err, decoded) {
    if (err) {
        console.error('Token verification error:', err);
      return res.status(401).json({ message: 'Invalid Token!' });
    }

    req.user = decoded;
    next();
  });
});

const PORT = process.env.PORT || 8080;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
