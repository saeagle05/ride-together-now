
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, User, Mail, Phone, MapPin, Shield, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Profile = () => {
  const { t } = useTranslation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    email: currentUser?.email || '',
    phone: '123-456-7890',
    address: 'New York, NY',
  });

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the changes to the backend
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{t('profile.myProfile')}</h1>
            <p className="text-gray-600">Manage your profile and account settings</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Overview */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={currentUser.profileImage} alt={currentUser.username} />
                      <AvatarFallback className="text-lg bg-bright-blue text-white">
                        {getInitials(currentUser.username)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h2 className="text-xl font-bold">{currentUser.username}</h2>
                    <p className="text-gray-500 mb-2">{currentUser.type === 'driver' ? 'Driver' : 'Passenger'}</p>
                    
                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full text-yellow-700">
                      <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                      <span>{currentUser.rating.toFixed(1)}</span>
                    </div>
                    
                    <div className="w-full mt-6 space-y-4">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-600">{currentUser.email}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-600">123-456-7890</span>
                      </div>
                      
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-600">New York, NY</span>
                      </div>
                    </div>
                    
                    <div className="border-t w-full my-6 pt-6">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold">{currentUser.tripCount}</p>
                          <p className="text-gray-500 text-sm">{t('profile.tripsCompleted')}</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{currentUser.joinDate.split('-')[0]}</p>
                          <p className="text-gray-500 text-sm">{t('profile.memberSince')}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full space-y-3 mt-2">
                      <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                        {t('profile.editProfile')}
                      </Button>
                      <Button variant="destructive" className="w-full" onClick={() => {
                        logout();
                        navigate('/');
                      }}>
                        {t('nav.logout')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="info">
                <TabsList className="w-full bg-card border">
                  <TabsTrigger value="info" className="flex-1">
                    Information
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex-1">
                    Security
                  </TabsTrigger>
                  {currentUser.type === 'driver' && (
                    <TabsTrigger value="vehicle" className="flex-1">
                      Vehicle
                    </TabsTrigger>
                  )}
                </TabsList>
                
                <TabsContent value="info">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        {isEditing ? 'Edit your profile details' : 'Your personal information'}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      {isEditing ? (
                        <form onSubmit={handleSubmit}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="username">Username</Label>
                              <Input
                                id="username"
                                value={currentUser.username}
                                disabled
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={userData.email}
                                onChange={handleChange}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                id="phone"
                                name="phone"
                                value={userData.phone}
                                onChange={handleChange}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="address">Address</Label>
                              <Input
                                id="address"
                                name="address"
                                value={userData.address}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          
                          <div className="flex justify-end mt-6 space-x-2">
                            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                              Cancel
                            </Button>
                            <Button type="submit">Save Changes</Button>
                          </div>
                        </form>
                      ) : (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Username</h3>
                              <p>{currentUser.username}</p>
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Email</h3>
                              <p>{userData.email}</p>
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                              <p>{userData.phone}</p>
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Address</h3>
                              <p>{userData.address}</p>
                            </div>
                          </div>
                          
                          <div className="pt-4 border-t">
                            <h3 className="text-lg font-medium mb-3">Account Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
                                <p className="capitalize">{currentUser.type}</p>
                              </div>
                              
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                                <p>{new Date(currentUser.joinDate).toLocaleDateString()}</p>
                              </div>
                              
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Rating</h3>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                                  <span>{currentUser.rating.toFixed(1)}</span>
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Trips Completed</h3>
                                <p>{currentUser.tripCount}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>
                        Manage your account security and verification
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-50 rounded-full">
                            <Shield className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">Password</h3>
                            <p className="text-sm text-gray-500">Update your password regularly</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Change Password
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between pb-4 border-b">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-green-50 rounded-full">
                            <User className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">ID Verification</h3>
                            <p className="text-sm text-gray-500">Your ID has been verified</p>
                          </div>
                        </div>
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          Verified
                        </div>
                      </div>
                      
                      {currentUser.type === 'driver' && (
                        <div className="flex items-center justify-between pb-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-50 rounded-full">
                              <Car className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                              <h3 className="font-medium">Driver's License</h3>
                              <p className="text-sm text-gray-500">Your license has been verified</p>
                            </div>
                          </div>
                          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            Verified
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {currentUser.type === 'driver' && (
                  <TabsContent value="vehicle">
                    <Card>
                      <CardHeader>
                        <CardTitle>Vehicle Information</CardTitle>
                        <CardDescription>
                          Details about your registered vehicle
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-6">
                        <div className="aspect-video rounded-md overflow-hidden bg-gray-100 mb-4">
                          <img
                            src="/placeholder.svg"
                            alt="Your car"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="carModel">Car Model</Label>
                            <Input
                              id="carModel"
                              value="Toyota Camry"
                              disabled
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="carYear">Year</Label>
                            <Input
                              id="carYear"
                              value="2019"
                              disabled
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="carColor">Color</Label>
                            <Input
                              id="carColor"
                              value="Blue"
                              disabled
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="licensePlate">License Plate</Label>
                            <Input
                              id="licensePlate"
                              value="ABC-1234"
                              disabled
                            />
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t mt-4">
                          <h3 className="font-medium mb-3">Additional Features</h3>
                          <div className="flex flex-wrap gap-2">
                            <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              Air Conditioning
                            </div>
                            <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              4 Doors
                            </div>
                            <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              Bluetooth
                            </div>
                            <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              USB Charging
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Update Vehicle Information
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                )}
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
