

// import React, { useState } from 'react';
// import { Check } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

// interface QRCodePaymentFormProps {
//   onNext: (data: { transactionId: string; screenshot: File }) => void;
// }


// const QRCodePaymentForm: React.FC<QRCodePaymentFormProps> = ({ onNext }) => {
//   const [transactionId, setTransactionId] = useState("");
//   const [screenshot, setScreenshot] = useState<File | null>(null);
//   const navigate = useNavigate();

//   const paymentData = {
//     amount: "500.00",
//     merchantId: "EDII_HACKATHON_2025",
//     description: "Hackathon Registration Fee"
//   };

//   const handleConfirm = () => {
//     if (transactionId.trim() === "") {
//       toast.error("Please enter your Transaction ID before proceeding.");
//       return;
//     }

//     if (!screenshot) {
//       toast.error("Please upload your payment screenshot.");
//       return;
//     }

//     // Success toast
//     toast.success("Payment successful! Registration complete.");

//    onNext({ transactionId, screenshot });


//     // Redirect after short delay
//     setTimeout(() => {
//       navigate('/dashboard');
//     }, 1000);
//   };

//   return (
//     <div className="max-w-md mx-auto space-y-8">
//       <div className="text-center space-y-4">
//         <h3 className="text-2xl font-bold text-gray-800">Payment Details</h3>
//         <p className="text-gray-600">
//           Scan the QR code to pay the registration fee of ₹{paymentData.amount}
//         </p>
//       </div>

//       <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200">
//         <div className="flex justify-center mb-6">
//           <img src="/QR.jpg" className="w-48 h-48 object-cover" alt="QR Code" />
//         </div>

//         <div className="space-y-4 text-center">
//           <p className="font-semibold text-gray-800">Amount: ₹{paymentData.amount}</p>
//           <p className="text-sm text-gray-600">
//             Please ensure payment is completed before proceeding
//           </p>
//         </div>

//         {/* Transaction ID Input */}
//         <div className="mt-6 text-left">
//           <label className="block text-gray-700 font-medium mb-2">Enter Transaction ID</label>
//           <input
//             type="text"
//             value={transactionId}
//             onChange={(e) => setTransactionId(e.target.value)}
//             placeholder="e.g. 1234567890ABC"
//             className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-red-800 focus:border-red-800"
//             required
//           />
//         </div>

//         {/* Screenshot Upload */}
//         <div className="mt-4 text-left">
//           <label className="block text-gray-700 font-medium mb-2">
//             Upload Payment Screenshot <span className="text-red-600">*</span>
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (file) setScreenshot(file);
//             }}
//             className="w-full border border-gray-300 rounded-md px-4 py-2"
//           />
//           {screenshot && (
//             <div className="mt-2">
//               <img
//                 src={URL.createObjectURL(screenshot)}
//                 alt="Payment Screenshot Preview"
//                 className="w-32 h-32 object-cover border rounded"
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Instructions & Button */}
//       <div className="space-y-4">
//         <div className="bg-green-50 p-4 rounded-lg">
//           <h4 className="font-medium text-green-800 flex items-center gap-2">
//             <Check className="w-5 h-5" />
//             Payment Instructions
//           </h4>
//           <ul className="mt-2 text-sm text-green-700 list-disc list-inside">
//             <li>Open your UPI payment app</li>
//             <li>Scan the QR code above</li>
//             <li>Complete the payment</li>
//             <li>Enter the transaction ID above</li>
//             <li>Upload your payment screenshot</li>
//           </ul>
//         </div>

//         <button
//           onClick={handleConfirm}
//           className="w-full px-6 py-3 bg-red-800 text-white rounded-md hover:bg-red-900 transition-colors duration-300 font-medium"
//         >
//           Confirm & Complete Registration
//         </button>
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
//     </div>
//   );
// };

// export default QRCodePaymentForm;


import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import RazorpayButton from '../pages/RazorpayButton';

interface QRCodePaymentFormProps {
  onNext: (data: { transactionId: string }) => void;
  onBack: () => void;
}

const QRCodePaymentForm: React.FC<QRCodePaymentFormProps> = ({ onNext, onBack }) => {
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();

  const paymentData = {
    amount: "500.00",
    merchantId: "QeEvGPtIZUWyzG",
    description: "Hackathon Registration Fee"
  };

  const handleConfirm = () => {
  if (transactionId.trim() === "") {
    toast.error("Please enter your Transaction ID before proceeding.");
    return;
  }

  // Success toast
  toast.success("Payment successful! Registration complete.");

  // Pass transaction ID to parent
  onNext({ transactionId });

  // ❌ Remove navigate('/dashboard') from here
  // Project submission toast (optional)
  setTimeout(() => {
    toast.success("Project submitted successfully!");
  }, 500);
};


  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">Payment Details</h3>
        <p className="text-gray-600">
          To pay the registration fee of ₹{paymentData.amount}
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200">
        <div className="flex justify-center mb-6">
          {/* <img src="/QR.jpg" className="w-48 h-48 object-cover" alt="QR Code" /> */}
          <RazorpayButton />
        </div>

        <div className="space-y-4 text-center">
          <p className="font-semibold text-gray-800">Amount: ₹{paymentData.amount}</p>
          <p className="text-sm text-gray-600">
            Please ensure payment is completed before proceeding.
          </p>
        </div>

        {/* Transaction ID Input */}
        <div className="mt-6 text-left">
          <label className="block text-gray-700 font-medium mb-2">Enter Transaction ID <span className="text-red-500"> * </span></label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="e.g. 1234567890ABC"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-red-800 focus:border-red-800"
            required
          />
        </div>
      </div>

      {/* Instructions & Button */}
      <div className="space-y-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-green-800 flex items-center gap-2">
            <Check className="w-5 h-5" />
            Payment Instructions
          </h4>
          <ul className="mt-2 text-sm text-green-700 list-disc list-inside">
            <li>Open your UPI payment app</li>
            <li>Scan the QR code above</li>
            <li>Complete the payment</li>
            <li>Enter the transaction ID above</li>
          </ul>
        </div>

        {/* <button
          onClick={handleConfirm}
          className="w-full px-6 py-3 bg-red-800 text-white rounded-md hover:bg-red-900 transition-colors duration-300 font-medium"
        >
          Confirm & Complete Registration
        </button> */}
      </div>

      <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Back
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900"
            onClick={handleConfirm}
          >
            Next
          </button>
        </div>

      <ToastContainer  position="bottom-right"  autoClose={3000} />
    </div>
  );
};

export default QRCodePaymentForm;
