import { useState } from 'react';

export default function MeccaMadinaSplit({ totalDays, onSplit }) {
  const [meccaDays, setMeccaDays] = useState(Math.floor(totalDays / 2));
  const [madinaDays, setMadinaDays] = useState(totalDays - Math.floor(totalDays / 2));

  function handleChangeMecca(e) {
    const val = Math.max(0, Math.min(totalDays, Number(e.target.value)));
    setMeccaDays(val);
    setMadinaDays(totalDays - val);
  }
  function handleChangeMadina(e) {
    const val = Math.max(0, Math.min(totalDays, Number(e.target.value)));
    setMadinaDays(val);
    setMeccaDays(totalDays - val);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onSplit({ mecca: meccaDays, madina: madinaDays });
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', color: '#007bff', marginBottom: 24 }}>How do you want to split your days?</h2>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 4 }}>Days in Mecca:</label>
        <input type="number" min={0} max={totalDays} value={meccaDays} onChange={handleChangeMecca} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc' }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 4 }}>Days in Madina:</label>
        <input type="number" min={0} max={totalDays} value={madinaDays} onChange={handleChangeMadina} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc' }} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <button type="submit" style={{ background: '#007bff', color: '#fff', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 4px #007bff22' }}>Continue</button>
      </div>
    </form>
  );
}
