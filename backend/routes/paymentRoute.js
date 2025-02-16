const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

// Payment route (authenticated)
router.route("/payment/process").post(isAuthenticatedUser, processPayment);

// Route to send Stripe API Key to the frontend (public)
router.route("/stripeapikey").get( sendStripeApiKey);

module.exports = router;
