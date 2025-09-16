


import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../../config/api";

const BankAccountDetails = ({ id, title }) => {
  const [photo, setPhoto] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    accountHolderName: "",
    accountNo: "",
    branch: "",
    ifscCode: "",
    bankName: "",
    panNo: "",
    aadharNo: "",
    profilePhoto: null,
    status: ""
  });



  useEffect(() => {
    // ✅ Fetch already submitted details on mount
    const fetchBankDetails = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/schools/getBank/${id}`);
        if (res.data?.status === "bankDetailsUpdated") {
          setSubmitted(true); // Already submitted, show message
        }
      } catch (err) {
        console.error("Error fetching bank details:", err);
      }
    };

    fetchBankDetails();
  }, [id]);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, profilePhoto: file });
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });

      await axios.put(`${API_BASE}/api/schools/updateBank/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSubmitted(true); // ✅ After successful save
    } catch (err) {
      console.error(err);
      alert("Error saving bank details");
    }
  };


  return (
    <div className="flex justify-center mt-2 mb-5">
      <div className="border rounded-xl p-6 w-[800px] shadow-md bg-white">
        {!submitted ? (
          <>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Project Name : {title}
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="flex gap-6">
                {/* Left side form */}

                <div className="grid grid-cols-2 gap-4 flex-1">
                  <div>
                    <label className="block text-sm font-medium">Account Holder Name</label>
                    <input
                      type="text"
                      className="border rounded-lg w-full p-2 mt-1"
                      placeholder="Enter name"
                      name="accountHolderName"
                      value={formData.accountHolderName}
                      onChange={handleChange}
                      required

                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Account No</label>
                    <input
                      type="text"
                      className="border rounded-lg w-full p-2 mt-1"
                      placeholder="Enter account number"
                      name="accountNo"
                      value={formData.accountNo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Branch</label>
                    <input
                      type="text"
                      className="border rounded-lg w-full p-2 mt-1"
                      placeholder="Enter branch"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">IFSC Code</label>
                    <input
                      type="text"
                      className="border rounded-lg w-full p-2 mt-1"
                      placeholder="Enter IFSC code"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Bank Name</label>
                    <input
                      type="text"
                      className="border rounded-lg w-full p-2 mt-1"
                      placeholder="Enter bank name"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">PAN No</label>
                    <input
                      type="text"
                      className="border rounded-lg w-full p-2 mt-1"
                      placeholder="Enter PAN number"
                      name="panNo"
                      value={formData.panNo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Aadhar No</label>
                    <input
                      type="text"
                      className="border rounded-lg w-full p-2 mt-1"
                      placeholder="Enter Aadhar number"
                      name="aadharNo"
                      value={formData.aadharNo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Right side photo upload */}
                <div className="flex flex-col items-center justify-start">
                  <div className="w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden">
                    {photo ? (
                      <img src={photo} alt="Uploaded" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-400 text-sm">Upload Photo</span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="mt-3 text-sm"
                    name="profilePhoto"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Submit
                </button>
              </div>

            </form>
          </>
        ) : (
          <p className="text-green-600 font-medium text-center mt-4 text-lg">
            ✅ Bank details already submitted!
          </p>
        )}
      </div>
    </div>
  );
};

export default BankAccountDetails;
