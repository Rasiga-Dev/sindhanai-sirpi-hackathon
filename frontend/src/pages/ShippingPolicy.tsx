import React from "react";

export const ShippingPolicy: React.FC = () => {
  return (
    <main className="bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <header className="px-6 py-8 border-b">
          <h1 className="text-3xl font-semibold text-gray-800">Shipping &amp; Delivery Policy</h1>
          <p className="mt-2 text-gray-600">
            Clear and transparent shipping information for any physical items or merchandise associated with Sindhanai Sirpi events.
          </p>
        </header>

        {/* Content */}
        <div className="px-6 py-8 space-y-8">
          {/* Top features */}
          <section className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-4">
              <svg className="w-10 h-10 text-indigo-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7h13v8H3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 7l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <h3 className="font-medium text-gray-800">When Shipping Applies</h3>
                <p className="text-gray-600 mt-1">
                  Shipping is applicable only for paid physical items such as event kits, merchandise, or printed certificates. Digital-only registrations have no shipping charges.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <svg className="w-10 h-10 text-indigo-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <h3 className="font-medium text-gray-800">Processing Time</h3>
                <p className="text-gray-600 mt-1">
                  Orders are processed within <strong>3–5 business days</strong> after payment confirmation. Processing may take longer during high-demand periods.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <svg className="w-10 h-10 text-indigo-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7h18v10H3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <h3 className="font-medium text-gray-800">Delivery Estimates</h3>
                <p className="text-gray-600 mt-1">
                  Delivery times vary by courier and destination; typical domestic deliveries take <strong>5–12 business days</strong>. International deliveries may take longer.
                </p>
              </div>
            </div>
          </section>

          {/* Charges */}
          <section className="bg-gray-50 p-6 rounded-lg border">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Shipping Charges &amp; Taxes</h2>
            <p className="text-gray-600 mb-3">
              Shipping charges (if applicable) are calculated at checkout based on weight, dimensions, and delivery address. All prices displayed at checkout include applicable taxes unless stated otherwise.
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Free shipping:</strong> We may offer free shipping promotions for select events or orders above a specified value.</li>
              <li><strong>Tax & duties:</strong> International orders may incur import duties or taxes charged by the destination country; the recipient is responsible for these charges.</li>
            </ul>
          </section>

          {/* Lost/Damaged */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Lost, Damaged or Incorrect Items</h2>
            <p className="text-gray-600 mb-3">
              If an item is damaged, lost, or you receive the wrong item, please contact us within <strong>7 days</strong> of delivery with photos and order details. We will investigate and offer a replacement or refund where appropriate.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded">
                <h3 className="font-medium">How to Report</h3>
                <ol className="list-decimal list-inside text-gray-600 ml-4 mt-2 space-y-2">
                  <li>Email <a href="mailto:sindhanaisirpi01@gmail.com" className="text-indigo-600">sindhanaisirpi01@gmail.com</a> with order ID and photos.</li>
                  <li>Our support team will acknowledge within 48 hours and start an investigation.</li>
                  <li>If approved, we will ship a replacement or process a refund.</li>
                </ol>
              </div>

              <div className="p-4 border rounded">
                <h3 className="font-medium">Carrier Claims</h3>
                <p className="text-gray-600">For lost items, we coordinate with the courier and file claims when applicable. Carrier investigations can take multiple business days. Keep order and tracking details handy.</p>
              </div>
            </div>
          </section>

          {/* Returns */}
          <section className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Returns &amp; Refunds for Shipped Items</h2>
            <p className="text-gray-600 mb-3">Returns are accepted only for damaged items or incorrect fulfillment. If eligible, refunds will be issued to the original payment method after inspection. Gateway fees may be deducted where applicable.</p>
            <p className="text-gray-600"><strong>Note:</strong> Standard refund processing time is 7–14 business days after approval.</p>
          </section>

          {/* Not applicable */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Not Applicable</h2>
            <p className="text-gray-600">If you do not purchase physical items (most registrations), this policy does not apply. Your registration remains digital and will not incur shipping charges.</p>
          </section>

          {/* CTA */}
          <section className="p-6 bg-indigo-50 rounded-lg border">
            <h2 className="text-lg font-semibold text-indigo-800 mb-2">Still have questions?</h2>
            <p className="text-gray-600 mb-4">Contact our support team — we reply within 48 hours.</p>
            <a href="mailto:support@sindhanaisirpihackathon.com" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded">Email Support</a>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">FAQs</h2>
            <div className="space-y-3">
              <div className="p-4 border rounded">
                <p className="font-medium">Q: How long will delivery take?</p>
                <p className="text-gray-600 mt-1">A: Domestic: 5–12 business days. International: varies by country.</p>
              </div>

              <div className="p-4 border rounded">
                <p className="font-medium">Q: Will I get tracking information?</p>
                <p className="text-gray-600 mt-1">A: Yes — tracking details will be emailed once the order ships.</p>
              </div>

              <div className="p-4 border rounded">
                <p className="font-medium">Q: Who pays customs duties?</p>
                <p className="text-gray-600 mt-1">A: Recipient is responsible for any local customs duties or import taxes.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ShippingPolicy;
