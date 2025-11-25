"use client";
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-12 animate-fadeIn">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
        <div className=" flex items-center justify-center">
          <h2 className="text-center text-2xl jim-nightshade-regular glow-title sm:text-3xl lg:text-4xl font-bold uppercase text-white tracking-wider animate-slideDown">
            Let&apos;s Connect
          </h2>
        </div>

        <p
          className="text-center glass-antiqua-regular text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8 animate-slideDown"
          style={{ animationDelay: "0.1s" }}
        >
          Get in touch for collaborations or inquiries
        </p>

        <div onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="animate-slideUp" style={{ animationDelay: "0.2s" }}>
              <label className=" glass-antiqua-regular block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full glass-antiqua-regular px-4 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 text-white placeholder-gray-500 transition-all duration-200 hover:bg-gray-800/70"
                placeholder="Your Name"
              />
            </div>

            <div className="animate-slideUp" style={{ animationDelay: "0.3s" }}>
              <label className=" glass-antiqua-regular block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full glass-antiqua-regular px-4 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 text-white placeholder-gray-500 transition-all duration-200 hover:bg-gray-800/70"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="animate-slideUp" style={{ animationDelay: "0.4s" }}>
            <label className="block glass-antiqua-regular text-xs sm:text-sm font-medium text-gray-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full glass-antiqua-regular px-4 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 text-white placeholder-gray-500 transition-all duration-200 hover:bg-gray-800/70"
              placeholder="What's this about?"
            />
          </div>

          {/* Message */}
          <div className="animate-slideUp" style={{ animationDelay: "0.5s" }}>
            <label className="block text-xs glass-antiqua-regular sm:text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              className="w-full glass-antiqua-regular px-4 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 text-white placeholder-gray-500 transition-all duration-200 hover:bg-gray-800/70 resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          {/* Submit Button */}
          <div
            className="pt-2 animate-slideUp"
            style={{ animationDelay: "0.6s" }}
          >
            <button
              onClick={(e) => handleSubmit(e as any)}
              disabled={isSubmitting}
              className="button-40 w-full glass-antiqua-regular  cursor-pointer"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 glass-antiqua-regular border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </div>

          {/* Success Message */}
          {submitStatus === "success" && (
            <div className="p-4 aubrey-regular bg-green-500/20  border border-green-500/50 rounded-lg text-green-400 text-xs sm:text-sm text-center animate-slideUp">
              ✓ Message sent successfully!
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        @media (max-width: 640px) {
          input,
          textarea {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactForm;
