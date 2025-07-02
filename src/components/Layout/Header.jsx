import { Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Header() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isDashboard = location.pathname === '/';
  const isInventory = location.pathname === '/inventory';

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="bg-white shadow-sm">
      {/* Main header */}
      <header className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl">🔥</span>
            <h1 className="text-xl font-bold whitespace-nowrap">{t('welcome')}</h1>
          </Link>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Language Switch Buttons */}
            <Button
              className="text-xs sm:text-sm px-2 sm:px-4 bg-gray-200 hover:bg-gray-300"
              onClick={() => changeLanguage('en')}
            >
              English
            </Button>
            <Button
              className="text-xs sm:text-sm px-2 sm:px-4 bg-gray-200 hover:bg-gray-300"
              onClick={() => changeLanguage('es')}
            >
              Español
            </Button>
            <Button
              className="text-xs sm:text-sm px-2 sm:px-4 bg-gray-200 hover:bg-gray-300"
              onClick={() => changeLanguage('ko')}
            >
              한국어
            </Button>


            <Button
              className="text-sm px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 hover:bg-blue-700 text-white whitespace-nowrap"
              onClick={() => window.open('https://www.fire.ca.gov/', '_blank')}
            >
              <span className="hidden sm:inline">{t('header.calFire')}</span>
              <span className="sm:hidden">CAL FIRE</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation bar */}
      <nav className="border-t">
        <div className="container mx-auto px-4">
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`py-3 font-medium ${isDashboard
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {t('dashboard')}
            </Link>

            <Link
              to="/forum"
              className={`py-3 font-medium ${location.pathname === '/forum'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {t('forum')}
            </Link>

          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
