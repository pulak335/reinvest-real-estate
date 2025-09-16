'use client';
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What is Revest and how does it work?",
          answer: "Revest is a real estate investment platform that allows you to invest in premium properties with lower minimum investments. We curate high-quality real estate opportunities and make them accessible to individual investors through our digital platform."
        },
        {
          question: "How do I get started with investing?",
          answer: "Getting started is simple: 1) Create your account and complete identity verification, 2) Browse available investment opportunities, 3) Review property details and investment terms, 4) Make your investment, and 5) Track your portfolio through our dashboard."
        },
        {
          question: "What is the minimum investment amount?",
          answer: "Our minimum investment varies by property, typically starting from $1,000. This allows you to diversify your portfolio across multiple properties without requiring large capital commitments."
        },
        {
          question: "Do I need to be an accredited investor?",
          answer: "No, our platform is designed for both accredited and non-accredited investors. However, some exclusive opportunities may be limited to accredited investors due to regulatory requirements."
        }
      ]
    },
    {
      category: "Investment Process",
      questions: [
        {
          question: "How are properties selected and vetted?",
          answer: "Our team of real estate experts conducts thorough due diligence on every property, including market analysis, financial projections, property inspections, and legal reviews. We only select properties that meet our strict investment criteria."
        },
        {
          question: "What types of properties can I invest in?",
          answer: "We offer various property types including residential rentals, commercial real estate, mixed-use developments, and REITs. Each investment opportunity includes detailed information about the property type, location, and investment strategy."
        },
        {
          question: "How long are investment terms?",
          answer: "Investment terms vary by property, typically ranging from 2-7 years. Some investments may offer earlier exit opportunities, while others are designed for longer-term appreciation. All terms are clearly disclosed before investment."
        },
        {
          question: "Can I sell my investment before the term ends?",
          answer: "Most real estate investments are illiquid by nature. However, we're developing a secondary market feature that may allow investors to sell their shares to other platform users, subject to certain conditions and availability."
        }
      ]
    },
    {
      category: "Returns and Payments",
      questions: [
        {
          question: "How do I receive returns on my investments?",
          answer: "Returns are typically distributed quarterly or annually, depending on the specific investment. Distributions may include rental income, property appreciation, or a combination of both. All payments are made directly to your account."
        },
        {
          question: "What kind of returns can I expect?",
          answer: "Expected returns vary by property and investment type, typically ranging from 6-15% annually. However, all investments carry risk, and past performance doesn't guarantee future results. Each investment includes detailed projections and risk assessments."
        },
        {
          question: "Are there any fees involved?",
          answer: "Yes, we charge a platform fee (typically 1-2% annually) and may take a performance fee on profits above certain thresholds. All fees are clearly disclosed in the investment documentation before you invest."
        },
        {
          question: "How are taxes handled?",
          answer: "You'll receive tax documents (such as K-1s or 1099s) for your investments. We recommend consulting with a tax professional as real estate investments may have specific tax implications including depreciation benefits."
        }
      ]
    },
    {
      category: "Account Management",
      questions: [
        {
          question: "How do I track my investments?",
          answer: "Your investor dashboard provides real-time updates on all your investments, including performance metrics, distribution history, property updates, and portfolio analytics. You'll also receive regular reports via email."
        },
        {
          question: "Can I invest through my IRA or 401(k)?",
          answer: "Yes, we support self-directed IRA investments through qualified custodians. This allows you to invest in real estate using your retirement funds while maintaining tax advantages. Contact our support team for assistance with retirement account investments."
        },
        {
          question: "How do I update my account information?",
          answer: "You can update most account information through your profile settings. For sensitive changes like banking information or legal name changes, you may need to contact our support team and provide additional verification."
        },
        {
          question: "What if I forget my password?",
          answer: "Use the 'Forgot Password' link on the login page to reset your password. You'll receive an email with instructions to create a new password. For additional security, we recommend enabling two-factor authentication on your account."
        }
      ]
    },
    {
      category: "Security and Legal",
      questions: [
        {
          question: "How secure is my personal and financial information?",
          answer: "We use bank-level security measures including SSL encryption, secure data storage, regular security audits, and compliance with financial industry standards. Your personal and financial information is protected with the highest security protocols."
        },
        {
          question: "Is Revest regulated?",
          answer: "Yes, we operate under applicable securities regulations and work with licensed broker-dealers and registered investment advisors. Our platform complies with SEC regulations and state securities laws."
        },
        {
          question: "What happens if Revest goes out of business?",
          answer: "Your investments are held in separate legal entities (SPVs) that are independent of Revest's operations. Even if Revest ceased operations, your property investments would continue to be managed by qualified third-party managers."
        },
        {
          question: "How do I file a complaint or dispute?",
          answer: "We have a formal complaint resolution process. Contact our customer support team first, and if the issue isn't resolved, you can escalate to our compliance department. We also provide information about regulatory bodies where you can file complaints if needed."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What browsers are supported?",
          answer: "Our platform works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience and security."
        },
        {
          question: "Is there a mobile app?",
          answer: "Currently, we offer a mobile-responsive website that works well on smartphones and tablets. A dedicated mobile app is in development and will be available soon."
        },
        {
          question: "I'm having trouble accessing my account. What should I do?",
          answer: "First, try clearing your browser cache and cookies. If that doesn't work, check if you're using the correct email address and password. If you're still having issues, contact our technical support team for assistance."
        },
        {
          question: "How do I contact customer support?",
          answer: "You can reach our customer support team via email at support@revest.com, phone at +1 (555) 123-4567, or through the live chat feature on our website. Our support hours are Monday-Friday, 9 AM to 6 PM EST."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Find answers to common questions about real estate investing with Revest.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = `${categoryIndex}-${faqIndex}`;
                    const isOpen = openFAQ === globalIndex;
                    
                    return (
                      <div key={faqIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-800 pr-4">
                            {faq.question}
                          </span>
                          <svg
                            className={`w-5 h-5 text-gray-500 transform transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Our customer support team is here to help you with any questions about real estate investing.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Email Support */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Get detailed answers via email</p>
              <a href="mailto:support@revest.com" className="text-blue-600 hover:text-blue-700 font-medium">
                support@revest.com
              </a>
            </div>

            {/* Phone Support */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Speak with our team directly</p>
              <a href="tel:+15551234567" className="text-green-600 hover:text-green-700 font-medium">
                +1 (555) 123-4567
              </a>
            </div>

            {/* Live Chat */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with us in real-time</p>
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                Start Chat
              </button>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm text-gray-500">
              Support Hours: Monday - Friday, 9:00 AM - 6:00 PM EST
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}