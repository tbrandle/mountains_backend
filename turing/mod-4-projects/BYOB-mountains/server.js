const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`port is running on ${app.get('port')}.`);
});

/********** GET ************/

app.get('/', (req, res) => {
  console.log("oh hey");
})

app.get('/api/v1/mountains', (req, res) => {
  database('mountains').select()
    .then(mountains => res.status(200).json(mountains))
    .catch(error => console.log(error))
})

app.get('/api/v1/ranges', (req, res) => {
  database('range').select()
  .then(range => res.status(200).json(range))
  .catch(error => console.log(error))
})

app.get('/api/v1/:id/mountain', (req, res) => {
  database('mountains').where('id', req.params.id).select()
    .then(mountain => res.status(200).json(mountain))
    .catch(error => console.log(error))
})

app.get('/api/v1/:id/mountain_range', (req, res) => {
  database('mountains').where('range_id', req.params.id).select()
    .then(range => res.status(200).json(range))
    .catch(error => console.log(error))
})

/********** POST ************/

// "Rank": "1",
// "Mountain": "Mount Everest / Sagarmatha / Chomolungma",
// "Height_m": "8848",
// "Height_ft": "29029",
// "Prominence_m": "8848",
// "Range": "Mahalangur Himalaya",
// "Coordinates": "27°59′17″N 86°55′31″E",
// "Parent_mountain": "1953",
// "First_ascent": "145",
// "Ascents_bef_2004": "121"

app.post('/api/v1/mountains', (req, res) => {
  const mountain = req.body
    database('mountains').insert(mountain, 'id')
      .then(mountain => res.status(201).json({ id: mountain[0] }))
      .catch(error=> console.log(error))
})

app.post('/api/v1/ranges', (req, res) => {
  const range = req.body
  database('range').insert(range, 'id')
    .then(range => res.status(201).json({ id: range[0] }))
    .catch(error => console.log(error))
})

app.post('/api/v1/ranges', (req, res) => {

})


module.exports = app;
