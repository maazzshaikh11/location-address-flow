import React from 'react';
import LocationModal from './components/LocationModal';
import MapComponent from './components/MapComponent';
import AddressForm from './components/AddressForm';
import AddressManagement from './components/AddressManagement';

function App() {
    return (
        <div>
            <h1>Location/Address Flow</h1>
            <LocationModal />
            <MapComponent />
            <AddressForm />
            <AddressManagement />
        </div>
    );
}

export default App;
