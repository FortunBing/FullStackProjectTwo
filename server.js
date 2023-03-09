'use strict'

const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.static('public'));
const cors = require('cors');
app.use(cors());

const { Pool } = require('pg');

const bodyParser = require('body-parser');
const { Console } = require('console');
// const { get } = require('http');
app.use(bodyParser.json());

const port = process.env.PORT || 8000;
const DB_HOST = process.env.DATABASE_HOST || '127.0.0.1';

const pool = new Pool ({
    user:'bing',
    host: DB_HOST,
    database: 'cookiesenabled',
    password: 'password',
    port: 5432
});

app.get('/api/cookies', (req, res)=>{
    pool.query('SELECT * FROM cookies',(err, results)=>{
        if (err){
            throw err;
        }
        console.table(results);
        let row = results.rows;
        console.log("Heres your cookie sir!:", row);
        res.send(row);
    })
});

app.get('/api/cookies/:cookie_id', (req, res) => {
    //in the requested params of cookie_id its variable is id
    const id = req.params.cookie_id;
    console.log(id);
    //query
    pool.query('SELECT * FROM cookies WHERE cookie_id = $1', [id], (err, results)=>{
        if (err){
            throw err;
        }
        let row = results.rows[0];
        console.log("Is this your cookie sir?", row)
        res.send(row);
    })
  });

app.post('/api/cookies', (req, res)=>{
//data variables    
const id = req.body.cookie_id;
const {name, value} = req.body;
const glutenfree = req.body.gluten_free;
const storename = req.body.store_name;
//query
if (id && name && value && glutenfree && storename){
    pool.query('INSERT INTO cookies (cookie_id, name, value, gluten_free, store_name) VALUES ($1, $2, $3, $4, $5) RETURNING *', [id, name, value, glutenfree, storename], (err, results)=>{
        //new delicious cookie
        if (err){
            throw err;
        }
        let bakedCookie = results.rows[0];
        console.log("This one just came out of the over", bakedCookie)
        res.send(bakedCookie)
    });
}
})

app.patch('/api/cookies/:cookie_id', (req, res) => {
    //id is a params because its going to be used to access the data everything else is something that can be changed/altered
    const id = req.params.cookie_id;
    const {name, value} = req.body;
    const glutenfree = req.body.gluten_free
    const storename = req.body.store_name;
    // get current values of the pet with that id from our DB
    pool.query('SELECT * FROM cookies WHERE cookie_id = $1', [id], (err, results) => {
      if (err){
        throw (err);
      }
      const currCookie = results.rows;
      console.log("Cookie with an id of", id, "is here!");

      if (!currCookie){
        return res.status(404).send("No cookies by that id exist");
      } else {

        //variables for updating values
        const toUpdateId = id;
        const updatedName =  name;
        const updatedValue  = value;
        const updatedGluten =  glutenfree;
        const updatedStore =  storename;
        
        pool.query('UPDATE cookies SET name=$1, value=$2, gluten_free=$3, store_name=$4 WHERE cookie_id=$5 RETURNING *', 
            [updatedName, updatedValue, updatedGluten, updatedStore, toUpdateId], (err, data) => {
          if (err){
            throw err;
          }
          const updatedCookie = data.rows[0];
          console.log("Updated!:", updatedCookie);
          res.send(updatedCookie);
        });
      }    
    });
  });
  

app.delete('/api/cookies/:cookie_id', (req, res)=>{
    const id = req.params.cookie_id;
    console.log("Cookie with id", id, "today is your downfall");
    // if (!Number.isInteger(id)){
    //     return res.status(404).send("No fish in this lake with with that id");
    // }
    pool.query('DELETE FROM cookies WHERE cookie_id = $1 RETURNING *', [id], (err, results) =>{
        if (err){
            throw err;
        }
        //deleted fish
        const deletedGoods = results.rows[0];
        console.log("Bye bye", deletedGoods);
        if (deletedGoods){
            //shows deleted cookie
            res.send(deletedGoods)
        }else{
            //if called again/ or the cookie does not exist shows this message
            res.status(404).send("No Cookies with that id");
        }
    })
});

app.listen(port, ()=>{
    console.log('listening on port', port);
});



module.exports=app;