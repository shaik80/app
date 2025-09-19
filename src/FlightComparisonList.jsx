export default function FlightComparisonList({ results }) {
  if (!results || results.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>No flights to compare yet.</div>;
  }
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h3>Flight Comparison Results</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Airline</th>
            <th>Flight</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {results.map((flight, idx) => (
            <tr key={idx}>
              <td>{flight.airline}</td>
              <td>{flight.flightNumber}</td>
              <td>{flight.departure}</td>
              <td>{flight.arrival}</td>
              <td>${flight.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
