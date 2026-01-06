import React from "react";

const TermsConditions = () => {
  return (
    <div className="bg-gray-50">
      {/* Main Content */}
      <main className="mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg p-10 animate-fadeIn">
          {/* Last Updated Badge */}
          <div className="bg-emerald-50 text-emerald-600 px-6 py-3 rounded-lg mb-8 font-semibold">
            Last Updated: January 6, 2026
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-emerald-600 mb-6 pb-4 border-b-4 border-emerald-100">
            Terms & Conditions
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Welcome to RightAway. By accessing and using our platform, you agree
            to be bound by these Terms and Conditions. Please read them
            carefully before using our services.
          </p>

          {/* Section 1 */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center">
              <span className="w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-400 rounded mr-3"></span>
              Acceptance of Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              By creating an account or using RightAway, you acknowledge that
              you have read, understood, and agree to these terms. If you do not
              agree, please discontinue use of our platform immediately.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center">
              <span className="w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-400 rounded mr-3"></span>
              Account Responsibilities
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              When you create an account with RightAway:
            </p>
            <ul className="list-disc ml-8 space-y-3 text-gray-600">
              <li>You must provide accurate and complete information</li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account credentials
              </li>
              <li>
                You must be at least 18 years old or have parental consent
              </li>
              <li>
                You agree to notify us immediately of any unauthorized access
              </li>
              <li>
                You are responsible for all activities that occur under your
                account
              </li>
            </ul>
          </div>

          {/* Highlight Box */}
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-lg my-8">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-emerald-600">Important:</strong> RightAway
              reserves the right to suspend or terminate accounts that violate
              these terms or engage in fraudulent activities.
            </p>
          </div>

          {/* Section 3 */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center">
              <span className="w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-400 rounded mr-3"></span>
              Orders and Payments
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              All orders placed through RightAway are subject to:
            </p>
            <ul className="list-disc ml-8 space-y-3 text-gray-600">
              <li>Product availability and acceptance by us</li>
              <li>Accurate pricing displayed at the time of purchase</li>
              <li>Payment verification and processing</li>
              <li>Delivery to the address you provide</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              We reserve the right to refuse or cancel orders at our discretion,
              including cases of pricing errors, suspected fraud, or product
              unavailability.
            </p>
          </div>

          {/* Section 4 */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center">
              <span className="w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-400 rounded mr-3"></span>
              Shipping and Delivery
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We strive to deliver products within the estimated timeframe.
              However:
            </p>
            <ul className="list-disc ml-8 space-y-3 text-gray-600">
              <li>Delivery times are estimates and not guaranteed</li>
              <li>Risk of loss transfers to you upon delivery</li>
              <li>You must inspect products upon receipt</li>
              <li>
                Delays due to circumstances beyond our control are not our
                responsibility
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center">
              <span className="w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-400 rounded mr-3"></span>
              Returns and Refunds
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our return policy allows:
            </p>
            <ul className="list-disc ml-8 space-y-3 text-gray-600">
              <li>Returns within 30 days of delivery for most products</li>
              <li>Products must be unused and in original packaging</li>
              <li>Refunds processed within 7-10 business days</li>
              <li>Some items may be non-returnable (specified at purchase)</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center">
              <span className="w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-400 rounded mr-3"></span>
              User Conduct
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc ml-8 space-y-3 text-gray-600">
              <li>Use the platform for any illegal or unauthorized purpose</li>
              <li>Interfere with or disrupt the platform's functionality</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Post false, misleading, or defamatory content</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Engage in any form of harassment or abuse</li>
            </ul>
          </div>

          {/* Section 7 */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center">
              <span className="w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-400 rounded mr-3"></span>
              Intellectual Property
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All content on RightAway, including text, graphics, logos, and
              software, is the property of RightAway or its licensors and is
              protected by copyright and trademark laws. Unauthorized use is
              strictly prohibited.
            </p>
          </div>

          {/* Section 8 */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center">
              <span className="w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-400 rounded mr-3"></span>
              Limitation of Liability
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To the fullest extent permitted by law, RightAway shall not be
              liable for any indirect, incidental, special, or consequential
              damages arising from your use of the platform or purchase of
              products.
            </p>
          </div>

          {/* Highlight Box */}
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-lg my-8">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-emerald-600">Maximum Liability:</strong>{" "}
              Our total liability for any claim shall not exceed the amount you
              paid for the product or service in question.
            </p>
          </div>

          {/* Section 9 */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center">
              <span className="w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-400 rounded mr-3"></span>
              Modifications to Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these Terms and Conditions at any
              time. Changes will be effective immediately upon posting. Your
              continued use of the platform constitutes acceptance of the
              modified terms.
            </p>
          </div>

          {/* Section 10 */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center">
              <span className="w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-400 rounded mr-3"></span>
              Governing Law
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms and Conditions are governed by and construed in
              accordance with the laws of Florida, United States, without regard
              to its conflict of law provisions.
            </p>
          </div>

          {/* Contact Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center">
              <span className="w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-400 rounded mr-3"></span>
              Contact Information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              For questions regarding these Terms and Conditions, please contact
              us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg space-y-2">
              <p className="text-gray-700">
                <strong className="text-emerald-600">Email:</strong>{" "}
                support@rightaway.com
              </p>
              <p className="text-gray-700">
                <strong className="text-emerald-600">Phone:</strong>{" "}
                1-800-RIGHT-WAY
              </p>
              <p className="text-gray-700">
                <strong className="text-emerald-600">Address:</strong> RightAway
                Inc., Florida, USA
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

export default TermsConditions;
