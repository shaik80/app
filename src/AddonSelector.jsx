import { useState } from 'react';

const ADDONS = [
  { id: 'food', label: 'Food' },
  { id: 'visa', label: 'Visa' },
  { id: 'laundry', label: 'Laundry' },
  { id: 'insurance', label: 'Insurance (soon)' },
  { id: 'wifi', label: 'Wifi' },
];

export default function AddonSelector({ selected, onChange }) {
  function handleToggle(id) {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  }
  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h3>Add-on Services</h3>
      {ADDONS.map((addon) => (
        <div key={addon.id}>
          <label>
            <input
              type="checkbox"
              checked={selected.includes(addon.id)}
              onChange={() => handleToggle(addon.id)}
            />
            {addon.label}
          </label>
        </div>
      ))}
    </div>
  );
}
