const requestLoggerSchema  = require('../models/requestLogger');
module.exports = {
    logRequest: async function logRequest(body){
        requestLoggerSchema.create(body);
    },
    returnAllRateLimitedRequests:  async function getAllRateLimitedRequests(){
        return requestLoggerSchema.find().sort({createdAt:-1});
    },
    
}