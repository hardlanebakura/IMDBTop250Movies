const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(express.text())
app.use(bodyParser.text({type:"*/*"}));

const PORT = 5001;

const axios = require('axios');

var mysql  = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "imdbtop250movies"
});

connection.connect();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    connection.query('SELECT * FROM movies', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
})

app.get("/genres", async (req, res) => {
    connection.query('SELECT genre_id as genreId, name FROM genres', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
})

app.get("/movies", async (req, res) => {
    connection.query('SELECT * FROM movies', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
})

app.post("/movies", async (req, res) => {
    connection.query(`SELECT * FROM movies WHERE genres REGEXP '${JSON.parse(req.body)}'`, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
})

app.get("/movies/:id", async (req, res) => {
    const query1 = `SELECT * FROM movies_additional_details AS a JOIN movies AS b ON a.id = b.id WHERE a.id = ${req.params.id}`;

    const result = await new Promise((resolve, reject) => {
    connection.query(query1, (error, results, fields) => {
        if (error) reject(error);
        else resolve(results[0]);
    }
    );
    });

    const productionCompanies = result.production_companies.split(",");
    var logos = await Promise.all(
    productionCompanies.map(async (productionCompanyId) => {
        return new Promise((resolve, reject) => {
        connection.query(`SELECT logo FROM production_companies WHERE id = ${productionCompanyId}`, (error, results, fields) => {
            if (error) reject(error);
            else {
                resolve(results[0].logo);
            }
        });
        });
    })
    );
    logos = logos.filter(logo => logo);

    result.production_companies = logos;
    res.send(result);
})

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})
