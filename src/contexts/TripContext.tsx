
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export interface Trip {
  id: string;
  driverId: string;
  driverName: string;
  driverRating: number;
  origin: string;
  destination: string;
  date: string;
  time: string;
  seats: number;
  passengers: string[];
  carModel?: string;
  carColor?: string;
  carImage?: string;
}

interface TripContextType {
  trips: Trip[];
  userTrips: Trip[];
  addTrip: (trip: Omit<Trip, 'id'>) => void;
  deleteTrip: (id: string) => void;
  updateTrip: (id: string, trip: Partial<Trip>) => void;
  joinTrip: (tripId: string, userId: string) => void;
  leaveTrip: (tripId: string, userId: string) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

// Mock trips for demo
const mockTrips: Trip[] = [
  {
    id: '1',
    driverId: '1',
    driverName: 'John Driver',
    driverRating: 4.8,
    origin: 'Downtown',
    destination: 'Airport',
    date: '2023-06-15',
    time: '14:00',
    seats: 3,
    passengers: [],
    carModel: 'Toyota Camry',
    carColor: 'Blue',
    carImage: '/placeholder.svg'
  },
  {
    id: '2',
    driverId: '3',
    driverName: 'Emma Wilson',
    driverRating: 4.9,
    origin: 'University',
    destination: 'Shopping Mall',
    date: '2023-06-16',
    time: '10:30',
    seats: 2,
    passengers: ['2'],
    carModel: 'Honda Civic',
    carColor: 'Red',
    carImage: '/placeholder.svg'
  }
];

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>(mockTrips);
  const [userTrips, setUserTrips] = useState<Trip[]>([]);
  const { toast } = useToast();
  
  // Effect to load trips from localStorage or some other source
  useEffect(() => {
    const storedTrips = localStorage.getItem('trips');
    if (storedTrips) {
      setTrips(JSON.parse(storedTrips));
    }
  }, []);

  // Update localStorage when trips change
  useEffect(() => {
    localStorage.setItem('trips', JSON.stringify(trips));
  }, [trips]);

  // Update userTrips when trips or user changes
  useEffect(() => {
    const currentUserId = JSON.parse(localStorage.getItem('currentUser') || '{}')?.id;
    if (currentUserId) {
      // For drivers: trips they created
      // For passengers: trips they joined
      const userTrips = trips.filter(
        trip => trip.driverId === currentUserId || trip.passengers.includes(currentUserId)
      );
      setUserTrips(userTrips);
    } else {
      setUserTrips([]);
    }
  }, [trips]);

  const addTrip = (trip: Omit<Trip, 'id'>) => {
    const newTrip: Trip = {
      ...trip,
      id: Math.random().toString(36).substring(2, 9)
    };
    setTrips([...trips, newTrip]);
    toast({
      title: "Trip Created",
      description: "Your trip has been successfully created",
    });
  };

  const deleteTrip = (id: string) => {
    setTrips(trips.filter(trip => trip.id !== id));
    toast({
      title: "Trip Deleted",
      description: "The trip has been successfully deleted",
    });
  };

  const updateTrip = (id: string, tripUpdate: Partial<Trip>) => {
    setTrips(trips.map(trip => 
      trip.id === id ? { ...trip, ...tripUpdate } : trip
    ));
    toast({
      title: "Trip Updated",
      description: "The trip details have been updated",
    });
  };

  const joinTrip = (tripId: string, userId: string) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId && !trip.passengers.includes(userId) && trip.passengers.length < trip.seats) {
        return {
          ...trip,
          passengers: [...trip.passengers, userId]
        };
      }
      return trip;
    }));
    toast({
      title: "Trip Joined",
      description: "You have successfully joined the trip",
    });
  };

  const leaveTrip = (tripId: string, userId: string) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId && trip.passengers.includes(userId)) {
        return {
          ...trip,
          passengers: trip.passengers.filter(id => id !== userId)
        };
      }
      return trip;
    }));
    toast({
      title: "Left Trip",
      description: "You have left the trip",
    });
  };

  return (
    <TripContext.Provider value={{ 
      trips, 
      userTrips, 
      addTrip, 
      deleteTrip, 
      updateTrip, 
      joinTrip, 
      leaveTrip 
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
};
