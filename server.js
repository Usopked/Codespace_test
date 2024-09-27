// server.js
const mysql = require('mysql2');

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password', // 여기에 실제 비밀번호 입력
  database: 'expo_db',
});

// MySQL에 연결
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});


// 서버 종료 시 연결 종료
process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) {
      console.error('Error ending the connection:', err);
    }
    console.log('MySQL connection closed.');
    process.exit(0);
  });
});

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving users');
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});