
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useTrips, Trip } from '@/contexts/TripContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Search, MapPin, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripCard from '@/components/TripCard';

const FindTrip = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { trips } = useTrips();
  
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    date: '',
  });
  
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filtered = trips.filter(trip => {
      const originMatch = !searchParams.origin || 
        trip.origin.toLowerCase().includes(searchParams.origin.toLowerCase());
      
      const destinationMatch = !searchParams.destination || 
        trip.destination.toLowerCase().includes(searchParams.destination.toLowerCase());
      
      const dateMatch = !searchParams.date || trip.date === searchParams.date;
      
      const hasAvailableSeats = trip.passengers.length < trip.seats;
      
      return originMatch && destinationMatch && dateMatch && hasAvailableSeats;
    });
    
    setFilteredTrips(filtered);
    setHasSearched(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{t('trips.findTrip')}</h1>
            <p className="text-gray-600">Search for available rides to your destination</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Search Filters</CardTitle>
                  <CardDescription>
                    Enter your travel details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="origin" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        {t('trips.origin')}
                      </Label>
                      <Input
                        id="origin"
                        name="origin"
                        placeholder="Departure location"
                        value={searchParams.origin}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="destination" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        {t('trips.destination')}
                      </Label>
                      <Input
                        id="destination"
                        name="destination"
                        placeholder="Arrival location"
                        value={searchParams.destination}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="date" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        {t('trips.date')}
                      </Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={searchParams.date}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full mt-4">
                      <Search className="h-4 w-4 mr-2" />
                      {t('trips.search')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{t('trips.availableTrips')}</CardTitle>
                  <CardDescription>
                    {hasSearched
                      ? `${filteredTrips.length} trip${filteredTrips.length !== 1 ? 's' : ''} found`
                      : 'Enter search criteria and click search'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!hasSearched ? (
                    <div className="text-center py-10">
                      <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Use the search filters to find available trips
                      </p>
                    </div>
                  ) : filteredTrips.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-gray-500">{t('trips.noTrips')}</p>
                      <p className="text-gray-400 text-sm mt-2">
                        Try different search criteria
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredTrips.map((trip) => (
                        <TripCard key={trip.id} trip={trip} />
                      ))}
                    </div>
                  )}
                  
                  {!isAuthenticated && hasSearched && filteredTrips.length > 0 && (
                    <div className="mt-6 p-4 bg-soft-blue rounded-lg">
                      <p className="text-center text-gray-700">
                        You need to be logged in to join a trip
                      </p>
                      <div className="flex justify-center mt-2">
                        <Button asChild variant="secondary" className="mr-2">
                          <a href="/login">Login</a>
                        </Button>
                        <Button asChild>
                          <a href="/register">Sign Up</a>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindTrip;
