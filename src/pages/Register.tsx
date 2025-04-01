
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Car, User } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 'passenger' as 'driver' | 'passenger',
    idImage: null as File | null,
    licenseImage: null as File | null,
    carImage: null as File | null,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [name]: file }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.type === 'driver') {
      if (!formData.idImage) {
        newErrors.idImage = 'ID image is required for drivers';
      }
      
      if (!formData.licenseImage) {
        newErrors.licenseImage = 'License image is required for drivers';
      }
      
      if (!formData.carImage) {
        newErrors.carImage = 'Car image is required for drivers';
      }
    } else if (!formData.idImage) {
      newErrors.idImage = 'ID image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        type: formData.type,
        idImage: formData.idImage,
        licenseImage: formData.licenseImage,
        carImage: formData.carImage,
      });
      
      navigate('/dashboard');
    } catch (error) {
      setErrors({
        form: 'Registration failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">{t('auth.signUp')}</CardTitle>
              <CardDescription>
                {t('auth.alreadyHaveAccount')}{' '}
                <Link to="/login" className="text-bright-blue hover:underline">
                  {t('auth.signIn')}
                </Link>
              </CardDescription>
            </CardHeader>
            
            <Tabs defaultValue="passenger" onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as 'driver' | 'passenger' }))}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="passenger" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {t('auth.passenger')}
                </TabsTrigger>
                <TabsTrigger value="driver" className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  {t('auth.driver')}
                </TabsTrigger>
              </TabsList>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  {errors.form && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                      {errors.form}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="username">{t('auth.username')}</Label>
                      <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={errors.username ? 'border-red-500' : ''}
                      />
                      {errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('auth.email')}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="password">{t('auth.password')}</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'border-red-500' : ''}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={errors.confirmPassword ? 'border-red-500' : ''}
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">ID Verification</h3>
                    
                    <div>
                      <Label className="block mb-2">{t('auth.idUpload')}</Label>
                      <FileUpload
                        label={t('auth.idUpload')}
                        onChange={(file) => handleFileChange('idImage', file)}
                      />
                      {errors.idImage && (
                        <p className="text-red-500 text-sm mt-1">{errors.idImage}</p>
                      )}
                    </div>
                    
                    <TabsContent value="driver" className="space-y-4 mt-6">
                      <div>
                        <Label className="block mb-2">{t('auth.licenseUpload')}</Label>
                        <FileUpload
                          label={t('auth.licenseUpload')}
                          onChange={(file) => handleFileChange('licenseImage', file)}
                        />
                        {errors.licenseImage && (
                          <p className="text-red-500 text-sm mt-1">{errors.licenseImage}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label className="block mb-2">{t('auth.carUpload')}</Label>
                        <FileUpload
                          label={t('auth.carUpload')}
                          onChange={(file) => handleFileChange('carImage', file)}
                        />
                        {errors.carImage && (
                          <p className="text-red-500 text-sm mt-1">{errors.carImage}</p>
                        )}
                      </div>
                    </TabsContent>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between pt-6">
                  <Button type="button" variant="outline" onClick={() => navigate('/')}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : t('auth.signUp')}
                  </Button>
                </CardFooter>
              </form>
            </Tabs>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
