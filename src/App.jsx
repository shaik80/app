
// Flight Comparison App Structure Plan:
// - Flight Search/Compare Page: Form for users to search and compare flights (origin, destination, date, etc.)
// - Admin Stats Page: View all searches/comparisons and summary stats (total searches, popular routes, etc.)
// - Routing: React Router for navigation between User and Admin pages
// - State: Store searches/comparisons in React state (local only for now)
// - Components: FlightSearchForm, FlightComparisonList, StatsSummary, Navigation





import { useState } from 'react';
import FlightSearchForm from './FlightSearchForm';
import FlightComparisonList from './FlightComparisonList';
import HotelSearchForm from './HotelSearchForm';
import HotelComparisonList from './HotelComparisonList';
import AddonSelector from './AddonSelector';
import MeccaMadinaSplit from './MeccaMadinaSplit';
import AdminApplications from './AdminApplications';
import './App.css';




function App() {
  // Step: 0=flight, 1=split, 2=mecca hotel, 3=madina hotel, 4=addon, 5=summary, 99=admin
  const [step, setStep] = useState(0);

  // Flight state
  const [flightSearch, setFlightSearch] = useState(null);
  const [flightResults, setFlightResults] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);

  // Split state
  const [split, setSplit] = useState({ mecca: 0, madina: 0 });

  // Mecca hotel state
  const [meccaHotelResults, setMeccaHotelResults] = useState([]);
  const [selectedMeccaHotel, setSelectedMeccaHotel] = useState(null);
  // Madina hotel state
  const [madinaHotelResults, setMadinaHotelResults] = useState([]);
  const [selectedMadinaHotel, setSelectedMadinaHotel] = useState(null);

  // Addon state
  const [addons, setAddons] = useState([]);

  // Mock flight data generator
  function getMockFlights({ origin, destination, date }) {
    return [
      {
        airline: 'Air Alpha',
        flightNumber: 'AA123',
        departure: `${origin} 08:00`,
        arrival: `${destination} 10:00`,
        price: 199,
      },
      {
        airline: 'Beta Airlines',
        flightNumber: 'BA456',
        departure: `${origin} 09:30`,
        arrival: `${destination} 11:30`,
        price: 185,
      },
      {
        airline: 'Gamma Flights',
        flightNumber: 'GF789',
        departure: `${origin} 12:00`,
        arrival: `${destination} 14:00`,
        price: 210,
      },
    ];
  }

  // Mock hotel data generator
  function getMockHotels({ location, checkIn, checkOut }) {
    return [
      {
        provider: 'Agoda',
        name: 'Hotel Alpha',
        location,
        checkIn,
        checkOut,
        price: 120,
      },
      {
        provider: 'Booking',
        name: 'Hotel Beta',
        location,
        checkIn,
        checkOut,
        price: 115,
      },
      {
        provider: 'Soon',
        name: 'Hotel Gamma',
        location,
        checkIn,
        checkOut,
        price: 130,
      },
    ];
  }

  // Step 0: Flight search/compare
  function handleFlightSearch(form) {
    setFlightSearch(form);
    setFlightResults(getMockFlights(form));
    setSelectedFlight(null);
  }
  function handleSelectFlight(flight) {
    setSelectedFlight(flight);
  }

  // Step 1: Hotel search/compare
  function handleHotelSearch(form) {
    setHotelSearch(form);
    setHotelResults(getMockHotels(form));
    setSelectedHotel(null);
  }
  function handleSelectHotel(hotel) {
    setSelectedHotel(hotel);
  }

  // Navigation
  function nextStep() {
    setStep((s) => Math.min(s + 1, 5));
  }
  function prevStep() {
    setStep((s) => Math.max(s - 1, 0));
  }

  // Stepper UI
  function Stepper() {
    const steps = ['Flight', 'Split Days', 'Mecca Hotel', 'Madina Hotel', 'Add-ons', 'Summary'];
    if (step === 99) return null;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0 1.5rem 0', gap: 16 }}>
        {steps.map((label, idx) => (
          <div key={label} style={{
            padding: '0.75rem 2rem',
            borderRadius: 24,
            background: idx === step ? '#007bff' : '#f0f4f8',
            color: idx === step ? '#fff' : '#333',
            fontWeight: idx === step ? 700 : 500,
            fontSize: 18,
            boxShadow: idx === step ? '0 2px 8px #007bff33' : 'none',
            border: idx === step ? '2px solid #007bff' : '2px solid #e0e0e0',
            transition: 'all 0.2s',
          }}>{label}</div>
        ))}
      </div>
    );
  }

  // Step content
  let content;
  const cardStyle = {
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 2px 16px #0001',
    padding: '2rem',
    maxWidth: 500,
    margin: '2rem auto',
    border: '1px solid #e0e0e0',
  };
  const buttonStyle = {
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '0.75rem 2rem',
    fontSize: 16,
    fontWeight: 600,
    margin: '0 0.5rem',
    cursor: 'pointer',
    boxShadow: '0 1px 4px #007bff22',
    transition: 'background 0.2s',
    outline: 'none',
    minWidth: 120,
    opacity: 1,
    display: 'inline-block',
  };
  const buttonDisabled = {
    ...buttonStyle,
    background: '#b0c4de',
    cursor: 'not-allowed',
    opacity: 0.7,
  };

  // Helper to get date ranges
  function addDays(dateStr, days) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  if (step === 99) {
    content = <AdminApplications />;
  } else if (step === 0) {
    content = (
      <div style={cardStyle}>
        <h1 style={{ textAlign: 'center', marginBottom: 24, color: '#007bff', fontSize: 32 }}>Flight Comparison</h1>
        <FlightSearchForm onSearch={handleFlightSearch} />
        <FlightComparisonList results={flightResults} />
        {flightResults.length > 0 && (
          <div style={{ margin: '1.5rem 0' }}>
            <h3 style={{ color: '#333', marginBottom: 12 }}>Select a Flight</h3>
            {flightResults.map((f, idx) => (
              <div key={idx} style={{ border: selectedFlight === f ? '2px solid #007bff' : '1px solid #ccc', margin: '0.5rem 0', padding: '0.75rem 1rem', borderRadius: 8, background: selectedFlight === f ? '#e6f7ff' : '#fafbfc', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 500 }}>{f.airline} {f.flightNumber} - <span style={{ color: '#007bff' }}>${f.price}</span></span>
                <button style={buttonStyle} onClick={() => handleSelectFlight(f)}>Select</button>
              </div>
            ))}
          </div>
        )}
        <div style={{ textAlign: 'center', margin: '2rem 0 0 0' }}>
          <button style={selectedFlight ? buttonStyle : buttonDisabled} onClick={nextStep} disabled={!selectedFlight}>Next: Split Days</button>
        </div>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button style={{ ...buttonStyle, background: '#333' }} onClick={() => setStep(99)}>Admin: View Applications</button>
        </div>
      </div>
    );
  } else if (step === 1) {
    // Calculate total days from flightSearch
    let totalDays = 1;
    if (flightSearch && flightSearch.departDate && flightSearch.returnDate) {
      const d1 = new Date(flightSearch.departDate);
      const d2 = new Date(flightSearch.returnDate);
      totalDays = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));
    }
    // Calculate Mecca and Madina dates for preview
    let meccaCheckIn = flightSearch?.departDate;
    let meccaCheckOut = addDays(meccaCheckIn, split.mecca);
    let madinaCheckIn = meccaCheckOut;
    let madinaCheckOut = flightSearch?.returnDate;
    content = (
      <div style={cardStyle}>
        <MeccaMadinaSplit totalDays={totalDays} onSplit={split => { setSplit(split); nextStep(); }} />
        <div style={{ margin: '1.5rem 0 0 0', background: '#f8fafc', borderRadius: 12, padding: 16, fontSize: 16 }}>
          <div style={{ marginBottom: 8 }}>
            <b>Mecca:</b> {meccaCheckIn} to {meccaCheckOut} ({split.mecca || 0} nights)
          </div>
          <div>
            <b>Madina:</b> {madinaCheckIn} to {madinaCheckOut} ({split.madina || 0} nights)
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button style={buttonStyle} onClick={prevStep}>Back</button>
        </div>
      </div>
    );
  } else if (step === 2) {
    // Mecca hotel selection
    // Calculate Mecca dates
    let meccaCheckIn = flightSearch?.departDate;
    let meccaCheckOut = addDays(meccaCheckIn, split.mecca);
    const meccaHotels = getMockHotels({ location: 'Mecca', checkIn: meccaCheckIn, checkOut: meccaCheckOut });
    content = (
      <div style={cardStyle}>
        <h1 style={{ textAlign: 'center', marginBottom: 24, color: '#007bff', fontSize: 32 }}>Hotels in Mecca</h1>
        <HotelComparisonList results={meccaHotels} />
        {meccaHotels.length > 0 && (
          <div style={{ margin: '1.5rem 0' }}>
            <h3 style={{ color: '#333', marginBottom: 12 }}>Select a Hotel in Mecca</h3>
            {meccaHotels.map((h, idx) => (
              <div key={idx} style={{ border: selectedMeccaHotel === h ? '2px solid #007bff' : '1px solid #ccc', margin: '0.5rem 0', padding: '0.75rem 1rem', borderRadius: 8, background: selectedMeccaHotel === h ? '#e6f7ff' : '#fafbfc', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 500 }}>{h.provider} {h.name} - <span style={{ color: '#007bff' }}>${h.price}</span></span>
                <button style={buttonStyle} onClick={() => setSelectedMeccaHotel(h)}>Select</button>
              </div>
            ))}
          </div>
        )}
        <div style={{ textAlign: 'center', margin: '2rem 0 0 0' }}>
          <button style={buttonStyle} onClick={prevStep}>Back</button>
          <button style={selectedMeccaHotel ? buttonStyle : buttonDisabled} onClick={nextStep} disabled={!selectedMeccaHotel}>Next: Madina Hotel</button>
        </div>
      </div>
    );
  } else if (step === 3) {
    // Madina hotel selection
    // Calculate Madina dates
    let madinaCheckIn = addDays(flightSearch?.departDate, split.mecca);
    let madinaCheckOut = flightSearch?.returnDate;
    const madinaHotels = getMockHotels({ location: 'Madina', checkIn: madinaCheckIn, checkOut: madinaCheckOut });
    content = (
      <div style={cardStyle}>
        <h1 style={{ textAlign: 'center', marginBottom: 24, color: '#007bff', fontSize: 32 }}>Hotels in Madina</h1>
        <HotelComparisonList results={madinaHotels} />
        {madinaHotels.length > 0 && (
          <div style={{ margin: '1.5rem 0' }}>
            <h3 style={{ color: '#333', marginBottom: 12 }}>Select a Hotel in Madina</h3>
            {madinaHotels.map((h, idx) => (
              <div key={idx} style={{ border: selectedMadinaHotel === h ? '2px solid #007bff' : '1px solid #ccc', margin: '0.5rem 0', padding: '0.75rem 1rem', borderRadius: 8, background: selectedMadinaHotel === h ? '#e6f7ff' : '#fafbfc', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 500 }}>{h.provider} {h.name} - <span style={{ color: '#007bff' }}>${h.price}</span></span>
                <button style={buttonStyle} onClick={() => setSelectedMadinaHotel(h)}>Select</button>
              </div>
            ))}
          </div>
        )}
        <div style={{ textAlign: 'center', margin: '2rem 0 0 0' }}>
          <button style={buttonStyle} onClick={prevStep}>Back</button>
          <button style={selectedMadinaHotel ? buttonStyle : buttonDisabled} onClick={nextStep} disabled={!selectedMadinaHotel}>Next: Add-ons</button>
        </div>
      </div>
    );
  } else if (step === 4) {
    content = (
      <div style={cardStyle}>
        <h1 style={{ textAlign: 'center', marginBottom: 24, color: '#007bff', fontSize: 32 }}>Add-on Services</h1>
        <AddonSelector selected={addons} onChange={setAddons} />
        <div style={{ textAlign: 'center', margin: '2rem 0 0 0' }}>
          <button style={buttonStyle} onClick={prevStep}>Back</button>
          <button style={buttonStyle} onClick={nextStep}>Next: Summary</button>
        </div>
      </div>
    );
  } else {
    content = (
      <div style={cardStyle}>
        <h1 style={{ textAlign: 'center', marginBottom: 24, color: '#007bff', fontSize: 32 }}>Summary</h1>
        <h3 style={{ color: '#333', marginTop: 0 }}>Flight</h3>
        {selectedFlight ? (
          <div style={{ marginBottom: 16 }}>{selectedFlight.airline} {selectedFlight.flightNumber} - <span style={{ color: '#007bff' }}>${selectedFlight.price}</span></div>
        ) : <div style={{ marginBottom: 16 }}>No flight selected.</div>}
        <h3 style={{ color: '#333', marginTop: 0 }}>Mecca Hotel</h3>
        {selectedMeccaHotel ? (
          <div style={{ marginBottom: 16 }}>{selectedMeccaHotel.provider} {selectedMeccaHotel.name} - <span style={{ color: '#007bff' }}>${selectedMeccaHotel.price}</span></div>
        ) : <div style={{ marginBottom: 16 }}>No hotel selected.</div>}
        <h3 style={{ color: '#333', marginTop: 0 }}>Madina Hotel</h3>
        {selectedMadinaHotel ? (
          <div style={{ marginBottom: 16 }}>{selectedMadinaHotel.provider} {selectedMadinaHotel.name} - <span style={{ color: '#007bff' }}>${selectedMadinaHotel.price}</span></div>
        ) : <div style={{ marginBottom: 16 }}>No hotel selected.</div>}
        <h3 style={{ color: '#333', marginTop: 0 }}>Add-ons</h3>
        {addons.length > 0 ? (
          <ul style={{ margin: 0, paddingLeft: 20 }}>{addons.map(a => <li key={a}>{a}</li>)}</ul>
        ) : <div>No add-ons selected.</div>}
        <div style={{ textAlign: 'center', margin: '2rem 0 0 0' }}>
          <button style={buttonStyle} onClick={prevStep}>Back</button>
          <button style={buttonStyle} onClick={() => window.location.reload()}>Start Over</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f6f8fa', minHeight: '100vh', paddingBottom: 40 }}>
      <Stepper />
      {content}
    </div>
  );
}

export default App
