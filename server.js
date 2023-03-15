// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51Ml6MtKcnMJtsM8VHquYfgmkJaLFhpggH0HDqNAmW9lRii4wIl9UBMVrKeKz66RxEVa3eszGZshRNLsyrCmYNQsP00Ghm6cmfK"
);
const express = require("express");
const app = express();
app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:4242";
app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });
  res.redirect(303, session.url);
});
app.listen(4242, () => console.log("Running on port 4242"));
