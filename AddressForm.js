import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';

function AddressFormWithMap() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyBBVx6rSgEkTk5MK_DAFLQeGGiCGxYY6So', // Replace with your API key
    });

    const [location, setLocation] = useState({ lat: 37.7749, lng: -122.4194 }); // Default location (San Francisco)
    const [formData, setFormData] = useState({
        house: '',
        apartment: '',
        category: 'Home',
    });

    const [errorMessage, setErrorMessage] = useState('');

    // Save address function
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
            {/* Map */}
            <div>
                <GoogleMap
                    center={location}
                    zoom={10}
                    mapContainerStyle={{ width: '100%', height: '400px' }}
                >
                    <Marker position={location} />
                </GoogleMap>
            </div>

            {/* Address Form */}
            <div style={{ marginTop: '20px' }}>
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
                    style={{ height: '40px', fontSize: '16px', width: '300px' }}
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
