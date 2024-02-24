import React, { useState, useEffect } from 'react';
import styles from './Frame.module.css';
import { Link, useParams } from 'react-router-dom';

const Event1 = () => {
  const { email } = useParams();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelect = (eventId) => {
    setSelectedEvent(eventId);
  };

  useEffect(() => {
    
    fetch(`http://localhost:3005/api/v1/events/${email}`) 
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, [email]);

  const handleDelete = async () => {
    if (selectedEvent) {
      try {
        const response = await fetch(`http://localhost:3005/api/v1/events/${selectedEvent}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          alert("Event Deleted Successfully");
          
          const updatedEvents = await fetch(`http://localhost:3005/api/v1/events/${email}`); 
          if (updatedEvents.ok) {
            const updatedEventsData = await updatedEvents.json();
            setEvents(updatedEventsData); 
            setSelectedEvent(null); 
          } else {
            console.error('Failed to fetch updated events data after deletion');
          }
        } else {
          console.error('Failed to delete event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <div className={styles.eventsParent}>
      {/* <div className={styles.events}>Events</div> */}
      <div className={styles.eventList}>Event List</div>
      <ul className={styles.frameChild}>
        {events.map((event) => (
          <li
            key={event._id}
            onClick={() => handleSelect(event._id)}
            className={selectedEvent === event._id ? styles.selectedEvent : ''}
          >
            <input
              type="radio"
              name="selectedEvent"
              value={event._id}
              checked={selectedEvent === event._id}
              onChange={() => handleSelect(event._id)}
            />
            {event.event_name}
          </li>
        ))}
      </ul>
      <div className={styles.frameItem} />
      <div className={styles.frameInner} />
      <div className={styles.back}>
        <Link to={`/login/profile/${email}`}>Back</Link>
      </div>
      <div className={styles.delete} onClick={handleDelete}>
        Delete
      </div>
    </div>
  );
};

export default Event1;
