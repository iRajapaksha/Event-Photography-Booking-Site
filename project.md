BookmyShoot

A marketplace to book a photography event

## Photographer

-Register
-Login
-Create event
-Update event
-Delete event
-View events

## User

-Register
-Login
-Search
-Book
-View Bookings

## Models

-Photographer
-Customer
-Event
-Booking
-Request

Photographer
-email
-password
-name
-phone
-location
-image
-years of experience
-events

User
-email
-passowrd
-name
-image

event
-event name
-photographer_id
-photographer_name
-images
-desription
-duration
-price

Booking
-event name
-photographer_id
-photographer_name
-date
-description
-duration
-status

Request
-customer_id
-customer_name
-event_id
-event_name
-date
-duration
-Respond

Authentications

Photographer
-create/update/delete event

Customer
-create booking

## API

User

Post
/api/v1/users

- name
- email
- password

- user / error

Get
/api/v1/users

Delete
/api/v1/users/:id

Put
/api/v1/users/:id

Event

Post
/api/v1/events

- event name
- images
- duration
- description
- price

- vent/error
