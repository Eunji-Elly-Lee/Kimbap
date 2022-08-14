const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);
const app = express();
app.use(cors({
  origin: true
}));
app.use(express.json());
app.get('/', (request, response) => {
  response.status(200).send('Server Response Success');
});
app.post('/payment/create', async (request, response) => {
  const total = request.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'CAD'
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret
  })
});
exports.api = functions.https.onRequest(app);
