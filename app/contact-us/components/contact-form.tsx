import React from "react";

const ContactForm = () => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-12">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center uppercase text-white mb-6 sm:mb-8 tracking-wider">
          Let&apos;s Connect
        </h2>

        <form className="space-y-5 sm:space-y-6">
          {/* Name & Email - Stack on mobile, side-by-side on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 sm:py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 text-white placeholder-gray-500 transition-all duration-200"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2.5 sm:py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 text-white placeholder-gray-500 transition-all duration-200"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Subject
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 sm:py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 text-white placeholder-gray-500 transition-all duration-200"
              placeholder="What's this about?"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Message
            </label>
            <textarea
              rows={5}
              required
              className="w-full px-4 py-2.5 sm:py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 text-white placeholder-gray-500 transition-all duration-200 resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-base sm:text-lg rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-100 shadow-lg"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
