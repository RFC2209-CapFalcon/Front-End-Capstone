const path = require('path');
const express = require('express'); // npm installed
const axios = require('axios');
const config = require('../config.js');

// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json())

app.listen(3000);

/*Q&A Route Handlers*/

// QuestionList
// Get questions
// Get questions for the given product

// Get/qa/questions
app.get('/qa/questions', (req, res) => {

  const requestConfig = {
    params: req.query,
    headers: {'Authorization': config.TOKEN}
  }

  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions', requestConfig)
  .then((response)=> {
    res.json(response.data)
  })
  .catch((err)=>{
    console.log(err)
  })

})

// Answers List
// Returns answers for a given question. This list does not include any reported answers.

// GET /qa/questions/:question_id/answers
app.get('/qa/questions/:question_id/answers', (req, res) => {

  const requestConfig = {
    headers: {'Authorization': config.TOKEN}
  }
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${req.query.answer}/answers`, requestConfig )
  .then((response)=>{
    res.send(response.data)
  })
  .catch((error)=>{
    console.log(error)
  })
})



// Add a Question
// Adds a question for the given product

// POST /qa/questions
app.post('/qa/questions/', (req, res) => {

  const requestConfig = {
    headers: {'Authorization': config.TOKEN}
  }

  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions', req.body, requestConfig)
  .then((response)=> {
    res.sendStatus(response.status)
  })
  .catch((err)=>{
    console.log('WE ARE HAVING SOME ISSUES!', err)
  })
})

// Add an Answer
// Adds an answer for the given question

// POST /qa/questions/:question_id/answers
app.post('/qa/questions/:question_id/answers', (req, res) => {

});
// Mark Question as Helpful
// Updates a question to show it was found helpful.

// PUT /qa/questions/:question_id/helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  // {params: {question_id: id}}
  console.log('here we are')
  let number = req.query.question_id

  const newConfig = {
    headers: {'Authorization': config.TOKEN}
  }
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${number}/helpful`, {}, newConfig)

  .then((success) => {
    console.log('succesfully put route for helpful questions')
    res.end()
  })
  .catch((error) => {
    console.log('error in put route for helpful questions', error)
  })
});
// Report Question
// Updates a question to show it was reported. Note, this action does not delete the question, but the question will not be returned in the above GET request.

// PUT /qa/questions/:question_id/report
app.put('/qa/questions/:question_id/report', (req, res) => {

});
// Mark Answer as Helpful
// Updates an answer to show it was found helpful.

// PUT /qa/answers/:answer_id/helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  // {params: {question_id: id}}
  console.log('here we are')
  let number = req.query.answer_id

  const newConfig = {
    headers: {'Authorization': config.TOKEN}
  }
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/answers/${number}/helpful`, {}, newConfig)

  .then((success) => {
    console.log('succesfully put route for helpful answers')
    res.end()
  })
  .catch((error) => {
    console.log('error in put route for helpful answers', error)
  })
});
// Report Answer
// Updates an answer to show it has been reported. Note, this action does not delete the answer, but the answer will not be returned in the above GET request.

// PUT /qa/answers/:answer_id/report
app.put('/qa/answers/:answer_id/report', (req, res) => {

});

// product detail handlers
app.get('/products', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/', {
    headers: {
      Authorization: config.TOKEN,
    },
  })
  .then((productInfo) => {
    console.log(productInfo.data)
    res.send(productInfo.data);
  })
  .catch((error) => {
    res.status(500);
  });
});

app.get('/products/:product_id', (req, res) => {
  console.log('hellooooooooo')
  let itemId = req.params.product_id;
  console.log('itemId: ', itemId)
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${itemId}`, {
    headers: {
      Authorization: config.TOKEN,
    },
  })
    .then((productInfo) => {
      console.log('product info', productInfo.data)
      res.send(productInfo.data);
    })
    .catch((error) => {
      res.status(500);
    });
});

app.get('/products/:product_id/styles', (req, res) => {
  let itemId = req.params.product_id;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${itemId}/styles`, {
    headers: {
      Authorization: config.TOKEN,
    }
  })
    .then((styles) => {
      res.send(styles.data);
    })
    .catch((error) => {
      res.status(500);
    })
});

app.get('/products/:product_id/related', (req, res) => {
  let itemId = req.params.product_id;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${itemId}/related`, {
    headers: {
      Authorization: config.TOKEN,
    },
  })
    .then((relatedItems) => {
      res.send(relatedItems.data);
    })
    .catch((error) => {
      res.status(500);
    });
});

// unsure here
app.get('/cart', (req, res) => {

});

app.post('/cart', (req, res) => {

});

// Rating and Reviews

app.get('/reviews/', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews', { params: { product_id: req.query.product_id, sort: req.query.sort, count: 5000 }, headers: { Authorization: config.TOKEN } })
    .then((response) => {
      res.json(response.data);
    });
});

app.get('/reviews/meta', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta', { params: { product_id: req.query.product_id }, headers: { Authorization: config.TOKEN } })
    .then((response) => {
      res.json(response.data);
    });
});

app.post('/reviews', (req, res) => {

  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews', req.body, { headers: { Authorization: config.TOKEN } })
    .then((response) => {
    })
    .catch((error) => {
      console.log(error);
    });
});

app.put('reviews/:review_id/helpful/', (req, res) => {

});

app.put('reviews/:review_id/report/', (req, res) => {

});
