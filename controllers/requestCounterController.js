const config = require('../config.json');
const requestCounterService = require('../services/requestCounterService');

module.exports = {
  getRequestCount: (req, res) => {
    const {body} = req;
    requestCounterService.incrementCounter();

    const currentTime = Date.now();
    if (currentTime - requestCounterService.getResetTime() > config.coolDownPeriod) {
      requestCounterService.resetCounter();
    }

    if (requestCounterService.getCounter() > config.rateLimit) {
      const resetTime = requestCounterService.getResetTime() + config.coolDownPeriod;
      const remainingTimeInSec = (resetTime - currentTime)/1000;
      res.set('X-RATE-LIMIT', config.rateLimit);
      res.set('X-WAIT-TILL', resetTime);
      const response = {
        message: 'Too Many Requests',
        rateLimit: config.rateLimit,
        waitTill: resetTime,
        remainingTimeInSec,
      };
      res.responseJson =  response;
      res.status(429).json(response); 
    } else {
      res.json({
        requestCount: requestCounterService.getCounter()
      });
    }
  }
};
