import { useState } from 'react';

export default function HotelSearchForm({ onSearch }) {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location && checkIn && checkOut) {
      onSearch({ location, checkIn, checkOut });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Search Hotels</h2>
      <div>
        <label>Location:</label>
        <input value={location} onChange={e => setLocation(e.target.value)} required />
      </div>
      <div>
        <label>Check-in:</label>
        <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} required />
      </div>
      <div>
        <label>Check-out:</label>
        <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} required />
      </div>
      <button type="submit">Compare Hotels</button>
    </form>
  );
}
