import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-dark' : 'bg-gray-100'} p-4 transition-colors duration-300`}
    >
      <div
        className={`max-w-4xl w-full ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} rounded-lg shadow-lg p-8 border ${darkMode ? 'border-primary/20' : 'border-gray-200'} transition-colors duration-300`}
      >
        <h1
          className={`text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}
        >
          About OctoTrust Bank
        </h1>
        <div className="space-y-6">
          <p>
            Welcome to OctoTrust Bank, your premier destination for AI-powered financial services
            designed specifically for modern banking needs. Our cutting-edge fintech innovations
            bring together the latest in artificial intelligence, security technology, and
            user-friendly design to enhance your financial experience.
          </p>
          <h2 className="text-2xl font-bold text-primary">Our Mission</h2>
          <p>
            To revolutionize the way people interact with their finances through thoughtfully designed,
            AI-enhanced banking products that improve financial wellness, security monitoring, and
            personalized financial insights while delighting our customers with valuable banking services.
          </p>
          <h2 className="text-2xl font-bold text-primary">Our Purpose</h2>
          <p>
            At OctoTrust Bank, we believe that everyone deserves access to innovative financial technology.
            Our team of financial experts, engineers, and AI specialists work
            together to create banking solutions that understand, respond to, and improve your
            financial life.
          </p>
          <h2 className="text-2xl font-bold text-primary">Key Features of Our Banking Services</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>AI-powered financial analysis and personalization</li>
            <li>Real-time transaction monitoring and fraud alerts</li>
            <li>Multi-account management and integration</li>
            <li>Mobile banking with detailed financial analytics</li>
            <li>Secure and eco-friendly digital banking solutions</li>
            <li>Modern, intuitive interfaces that simplify banking</li>
          </ul>
          <div
            className={`mt-8 p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg transition-colors duration-300`}
          >
            <p className="italic">
              "Our customers tested every banking feature extensively. Only the ones they couldn't
              stop using made it to production." — Felix Banksworth, Founder
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
