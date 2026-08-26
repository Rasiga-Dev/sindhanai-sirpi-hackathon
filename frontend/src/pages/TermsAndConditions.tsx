import React from "react";

export const TermsAndConditions: React.FC = () => {
    return (
        <main className="max-w-4xl mx-auto p-6 md:p-12 bg-white rounded-lg shadow-lg border">
            <h1 className="text-4xl font-bold text-red-800 mb-6">Terms & Conditions</h1>

            <section className="prose prose-lg text-gray-700">
                <p>
                    Welcome to <span className="font-medium text-gray-900">Sindhanai Sirpi Hackathon</span>. 
                    By accessing our website and registering for events, you agree to comply with 
                    these Terms and Conditions. Please read them carefully.
                </p>

                <h2 className="text-2xl font-semibold mt-6 text-gray-800">1. Registration</h2>
                <p>
                    All participants must provide <span className="font-medium">accurate and complete information</span> 
                    during registration. The organisers reserve the right to refuse, suspend, or cancel 
                    registrations at their discretion if false information is provided.
                </p>

                <h2 className="text-2xl font-semibold mt-6 text-gray-800">2. Event Conduct</h2>
                <p>
                    Participants are required to follow the event’s{" "}
                    <span className="font-medium">Code of Conduct</span>. Any abusive, offensive, or 
                    disruptive behaviour may result in immediate removal from the event without a refund.
                </p>

                <h2 className="text-2xl font-semibold mt-6 text-gray-800">3. Intellectual Property</h2>
                <p>
                    Participants retain ownership of their{" "}
                    <span className="font-medium">ideas, code, and submissions</span> unless otherwise agreed. 
                    By participating, you grant the organisers a{" "}
                    <span className="font-medium">non-exclusive, royalty-free license</span> to use submissions 
                    for promotional and educational purposes.
                </p>

                <h2 className="text-2xl font-semibold mt-6 text-gray-800">4. Liability</h2>
                <p>
                    The organisers are not responsible for{" "}
                    <span className="font-medium">personal injury, loss, or damages</span> arising from 
                    participation, except as required by applicable law. Participants are responsible for 
                    their own devices, internet connection, and safety during the event.
                </p>

                <h2 className="text-2xl font-semibold mt-6 text-gray-800">5. Changes to Terms</h2>
                <p>
                    The organisers may update or revise these Terms at any time. Participants will be notified 
                    of significant changes via the{" "}
                    <span className="font-medium">website</span> or{" "}
                    <span className="font-medium">registered email address</span>.
                </p>

                <p className="mt-6 text-gray-600">Last updated: April 16, 2025</p>
            </section>
        </main>
    );
};
export default TermsAndConditions;