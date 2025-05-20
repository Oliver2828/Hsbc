import GlobalMarketsImage from '../../assets/global-markets.jpg';
import CorporateCardImage from '../../assets/corporate-card-launches.jpg';

const HomeTwo = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Content Column */}
      <div className="w-2/3 p-12">
        {/* Top Row - Two Columns */}
        <div className="flex gap-8 mb-12">
          {/* Global Banking Section */}
          <div className="w-1/2">
            <div className="h-48 mb-6 rounded-lg overflow-hidden">
              <img 
                src={GlobalMarketsImage} 
                className="object-cover h-full w-full" 
                alt="Global Markets" 
              />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Global Banking and Markets
            </h2>
            <p className="text-base text-gray-600 mb-6">
              Connecting institutional investors to global growth opportunities, with dedicated local support and expertise. HSBC opens global market opportunities.
            </p>
          </div>

          {/* Corporate Card Section */}
          <div className="w-1/2">
            <div className="h-48 mb-6 rounded-lg overflow-hidden">
              <img 
                src={CorporateCardImage} 
                className="object-cover h-full w-full" 
                alt="Corporate Card Launch" 
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              HSBC’s first co-branded corporate card launches in Korea
            </h3>
            <p className="text-base text-gray-600">
              HSBC launched the first co-branded corporate credit card in Korea, in partnership with Kookmin Card (KB), one of the top Korean card issuing companies, in March 2021.
            </p>
          </div>
        </div>

        {/* Bottom Row - Two Columns */}
        <div className="flex gap-8">
          {/* Notices Section */}
          <div className="w-1/2 bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Notices ⫸</h2>
            <p className="text-base text-gray-600">
              Get the latest news, analysis and commentary from our business specialists by visiting the News and Insight section on our global corporate website.
            </p>
          </div>

          {/* About HSBC Section */}
          <div className="w-1/2">
            <h2 className="text-xl font-bold text-gray-800 mb-4">ABOUT HSBC</h2>
            <p className="text-base text-gray-600">
              HSBC connects Korean and multinational companies to opportunities in the world based on the extensive global network and the expertise in the Korean market. HSBC in Korea also provides tailored financial solutions to Korea’s financial institutions and public sector companies.
            </p>
          </div>
        </div>
      </div>

      {/* Right White Space */}
      <div className="w-1/3 bg-white"></div>
    </div>
  );
};

export default HomeTwo;