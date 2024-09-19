const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");


const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.static(path.join(__dirname, "public")));


const port = 5000;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Dani, 2023",
  database: "students",
});

// Add a new user
app.post("/add_user", (req, res) => {
  const sql = "INSERT INTO student_details (`name`,`email`,`age`,`gender`) VALUES (?, ?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.age, req.body.gender];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ message: "Something unexpected has occurred: " + err });
    return res.json({ success: "Student added successfully" });
  });
});

// Get all students
app.get("/students", (req, res) => {
  const sql = "SELECT * FROM student_details";
  db.query(sql, (err, result) => {
    if (err) return res.json({ message: "Server error" });
    return res.json(result);
  });
});

// Rest of your endpoints...

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});