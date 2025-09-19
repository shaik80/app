import React, { useState } from 'react';
import jsPDF from 'jspdf';
// Helper to generate hotel booking PDF
function generateHotelBookingPDF(app) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Hotel Booking Confirmation', 20, 20);
  doc.setFontSize(12);
  doc.text(`Name: ${app.name}`, 20, 35);
  doc.text(`Flight PNR: ${app.flight.pnr} (${app.flight.airline})`, 20, 45);
  doc.text('Mecca Hotel:', 20, 60);
  doc.text(`  ${app.meccaHotel.name}`, 30, 70);
  doc.text(`  Check-in: ${app.meccaHotel.checkIn}`, 30, 78);
  doc.text(`  Check-out: ${app.meccaHotel.checkOut}`, 30, 86);
  doc.text('Madina Hotel:', 20, 102);
  doc.text(`  ${app.madinaHotel.name}`, 30, 112);
  doc.text(`  Check-in: ${app.madinaHotel.checkIn}`, 30, 120);
  doc.text(`  Check-out: ${app.madinaHotel.checkOut}`, 30, 128);
  doc.text('Add-ons:', 20, 144);
  doc.text(`  ${app.addons.join(', ')}`, 30, 152);
  doc.save(`${app.name.replace(/\s+/g, '_')}_Hotel_Booking.pdf`);
}

// Mock data for demonstration
const mockApplications = [
  {
    id: 1,
    name: 'Ahmed Khan',
    status: 'Pending',
    flight: {
      pnr: 'PNR12345',
      airline: 'Saudia',
      depart: '2025-10-01',
      return: '2025-10-15',
    },
    meccaHotel: {
      name: 'Hilton Mecca',
      checkIn: '2025-10-01',
      checkOut: '2025-10-07',
    },
    madinaHotel: {
      name: 'Pullman Madina',
      checkIn: '2025-10-07',
      checkOut: '2025-10-15',
    },
    addons: ['Food', 'Visa', 'Wifi'],
    visaApproved: false,
    comment: '',
  },
  {
    id: 2,
    name: 'Fatima Noor',
    status: 'Pending',
    flight: {
      pnr: 'PNR67890',
      airline: 'Emirates',
      depart: '2025-11-05',
      return: '2025-11-20',
    },
    meccaHotel: {
      name: 'Swissotel Mecca',
      checkIn: '2025-11-05',
      checkOut: '2025-11-12',
    },
    madinaHotel: {
      name: 'Anwar Al Madinah',
      checkIn: '2025-11-12',
      checkOut: '2025-11-20',
    },
    addons: ['Visa', 'Insurance (soon)'],
    visaApproved: false,
    comment: '',
  },
];

export default function AdminApplications() {
  const [applications, setApplications] = useState(mockApplications);
  const [commentDrafts, setCommentDrafts] = useState(() => {
    const obj = {};
    mockApplications.forEach(app => { obj[app.id] = app.comment || ''; });
    return obj;
  });

  const handleApproveVisa = (id) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, visaApproved: true, status: 'Visa Approved' } : app
    ));
  };

  const handleCommentDraftChange = (id, value) => {
    setCommentDrafts(d => ({ ...d, [id]: value }));
  };

  const handleSendComment = (id) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, comment: commentDrafts[id] } : app
    ));
  };

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 32 }}>
      <h1 style={{ textAlign: 'center', color: '#007bff', marginBottom: 32 }}>Umrah Applications</h1>
      {applications.map(app => (
        <div key={app.id} style={{ border: '1px solid #e0e0e0', borderRadius: 12, marginBottom: 24, padding: 24, background: '#f8fafc' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 20 }}>{app.name}</div>
            <div style={{ color: app.visaApproved ? 'green' : '#ff9800', fontWeight: 600 }}>{app.status}</div>
          </div>
          <div style={{ marginBottom: 8 }}><b>Flight PNR:</b> {app.flight.pnr} ({app.flight.airline})</div>
          <div style={{ marginBottom: 8 }}><b>Flight Dates:</b> {app.flight.depart} to {app.flight.return}</div>
          <div style={{ marginBottom: 8 }}><b>Mecca Hotel:</b> {app.meccaHotel.name} ({app.meccaHotel.checkIn} to {app.meccaHotel.checkOut})</div>
          <div style={{ marginBottom: 8 }}><b>Madina Hotel:</b> {app.madinaHotel.name} ({app.madinaHotel.checkIn} to {app.madinaHotel.checkOut})</div>
          <div style={{ marginBottom: 8 }}><b>Add-ons:</b> {app.addons.join(', ')}</div>
          <div style={{ margin: '12px 0 8px 0' }}>
            <label style={{ fontWeight: 500, color: '#007bff' }}>Admin Comment:</label>
            <textarea
              value={commentDrafts[app.id]}
              onChange={e => handleCommentDraftChange(app.id, e.target.value)}
              placeholder="Add a comment if something is missing..."
              style={{ width: '100%', minHeight: 48, borderRadius: 8, border: '1px solid #bdbdbd', marginTop: 4, padding: 8, fontSize: 15 }}
            />
            <button
              style={{
                marginTop: 8,
                padding: '0.4rem 1.2rem',
                borderRadius: 8,
                background: '#007bff',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                float: 'right',
              }}
              onClick={() => handleSendComment(app.id)}
            >
              Send Comment
            </button>
            {app.comment && (
              <div style={{ marginTop: 8, color: '#333', background: '#e3f0ff', borderRadius: 6, padding: 8, fontSize: 15 }}>
                <b>Last Comment:</b> {app.comment}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 12 }}>
            <button
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: 8,
                background: app.visaApproved ? '#bdbdbd' : '#007bff',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                fontSize: 16,
                cursor: app.visaApproved ? 'not-allowed' : 'pointer',
                opacity: app.visaApproved ? 0.7 : 1,
              }}
              disabled={app.visaApproved}
              onClick={() => handleApproveVisa(app.id)}
            >
              {app.visaApproved ? 'Visa Approved' : 'Approve Visa'}
            </button>
            <button
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: 8,
                background: '#4caf50',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
              }}
              onClick={() => generateHotelBookingPDF(app)}
            >
              Download Hotel Booking PDF
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
