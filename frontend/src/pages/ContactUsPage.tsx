import React, { useState } from "react";

type FormState = {
    name: string;
    email: string;
    message: string;
    phone?: string;
};

export const ContactUsPage: React.FC = () => {
    const [form, setForm] = useState<FormState>({ name: "", email: "", message: "", phone: "" });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    };

    const validate = (): string | null => {
        if (!form.name.trim()) return "Please enter your name.";
        if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
        if (!form.message.trim()) return "Please enter your message.";
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);
        const err = validate();
        if (err) {
            setStatus({ ok: false, msg: err });
            return;
        }
        setLoading(true);
        try {
            // Placeholder: replace with your actual endpoint (e.g., /api/contact)
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setStatus({ ok: true, msg: "Message sent — we will reply within 48 hours." });
                setForm({ name: "", email: "", message: "", phone: "" });
            } else {
                const data = await res.json().catch(() => ({}));
                setStatus({ ok: false, msg: data?.error || "Unable to send message. Try again later." });
            }
        } catch (err) {
            setStatus({ ok: false, msg: "Network error — please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <header className="px-6 py-8 border-b">
                        <h1 className="text-3xl font-semibold text-gray-800">Contact Us</h1>
                        <p className="mt-2 text-gray-600">
                            Questions about registration, payments or the event? Send us a message or use the contact details below — we usually respond within 48 hours.
                        </p>
                    </header>

                    <div className="grid md:grid-cols-2 gap-6 p-6">
                        {/* Left column: Contact cards + map */}
                        <div className="space-y-4">
                            <div className="p-5 border rounded-lg bg-gray-50">
                                <h3 className="font-medium text-gray-800">General</h3>
                                <p className="text-sm text-gray-600 mt-2">
                                    Email:{" "}
                                    <a href="mailto:info@sindhanaisirpihackathon.com" className="text-indigo-600 hover:underline">
                                        sindhanaisirpi01@gmail.com
                                    </a>
                                </p>
                                <p className="text-sm text-gray-600">Phone: <a href="tel:+91 73582218282" className="text-indigo-600 hover:underline">+91 7358218282</a></p>
                            </div>

                            <div className="p-5 border rounded-lg bg-gray-50">
                                <h3 className="font-medium text-gray-800">Payments & Refunds</h3>
                                <p className="text-sm text-gray-600 mt-2">
                                    Email:{" "}
                                    <a href="mailto:payments@sindhanaisirpihackathon.com" className="text-indigo-600 hover:underline">
                                        sindhanaisipi01@gmail.com
                                    </a>
                                </p>
                                <p className="text-sm text-gray-600">Support Response Time: <strong>48 hours</strong></p>
                            </div>

                            <div className="p-5 border rounded-lg bg-gray-50">
                                <h3 className="font-medium text-gray-800">Address</h3>
                                <p className="text-sm text-gray-600 mt-2">Vosa Tech Team (Sindhanai Sirpi Hackathon)<br />Online Event / No physical office</p>
                                <p className="text-sm text-gray-600 mt-2"><strong>Office hours:</strong> Mon–Fri, 9:30 AM – 6:00 PM IST</p>
                            </div>

                            {/* Optional: embed map (uncomment if you want) */}
                            {/* <div className="mt-2 border rounded overflow-hidden">
                <iframe
                  title="office-map"
                  src="https://www.google.com/maps/embed?pb=!1m18!...your-embed..."
                  className="w-full h-48"
                  loading="lazy"
                />
              </div> */}
                        </div>

                        {/* Right column: Form */}
                        <div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {status && (
                                    <div
                                        role="status"
                                        className={`p-3 rounded text-sm ${status.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
                                    >
                                        {status.msg}
                                    </div>
                                )}

                                <label className="block">
                                    <span className="text-sm font-medium text-gray-700">Your name</span>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded border-gray-200 shadow-sm p-2"
                                        type="text"
                                        placeholder="Your name"
                                        aria-required
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-gray-700">Email</span>
                                    <input
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded border-gray-200 shadow-sm p-2"
                                        type="email"
                                        placeholder="you@example.com"
                                        aria-required
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-gray-700">Phone (optional)</span>
                                    <input
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded border-gray-200 shadow-sm p-2"
                                        type="tel"
                                        placeholder="+91 9xxxxxxxxx"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-gray-700">Message</span>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded border-gray-200 shadow-sm p-2"
                                        rows={5}
                                        placeholder="How can we help?"
                                        aria-required
                                    />
                                </label>

                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                                        disabled={loading}
                                        aria-disabled={loading}
                                    >
                                        {loading ? "Sending..." : "Send Message"}
                                    </button>

                                    <p className="text-xs text-gray-500">We respect your privacy — by sending you agree to our <a href="/privacy-policy" className="text-indigo-600 hover:underline">Privacy Policy</a>.</p>
                                </div>
                            </form>

                            <div className="mt-6 text-sm text-gray-600">
                                <p><strong>Alternative contact:</strong> For urgent payment issues email <a href="mailto:sindhanaisirpi01@gmail.com" className="text-indigo-600 hover:underline">sindhanaisirpi01@gmail.com</a>.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default ContactUsPage;
