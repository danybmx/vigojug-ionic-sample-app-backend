const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
require('dotenv').config();

const config = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  meetup_api_key: process.env.API_KEY,
  event_fields: 'featured_photo'
}

const client = axios.create({
  baseURL: 'https://api.meetup.com/',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

app.use(bodyParser.json());
app.use(cors());

app.get('/meetup/events', (req, res) => {
  client.get(`vigojug/events?key=${config.meetup_api_key}&fields=${config.event_fields}`).then(r => {
    res.json(r.data);
  }).catch(err => {
    res.status(err.response.status).json({
      url: err.response.url,
      debug: err.response.data
    });
  })
});

app.get('/meetup/past_events', (req, res) => {
  client.get(`VigoJUG/events?key=${config.meetup_api_key}&status=past&fields=${config.event_fields}&desc=true`).then(r => {
    res.json(r.data);
  }).catch(err => {
    res.status(err.response.status).json({
      url: err.response.url,
      debug: err.response.data
    });
  })
});

app.listen(config.port, () => {
  console.log(`Server listening on port :${config.port}`);
})
