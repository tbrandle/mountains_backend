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
  const heightQuery = req.query.height_ft
  if (heightQuery) {
    database('mountains').where('height_ft', heightQuery).orWhere('height_ft', '>', heightQuery).select()
      .then(mountains => res.status(200).json(mountains))
      .catch(error => console.log(error))
  } else {
    database('mountains').select()
      .then(mountains => res.status(200).json(mountains))
      .catch(error => console.log(error))
  }
})

app.get('/api/v1/ranges', (req, res) => {
  database('range').select()
  .then(range => res.status(200).json(range))
  .catch(error => console.log(error))
})

app.get('/api/v1/:id/mountain', (req, res) => {
  console.log(req.params);
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


app.post('/api/v1/mountains', (req, res) => {

  // need better error handling

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

/********** PATCH ************/

// app.patch('/api/v1/1/ranges', (req, res) => {
//   const range = req.body
//   database('range')where('id' === req.params.id).insert(range, 'id')
//   .then(range => res.status(201).json({ id: range[0] }))
//   .catch(error => console.log(error))
// })


// app.patch('/api/v1/')

/********** DELETE ************/

app.delete('/api/v1/mountains', (req, res) => {
  console.log(req.body.id);
  database('mountains').where('id', req.body.id).del()
    .then(mountain => console.log(mountain))
    .catch(error => console.log(error))
})


module.exports = app;
