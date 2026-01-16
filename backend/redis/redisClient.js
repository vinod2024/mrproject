const { createClient } = require("redis");
// import { createClient } from "redis";
// const { radisPassword } = require("../utils/constants.js");

const redisClient = createClient({
    username: 'default',
    password: 'KiryL8YVRswbn5VHMiIBFGCrKyRqelhA',
    socket: {
        host: 'redis-12770.crce182.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 12770
    }
});

redisClient.on('error', err => {
  console.log('Redis Client Error', err)
});

redisClient.on('connect', () => {
  console.log('Connecting to Redis...')
});

redisClient.on('ready', () => {
  console.log('Radis Connected to Redis...')
});

// redisClient.connect();
// 🔴 DO NOT use await at top-level in CommonJS
(async () => {
  await redisClient.connect();

  /* await redisClient.set('foo', 'bar');
  const result = await redisClient.get('foo');
  console.log(result)  // >>> bar */

})();



module.exports = redisClient;



