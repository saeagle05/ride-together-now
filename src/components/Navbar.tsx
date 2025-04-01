
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, User, LogOut } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const { t } = useTranslation();
  const { isRtl } = useLanguage();
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and brand */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-bright-blue">{t('app.name')}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-bright-blue px-3 py-2">
            {t('nav.home')}
          </Link>
          <Link to="/trips" className="text-gray-600 hover:text-bright-blue px-3 py-2">
            {t('nav.trips')}
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="text-gray-600 hover:text-bright-blue px-3 py-2">
              {t('nav.dashboard')}
            </Link>
          )}

          <LanguageSwitcher />

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{currentUser?.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRtl ? "start" : "end"}>
                <DropdownMenuItem asChild>
                  <Link to="/profile">{t('nav.profile')}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-500">
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('nav.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline">{t('nav.signIn')}</Button>
              </Link>
              <Link to="/register">
                <Button>{t('nav.signUp')}</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden pt-4 pb-3 border-t border-gray-200">
          <div className="container mx-auto space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-600 hover:bg-soft-blue rounded-md"
              onClick={toggleMenu}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/trips"
              className="block px-3 py-2 text-gray-600 hover:bg-soft-blue rounded-md"
              onClick={toggleMenu}
            >
              {t('nav.trips')}
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-gray-600 hover:bg-soft-blue rounded-md"
                onClick={toggleMenu}
              >
                {t('nav.dashboard')}
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-gray-600 hover:bg-soft-blue rounded-md"
                  onClick={toggleMenu}
                >
                  {t('nav.profile')}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="w-full text-left px-3 py-2 text-red-500 hover:bg-soft-blue rounded-md flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <div className="mt-4 space-y-2 px-3">
                <Link to="/login" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full">{t('nav.signIn')}</Button>
                </Link>
                <Link to="/register" onClick={toggleMenu}>
                  <Button className="w-full">{t('nav.signUp')}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
