import React, { useState } from 'react';

const totalSeats = 80;
const seatsPerRow = 7;
const lastRowSeats = 3;
const rows = Math.ceil(totalSeats / seatsPerRow);

const Coach = () => {
  const [seats, setSeats] = useState(Array(totalSeats).fill(0));
  const [inputSeats, setInputSeats] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [message, setMessage] = useState('');

  const bookSeats = (requiredSeats) => {
    let availableSeats = [];

    for (let row = 0; row < rows; row++) {
      const isLastRow = row === rows - 1;
      const rowSeatCount = isLastRow ? lastRowSeats : seatsPerRow;
      const start = row * seatsPerRow;
      const end = start + rowSeatCount;

      const rowSeats = seats.slice(start, end);
      const freeSeats = rowSeats
        .map((seat, index) => (seat === 0 ? index + start : -1))
        .filter(i => i !== -1);

      if (freeSeats.length >= requiredSeats) {
        availableSeats = freeSeats.slice(0, requiredSeats);
        break;
      }
    }

    if (availableSeats.length === 0) {
      availableSeats = seats
        .map((seat, index) => (seat === 0 ? index : -1))
        .filter(i => i !== -1)
        .slice(0, requiredSeats);
    }

    if (availableSeats.length < requiredSeats) {
      setMessage('Not enough seats available.');
      setBookedSeats([]);
      return;
    }

    const updatedSeats = [...seats];
    availableSeats.forEach((seat) => (updatedSeats[seat] = 1));

    setSeats(updatedSeats);
    setBookedSeats(availableSeats);
    setMessage('');
  };

  const handleBooking = () => {
    const seatCount = parseInt(inputSeats, 10);
    if (seatCount > 0 && seatCount <= 7) {
      bookSeats(seatCount);
    } else {
      setMessage('Please enter a valid number of seats (1-7).');
      setBookedSeats([]);
    }
  };

  return (
    <div className="booking-container">
      <div className="input-section">
        <h1>Train Seat Booking</h1>
        <input
          type="number"
          value={inputSeats}
          onChange={(e) => setInputSeats(e.target.value)}
          min="1"
          max="7"
          placeholder="Enter seats (1-7)"
        />
        <button onClick={handleBooking}>Book Seats</button>
        {message && <div className="message">{message}</div>}
        <div className="booked-output">
          {bookedSeats.length > 0 && (
            <div>
              <h3>Booked Seats:</h3>
              <p>{bookedSeats.map(seat => seat + 1).join(', ')}</p>
            </div>
          )}
        </div>
      </div>
      <div className="coach">
        {Array.from({ length: rows }).map((_, rowIndex) => {
          const isLastRow = rowIndex === rows - 1;
          const rowSeatCount = isLastRow ? lastRowSeats : seatsPerRow;
          const start = rowIndex * seatsPerRow;
          const end = start + rowSeatCount;

          return (
            <div key={rowIndex} className="row">
              {seats.slice(start, end).map((seat, seatIndex) => (
                <div
                  key={seatIndex}
                  className={`seat ${seats[start + seatIndex] === 1 ? 'booked' : 'available'}`}
                >
                  {start + seatIndex + 1}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <h1>GitHub Link: https://github.com/Sai-Chakradhar-Mahendrakar/Seats_Booking_ReactJS</h1>
    </div>
  );
};

export default Coach;
