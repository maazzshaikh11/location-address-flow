import React, { useState } from 'react';

function LocationModal() {
    const [showModal, setShowModal] = useState(true);

    const enableLocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log('Location:', position.coords);
                setShowModal(false);
            },
            error => {
                console.error('Error:', error);
            }
        );
    };

    return (
        showModal && (
            <div className="modal-overlay">
                <div className="modal">
                    <p>Location permissions are turned off. Please enable location.</p>
                    <div className="modal-buttons">
                        <button onClick={enableLocation}>Enable Location</button>
                        <button onClick={() => setShowModal(false)}>Search Location Manually</button>
                    </div>
                </div>
            </div>
        )
    );
}

export default LocationModal;
