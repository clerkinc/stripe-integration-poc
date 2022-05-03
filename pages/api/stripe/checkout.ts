import stripe from "../../../stripe";
import { requireAuth, users } from "@clerk/nextjs/api";
import { findOrCreateCustomerId } from "./customer";

const handler = requireAuth(async (req, res) => {
  const customerId = await findOrCreateCustomerId({
    clerkUserId: req.auth.userId,
  });

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000",
    line_items: req.body.line_items,
    mode: "subscription",
  });

  res.json(session);
});

export default handler;
