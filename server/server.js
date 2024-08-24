const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const FileStore = require('session-file-store')(session);

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(
  {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE"],
  credentials: true
  }
));
// session middleware
// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false } // Note: In production, set this to true and use HTTPS
// }));

// session middleware which will store the session data in the sessions directory to prevent data loss on server restart
const sessionDir = path.resolve(__dirname, 'sessions');
app.use(
  session({
    store: new FileStore({
      path: sessionDir              // Specify your custom directory
    }),
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 Hour
      secure: false
    }
  })
);


// SQLite database setup
const dbPath = path.resolve(__dirname, 'database.db');
let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Connected to the SQLite database at ${dbPath}`);
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT,
    lastname TEXT,
    username TEXT UNIQUE,
    email TEXT,
    password TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    name TEXT,
    email TEXT,
    trip TEXT,
    people INTEGER,
    date TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trip TEXT,
    username TEXT,
    review TEXT
  )`);
});


// Signup endpoint
app.post('/signup', (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;
  // Check if the user already exists
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (row) {
      return res.status(400).json({ message: 'Username already exists' });
    } else {
      // If the user does not exist, insert the new user
      db.run(`INSERT INTO users(firstname, lastname, username, email, password) VALUES(?, ?, ?, ?, ?)`, [firstname, lastname, username, email, password], function(err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        //req.session.user = { username: username };
        return res.status(200).json({ message: 'User registered successfully' });
      });
    }
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // First, check if the username exists in the database
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, userExists) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!userExists) {
      // If username does not exist, ask the user to sign up
      return res.status(404).json({ message: 'Username does not exist. Please sign up 😬' });
    } else {
      // If username exists, check the combination of username and password
      db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, user) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        if (user) {
          // If username and password match, login successful
          req.session.user = { username: user.username }; // Save user's info to session
          return res.status(200).json({ message: 'Login successful' });
        } else {
          // If username exists but password does not match
          return res.status(400).json({ message: 'Invalid username or password 😬' });
        }
      });
    }
  });
});

// Welcome endpoint
app.get('/isauthenticated', (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ message: 'Authenticated !!!', username: req.session.user.username });
  } else {
    return res.status(401).json({ message: 'Unauthorized !!!' });
  }
});

// Logout endpoint
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if(err) {
      return res.status(400).json({ error: err.message });
    }
    // clear the cookie
    res.clearCookie('connect.sid', { path: '/' });
    return res.status(200).json({ message: 'Logout successful' });
  });
});

// Reset password endpoint
app.post('/reset-password', (req, res) => {
  const { resetUsername, resetEmail, newPassword } = req.body;
  // First, check if the username exists
  db.get(`SELECT * FROM users WHERE username = ? AND email = ?`, [resetUsername, resetEmail], (err, user) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!user) {
      // If the user does not exist, send an error message
      return res.status(404).json({ error: 'Invalid details, user not found.' });
    } else {
      // if the user exists, check if the new password is the same as the old password
      if (user.password === newPassword) {
        return res.status(400).json({ message: 'New password cannot be the same as the old password' });
      }
      // Update the password
      db.run(`UPDATE users SET password = ? WHERE username = ?`, [newPassword, resetUsername], function(err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        return res.status(200).json({ message: 'Password reset successful' });
      });
    }
  });
});

// Booking endpoint
app.post('/booking', (req, res) => {
  const { username, name, email, trip, people, date } = req.body;
  db.run(`INSERT INTO bookings(username, name, email, trip, people, date) VALUES(?, ?, ?, ?, ?, ?)`, [username, name, email, trip, people, date], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(200).json({ message: 'Booking successful' });
  });
});

// Get bookings by username endpoint
app.get('/bookings/:username', (req, res) => {
  const username = req.params.username;
  db.all(`SELECT * FROM bookings WHERE username = ?`, [username], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(200).json({ bookings: rows });
  });
});

// Delete booking by id endpoint
app.delete('/booking/cancel/:id', (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM bookings WHERE id = ?`, [id], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(200).json({ message: 'Booking deleted successfully' });
  });
});

// Add Review endpoint
app.post('/add-review', (req, res) => {
  const { trip, username, reviewData } = req.body;
  db.run(`INSERT INTO reviews(trip, username, review) VALUES(?, ?, ?)`, [trip, username, reviewData], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(200).json({ message: 'Review added successfully' });
  });
});

// Get reviews endpoint
app.get('/reviews/:trip', (req, res) => {
  const trip = req.params.trip;
  db.all(`SELECT * FROM reviews WHERE trip = ?`, [trip], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(200).json({ reviews: rows });
  });
});


app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD     //https://myaccount.google.com/apppasswords, 2FA must be enabled
      }
    });
    // for queries reciepient should be owner (to will be send as blank from client side)
    const recipient = to || process.env.SMTP_MAIL;
    // Email options
    let mailOptions = {
      from: process.env.EMAIL_USER,           // sender address
      to: recipient,                          // list of receivers
      subject: subject,                       // Subject line
      text: text,                             // plain text body
      //html: `<b>${text}</b>`                // html
    };
    // Send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ message: 'Email sent successfully!', info });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});









// const express = require('express');
// const sqlite3 = require('sqlite3').verbose();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// const port = 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // SQLite database setup
// const dbPath = path.resolve(__dirname, 'users.db');
// let db = new sqlite3.Database(dbPath, (err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log(`Connected to the SQLite database at ${dbPath}`);
// });

// db.serialize(() => {
//   db.run(`CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username TEXT UNIQUE,
//     password TEXT
//   )`);
// });

// // Signup endpoints
// app.post('/signup', (req, res) => {
//   const { username, password } = req.body;
//   // Check if the user already exists
//   db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }
//     if (row) {
//       return res.status(400).json({ message: 'Username already exists' });
//     } else {
//       // If the user does not exist, insert the new user
//       db.run(`INSERT INTO users(username, password) VALUES(?, ?)`, [username, password], function(err) {
//         if (err) {
//           return res.status(400).json({ error: err.message });
//         }
//         return res.status(200).json({ message: 'User registered successfully' });
//       });
//     }
//   });
// });


// // Login endpoint
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, row) => {
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }
//     if (row) {
//       return res.status(200).json({ message: 'Login successful' });
//     } else {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

