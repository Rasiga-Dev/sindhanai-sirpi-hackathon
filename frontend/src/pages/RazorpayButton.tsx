import React from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE } from "../config/api";

const RazorpayButton = () => {
    const handlePayment = async () => {
  const udiseCode = localStorage.getItem("udiseCode"); // ✅ Use it here

  console.log("UDISE Code:", udiseCode);
  if (!udiseCode) { 
    toast.success("⚠️ UDISE code not found. Please login first.");
    return;
  }

  const response = await fetch(`${API_BASE}/api/payment/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: 500 }), // ₹1 for demo
  });

  const data = await response.json();

  const options = {
    key: "rzp_test_RSfOyhW6bke3R6",
    amount: data.amount,
    currency: data.currency,
    name: "Hackathon Project",
    description: "Registration Fee",
    order_id: data.id,
    handler: async function (response) {
      // ✅ Razorpay payment success
      const verifyRes = await fetch(`${API_BASE}/api/payment/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          udiseCode: udiseCode, // 👈 sent for saving under correct school
        }),
      });

      const result = await verifyRes.json();
      if (result.success) {
        toast.success("✅ Payment successful & saved!");
        // redirect or show toast here
      } else {
        toast.error("⚠️ Payment verified failed.");
      }
    },
    prefill: {
      name: "Student",
      email: "student@example.com",
    },
    notes: {
      address: "College Campus",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};


    return (
        <div className="flex items-center justify-center mt-10">
            <button
                onClick={handlePayment}
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Pay ₹500
            </button>
      <ToastContainer  position="bottom-right"  autoClose={3000} />

        </div>
    );
};

export default RazorpayButton;
