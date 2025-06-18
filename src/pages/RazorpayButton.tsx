// import React from "react";

// const RazorpayButton = () => {
//     const handlePayment = async () => {
//         const response = await fetch("http://localhost:11129/api/payment/payment", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ amount: 1 }), // ₹100
//         });

//         const data = await response.json();

//         // const options = {
//         //   key: "rzp_test_RSfOyhW6bke3R6",
//         //   amount: data.amount,
//         //   currency: data.currency,
//         //   name: "Hackathon Project",
//         //   description: "Registration Fee",
//         //   order_id: data.id,
//         //   handler: async function (response) {
//         //     // Call backend to verify signature
//         //     const verifyResponse = await fetch("http://localhost:11129/api/payment/verify", {
//         //       method: "POST",
//         //       headers: {
//         //         "Content-Type": "application/json",
//         //       },
//         //       body: JSON.stringify({
//         //         razorpay_order_id: response.razorpay_order_id,
//         //         razorpay_payment_id: response.razorpay_payment_id,
//         //         razorpay_signature: response.razorpay_signature,
//         //       }),
//         //     });

//         //     const result = await verifyResponse.json();

//         //     if (result.success) {
//         //       alert("🎉 Payment verified and successful!");
//         //     } else {
//         //       alert("❌ Payment verification failed!");
//         //     }
//         //   },
//         //   prefill: {
//         //     name: "Student",
//         //     email: "student@example.com",
//         //   },
//         //   notes: {
//         //     address: "College Campus",
//         //   },
//         //   theme: {
//         //     color: "#3399cc",
//         //   },
//         // };

//         const options = {
//             key: "rzp_test_RSfOyhW6bke3R6",
//             amount: data.amount,
//             currency: data.currency,
//             name: "Hackathon Project",
//             description: "Registration Fee",
//             order_id: data.id,
//             method: {
//                 upi: true,   // ✅ enable UPI (GPay/PhonePe)
//                 card: false,
//                 netbanking: false,
//                 wallet: false,
//                 emi: false
//             },
//             handler: async function (response) {
//                 // your verification logic
//             },
//             prefill: {
//                 name: "Student",
//                 email: "student@example.com",
//             },
//             notes: {
//                 address: "College Campus",
//             },
//             theme: {
//                 color: "#3399cc",
//             },
//         };


//         const rzp = new window.Razorpay(options);
//         rzp.open();
//     };

//     return (
//         <div className="flex items-center justify-center mt-10">
//             <button
//                 onClick={handlePayment}
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//             >
//                 Pay ₹1
//             </button>
//         </div>
//     );
// };

// export default RazorpayButton;


import React from "react";

const RazorpayButton = () => {
    const handlePayment = async () => {
  const udiseCode = localStorage.getItem("udiseCode"); // ✅ Use it here

  console.log("UDISE Code:", udiseCode);
  if (!udiseCode) { 
    alert("⚠️ UDISE code not found. Please login first.");
    return;
  }

  const response = await fetch("http://localhost:11129/api/payment/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: 1 }), // ₹1 for demo
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
      const verifyRes = await fetch("http://localhost:11129/api/payment/verify", {
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
        alert("✅ Payment successful & saved!");
        // redirect or show toast here
      } else {
        alert("⚠️ Payment verified failed.");
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
                Pay ₹1
            </button>
        </div>
    );
};

export default RazorpayButton;
