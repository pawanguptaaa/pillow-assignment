const {returnAllRateLimitedRequests} = require('../services/requestLoggerService');

module.exports = {
    getAllRateLimitedRequests: async (req, res) => {
      const rateLimitedRequests = await returnAllRateLimitedRequests();
      console.log(rateLimitedRequests);
      res.json(rateLimitedRequests);
    }
  };
