'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function OurRisksPage() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const riskCategories = [
    {
      id: 'investment-risks',
      title: 'Investment Risks',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      ),
      risks: [
        {
          title: 'Loss of Principal',
          description: 'Real estate investments carry the risk of partial or total loss of your invested capital. Property values can decline due to market conditions, economic factors, or property-specific issues.'
        },
        {
          title: 'Illiquidity Risk',
          description: 'Real estate investments are generally illiquid. You may not be able to sell your investment quickly or at the desired price, especially during market downturns.'
        },
        {
          title: 'No Guaranteed Returns',
          description: 'Past performance does not guarantee future results. Projected returns are estimates and actual returns may be significantly lower or result in losses.'
        },
        {
          title: 'Concentration Risk',
          description: 'Investing in a limited number of properties or geographic areas increases exposure to local market conditions and property-specific risks.'
        }
      ]
    },
    {
      id: 'market-risks',
      title: 'Market & Economic Risks',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      risks: [
        {
          title: 'Market Volatility',
          description: 'Real estate markets can experience significant volatility due to economic cycles, interest rate changes, and supply-demand imbalances.'
        },
        {
          title: 'Interest Rate Risk',
          description: 'Rising interest rates can negatively impact property values and increase financing costs, affecting overall investment returns.'
        },
        {
          title: 'Economic Recession',
          description: 'Economic downturns can lead to decreased property values, reduced rental income, and increased vacancy rates.'
        },
        {
          title: 'Inflation Risk',
          description: 'High inflation can increase operating costs and construction expenses while potentially eroding the real value of fixed-rate rental income.'
        }
      ]
    },
    {
      id: 'operational-risks',
      title: 'Operational & Property Risks',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h4m6 0h2M7 15h10" />
        </svg>
      ),
      risks: [
        {
          title: 'Property Management Risk',
          description: 'Poor property management can lead to decreased occupancy rates, higher maintenance costs, and reduced property values.'
        },
        {
          title: 'Tenant Risk',
          description: 'Tenant defaults, vacancies, and turnover can significantly impact rental income and property profitability.'
        },
        {
          title: 'Maintenance & Repair Costs',
          description: 'Unexpected maintenance, repairs, and capital improvements can reduce returns and require additional capital contributions.'
        },
        {
          title: 'Environmental Risks',
          description: 'Environmental issues, natural disasters, and climate change can cause property damage and affect long-term viability.'
        }
      ]
    },
    {
      id: 'regulatory-risks',
      title: 'Regulatory & Legal Risks',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1" />
        </svg>
      ),
      risks: [
        {
          title: 'Regulatory Changes',
          description: 'Changes in zoning laws, building codes, rent control, and tax regulations can negatively impact property values and returns.'
        },
        {
          title: 'Tax Risk',
          description: 'Changes in tax laws, property tax assessments, and loss of tax benefits can affect investment returns.'
        },
        {
          title: 'Legal Disputes',
          description: 'Litigation with tenants, contractors, or other parties can result in significant legal costs and potential damages.'
        },
        {
          title: 'Compliance Costs',
          description: 'Ongoing compliance with local, state, and federal regulations may require significant time and financial resources.'
        }
      ]
    },
    {
      id: 'platform-risks',
      title: 'Platform & Technology Risks',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      risks: [
        {
          title: 'Platform Risk',
          description: 'Our platform may experience technical issues, security breaches, or operational failures that could affect your ability to access your investments.'
        },
        {
          title: 'Cybersecurity Risk',
          description: 'Data breaches or cyber attacks could compromise personal and financial information, potentially leading to identity theft or financial loss.'
        },
        {
          title: 'Business Risk',
          description: 'Our company may face financial difficulties, regulatory issues, or business model changes that could affect the platform and your investments.'
        },
        {
          title: 'Third-Party Risk',
          description: 'We rely on third-party service providers for various functions. Their failures or issues could impact our services and your investments.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Investment Risks & Disclosures
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
              Understanding the risks associated with real estate investments is crucial for making informed decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mx-4 sm:mx-6 lg:mx-8 mt-8 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Important Risk Disclosure
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Real estate investments involve substantial risk and may not be suitable for all investors. 
                You should carefully consider your financial situation and risk tolerance before investing. 
                Please read all risk disclosures carefully and consult with a financial advisor if needed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {riskCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={() => toggleSection(category.id)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="text-red-600 mr-3">
                    {category.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {category.title}
                  </h2>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                    expandedSection === category.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedSection === category.id && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="space-y-6">
                    {category.risks.map((risk, index) => (
                      <div key={index} className="border-l-4 border-red-200 pl-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {risk.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {risk.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional Disclosures */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Additional Important Disclosures
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Suitability Requirements
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Minimum age of 18 years</li>
                <li>• Adequate financial resources to bear investment losses</li>
                <li>• Understanding of real estate investment risks</li>
                <li>• Ability to evaluate investment opportunities</li>
                <li>• Long-term investment horizon (typically 3-7 years)</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Investment Minimums & Fees
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Minimum investment amounts vary by property</li>
                <li>• Platform fees may apply to transactions</li>
                <li>• Property management fees reduce net returns</li>
                <li>• Early withdrawal may incur penalties</li>
                <li>• Tax implications vary by investor situation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Mitigation */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How We Help Mitigate Risks
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Due Diligence
              </h3>
              <p className="text-gray-700">
                Thorough property analysis, market research, and financial modeling before listing investments.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Security Measures
              </h3>
              <p className="text-gray-700">
                Advanced cybersecurity, data encryption, and secure payment processing to protect your information.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Transparency
              </h3>
              <p className="text-gray-700">
                Regular updates, detailed reporting, and clear communication about property performance and market conditions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Support */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Questions About Investment Risks?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our investment team is here to help you understand the risks and make informed decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
            >
              Contact Our Team
            </a>
            <a
              href="/faq"
              className="inline-flex items-center px-6 py-3 border border-red-600 text-base font-medium rounded-md text-red-600 bg-white hover:bg-red-50 transition-colors duration-200"
            >
              View FAQ
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}