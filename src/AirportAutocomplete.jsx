import { useState } from 'react';

// Example airport data for autocomplete
const AIRPORTS = [
  { code: 'JFK', city: 'New York', name: 'John F. Kennedy International' },
  { code: 'LHR', city: 'London', name: 'Heathrow' },
  { code: 'DXB', city: 'Dubai', name: 'Dubai International' },
  { code: 'HND', city: 'Tokyo', name: 'Haneda' },
  { code: 'CDG', city: 'Paris', name: 'Charles de Gaulle' },
  { code: 'SIN', city: 'Singapore', name: 'Changi' },
  { code: 'SYD', city: 'Sydney', name: 'Kingsford Smith' },
  { code: 'FRA', city: 'Frankfurt', name: 'Frankfurt' },
  { code: 'LAX', city: 'Los Angeles', name: 'Los Angeles International' },
  { code: 'IST', city: 'Istanbul', name: 'Istanbul Airport' },
];

export default function AirportAutocomplete({ label, value, onChange }) {
  const [query, setQuery] = useState(value || '');
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const filtered = AIRPORTS.filter(a =>
    a.city.toLowerCase().includes(query.toLowerCase()) ||
    a.code.toLowerCase().includes(query.toLowerCase()) ||
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  function handleSelect(a) {
    setQuery(`${a.city} (${a.code})`);
    onChange(`${a.city} (${a.code})`);
    setShow(false);
  }

  return (
  <div style={{ position: 'relative', marginBottom: 24, fontFamily: 'Inter, Arial, sans-serif' }}>
  <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#222', letterSpacing: 0.2 }}>{label}</label>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: focused ? '#eaf3ff' : '#f6f8fa',
          borderRadius: 10,
          border: focused ? '2px solid #007bff' : '1.5px solid #d0d7de',
          boxShadow: focused ? '0 4px 16px #007bff22' : '0 1px 4px #0001',
          transition: 'all 0.2s',
          padding: '0.5rem 1rem',
        }}
      >
  <svg width="20" height="20" fill="#007bff" style={{ marginRight: 10, flexShrink: 0 }} viewBox="0 0 20 20"><path d="M8.5 2a6.5 6.5 0 015.18 10.5l3.16 3.16a1 1 0 01-1.32 1.5l-.1-.08-3.16-3.16A6.5 6.5 0 118.5 2zm0 2a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"/></svg>
        <input
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setShow(true);
          }}
          onFocus={() => { setShow(true); setFocused(true); }}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            padding: '0.5rem 0',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: 17,
            color: '#222',
            fontWeight: 500,
            letterSpacing: 0.1,
          }}
          autoComplete="off"
        />
      </div>
      <div style={{ position: 'relative' }}>
        {show && filtered.length > 0 && (
          <div style={{
            position: 'absolute',
            zIndex: 10,
            background: '#fff',
            border: '1.5px solid #d0d7de',
            borderRadius: 10,
            width: '100%',
            maxHeight: 220,
            overflowY: 'auto',
            boxShadow: '0 8px 32px #007bff22',
            marginTop: 2,
            animation: 'fadeIn 0.2s',
          }}>
            {filtered.map(a => (
              <div
                key={a.code}
                style={{
                  padding: '0.65rem 1rem',
                  cursor: 'pointer',
                  transition: 'background 0.18s',
                  borderBottom: '1px solid #f0f0f0',
                  fontSize: 16,
                  fontWeight: 500,
                  color: '#222',
                }}
                onMouseDown={() => handleSelect(a)}
                onMouseOver={e => e.currentTarget.style.background = '#eaf3ff'}
                onMouseOut={e => e.currentTarget.style.background = '#fff'}
              >
                <span style={{ color: '#007bff', fontWeight: 700 }}>{a.city}</span> <span style={{ color: '#888', fontWeight: 600 }}>({a.code})</span> <span style={{ color: '#444', fontWeight: 400 }}>– {a.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
