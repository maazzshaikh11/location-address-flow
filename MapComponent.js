import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';

function AddressFormWithMap() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyBBVx6rSgEkTk5MK_DAFLQeGGiCGxYY6So',
    });

    const [location, setLocation] = useState({ lat: -34.397, lng: 150.644 });
    const [formData, setFormData] = useState({
        house: '',
        apartment: '',
        category: 'Home',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const locateMe = () => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const newLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setLocation(newLocation);

                // Fetch address details using Google Maps Geocoding API
                const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newLocation.lat},${newLocation.lng}& key=AIzaSyBBVx6rSgEkTk5MK_DAFLQeGGiCGxYY6So`;
                try {
                    const response = await axios.get(geocodeUrl);
                    const addressComponents = response.data.results[0].address_components;

                    // Extract specific address components
                    const house = addressComponents.find((comp) =>
                        comp.types.includes('street_number')
                    )?.long_name || '';
                    const apartment = addressComponents.find((comp) =>
                        comp.types.includes('route')
                    )?.long_name || '';

                    setFormData((prevData) => ({
                        ...prevData,
                        house,
                        apartment,
                    }));
                } catch (error) {
                    console.error('Error fetching address:', error);
                }
            },
            (error) => {
                console.error('Error fetching location:', error);
                setErrorMessage('Unable to fetch location. Please try again.');
            }
        );
    };

    const saveAddress = async () => {
        if (!formData.house || !formData.apartment) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        setErrorMessage('');
        await axios.post('http://localhost:5000/addresses', formData);
        alert('Address saved!');
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div>
            <div>
                <GoogleMap
                    center={location}
                    zoom={10}
                    mapContainerStyle={{ width: '100%', height: '400px' }}
                >
                    <Marker position={location} />
                </GoogleMap>
                <button onClick={locateMe} style={{ marginTop: '10px' }}>
                    Locate Me
                </button>
            </div>
            <div style={{ marginTop: '20px' }}>
                {/* Display only one set of text fields */}
                <input
                    type="text"
                    placeholder="House/Flat/Block No."
                    value={formData.house}
                    onChange={(e) => setFormData({ ...formData, house: e.target.value })}
                    style={{ width: '300px', height: '40px', fontSize: '16px', marginRight: '10px' }}
                />
                <input
                    type="text"
                    placeholder="Apartment/Road/Area"
                    value={formData.apartment}
                    onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                    style={{ width: '300px', height: '40px', fontSize: '16px', marginRight: '10px' }}
                />
                <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ height: '40px', fontSize: '16px' }}
                >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Friends & Family">Friends & Family</option>
                </select>
                <button onClick={saveAddress} style={{ display: 'block', marginTop: '10px' }}>
                    Save Address
                </button>
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default AddressFormWithMap;
