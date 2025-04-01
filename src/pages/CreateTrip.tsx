
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTrips } from '@/contexts/TripContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin, Calendar, Clock, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CreateTrip = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addTrip } = useTrips();
  
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    time: '',
    seats: 1,
    carModel: '',
    carColor: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect if not a driver
  if (currentUser?.type !== 'driver') {
    navigate('/dashboard');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.origin.trim()) {
      newErrors.origin = 'Origin is required';
    }
    
    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    
    if (formData.seats < 1) {
      newErrors.seats = 'Must have at least 1 seat available';
    }
    
    if (!formData.carModel.trim()) {
      newErrors.carModel = 'Car model is required';
    }
    
    if (!formData.carColor.trim()) {
      newErrors.carColor = 'Car color is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !currentUser) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      addTrip({
        driverId: currentUser.id,
        driverName: currentUser.username,
        driverRating: currentUser.rating,
        origin: formData.origin,
        destination: formData.destination,
        date: formData.date,
        time: formData.time,
        seats: Number(formData.seats),
        passengers: [],
        carModel: formData.carModel,
        carColor: formData.carColor,
        carImage: currentUser.carImage || '/placeholder.svg',
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating trip:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{t('trips.createTrip')}</CardTitle>
              <CardDescription>
                Fill in the details below to create a new trip
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-bright-blue" />
                    Route Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="origin">{t('trips.origin')}</Label>
                      <Input
                        id="origin"
                        name="origin"
                        placeholder="Enter pickup location"
                        value={formData.origin}
                        onChange={handleChange}
                        className={errors.origin ? 'border-red-500' : ''}
                      />
                      {errors.origin && (
                        <p className="text-red-500 text-sm">{errors.origin}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="destination">{t('trips.destination')}</Label>
                      <Input
                        id="destination"
                        name="destination"
                        placeholder="Enter drop-off location"
                        value={formData.destination}
                        onChange={handleChange}
                        className={errors.destination ? 'border-red-500' : ''}
                      />
                      {errors.destination && (
                        <p className="text-red-500 text-sm">{errors.destination}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-bright-blue" />
                    Trip Schedule
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">{t('trips.date')}</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={errors.date ? 'border-red-500' : ''}
                      />
                      {errors.date && (
                        <p className="text-red-500 text-sm">{errors.date}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">{t('trips.time')}</Label>
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={errors.time ? 'border-red-500' : ''}
                      />
                      {errors.time && (
                        <p className="text-red-500 text-sm">{errors.time}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <Users className="h-5 w-5 mr-2 text-bright-blue" />
                    Trip Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="seats">{t('trips.seats')}</Label>
                      <Select 
                        value={formData.seats.toString()} 
                        onValueChange={(value) => handleSelectChange('seats', value)}
                      >
                        <SelectTrigger className={errors.seats ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select seats" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.seats && (
                        <p className="text-red-500 text-sm">{errors.seats}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="carModel">Car Model</Label>
                      <Input
                        id="carModel"
                        name="carModel"
                        placeholder="Toyota Camry"
                        value={formData.carModel}
                        onChange={handleChange}
                        className={errors.carModel ? 'border-red-500' : ''}
                      />
                      {errors.carModel && (
                        <p className="text-red-500 text-sm">{errors.carModel}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="carColor">Car Color</Label>
                      <Input
                        id="carColor"
                        name="carColor"
                        placeholder="Blue"
                        value={formData.carColor}
                        onChange={handleChange}
                        className={errors.carColor ? 'border-red-500' : ''}
                      />
                      {errors.carColor && (
                        <p className="text-red-500 text-sm">{errors.carColor}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Creating...' : t('trips.createTrip')}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateTrip;
