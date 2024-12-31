import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css'; // Assuming consistent styling
import MapComponent from './MapComponent';

function AddressManagement() {
    const [addresses, setAddresses] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [editFormData, setEditFormData] = useState({ house: '', apartment: '', category: 'Home' });

    // Fetch saved addresses
    useEffect(() => {
        const fetchAddresses = async () => {
            const response = await axios.get('http://localhost:5000/addresses');
            setAddresses(response.data);
        };
        fetchAddresses();
    }, []);

    // Handle delete address
    const deleteAddress = async (id) => {
        await axios.delete(`http://localhost:5000/addresses/${id}`);
        setAddresses(addresses.filter((addr) => addr.id !== id));
    };

    // Handle edit button click
    const startEditing = (address) => {
        setIsEditing(address.id);
        setEditFormData({ ...address });
    };

    // Handle save updated address
    const saveUpdatedAddress = async () => {
        await axios.put(`http://localhost:5000/addresses/${isEditing}`, editFormData);
        setAddresses(addresses.map((addr) => (addr.id === isEditing ? editFormData : addr)));
        setIsEditing(null);
    };

    return (
        <div className="manage-address">
            <h2>Manage Addresses</h2>
            <ul>
                {addresses.map((address) => (
                    <li key={address.id} className="address-item">
                        {isEditing === address.id ? (
                            <div className="edit-form">
                                <input
                                    type="text"
                                    value={editFormData.house}
                                    onChange={(e) => setEditFormData({ ...editFormData, house: e.target.value })}
                                    placeholder="House/Flat/Block No."
                                />
                                <input
                                    type="text"
                                    value={editFormData.apartment}
                                    onChange={(e) => setEditFormData({ ...editFormData, apartment: e.target.value })}
                                    placeholder="Apartment/Road/Area"
                                />
                                <select
                                    value={editFormData.category}
                                    onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                                >
                                    <option value="Home">Home</option>
                                    <option value="Office">Office</option>
                                    <option value="Friends & Family">Friends & Family</option>
                                </select>
                                <button onClick={saveUpdatedAddress} className="save-button">Save</button>
                                <button onClick={() => setIsEditing(null)} className="cancel-button">Cancel</button>
                            </div>
                        ) : (
                            <div className="address-details">
                                <p>
                                    {address.house}, {address.apartment} ({address.category})
                                </p>
                                <button onClick={() => startEditing(address)} className="edit-button">Edit</button>
                                <button onClick={() => deleteAddress(address.id)} className="delete-button">Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AddressManagement;
