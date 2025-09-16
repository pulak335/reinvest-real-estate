'use client';
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Please read these terms carefully before using our investment platform and services.
          </p>
          <p className="text-sm opacity-75 mt-4">
            Last updated: January 2024
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            
            {/* Introduction */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Agreement to Terms</h2>
              <p className="text-gray-600 mb-4">
                These Terms of Service (&apos;Terms&apos;) govern your use of Revest&apos;s website and investment services (&apos;Services&apos;) operated by Revest (&apos;we,&apos; &apos;our,&apos; or &apos;us&apos;).
              </p>
              <p className="text-gray-600 mb-4">
                By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access our Services.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-yellow-800">
                  <strong>Important:</strong> These Terms contain important information about your legal rights, remedies, and obligations. Please read them carefully.
                </p>
              </div>
            </div>

            {/* Eligibility */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Eligibility</h2>
              <p className="text-gray-600 mb-4">
                To use our Services, you must:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Be at least 18 years of age</li>
                <li>Have the legal capacity to enter into binding agreements</li>
                <li>Not be prohibited from using our Services under applicable laws</li>
                <li>Provide accurate and complete information during registration</li>
                <li>Maintain the security of your account credentials</li>
                <li>Meet any additional eligibility requirements for specific investment products</li>
              </ul>
            </div>

            {/* Account Registration */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Registration and Security</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Account Creation</h3>
              <p className="text-gray-600 mb-4">
                To access certain features of our Services, you must create an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information as necessary</li>
                <li>Keep your login credentials confidential</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Identity Verification</h3>
              <p className="text-gray-600 mb-4">
                We may require identity verification to comply with regulatory requirements. This may include providing government-issued identification and other documentation.
              </p>
            </div>

            {/* Investment Services */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Investment Services</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Nature of Services</h3>
              <p className="text-gray-600 mb-4">
                Revest provides a platform for real estate investment opportunities. Our Services include:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Access to curated real estate investment opportunities</li>
                <li>Investment management and reporting tools</li>
                <li>Educational resources and market insights</li>
                <li>Customer support and account management</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Investment Risks</h3>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <p className="text-red-800 mb-2">
                  <strong>Risk Warning:</strong> All investments carry risk, including the potential loss of principal.
                </p>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  <li>Real estate investments are subject to market volatility</li>
                  <li>Past performance does not guarantee future results</li>
                  <li>Investments may be illiquid and difficult to sell</li>
                  <li>Economic factors may affect investment returns</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Investment Decisions</h3>
              <p className="text-gray-600 mb-4">
                You acknowledge that:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>All investment decisions are made at your own discretion</li>
                <li>We do not provide personalized investment advice</li>
                <li>You should consult with financial advisors before investing</li>
                <li>You have reviewed all relevant investment materials</li>
              </ul>
            </div>

            {/* Fees and Payments */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Fees and Payments</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Fees</h3>
              <p className="text-gray-600 mb-4">
                We may charge fees for our Services, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Platform fees for investment management</li>
                <li>Transaction fees for investment activities</li>
                <li>Administrative fees for account maintenance</li>
                <li>Performance fees based on investment returns</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Payment Terms</h3>
              <p className="text-gray-600 mb-4">
                All fees are clearly disclosed before you make any investment. Fees may be deducted from your account balance or investment returns as specified in the relevant investment documentation.
              </p>
            </div>

            {/* Prohibited Activities */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Prohibited Activities</h2>
              <p className="text-gray-600 mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Use our Services for any illegal or unauthorized purpose</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Interfere with or disrupt our Services or servers</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Transmit viruses, malware, or other harmful code</li>
                <li>Impersonate another person or entity</li>
                <li>Engage in fraudulent or deceptive practices</li>
                <li>Manipulate or attempt to manipulate investment prices</li>
                <li>Share your account credentials with others</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Content</h3>
              <p className="text-gray-600 mb-4">
                All content on our platform, including text, graphics, logos, software, and data, is owned by Revest or our licensors and is protected by intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Limited License</h3>
              <p className="text-gray-600 mb-4">
                We grant you a limited, non-exclusive, non-transferable license to access and use our Services for their intended purpose. This license does not include the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Reproduce, distribute, or publicly display our content</li>
                <li>Create derivative works based on our content</li>
                <li>Reverse engineer or decompile our software</li>
                <li>Remove or modify any proprietary notices</li>
              </ul>
            </div>

            {/* Privacy and Data */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Privacy and Data Protection</h2>
              <p className="text-gray-600 mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              <p className="text-gray-600 mb-4">
                By using our Services, you consent to the collection, use, and disclosure of your information as described in our Privacy Policy.
              </p>
            </div>

            {/* Disclaimers */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Disclaimers</h2>
              
              <div className="bg-gray-50 border border-gray-200 p-4 mb-4">
                <p className="text-gray-700 mb-2">
                  <strong>AS IS BASIS:</strong> Our Services are provided &apos;as is&apos; and &apos;as available&apos; without warranties of any kind, either express or implied.
                </p>
              </div>

              <p className="text-gray-600 mb-4">
                We disclaim all warranties, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Merchantability and fitness for a particular purpose</li>
                <li>Non-infringement of third-party rights</li>
                <li>Accuracy, completeness, or reliability of content</li>
                <li>Uninterrupted or error-free operation</li>
                <li>Security of data transmission</li>
              </ul>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Limitation of Liability</h2>
              
              <div className="bg-red-50 border border-red-200 p-4 mb-4">
                <p className="text-red-800 mb-2">
                  <strong>IMPORTANT LIMITATION:</strong> To the maximum extent permitted by law, Revest shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
                </p>
              </div>

              <p className="text-gray-600 mb-4">
                Our total liability to you for all claims arising from or relating to these Terms or our Services shall not exceed the amount you paid to us in the 12 months preceding the claim.
              </p>
            </div>

            {/* Indemnification */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Indemnification</h2>
              <p className="text-gray-600 mb-4">
                You agree to indemnify, defend, and hold harmless Revest and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Your use of our Services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any applicable laws</li>
                <li>Your infringement of third-party rights</li>
              </ul>
            </div>

            {/* Termination */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Termination</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Termination by You</h3>
              <p className="text-gray-600 mb-4">
                You may terminate your account at any time by contacting our customer support. Termination does not affect existing investments or obligations.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Termination by Us</h3>
              <p className="text-gray-600 mb-4">
                We may terminate or suspend your account immediately if you:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Violate these Terms</li>
                <li>Engage in fraudulent or illegal activities</li>
                <li>Fail to meet eligibility requirements</li>
                <li>Pose a risk to our platform or other users</li>
              </ul>
            </div>

            {/* Governing Law */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Governing Law and Dispute Resolution</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Governing Law</h3>
              <p className="text-gray-600 mb-4">
                These Terms are governed by and construed in accordance with the laws of the State of New York, without regard to conflict of law principles.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Dispute Resolution</h3>
              <p className="text-gray-600 mb-4">
                Any disputes arising from these Terms or our Services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to Terms</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on our website and updating the &apos;Last updated&apos; date.
              </p>
              <p className="text-gray-600 mb-4">
                Your continued use of our Services after any changes constitutes acceptance of the new Terms.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 mb-2"><strong>Email:</strong> legal@revest.com</p>
                <p className="text-gray-600 mb-2"><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p className="text-gray-600 mb-2"><strong>Address:</strong></p>
                <p className="text-gray-600 ml-4">
                  Revest Legal Department<br />
                  123 Investment Plaza, Suite 456<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>
            </div>

            {/* Severability */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Severability</h2>
              <p className="text-gray-600">
                If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions will continue to be valid and enforceable to the fullest extent permitted by law.
              </p>
            </div>

          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}