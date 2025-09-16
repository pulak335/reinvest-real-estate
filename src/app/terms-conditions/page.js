'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function TermsConditionsPage() {
  const [activeSection, setActiveSection] = useState('acceptance');

  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms', icon: '📋' },
    { id: 'definitions', title: 'Definitions', icon: '📖' },
    { id: 'eligibility', title: 'Eligibility', icon: '✅' },
    { id: 'account', title: 'Account Registration', icon: '👤' },
    { id: 'services', title: 'Platform Services', icon: '🏢' },
    { id: 'investments', title: 'Investment Terms', icon: '💰' },
    { id: 'fees', title: 'Fees & Payments', icon: '💳' },
    { id: 'risks', title: 'Risk Disclosures', icon: '⚠️' },
    { id: 'prohibited', title: 'Prohibited Activities', icon: '🚫' },
    { id: 'intellectual', title: 'Intellectual Property', icon: '©️' },
    { id: 'privacy', title: 'Privacy & Data', icon: '🔒' },
    { id: 'termination', title: 'Termination', icon: '🔚' },
    { id: 'liability', title: 'Limitation of Liability', icon: '⚖️' },
    { id: 'governing', title: 'Governing Law', icon: '🏛️' },
    { id: 'changes', title: 'Changes to Terms', icon: '🔄' },
    { id: 'contact', title: 'Contact Information', icon: '📞' }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Please read these terms carefully before using our platform
            </p>
            <div className="mt-6 text-sm text-blue-200">
              Last Updated: January 2024
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 flex items-center ${
                      activeSection === section.id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{section.icon}</span>
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-lg p-8 space-y-12">
              
              {/* Acceptance of Terms */}
              <section id="acceptance">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📋</span>
                  1. Acceptance of Terms
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    By accessing or using our real estate investment platform (&apos;Platform&apos;), you agree to be bound by these Terms and Conditions (&apos;Terms&apos;). If you do not agree to these Terms, you may not use our Platform.
                  </p>
                  <p>
                    These Terms constitute a legally binding agreement between you and our company. Your use of the Platform constitutes acceptance of these Terms as they may be modified from time to time.
                  </p>
                </div>
              </section>

              {/* Definitions */}
              <section id="definitions">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📖</span>
                  2. Definitions
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <ul className="space-y-2">
                    <li><strong>&apos;Platform&apos;</strong> - Our real estate investment website and mobile applications</li>
                    <li><strong>&apos;User&apos;</strong> - Any person who accesses or uses our Platform</li>
                    <li><strong>&apos;Investment&apos;</strong> - Any financial commitment made through our Platform</li>
                    <li><strong>&apos;Property&apos;</strong> - Real estate assets available for investment on our Platform</li>
                    <li><strong>&apos;Services&apos;</strong> - All services provided through our Platform</li>
                    <li><strong>&apos;Account&apos;</strong> - Your registered user account on our Platform</li>
                  </ul>
                </div>
              </section>

              {/* Eligibility */}
              <section id="eligibility">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">✅</span>
                  3. Eligibility
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">To use our Platform, you must:</p>
                  <ul className="space-y-2 mb-4">
                    <li>• Be at least 18 years of age</li>
                    <li>• Have the legal capacity to enter into binding contracts</li>
                    <li>• Provide accurate and complete information during registration</li>
                    <li>• Comply with all applicable laws and regulations</li>
                    <li>• Meet any additional eligibility requirements for specific investments</li>
                  </ul>
                  <p>
                    We reserve the right to verify your eligibility and may request additional documentation at any time.
                  </p>
                </div>
              </section>

              {/* Account Registration */}
              <section id="account">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">👤</span>
                  4. Account Registration
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    To access certain features of our Platform, you must create an account. You agree to:
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li>• Provide accurate, current, and complete information</li>
                    <li>• Maintain and update your information as necessary</li>
                    <li>• Keep your login credentials secure and confidential</li>
                    <li>• Notify us immediately of any unauthorized use of your account</li>
                    <li>• Accept responsibility for all activities under your account</li>
                  </ul>
                  <p>
                    We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent activity.
                  </p>
                </div>
              </section>

              {/* Platform Services */}
              <section id="services">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🏢</span>
                  5. Platform Services
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">Our Platform provides:</p>
                  <ul className="space-y-2 mb-4">
                    <li>• Access to real estate investment opportunities</li>
                    <li>• Investment management tools and resources</li>
                    <li>• Property information and market data</li>
                    <li>• Portfolio tracking and reporting</li>
                    <li>• Educational content and market insights</li>
                  </ul>
                  <p>
                    We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time without prior notice.
                  </p>
                </div>
              </section>

              {/* Investment Terms */}
              <section id="investments">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">💰</span>
                  6. Investment Terms
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    All investments made through our Platform are subject to:
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li>• Minimum investment requirements</li>
                    <li>• Investment holding periods and liquidity restrictions</li>
                    <li>• Risk of partial or total loss of invested capital</li>
                    <li>• No guarantee of returns or profits</li>
                    <li>• Additional terms specific to each investment opportunity</li>
                  </ul>
                  <p>
                    You acknowledge that you have read and understood all investment-related risks and disclosures.
                  </p>
                </div>
              </section>

              {/* Fees & Payments */}
              <section id="fees">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">💳</span>
                  7. Fees & Payments
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    Our Platform may charge various fees including:
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li>• Platform usage fees</li>
                    <li>• Investment management fees</li>
                    <li>• Transaction processing fees</li>
                    <li>• Early withdrawal penalties</li>
                    <li>• Third-party service fees</li>
                  </ul>
                  <p>
                    All fees will be clearly disclosed before you complete any transaction. Fees are generally non-refundable.
                  </p>
                </div>
              </section>

              {/* Risk Disclosures */}
              <section id="risks">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">⚠️</span>
                  8. Risk Disclosures
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    Real estate investments involve substantial risks, including:
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li>• Market volatility and economic downturns</li>
                    <li>• Property-specific risks and maintenance costs</li>
                    <li>• Liquidity constraints and holding period requirements</li>
                    <li>• Regulatory changes and tax implications</li>
                    <li>• Platform and technology risks</li>
                  </ul>
                  <p>
                    For detailed risk information, please review our <a href="/our-risks" className="text-blue-600 hover:underline">Risk Disclosures</a> page.
                  </p>
                </div>
              </section>

              {/* Prohibited Activities */}
              <section id="prohibited">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🚫</span>
                  9. Prohibited Activities
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">You may not:</p>
                  <ul className="space-y-2 mb-4">
                    <li>• Use the Platform for any illegal or unauthorized purpose</li>
                    <li>• Attempt to gain unauthorized access to our systems</li>
                    <li>• Interfere with or disrupt the Platform&apos;s operation</li>
                    <li>• Provide false or misleading information</li>
                    <li>• Engage in fraudulent or deceptive practices</li>
                    <li>• Violate any applicable laws or regulations</li>
                  </ul>
                </div>
              </section>

              {/* Intellectual Property */}
              <section id="intellectual">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">©️</span>
                  10. Intellectual Property
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    All content, features, and functionality on our Platform are owned by us and are protected by copyright, trademark, and other intellectual property laws.
                  </p>
                  <p>
                    You may not reproduce, distribute, modify, or create derivative works of our content without our express written permission.
                  </p>
                </div>
              </section>

              {/* Privacy & Data */}
              <section id="privacy">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🔒</span>
                  11. Privacy & Data Protection
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    Your privacy is important to us. Our collection and use of personal information is governed by our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>.
                  </p>
                  <p>
                    By using our Platform, you consent to the collection, use, and disclosure of your information as described in our Privacy Policy.
                  </p>
                </div>
              </section>

              {/* Termination */}
              <section id="termination">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🔚</span>
                  12. Termination
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    We may terminate or suspend your account and access to our Platform at any time, with or without cause, and with or without notice.
                  </p>
                  <p>
                    You may terminate your account at any time by contacting us. Upon termination, your right to use the Platform will cease immediately.
                  </p>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section id="liability">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">⚖️</span>
                  13. Limitation of Liability
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses.
                  </p>
                  <p>
                    Our total liability to you for any claims arising from your use of the Platform shall not exceed the amount you have paid to us in the twelve months preceding the claim.
                  </p>
                </div>
              </section>

              {/* Governing Law */}
              <section id="governing">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🏛️</span>
                  14. Governing Law
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                  </p>
                  <p>
                    Any disputes arising from these Terms or your use of the Platform shall be resolved through binding arbitration or in the courts of [Your Jurisdiction].
                  </p>
                </div>
              </section>

              {/* Changes to Terms */}
              <section id="changes">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🔄</span>
                  15. Changes to Terms
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on our Platform and updating the &apos;Last Updated&apos; date.
                  </p>
                  <p>
                    Your continued use of the Platform after any changes constitutes acceptance of the new Terms.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section id="contact">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📞</span>
                  16. Contact Information
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    If you have any questions about these Terms, please contact us:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Email:</strong> legal@realestateinvestment.com</p>
                    <p><strong>Phone:</strong> 1-800-INVEST-1</p>
                    <p><strong>Address:</strong> 123 Investment Street, Finance City, FC 12345</p>
                    <p><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}