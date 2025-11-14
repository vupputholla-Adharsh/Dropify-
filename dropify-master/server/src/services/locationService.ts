import DeliveryPersonnel from '../models/DeliveryPersonnel';

export const updatePersonnelLocation = async (
    deliveryPersonnelId: string,
    location: { latitude: number; longitude: number }
): Promise<any> => {
    return await DeliveryPersonnel.findByIdAndUpdate(
        deliveryPersonnelId,
        { currentLocation: { lat: location.latitude, lng: location.longitude } },
        { new: true }
    );
};
