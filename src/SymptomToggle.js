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
 * @param {function} onInfoClick- (field) => void
 */
export default function SymptomToggle({
  label,
  field,
  isPrimary = false,
  fullWidth = false,
  formData,
  onChange,
  onInfoClick,
}) {
  const active = formData[field] === 1;
  const activeClass = active ? (isPrimary ? 'active-primary' : 'active-secondary') : '';

  return (
    <label className={`toggle-pill ${activeClass} ${fullWidth ? 'full-width' : ''}`}>
      <span className="pill-check">
        <CheckIcon />
      </span>
      <span className="pill-label">{label}</span>
      
      {onInfoClick && (
        <button 
          type="button" 
          className="symptom-info-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onInfoClick(field);
          }}
          title="Learn more about this symptom"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </button>
      )}

      <input
        type="checkbox"
        style={{ display: 'none' }}
        checked={active}
        onChange={e => onChange(field, e.target.checked ? 1 : 0)}
      />
    </label>
  );
}
