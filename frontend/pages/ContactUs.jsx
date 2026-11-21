
import { useState } from "react";
import { Link } from "react-router-dom";

// Reusable SVG Icon Component
function Icon({ name, size = 20, className = "" }) {
  const icons = {
    mail: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </>
    ),
    phone: (
      <>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.14 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7A2 2 0 0 1 22 16.92z" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
    message: (
      <>
        <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
      </>
    ),
    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    instagram: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    facebook: (
      <path d="M15 21v-8h3l.5-4H15V7c0-1.2.4-2 2-2h2V1.4A26 26 0 0 0 16 1c-3 0-5 1.8-5 5v3H8v4h3v8z" />
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {icons[name]}
    </svg>
  );
}

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Local submission only. Connect your backend here.
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactItems = [
    {
      icon: "mail",
      title: "Email Us",
      description: "We're happy to answer your questions.",
      detail: "Contact email coming soon",
    },
    {
      icon: "phone",
      title: "Call Us",
      description: "Talk to our support team.",
      detail: "Phone number coming soon",
    },
    {
      icon: "location",
      title: "Our Location",
      description: "Serving customers across the country.",
      detail: "Algeria",
    },
    {
      icon: "clock",
      title: "Customer Support",
      description: "We're here whenever you need us.",
      detail: "Ready to help",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7faf8] px-4 py-10 sm:px-6 lg:px-10">

      <div className="mx-auto max-w-7xl">

        {/* PAGE INTRO */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-[#00A86B] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#00A86B]" />
            We're Here For You
          </span>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-[#10251D] sm:text-5xl lg:text-6xl">
            Let's Start a
            <span className="text-[#00A86B]"> Conversation.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            Have a question, need help with an order, or want to know more
            about a product? We're always happy to hear from you.
          </p>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl lg:grid-cols-[0.85fr_1.15fr]">

          {/* LEFT SECTION */}
          <section className="relative flex min-h-[600px] flex-col justify-between overflow-hidden bg-[#002d22] p-7 text-white sm:p-10 lg:p-12">

            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border-[50px] border-white/5" />
            <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full border-[60px] border-[#00A86B]/10" />

            <div className="relative z-10">

              <Link
                to="/"
                className="inline-flex items-center rounded-xl bg-white px-4 py-3 text-2xl font-black tracking-tight text-[#002d22] shadow-lg"
              >
                DzShopi<span className="text-[#00A86B]">.</span>
              </Link>

              <div className="mt-20">
                <span className="text-xs font-bold uppercase tracking-[3px] text-[#50e6a1]">
                  Get In Touch
                </span>

                <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
                  We'd Love
                  <br />
                  To Hear
                  <br />
                  <span className="text-[#50e6a1]">From You.</span>
                </h2>

                <p className="mt-6 max-w-sm text-sm leading-7 text-gray-300">
                  Your feedback helps us improve. Send us your questions,
                  suggestions, or anything you'd like to share.
                </p>
              </div>

            </div>

            <div className="relative z-10 mt-14">

              <div className="mb-6 h-px w-full bg-white/15" />

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00A86B] text-white">
                  <Icon name="message" size={21} />
                </div>

                <div>
                  <p className="text-sm font-bold">Your voice matters</p>
                  <p className="mt-1 text-xs text-gray-400">
                    We're always listening.
                  </p>
                </div>
              </div>

              <p className="mt-8 text-xs text-gray-400">
                © {new Date().getFullYear()} DzShopi. All rights reserved.
              </p>

            </div>
          </section>

          {/* RIGHT SECTION */}
          <section className="px-6 py-10 sm:px-10 sm:py-12 lg:px-14">

            {/* CONTACT INFO */}
            <div className="grid gap-6 sm:grid-cols-2">

              {contactItems.map((item) => (
                <div
                  key={item.title}
                  className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-lg"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#00A86B] transition group-hover:bg-[#00A86B] group-hover:text-white">
                    <Icon name={item.icon} size={20} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-[#10251D]">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {item.description}
                    </p>

                    <p className="mt-2 break-words text-xs font-semibold text-[#00A86B]">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}

            </div>

            {/* DIVIDER */}
            <div className="my-9 h-px bg-gray-100" />

            {/* FORM HEADER */}
            <div className="mb-7">
              <span className="text-xs font-bold uppercase tracking-[2px] text-[#00A86B]">
                Send a Message
              </span>

              <h2 className="mt-2 text-2xl font-black text-[#10251D] sm:text-3xl">
                How Can We Help?
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Fill out the form below and tell us what's on your mind.
              </p>
            </div>

            {/* SUCCESS MESSAGE */}
            {submitted ? (
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-7 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#00A86B] shadow-sm">
                  <Icon name="check" size={32} />
                </div>

                <h3 className="mt-5 text-xl font-black text-[#10251D]">
                  Message Submitted!
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-600">
                  Your form was submitted locally. Connect it to your backend
                  to send your message to the DzShopi team.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-full bg-[#002d22] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#00A86B]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* NAME + EMAIL */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-xs font-bold text-gray-700">
                      Full Name <span className="text-[#00A86B]">*</span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-[#fbfdfc] px-4 py-3.5 text-sm text-[#10251D] outline-none transition placeholder:text-gray-400 focus:border-[#00A86B] focus:bg-white focus:ring-4 focus:ring-emerald-50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-gray-700">
                      Email Address <span className="text-[#00A86B]">*</span>
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-[#fbfdfc] px-4 py-3.5 text-sm text-[#10251D] outline-none transition placeholder:text-gray-400 focus:border-[#00A86B] focus:bg-white focus:ring-4 focus:ring-emerald-50"
                    />
                  </div>

                </div>

                {/* SUBJECT */}
                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-700">
                    Subject <span className="text-[#00A86B]">*</span>
                  </label>

                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-[#fbfdfc] px-4 py-3.5 text-sm text-gray-600 outline-none transition focus:border-[#00A86B] focus:bg-white focus:ring-4 focus:ring-emerald-50"
                  >
                    <option value="" disabled>
                      Choose a subject
                    </option>
                    <option value="Order Inquiry">Order Inquiry</option>
                    <option value="Product Information">Product Information</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Returns & Refunds">Returns & Refunds</option>
                    <option value="Payment Issue">Payment Issue</option>
                    <option value="Suggestion">Suggestion</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-700">
                    Your Message <span className="text-[#00A86B]">*</span>
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows={5}
                    required
                    className="w-full resize-none rounded-xl border border-gray-200 bg-[#fbfdfc] px-4 py-3.5 text-sm text-[#10251D] outline-none transition placeholder:text-gray-400 focus:border-[#00A86B] focus:bg-white focus:ring-4 focus:ring-emerald-50"
                  />
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#002d22] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-950/10 transition duration-300 hover:-translate-y-1 hover:bg-[#00A86B] hover:shadow-emerald-600/20 sm:w-auto"
                >
                  Send Message

                  <Icon
                    name="send"
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <p className="text-xs text-gray-400">
                  By submitting this form, you agree to be contacted about your request.
                </p>

              </form>
            )}

            {/* SOCIAL MEDIA */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6">

              <p className="text-xs font-semibold text-gray-500">
                Follow DzShopi on social media
              </p>

              <div className="flex items-center gap-3">

                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-[#00A86B] hover:text-white"
                >
                  <Icon name="instagram" size={18} />
                </a>

                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-[#00A86B] hover:text-white"
                >
                  <Icon name="facebook" size={18} />
                </a>

              </div>
            </div>

          </section>
        </div>
      </div>
    </main>
  );
}
