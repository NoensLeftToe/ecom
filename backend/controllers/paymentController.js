const catchAsyncErrors = require("../middleware/catchAsyncError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with secret key

// Process payment
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const { amount } = req.body; // Get amount from the frontend request

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to smallest currency unit (e.g., cents)
    currency: "inr", // Or your preferred currency
    metadata: {
      company: "Ecommerce",
    },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret, // Send the client secret back
  });
});

// Send Stripe API Key (for frontend)
exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {

  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  
});
