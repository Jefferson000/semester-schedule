const {RateLimiterMemory} = require('rate-limiter-flexible');
const rateLimiter = new RateLimiterMemory(
    {
      points: 100,
      duration: 60, 
    });
    
module.exports = (req,res, next) => {
      // Consume 1 point for each action
      rateLimiter.consume(req.ip) // or req.ip
        .then(() => {
          next();
        })
        .catch((rejRes) => {
          res.sendStatus(429);
        });
    };