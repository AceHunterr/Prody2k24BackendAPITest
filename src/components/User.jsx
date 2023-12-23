import React, { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cookieToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('jwt='))
          ?.split('=')[1];

        const storedToken = localStorage.getItem('myJwtToken'); 
        if (!cookieToken && !storedToken) {
          throw new Error('Token not found');
        }

        const tokenToUse = cookieToken || storedToken;

        const response = await axios.get('http://127.0.0.1:8000/api/auth/user/', {
          headers: {
            Authorization: `${tokenToUse}`,
          },
        });

        setUser(response.data.user);
      } catch (error) {
        alert(`Error fetching user data: ${error.message}`);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <div>
          <p>User ID: {user.user_id}</p>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          {user.registered_events && (
            <div>
                <h3>Registered Events:</h3>
                <ul>
                {user.registered_events.is_live_events.map(event => (
                    <li key={event.id}>
                    <strong>{event.name}</strong> - Live Event
                    </li>
                ))}
                {user.registered_events.is_completed_events.map(event => (
                    <li key={event.id}>
                    <strong>{event.name}</strong> - Completed Event
                    </li>
                ))}
                {user.registered_events.is_upcoming_events.map(event => (
                    <li key={event.id}>
                    <strong>{event.name}</strong> - Upcoming Event
                    </li>
                ))}
                </ul>
            </div>
            )}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default User;
