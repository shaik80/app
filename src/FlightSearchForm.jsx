
import { useState } from 'react';
import AirportAutocomplete from './AirportAutocomplete';

export default function FlightSearchForm({ onSearch }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [roundTrip, setRoundTrip] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (origin && destination && departDate && (!roundTrip || returnDate)) {
      onSearch({ origin, destination, departDate, returnDate: roundTrip ? returnDate : null, roundTrip });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2 style={{ textAlign: 'center', color: '#007bff', marginBottom: 24 }}>Search Flights</h2>
      <AirportAutocomplete label="Origin" value={origin} onChange={setOrigin} />
      <AirportAutocomplete label="Destination" value={destination} onChange={setDestination} />
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <input type="checkbox" id="roundTrip" checked={roundTrip} onChange={e => setRoundTrip(e.target.checked)} style={{ marginRight: 8 }} />
        <label htmlFor="roundTrip" style={{ fontWeight: 500, color: '#007bff', cursor: 'pointer' }}>Round Trip</label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 4 }}>Departure Date:</label>
        <input type="date" value={departDate} onChange={e => setDepartDate(e.target.value)} required style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc' }} />
      </div>
      {roundTrip && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Return Date:</label>
          <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} required={roundTrip} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
      )}
      <button type="submit" style={{ width: '100%', background: '#007bff', color: '#fff', border: 'none', borderRadius: 8, padding: '0.75rem', fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 4px #007bff22' }}>Compare Flights</button>
    </form>
  );
}
