'use client';
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      type: "Essential Cookies",
      description: "These cookies are necessary for the website to function and cannot be switched off in our systems.",
      examples: [
        "Authentication cookies to keep you logged in",
        "Security cookies to protect against fraud",
        "Session cookies to maintain your preferences",
        "Load balancing cookies for website performance"
      ],
      canDisable: false
    },
    {
      type: "Performance Cookies",
      description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.",
      examples: [
        "Google Analytics for website usage statistics",
        "Page load time measurement",
        "Error tracking and reporting",
        "A/B testing for feature improvements"
      ],
      canDisable: true
    },
    {
      type: "Functional Cookies",
      description: "These cookies enable the website to provide enhanced functionality and personalization.",
      examples: [
        "Language and region preferences",
        "Customized dashboard settings",
        "Investment preferences and filters",
        "Notification preferences"
      ],
      canDisable: true
    },
    {
      type: "Marketing Cookies",
      description: "These cookies may be set through our site by our advertising partners to build a profile of your interests.",
      examples: [
        "Social media integration cookies",
        "Advertising targeting cookies",
        "Conversion tracking pixels",
        "Retargeting campaign cookies"
      ],
      canDisable: true
    }
  ];

  const thirdPartyServices = [
    {
      name: "Google Analytics",
      purpose: "Website analytics and performance monitoring",
      dataCollected: "Page views, user interactions, device information",
      retention: "26 months",
      optOut: "https://tools.google.com/dlpage/gaoptout"
    },
    {
      name: "Intercom",
      purpose: "Customer support and live chat functionality",
      dataCollected: "Chat messages, user identification, support tickets",
      retention: "As long as account is active",
      optOut: "Contact support to disable"
    },
    {
      name: "Stripe",
      purpose: "Payment processing and fraud prevention",
      dataCollected: "Payment information, transaction data",
      retention: "7 years for compliance",
      optOut: "Required for payment processing"
    },
    {
      name: "Hotjar",
      purpose: "User experience analysis and heatmaps",
      dataCollected: "Mouse movements, clicks, scroll behavior",
      retention: "12 months",
      optOut: "https://www.hotjar.com/legal/compliance/opt-out"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-4">
              How Revest uses cookies and similar technologies
            </p>
            <p className="text-lg opacity-75">
              Last updated: December 2024
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">What Are Cookies?</h2>
              <p className="text-gray-600 mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                They are widely used to make websites work more efficiently and to provide information to website owners.
              </p>
              <p className="text-gray-600 mb-4">
                At Revest, we use cookies and similar technologies to enhance your experience, analyze website performance, 
                and provide personalized content. This Cookie Policy explains what cookies we use, why we use them, 
                and how you can manage your cookie preferences.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
                <p className="text-blue-800">
                  <strong>Important:</strong> By continuing to use our website, you consent to our use of cookies 
                  as described in this policy and our Privacy Policy.
                </p>
              </div>
            </div>

            {/* Types of Cookies */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Types of Cookies We Use</h2>
              <div className="space-y-6">
                {cookieTypes.map((cookie, index) => (
                  <div key={index} className="border-l-4 border-gray-200 pl-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-800">{cookie.type}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        cookie.canDisable 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {cookie.canDisable ? 'Optional' : 'Required'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{cookie.description}</p>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Examples:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {cookie.examples.map((example, idx) => (
                          <li key={idx}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Third-Party Services */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Third-Party Services</h2>
              <p className="text-gray-600 mb-6">
                We work with trusted third-party service providers who may also set cookies on our website. 
                Here are the main services we use:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">Service</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">Purpose</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">Data Collected</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">Retention</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">Opt-Out</th>
                    </tr>
                  </thead>
                  <tbody>
                    {thirdPartyServices.map((service, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{service.name}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-600">{service.purpose}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-600">{service.dataCollected}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-600">{service.retention}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-600">{service.optOut}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cookie Management */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Managing Your Cookie Preferences</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Browser Settings</h3>
                  <p className="text-gray-600 mb-4">
                    You can control and manage cookies through your browser settings. Most browsers allow you to:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>View and delete existing cookies</li>
                    <li>Block cookies from specific websites</li>
                    <li>Block third-party cookies</li>
                    <li>Block all cookies</li>
                    <li>Delete all cookies when you close your browser</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Cookie Preference Center</h3>
                  <p className="text-gray-600 mb-4">
                    We provide a cookie preference center where you can manage your cookie settings:
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mb-4">
                    Manage Cookie Preferences
                  </button>
                  <p className="text-sm text-gray-500">
                    Note: Disabling certain cookies may affect website functionality and your user experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Browser Instructions */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Browser-Specific Instructions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-gray-800 mb-2">Google Chrome</h4>
                    <p className="text-gray-600 text-sm">
                      Settings → Privacy and Security → Cookies and other site data
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-gray-800 mb-2">Mozilla Firefox</h4>
                    <p className="text-gray-600 text-sm">
                      Options → Privacy & Security → Cookies and Site Data
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-gray-800 mb-2">Safari</h4>
                    <p className="text-gray-600 text-sm">
                      Preferences → Privacy → Manage Website Data
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-gray-800 mb-2">Microsoft Edge</h4>
                    <p className="text-gray-600 text-sm">
                      Settings → Cookies and site permissions → Cookies and site data
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-gray-800 mb-2">Mobile Browsers</h4>
                    <p className="text-gray-600 text-sm">
                      Settings vary by browser and device. Check your browser&apos;s help section for specific instructions.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-gray-800 mb-2">Do Not Track</h4>
                    <p className="text-gray-600 text-sm">
                      We respect Do Not Track signals and will not track users who have enabled this setting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Updates and Changes */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Updates to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices, 
                technology, legal requirements, or other factors. When we make changes, we will:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Update the &apos;Last updated&apos; date at the top of this policy</li>
                <li>Notify you of significant changes through email or website notice</li>
                <li>Provide you with an opportunity to review and accept new cookie settings</li>
              </ul>
              <p className="text-gray-600">
                We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about this Cookie Policy or our use of cookies, please contact us:
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">General Inquiries</h3>
                  <div className="space-y-2 text-gray-600">
                    <p><strong>Email:</strong> privacy@revest.com</p>
                    <p><strong>Phone:</strong> 1-800-REVEST-1</p>
                    <p><strong>Address:</strong> 123 Investment Street, Suite 100<br />New York, NY 10001</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">Data Protection Officer</h3>
                  <div className="space-y-2 text-gray-600">
                    <p><strong>Email:</strong> dpo@revest.com</p>
                    <p><strong>Response Time:</strong> Within 30 days</p>
                  </div>
                  
                  <div className="mt-6">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Contact Privacy Team
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}