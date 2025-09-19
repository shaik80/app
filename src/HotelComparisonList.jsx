export default function HotelComparisonList({ results }) {
  if (!results || results.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>No hotels to compare yet.</div>;
  }
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h3>Hotel Comparison Results</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Hotel</th>
            <th>Location</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {results.map((hotel, idx) => (
            <tr key={idx}>
              <td>{hotel.provider}</td>
              <td>{hotel.name}</td>
              <td>{hotel.location}</td>
              <td>{hotel.checkIn}</td>
              <td>{hotel.checkOut}</td>
              <td>${hotel.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
