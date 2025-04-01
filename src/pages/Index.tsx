
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car, Users, Calendar, Shield, Leaf, CreditCard, Search, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-bright-blue to-sky-blue text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('home.hero.title')}</h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/create-trip">
                <Button size="lg" className="bg-white text-bright-blue hover:bg-gray-100">
                  {t('home.hero.buttonDriver')}
                </Button>
              </Link>
              <Link to="/find-trip">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {t('home.hero.buttonPassenger')}
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">{t('home.features.title')}</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-soft-blue rounded-lg p-6 text-center">
                <div className="bg-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-bright-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('home.features.eco.title')}</h3>
                <p className="text-gray-600">{t('home.features.eco.description')}</p>
              </div>
              
              <div className="bg-soft-green rounded-lg p-6 text-center">
                <div className="bg-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-bright-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('home.features.save.title')}</h3>
                <p className="text-gray-600">{t('home.features.save.description')}</p>
              </div>
              
              <div className="bg-soft-blue rounded-lg p-6 text-center">
                <div className="bg-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-bright-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('home.features.convenient.title')}</h3>
                <p className="text-gray-600">{t('home.features.convenient.description')}</p>
              </div>
              
              <div className="bg-soft-green rounded-lg p-6 text-center">
                <div className="bg-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-bright-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('home.features.safe.title')}</h3>
                <p className="text-gray-600">{t('home.features.safe.description')}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">{t('home.howItWorks.title')}</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="relative">
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="bg-bright-blue text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('home.howItWorks.step1.title')}</h3>
                  <p className="text-gray-600">{t('home.howItWorks.step1.description')}</p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300"></div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="bg-bright-blue text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('home.howItWorks.step2.title')}</h3>
                  <p className="text-gray-600">{t('home.howItWorks.step2.description')}</p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300"></div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="bg-bright-blue text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('home.howItWorks.step3.title')}</h3>
                  <p className="text-gray-600">{t('home.howItWorks.step3.description')}</p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300"></div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="bg-bright-blue text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    4
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('home.howItWorks.step4.title')}</h3>
                  <p className="text-gray-600">{t('home.howItWorks.step4.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-soft-blue to-soft-green">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto">
              Join our community of drivers and passengers today and make travel more affordable, sustainable, and social.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-bright-blue hover:bg-sky-blue">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
