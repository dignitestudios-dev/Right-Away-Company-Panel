import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className=" bg-gray-50">
      {/* Main Content */}
      <main className=" mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg p-10 animate-fadeIn">
          {/* Last Updated Badge */}
          <div className="bg-emerald-50 text-emerald-600 px-6 py-3 rounded-lg mb-8 font-semibold">
            Last Updated: January 6, 2026
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-emerald-600 mb-6 pb-4 border-b-4 border-emerald-100">
            Privacy Policy
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            At RightAway, we are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy explains how we collect, use, and safeguard your data when
            you use our platform.
          </p>

          {/* Section 1 */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center">
              <span className="w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-400 rounded mr-3"></span>
              Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc ml-8 space-y-3 text-gray-600">
              <li>
                <strong className="text-emerald-600">
                  Account Information:
                </strong>{" "}
                Name, email address, phone number, and location details
              </li>
              <li>
                <strong className="text-emerald-600">Transaction Data:</strong>{" "}
                Order history, payment information, and shipping addresses
              </li>
              <li>
                <strong className="text-emerald-600">Usage Information:</strong>{" "}
                How you interact with our platform, including browsing patterns
                and preferences
              </li>
              <li>
                <strong className="text-emerald-600">
                  Device Information:
                </strong>{" "}
                IP address, browser type, operating system, and device
                identifiers
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center">
              <span className="w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-400 rounded mr-3"></span>
              How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Your information is used to provide and improve our services:
            </p>
            <ul className="list-disc ml-8 space-y-3 text-gray-600">
              <li>Process and fulfill your orders efficiently</li>
              <li>Communicate with you about your account and orders</li>
              <li>Personalize your shopping experience</li>
              <li>Improve our products and services</li>
              <li>Prevent fraud and enhance security</li>
              <li>Send promotional materials (with your consent)</li>
            </ul>
          </div>

          {/* Highlight Box */}
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-lg my-8">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-emerald-600">
                Your Privacy Matters:
              </strong>{" "}
              We will never sell your personal information to third parties.
              Your data is used solely to enhance your experience on RightAway.
            </p>
          </div>

          {/* Section 3 */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center">
              <span className="w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-400 rounded mr-3"></span>
              Data Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We implement industry-standard security measures to protect your
              information, including encryption, secure servers, and regular
              security audits. However, no method of transmission over the
              internet is 100% secure, and we cannot guarantee absolute
              security.
            </p>
          </div>

          {/* Section 4 */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center">
              <span className="w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-400 rounded mr-3"></span>
              Information Sharing
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc ml-8 space-y-3 text-gray-600">
              <li>
                <strong className="text-emerald-600">Service Providers:</strong>{" "}
                Third-party companies that help us operate our business
              </li>
              <li>
                <strong className="text-emerald-600">
                  Payment Processors:
                </strong>{" "}
                To process your transactions securely
              </li>
              <li>
                <strong className="text-emerald-600">Shipping Partners:</strong>{" "}
                To deliver your orders
              </li>
              <li>
                <strong className="text-emerald-600">Legal Authorities:</strong>{" "}
                When required by law or to protect our rights
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center">
              <span className="w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-400 rounded mr-3"></span>
              Your Rights
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc ml-8 space-y-3 text-gray-600">
              <li>Access and review your personal information</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your account and data</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data in a portable format</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center">
              <span className="w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-400 rounded mr-3"></span>
              Cookies and Tracking
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We use cookies and similar technologies to enhance your
              experience, analyze site usage, and deliver personalized content.
              You can control cookie preferences through your browser settings.
            </p>
          </div>

          {/* Contact Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center">
              <span className="w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-400 rounded mr-3"></span>
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have questions about this Privacy Policy or your personal
              information, please contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                <strong className="text-emerald-600">Email:</strong>{" "}
                privacy@rightaway.com
              </p>
              <p className="text-gray-700">
                <strong className="text-emerald-600">Phone:</strong>{" "}
                1-800-RIGHT-WAY
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2026 RightAway. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
