const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const { brotliDecompressSync } = require("zlib");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extende: false}));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true}));

const stripe = require("stripe")("sk_test_51NKjmhGU76muap3Y3IJ47Ee8XGkB6ZWrnNWouBfI0GayatFnc466U4X0nkqdjz7HzdpHUHpignp4EUh7djGvIDhC00vImeNEks");

app.post("/checkout", async (req, res, next) => {
    try {
        // doing an implicit return on the create method bcoz of the curly braces
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
        },
            shipping_options: [
            {
                shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                    amount: 0,
                    currency: 'usd',
                },
                display_name: 'Free shipping',
                // Delivers between 5-7 business days
                delivery_estimate: {
                    minimum: {
                    unit: 'business_day',
                    value: 5,
                    },
                    maximum: {
                    unit: 'business_day',
                    value: 7,
                    },
                }
                }
            },
            {
                shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                    amount: 1500,
                    currency: 'usd',
                },
                display_name: 'Next day air',
                // Delivers in exactly 1 business day
                delivery_estimate: {
                    minimum: {
                    unit: 'business_day',
                    value: 1,
                    },
                    maximum: {
                    unit: 'business_day',
                    value: 1,
                    },
                }
                }
            },
            ],
           line_items:  req.body.items.map((item) => ({
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [item.product]
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
          })),
           mode: "payment",
           success_url: "http://localhost:4242/success.html",
           cancel_url: "http://localhost:4242/cancel.html",
        });

        res.status(200).json(session);
    } catch (error) {
        next(error);
    }
});

app.listen(4242, () => console.log('app is running on 4242'));