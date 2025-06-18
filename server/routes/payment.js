// import express from 'express';

// import Razorpay from "razorpay";
// const router = express.Router();
// import crypto from "crypto";
// import School from '../models/School.js';

// const razorpay = new Razorpay({
//   key_id: "rzp_test_RSfOyhW6bke3R6", // your test key_id
//   key_secret: "JWPiS2f3luk0KS9qdsqOJuOU", // your test key_secret
// });

// router.post("/payment", async (req, res) => {
//   const { amount } = req.body;

//   const options = {
//     amount: amount * 100, // amount in paisa (₹10 = 1000)
//     currency: "INR",
//     receipt: "receipt_order_74394",
//   };

//   try {
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });




// // router.post("/verify", (req, res) => {
// //   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

// //   const body = razorpay_order_id + "|" + razorpay_payment_id;

// //   const expectedSignature = crypto
// //     .createHmac("sha256", "JWPiS2f3luk0KS9qdsqOJuOU") // use your Razorpay key_secret
// //     .update(body.toString())
// //     .digest("hex");

// //   if (expectedSignature === razorpay_signature) {
// //     // Signature is valid
// //     res.json({ success: true, message: "Payment verified successfully" });
// //   } else {
// //     res.status(400).json({ success: false, message: "Payment verification failed" });
// //   }
// // });


// router.post('/verify', async (req, res) => {
//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     udiseCode // ⚠️ send this from frontend
//   } = req.body;

//   const key_secret = 'JWPiS2f3luk0KS9qdsqOJuOU'; // your Razorpay key_secret

//   const body = razorpay_order_id + '|' + razorpay_payment_id;

//   const expectedSignature = crypto
//     .createHmac('sha256', key_secret)
//     .update(body.toString())
//     .digest('hex');

//   const isAuthentic = expectedSignature === razorpay_signature;

//   if (isAuthentic) {
//     try {
//       const school = await School.findOne({ UDISE_Code: udiseCode });

//       if (!school) {
//         return res.status(404).json({ success: false, message: 'School not found' });
//       }

//       // Push a new submission (or update latest one if preferred)
//       school.submissions.push({
//         transactionId: razorpay_payment_id,
//         paymentStatus: 'successful',
//         paymentAmount: 1,
//         submittedAt: new Date()
//       });

//       await school.save();

//       return res.json({ success: true });
//     } catch (error) {
//       console.error('Error saving payment:', error);
//       return res.status(500).json({ success: false, message: 'Server error' });
//     }
//   } else {
//     return res.status(400).json({ success: false, message: 'Invalid signature' });
//   }
// });






// export default router;



import express from "express";
import crypto from "crypto";
import Razorpay from "razorpay";
import School from "../models/School.js";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_RSfOyhW6bke3R6",
  key_secret: "JWPiS2f3luk0KS9qdsqOJuOU",
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

// router.post("/verify", async (req, res) => {
//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     udiseCode,
//   } = req.body;

//   const body = razorpay_order_id + "|" + razorpay_payment_id;
//   const expectedSignature = crypto
//     .createHmac("sha256", razorpay.key_secret)
//     .update(body.toString())
//     .digest("hex");

//   const isAuthentic = expectedSignature === razorpay_signature;

//   if (isAuthentic) {
//     try {
//       const school = await School.findOne({ UDISE_Code: udiseCode });

//       if (!school) {
//         return res.status(404).json({ success: false, message: "School not found" });
//       }

//       school.submissions.push({
//         transactionId: razorpay_payment_id,
//         paymentStatus: "successful",
//         paymentAmount: 1,
//         submittedAt: new Date(),
//       });

//       await school.save();

//       return res.json({ success: true });
//     } catch (error) {
//       console.error("DB error:", error);
//       return res.status(500).json({ success: false, message: "DB Save Failed" });
//     }
//   } else {
//     return res.status(400).json({ success: false, message: "Invalid Signature" });
//   }
// });

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
        paymentAmount: 1,
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
