import axios from 'axios';
import TopBarComponet from './TopBarComponet';
import React, { useEffect, useState } from 'react'

function ProfileComponent() {
    const [userData, setUserData] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    };

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('authToken');
            console.log(token);

            const res = await axios.get('http://127.0.0.1:8000/users/', {
                headers: {
                    'Authorization': `Token ${token}`  // Include the token in the request headers
                }
            });
            setUserData(res.data);
            console.log(userData[0].email);

        }
        catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    useEffect(() => {
        checkAuth(); // Check authentication status when the component mounts
        if (isAuthenticated) {
            fetchUserData(); // Fetch user data if authenticated
        }
    }, [isAuthenticated]);
    return (
        <>
            <TopBarComponet />
            {isAuthenticated ? (
                userData[0] ? (
                    <div>
                        <h2>User Profile</h2>
                        <p>Username: {userData[0].username}</p>
                        <p>Email: {userData[0].email}</p>
                        {/* Display other user data as needed */}
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )
            ) : (
                <p>You must be logged in to view this content.</p>
            )}
        </>
    )
}

export default ProfileComponent