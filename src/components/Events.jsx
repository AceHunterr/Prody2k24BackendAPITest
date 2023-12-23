import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/events/');
        setEvents(response.data);
      } catch (error) {
        alert(`Error fetching event data: ${error.response.data.message}`);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Events:</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            
            <strong>{event.name}</strong>
            <p>Description: {event.description}</p>
            {event.is_live && (
                <p>is_live: true</p>
                )}
            {/* <p>is_completed: {event.is_completed}</p>
            <p>is_team_event: {event.is_team_event}</p> */}
            <p>date_time: {event.date_time}</p>
            <p>poster: {event.poster}</p>
            {/* Add more event details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
