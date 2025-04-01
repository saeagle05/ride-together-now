
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-10 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-bright-blue mb-4">{t('app.name')}</h2>
            <p className="text-gray-600 max-w-md">{t('app.slogan')}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-bright-blue">
                    {t('nav.home')}
                  </Link>
                </li>
                <li>
                  <Link to="/trips" className="text-gray-600 hover:text-bright-blue">
                    {t('nav.trips')}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-bright-blue">
                    {t('nav.about')}
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-gray-600 hover:text-bright-blue">
                    {t('footer.privacyPolicy')}
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-600 hover:text-bright-blue">
                    {t('footer.termsOfService')}
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-bright-blue">
                    {t('footer.contactUs')}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-bright-blue">
                    {t('footer.aboutUs')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-600">
            &copy; {currentYear} Ride with Me. {t('footer.allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
