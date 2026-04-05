import React from 'react';

const CheckIcon = () => (
  <svg viewBox="0 0 12 12">
    <polyline points="2 6 5 9 10 3" />
  </svg>
);

/**
 * @param {string}   label      - Display label
 * @param {string}   field      - Key in formData
 * @param {boolean}  isPrimary  - Red highlight (true) vs teal highlight (false)
 * @param {boolean}  fullWidth  - Span both grid columns
 * @param {object}   formData   - Full form state object
 * @param {function} onChange   - (field, value: 0|1) => void
 */
export default function SymptomToggle({
  label,
  field,
  isPrimary = false,
  fullWidth = false,
  formData,
  onChange,
}) {
  const active = formData[field] === 1;
  const activeClass = active ? (isPrimary ? 'active-primary' : 'active-secondary') : '';

  return (
    <label className={`toggle-pill ${activeClass} ${fullWidth ? 'full-width' : ''}`}>
      <span className="pill-check">
        <CheckIcon />
      </span>
      <span className="pill-label">{label}</span>
      <input
        type="checkbox"
        style={{ display: 'none' }}
        checked={active}
        onChange={e => onChange(field, e.target.checked ? 1 : 0)}
      />
    </label>
  );
}
