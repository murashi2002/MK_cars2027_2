const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'MK_cars3'
});

const app = express();
const PORT = 5000;

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'], credentials: true }));
app.use(express.json());
app.use(
    session({
        secret: 'mkcars-secret',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, sameSite: 'lax', maxAge: 3600000 }
    })
);

const requireAuth = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
};

app.post('/api/login', (req, res) => {
    const { UserName, passWord } = req.body;
    if (!UserName || !passWord) {
        return res.status(400).json({ message: 'Username and password required.' });
    }

    db.query(
        'SELECT u.UserID, u.PassWord, u.EmployeeID, e.FirstName, e.LastName, e.Position FROM Mk_Users2 u JOIN Mk_Employees3 e ON u.EmployeeID = e.EmployeeID WHERE u.UserName = ?',
        [UserName],
        (err, rows) => {
            if (err) return res.status(500).json({ message: 'Database error.' });
            const user = rows[0];
            if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

            if (passWord !== user.PassWord) {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }

            req.session.userId = user.UserID;
            req.session.employeeId = user.EmployeeID;
            req.session.employeeName = `${user.FirstName} ${user.LastName}`;
            req.session.position = user.Position;
            res.json({ message: 'Login successful', user: { employeeId: user.EmployeeID, name: req.session.employeeName, position: user.Position } });
        }
    );
});

app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: 'Logout failed.' });
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out' });
    });
});

app.get('/api/session', (req, res) => {
    if (req.session && req.session.userId) {
        res.json({ authenticated: true, user: { name: req.session.employeeName, position: req.session.position } });
    } else {
        res.json({ authenticated: false });
    }
});

app.get('/api/employees', requireAuth, (req, res) => {
    db.execute('SELECT * FROM Mk_Employees3', (err, rows) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        res.json(rows);
    });
});

app.post('/api/employees', requireAuth, (req, res) => {
    const { PostID, FirstName, LastName, Gender, DateOfBirth, Email, PhoneNumber, Position, HiredDate, Salary, Status, Department, Address } = req.body;
    db.execute(
        'INSERT INTO Mk_Employees3 (PostID, FirstName, LastName, Gender, DateOfBirth, Email, PhoneNumber, Position, HiredDate, Salary, Status, Department, Address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [PostID, FirstName, LastName, Gender, DateOfBirth, Email, PhoneNumber, Position, HiredDate, Salary, Status, Department, Address],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Database error.' });
            res.json({ insertedId: result.insertId });
        }
    );
});

app.get('/api/posts', requireAuth, (req, res) => {
    db.execute('SELECT * FROM Mk_Post', (err, rows) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        res.json(rows);
    });
});

app.get('/api/reports/employees-by-department', requireAuth, (req, res) => {
    db.execute(
        'SELECT Department, COUNT(*) AS EmployeeCount FROM Mk_Employees3 GROUP BY Department ORDER BY Department',
        (err, rows) => {
            if (err) return res.status(500).json({ message: 'Database error.' });
            res.json(rows);
        }
    );
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');

    app.listen(3002, () => {
        console.log('Backend server running on http://localhost:3002');
    });
});