let requestCounter = 0;
let lastResetTime = Date.now();

module.exports = {
  incrementCounter: () => {
    requestCounter++;
  },
  resetCounter: () => {
    requestCounter = 0;
    lastResetTime = Date.now();
  },
  getCounter: () => requestCounter,
  getResetTime: () => lastResetTime
};
