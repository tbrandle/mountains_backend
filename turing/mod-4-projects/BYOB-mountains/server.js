const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const config = require('dotenv').config().parsed;


const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('secretKey', config.CLIENT_SECRET);
app.set('port', process.env.PORT || 3000);

if (!config.CLIENT_SECRET || !config.USERNAME || !config.PASSWORD) {
  throw 'Make sure you have a CLIENT_SECRET, USERNAME, and PASSWORD in your .env file'
}

app.listen(app.get('port'), () => {
  console.log(`port is running on ${app.get('port')}.`);
});

const checkAuth = (request, response, next) => {
  const token = request.body.token ||
                request.param('token') ||
                request.headers['authorization'];

  if (token) {
    jwt.verify(token, app.get('secretKey'), (error, decoded) => {
        // If the token is invalid or expired, respond with an error
        if (error) {
          return response.status(403).send({
            success: false,
            message: 'Invalid authorization token.'
          });
        }

        // If the token is valid, save the decoded version to the
        // request for use in other routes & continue on with next()
        else {
          request.decoded = decoded;
          next();
        }
      });
  }

  else {
    return response.status(403).send({
      success: false,
      message: 'You must be authorized to hit this endpoint'
    });
  }
};

/********** GET ************/

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

app.post('/authenticate', (request, response) => {
  const user = request.body;

  if (user.username !== config.USERNAME || user.password !== config.PASSWORD) {
    response.status(403).send({
      success: false,
      message: 'Invalid Credentials'
    });
  }
  // If the credentials are accurate, create a token and send it back
  else {
    let token = jwt.sign(user, app.get('secretKey'), {
      expiresIn: 172800 // expires in 48 hours
    });

    response.json({
      success: true,
      username: user.username,
      token: token
    });
  }
});

app.post('/api/v1/mountains', checkAuth, (req, res) => {
  const { mountain } = req.body
  database('mountains').insert(mountain, 'id')
    .then(mountain => res.status(201).json({ id: mountain[0] }))
    .catch(error=> console.log(error))
})

app.post('/api/v1/ranges', checkAuth, (req, res) => {
  const range = req.body
  database('range').insert(range, 'id')
    .then(range => res.status(201).json({ id: range[0] }))
    .catch(error => console.log(error))
})

/********** PATCH ************/

app.patch('/api/v1/mountains', checkAuth, (req, res) => {
  const { mountain, id } = req.body
  database('mountains').where('id', id).update({ mountain })
    .then(mountain => res.status(202).json(mountain))
    .catch(error => console.log(error))
})

app.patch('/api/v1/ranges', checkAuth, (req, res) => {
  const { range, id } = req.body
  database('range').where('id', id).update({ range })
    .then(range => res.status(202).json(range))
    .catch(error => console.log(error))
})

/********** DELETE ************/

app.delete('/api/v1/mountains', checkAuth, (req, res) => {
  database('mountains').where('id', req.body.id).del()
    .catch(error => console.log(error))
})


module.exports = app;
