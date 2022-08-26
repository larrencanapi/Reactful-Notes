const express = require("express");
var cors = require('cors');
const path = require("path");
const { Pool } = require('pg');

const app = express(); 

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));

var pool;

pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'postgres',
    port: 5432,
    password: 'postgres'
});

app.use(express.json());

app.use('/', cors());

app.get('/notes', async(req,res)=>{
    try {
        let tableCreate = await pool.query(
            `CREATE TABLE IF NOT EXISTS Notes (id SERIAL PRIMARY KEY, title varchar(30), noteBody varchar(300), timeLastModified varchar(30))`
        );
        let getNotes = await pool.query(`SELECT * FROM Notes ORDER BY id DESC`);
        res.json(getNotes.rows);
    } catch (error) {
        res.send(error);
    }
});

app.post('/notes', async(req,res)=>{
    var noteTitle = req.body.title;
    var noteBody = req.body.noteBody;
    var noteDate = req.body.timeLastModified;
    try {
        let insertResult = await pool.query(
            `INSERT INTO Notes(title, noteBody, timeLastModified) VALUES ($1, $2, $3)`
        ,[noteTitle, noteBody, noteDate]);
        let getNotes = await pool.query(`SELECT * FROM Notes ORDER BY id DESC`);
        res.json(getNotes.rows);
    } catch (error) {
        res.send(error);
    }
});

app.put('/notes/:Id', async(req,res)=>{
    var noteId = req.params.Id;
    var noteTitle = req.body.title;
    var noteBody = req.body.noteBody;
    var noteTime = req.body.timeLastModified;
    try {
        let updateResult = await pool.query(
            `UPDATE Notes SET title=($1), noteBody=($2), timeLastModified=($3) WHERE id = ($4)`
        ,[noteTitle, noteBody, noteTime, noteId]);
        let getNotes = await pool.query(`SELECT * FROM Notes ORDER BY id DESC`);
        res.json(getNotes.rows);
    } catch (error) {
        res.send(error);
    }
});

app.delete('/notes/:Id', async(req,res)=>{
    var noteId = req.params.Id;
    try {
        let deleteResult = await pool.query(`DELETE FROM Notes WHERE id = ($1)`,[noteId]);
        let getNotes = await pool.query(`SELECT * FROM Notes ORDER BY id DESC`);
        res.json(getNotes.rows);
    } catch (error) {
        res.send(error);
    }
});
  
// start express server on port 8080
app.listen(8080, () => {
    console.log("server started on port 8080");
});
  
  