const express = require('express');
const app = express();
const {getRequestCount} = require('./controllers/requestCounterController');
const connector = require('./helper/dbConnector');
const {logRequest } = require('./services/requestLoggerService');
const {getAllRateLimitedRequests } = require('./controllers/requestLoggerController');
const {mongoUri} = require('./config.json');

connector(mongoUri);
app.use(async (req, res, next) => {
  // Call the next middleware function
  next();

  // Check the status code of the response
  if (res.statusCode >= 429) {
      await logRequest({...res.responseJson, ...req.body});
  }
});
app.get('/', getRequestCount);
app.get('/rate-limited-reqs', getAllRateLimitedRequests);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
