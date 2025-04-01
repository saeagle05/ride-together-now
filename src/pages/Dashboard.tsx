
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useTrips, Trip } from '@/contexts/TripContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Plus, Car, Search, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripCard from '@/components/TripCard';

const Dashboard = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { userTrips } = useTrips();
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  if (!currentUser) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                You need to be logged in to view this page.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link to="/login">
                <Button>Go to Login</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">{t('nav.dashboard')}</h1>
            
            {currentUser.type === 'driver' ? (
              <Link to="/create-trip">
                <Button className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  {t('trips.createTrip')}
                </Button>
              </Link>
            ) : (
              <Link to="/find-trip">
                <Button className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  {t('trips.findTrip')}
                </Button>
              </Link>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Rating
                </CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentUser.rating.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">
                  Based on reviews
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Trips
                </CardTitle>
                <Car className="h-4 w-4 text-bright-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentUser.tripCount}</div>
                <p className="text-xs text-muted-foreground">
                  {currentUser.type === 'driver' ? 'Trips offered' : 'Trips taken'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Member Since
                </CardTitle>
                <div className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{new Date(currentUser.joinDate).toLocaleDateString()}</div>
                <p className="text-xs text-muted-foreground">
                  Welcome to Ride with Me!
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <Tabs defaultValue="upcoming">
              <div className="border-b px-6">
                <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-3 h-auto bg-transparent gap-6 my-1">
                  <TabsTrigger 
                    value="upcoming" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-bright-blue data-[state=active]:shadow-none h-12"
                  >
                    Upcoming
                  </TabsTrigger>
                  <TabsTrigger 
                    value="past" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-bright-blue data-[state=active]:shadow-none h-12"
                  >
                    Past
                  </TabsTrigger>
                  <TabsTrigger 
                    value="all" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-bright-blue data-[state=active]:shadow-none h-12"
                  >
                    All
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="upcoming" className="p-6">
                {userTrips.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500 mb-4">You don't have any upcoming trips.</p>
                    {currentUser.type === 'driver' ? (
                      <Link to="/create-trip">
                        <Button>Create a Trip</Button>
                      </Link>
                    ) : (
                      <Link to="/find-trip">
                        <Button>Find a Trip</Button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userTrips.map((trip) => (
                      <TripCard
                        key={trip.id}
                        trip={trip}
                        isUserTrip={true}
                        onEdit={(trip) => setSelectedTrip(trip)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="past" className="p-6">
                <div className="text-center py-10">
                  <p className="text-gray-500">No past trips found.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="all" className="p-6">
                {userTrips.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500 mb-4">You don't have any trips yet.</p>
                    {currentUser.type === 'driver' ? (
                      <Link to="/create-trip">
                        <Button>Create a Trip</Button>
                      </Link>
                    ) : (
                      <Link to="/find-trip">
                        <Button>Find a Trip</Button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userTrips.map((trip) => (
                      <TripCard
                        key={trip.id}
                        trip={trip}
                        isUserTrip={true}
                        onEdit={(trip) => setSelectedTrip(trip)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
