import React, { useState, useEffect } from 'react';
import styles from './Frame.module.css';

function EventCard({ event }) {

  console.log(event.images.map((image)=>{return image}));
  return (
    <div className={styles.eventCard}>
    <h2>{event.event_name}</h2>
      <div className={styles.imageContainer}>
        {event.images.map((image, index) => (
          <img key={index}  src={`http://localhost:3005/uploads/events${image}`} alt={`Capture ${index + 1}`} />
        ))}
      </div>
      <p>Photographer name: {event.first_name} {event.last_name}</p>
      <p>City: {event.city}</p>
      <p>Phone: {event.phone}</p>
      <p>Email: {event.email}</p>
      <p>Years of Experience: {event.years_of_experience}</p>
    </div>
  );
}

function EventsPage() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const handlePrevClick = () => {
    setCurrentEventIndex(currentEventIndex === events.length - 1 ? 0 : currentEventIndex - 1);
  };

  const handleNextClick = () => {
    setCurrentEventIndex(currentEventIndex === events.length - 1 ? 0 : currentEventIndex + 1);
  };

  const [events, setEvents] = useState([]);
  useEffect(() => {
    
    fetch('http://localhost:3005/api/v1/events/all') 
      .then((response) => response.json())
      .then((data) => {
        const eventData = data.map((event) => {
          return {
            id: event._id,
            event_name: event.event_name,
            first_name: event.first_name,
            last_name: event.last_name,
            city: event.city,
            phone: event.phone,
            email: event.email,
            images: event.images,
            years_of_experience: event.years_of_experience,
          };
        });
        setEvents(eventData);
        setIsLoading(false);
      })
      .catch((error) => {console.error('Error fetching events:', error )
      setIsLoading(false);
    });
  }, []);
  console.log(events);

  return (
    <div className={styles.eventsPage}>
      <div className={styles.eventCardsContainer}>
      {isLoading ? ( 
          <p>Loading...</p>
        ) : (
          <>
          <button className={styles.arrowButton} onClick={handlePrevClick}>
          &lt; Prev
          </button>
          <EventCard event={events[currentEventIndex]} />
          <button className={styles.arrowButton} onClick={handleNextClick}>
          Next &gt;
        </button>
        </>       
        )}
          </div>
    </div>
  );
}

export default EventsPage;
