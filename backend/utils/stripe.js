const Stripe = require("stripe");
if (!process.env.SECRET_KEY) {
  throw new Error("SECRET_KEY is missing");
}
const stripe = new Stripe(process.env.SECRET_KEY);
module.exports = stripe;
