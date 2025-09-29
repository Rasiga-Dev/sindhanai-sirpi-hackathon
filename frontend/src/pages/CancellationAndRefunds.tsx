import React from "react";

export const CancellationAndRefunds: React.FC = () => {
    return (
        <main className="max-w-4xl mx-auto p-6 md:p-12 bg-white rounded-lg shadow-lg border">
            <h1 className="text-4xl font-bold text-red-800 mb-6">Cancellation & Refund Policy</h1>

            <section className="prose prose-lg text-gray-700">
                <p>
                    We understand that plans may change. Please review our cancellation
                    and refund terms carefully before registering for the event.
                </p>

                <h2 className="text-2xl font-semibold mt-6 text-gray-800">Participant Cancellations</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                        <strong>Full Refund (minus gateway charges):</strong> Cancellations made{" "}
                        <span className="font-medium text-gray-900">7 or more days</span> before the event.
                    </li>
                    <li>
                        <strong>50% Refund:</strong> Cancellations made{" "}
                        <span className="font-medium text-gray-900">3–6 days</span> before the event.
                    </li>
                    <li>
                        <strong>No Refund:</strong> Cancellations made{" "}
                        <span className="font-medium text-gray-900">within 48 hours</span> of event start or no-shows.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 text-gray-800">Organizer Cancellation</h2>
                <p>
                    If the organisers cancel the event, participants will be offered a{" "}
                    <span className="font-medium text-gray-900">full refund</span> or a{" "}
                    <span className="font-medium text-gray-900">credit towards a future event</span>.  
                    Please note: We are not responsible for any travel or accommodation costs.
                </p>

                <h2 className="text-2xl font-semibold mt-6 text-gray-800">Refund Process</h2>
                <p>
                    Refunds are initiated to the{" "}
                    <span className="font-medium text-gray-900">original payment method</span> within{" "}
                    <span className="font-medium text-gray-900">7–14 business days</span> after approval.  
                    Applicable payment gateway charges may be deducted.
                </p>

                <h2 className="text-2xl font-semibold mt-6 text-gray-800">How to Request a Refund</h2>
                <ol className="list-decimal list-inside space-y-2">
                    <li>
                        Email us at{" "}
                        <a
                            href="mailto:payments@sindhanaisirpihackathon.com"
                            className="text-red-700 font-medium"
                        >
                            sindhanaisirpi01@gmail.com
                        </a>{" "}
                        with your <span className="font-medium">Registration ID</span> and reason for cancellation.
                    </li>
                    <li>
                        Our support team will acknowledge your request within{" "}
                        <span className="font-medium">48 hours</span> and process it if eligible.
                    </li>
                </ol>

                <p className="mt-6 text-gray-600">Last updated: April 16, 2025</p>
            </section>
        </main>
    );
};
