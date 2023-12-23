import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventRegister = () => {
//   const { event_id } = match.params;
  const event_id = window.location.pathname.split('/').pop();
  const [event, setEvent] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [teamId, setTeamId] = useState('');

      useEffect(() => {
        const fetchEventData = async () => {
          try {
            // const token = localStorage.getItem('myJwtToken');
            const response = await axios.get(`http://localhost:8000/api/events/${event_id}`, {
            //   headers: {
            //     Authorization: `Bearer ${token}`,
            //   },
            });
            setEvent(response.data);
          } catch (error) {
            console.error('Error fetching event data:', error.message);
          }
        };

        fetchEventData();
  }, [event_id]);

  const handleRegister = async () => {
    try {
        console.log("event id", event_id)
      const token = localStorage.getItem('myJwtToken');
      if (!token) {
        alert('Token not found: User Unauthenticated');
        window.location.href = '/login'; 
        return;
      }
    const response = await axios.post(`http://127.0.0.1:8000/api/auth/register-event/${event_id}/`, {
        team_name: teamName,
        team_id: teamId,
      }, {
        headers: {
          Authorization: `${token}`,
        },
      });

      alert(response.data.message);

      // You can add additional logic or redirect the user after successful registration

    } catch (error) {
        console.error('Error registering for event:', error.response.data.message);
        alert(`Error registering for event: ${error.response.data.message}`);
    }
  };

  return (
    <div>
      <h2>Event Registration</h2>
      {event ? (
        <div>
          <p>Event Name: {event.name}</p>
          <p>Event Description: {event.description}</p>
          {/* Add more event details as needed */}

          {event.is_team_event && (
            <div>
                <h3>Create Team</h3>
              <label htmlFor="teamName">Team Name:</label>
              <input
                type="text"
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
              <br />
              <h2>OR</h2>
              <h3>Join Team</h3>
              <label htmlFor="teamId">Team ID (Optional):</label>
              <input
                type="text"
                id="teamId"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
              />
            </div>
          )}
          <button onClick={handleRegister}>Register</button>
        </div>
      ) : (
        <p>Loading event data...</p>
      )}
    </div>
  );
};

export default EventRegister;
