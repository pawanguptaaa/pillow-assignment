const mongoose = require("mongoose");
const RequestLoggerSchema= new mongoose.Schema(
  {
    message: {
      type: String,
      required: false,
    },
    rateLimit: {
      type: Number,
      required: false,
    },
    waitTill: {
      type: Number,
      required: false,
    },
    remainingTimeInSec: {
      type: Number,
      required: false,
    },
    body: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);
const RequestLoggerModel = mongoose.model("RequestLogger", RequestLoggerSchema);
module.exports = RequestLoggerModel;
