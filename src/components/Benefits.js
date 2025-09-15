'use client';
import { FaCoins, FaShieldAlt, FaEye, FaHeadset } from 'react-icons/fa';

const Benefits = () => {
  const benefits = [
    {
      id: 1,
      icon: <FaCoins className="text-yellow-500 text-2xl" />,
      title: "Passive Income",
      description: "Earn rental income and receive deposits quarterly",
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-100"
    },
    {
      id: 2,
      icon: <FaShieldAlt className="text-purple-500 text-2xl" />,
      title: "Secure & Cost-efficient",
      description: "Higher security, no legally compliant and tangible for qualified investors",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100"
    },
    {
      id: 3,
      icon: <FaEye className="text-orange-500 text-2xl" />,
      title: "Transparency",
      description: "Easily consult the full documentation for each property",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100"
    },
    {
      id: 4,
      icon: <FaHeadset className="text-green-500 text-2xl" />,
      title: "Support",
      description: "From rental income until receive deposits quarterly",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-purple-600 font-medium mb-4 uppercase tracking-wide font-body">
            Built to help smart investors invest smarter
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight font-heading">
            We handle the heavy lifting so you<br />
            can sit back, relax, and profit.
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-body">
            We make institutional quality real estate accessible to investors, in a simple<br />
            and transparent way.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className={`${benefit.bgColor} rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="flex items-start space-x-4">
                <div className={`${benefit.iconBg} p-3 rounded-xl flex-shrink-0`}>
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-body">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;