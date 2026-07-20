// Custom Logger Utility
// Encapsulates console logging to allow for future integration with Winston or Datadog
const logger = {
    info: (msg) => console.log([INFO] ),
    error: (msg, err) => console.error([ERROR] , err),
    warn: (msg) => console.warn([WARN] )
};
module.exports = logger;
