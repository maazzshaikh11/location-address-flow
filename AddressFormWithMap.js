import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

function AddressFormWithMap() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY' // Ensure the correct API key is used
    });

    const [location, setLocation] = useState({ lat: -34.397, lng: 150.644 });

    const locateMe = () => {
        navigator.geolocation.getCurrentPosition(position => {
            setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div>
            <GoogleMap
                center={location}
                zoom={10}
                mapContainerStyle={{ width: '100%', height: '400px' }}
            >
                <Marker position={location} draggable onDragEnd={e => {
                    setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                }} />
            </GoogleMap>
            <button onClick={locateMe}>Locate Me</button>
        </div>
    );
}

export default AddressFormWithMap;
