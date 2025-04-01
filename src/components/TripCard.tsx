
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useTrips, Trip } from '@/contexts/TripContext';
import { MapPin, Calendar, Clock, Users, Star, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface TripCardProps {
  trip: Trip;
  isUserTrip?: boolean;
  onEdit?: (trip: Trip) => void;
}

const TripCard = ({ trip, isUserTrip = false, onEdit }: TripCardProps) => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { joinTrip, leaveTrip, deleteTrip } = useTrips();
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const isDriver = currentUser?.id === trip.driverId;
  const isPassenger = trip.passengers.includes(currentUser?.id || '');
  const availableSeats = trip.seats - trip.passengers.length;

  const handleJoinTrip = () => {
    if (currentUser) {
      joinTrip(trip.id, currentUser.id);
    }
  };

  const handleLeaveTrip = () => {
    if (currentUser) {
      leaveTrip(trip.id, currentUser.id);
    }
  };

  const handleDelete = () => {
    deleteTrip(trip.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
        <div className="p-5">
          {/* Trip header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">{trip.origin} to {trip.destination}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span>{trip.driverRating}</span>
                <span className="mx-2">•</span>
                <span>{trip.driverName}</span>
              </div>
            </div>
            
            {isUserTrip && isDriver && (
              <div className="flex space-x-1">
                {onEdit && (
                  <Button variant="ghost" size="icon" onClick={() => onEdit(trip)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          {/* Trip details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span>{trip.date}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              <span>{trip.time}</span>
            </div>
            <div className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-2 text-gray-400" />
              <span>
                {availableSeats} {availableSeats === 1 ? 'seat' : 'seats'} available
              </span>
            </div>
          </div>
          
          {/* Trip actions */}
          <div className="flex justify-between items-center">
            <Button variant="outline" size="sm" onClick={() => setShowDetails(true)}>
              {t('trips.details')}
            </Button>
            
            {!isUserTrip && currentUser && currentUser.type === 'passenger' && (
              <>
                {isPassenger ? (
                  <Button variant="destructive" size="sm" onClick={handleLeaveTrip}>
                    {t('trips.leave')}
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={handleJoinTrip}
                    disabled={availableSeats === 0}
                  >
                    {t('trips.join')}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Trip detail dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('trips.details')}</DialogTitle>
            <DialogDescription>
              Trip from {trip.origin} to {trip.destination}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-gray-500">{t('trips.date')}:</span>
                <span>{trip.date}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">{t('trips.time')}:</span>
                <span>{trip.time}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">{t('trips.seats')}:</span>
                <span>{availableSeats} of {trip.seats}</span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Driver Information</h4>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Users className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <div className="font-medium">{trip.driverName}</div>
                  <div className="flex items-center text-sm">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" />
                    <span>{trip.driverRating}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {trip.carModel && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Car Information</h4>
                <div className="flex justify-between">
                  <span className="text-gray-500">Model:</span>
                  <span>{trip.carModel}</span>
                </div>
                {trip.carColor && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Color:</span>
                    <span>{trip.carColor}</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter>
            {!isUserTrip && currentUser && currentUser.type === 'passenger' && (
              <>
                {isPassenger ? (
                  <Button variant="destructive" onClick={handleLeaveTrip}>
                    {t('trips.leave')}
                  </Button>
                ) : (
                  <Button 
                    onClick={handleJoinTrip}
                    disabled={availableSeats === 0}
                  >
                    {t('trips.join')}
                  </Button>
                )}
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this trip. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TripCard;
