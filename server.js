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
        let row = results.rows;
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
if (id && name && value && storename){
    pool.query('INSERT INTO cookies (fish_id, name, species, location) VALUES ($1, $2, $3, $4) RETURNING *', [id, name, species, location], (err, data)=>{
        //new fish 
        const newFish = data.rows[0];
        if (newFish){
            console.log('Welcome to the lake', newFish);
            return res.send(newFish);
        }else{
            throw err;
        }
    });
}
})

app.patch('/api/fish/:fish_id', (req, res) => {
    const id = req.params.fish_id;
    const {name, species} = req.body;
    const location = Number.parseInt(req.body.location);
    // if (!Number.isInteger(id)){
    //   res.status(404).send("No fish in this lake with with that id");
    // }
    // get current values of the pet with that id from our DB
    pool.query('SELECT * FROM fish WHERE fish_id = $1', [id], (err, result) => {
      if (err){
        throw (err);
      }
      const fish = result.rows;
      console.log("Fish with Id:", id, "values:", fish);

      if (!fish){
        return res.status(404).send("No fish found with that Id");
      } else {

        const updatedId =  id;
        const updatedName =  name;
        const updatedSpecies =  species;
        const updatedLocation =  location;

        pool.query('UPDATE fish SET name=$1, species=$2, location=$3 WHERE fish_id = $4 RETURNING *', 
            [ updatedName, updatedSpecies, updatedLocation, updatedId], (err, data) => {
          if (err){
            throw err;
          }
          const updatedFish = data.rows[0];
          console.log("Updated row:", updatedFish);
          return res.send(updatedFish);
        });
      }    
    });
  });
  

app.delete('/api/fish/:fish_id', (req, res)=>{
    const id = Number.parseInt(req.params.fish_id);
    console.log(id);
    if (!Number.isInteger(id)){
        return res.status(404).send("No fish in this lake with with that id");
    }
    pool.query('DELETE FROM fish WHERE fish_id = $1 RETURNING *', [id], (err, data) =>{
        if (err){
            throw err;
        }
        //deleted fish
        const deletedFish = data.rows[0];
        console.log(deletedFish);
        if (deletedFish){
            //shows deleted fish
            res.send(deletedFish)
        }else{
            //if called again/ or the fish does not exist
            res.status(404).send("No fish found with that id");
        }
    })
});

app.listen(port, ()=>{
    console.log('listening on port', port);
});



module.exports=app;