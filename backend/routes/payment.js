
import express from "express";
import crypto from "crypto";
import Razorpay from "razorpay";
import School from "../models/School.js";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: "rzp_live_RhszuG7TTzQpya",
  key_secret: "rj97TBYNKtaSvl77FycEu54e",
});

router.post("/payment", async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


router.post("/verify", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    udiseCode,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", razorpay.key_secret)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (!isAuthentic) {
    return res.status(400).json({ success: false, message: "Invalid Signature" });
  }

  try {
    const school = await School.findOne({ UDISE_Code: udiseCode });

    if (!school) {
      return res.status(404).json({ success: false, message: "School not found" });
    }

    // ❗Check if submission already exists with this transactionId
    const alreadyExists = school.submissions.some(
      (submission) => submission.transactionId === razorpay_payment_id
    );

    if (!alreadyExists) {
      // ✅ Only push if not already saved
      school.submissions.push({
        transactionId: razorpay_payment_id,
        paymentStatus: "successful",
        paymentAmount: 500,
        submittedAt: new Date(),
      });

      await school.save();
    }

    return res.json({ success: true });
  } catch (error) {
    console.error("DB error:", error);
    return res.status(500).json({ success: false, message: "DB Save Failed" });
  }
});


export default router;
