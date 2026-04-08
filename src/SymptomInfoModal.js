import React from 'react';
import './AboutModal.css'; // Re-use the existing modal styles
import { SYMPTOM_DATA } from './symptomData';

export default function SymptomInfoModal({ isOpen, onClose, symptomField }) {
  if (!isOpen || !symptomField) return null;

  const data = SYMPTOM_DATA[symptomField];
  if (!data) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ borderBottom: '3px solid var(--teal)' }}>
          <h2>{data.title}</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="modal-scroll-area">
          <div className="modal-section">
            <h3 style={{ color: 'var(--teal-dark)', borderBottomColor: 'var(--teal-light)' }}>What is it?</h3>
            <p>{data.definition}</p>
          </div>

          <div className="modal-section">
            <h3 style={{ color: 'var(--amber)', borderBottomColor: 'var(--amber-light)' }}>How does it reflect risk?</h3>
            <p>{data.howItMeasuresRisk}</p>
          </div>

          <div className="modal-section alert-box" style={{ background: 'var(--red-light)', border: '1px solid #f5a7a7' }}>
            <h3 style={{ color: 'var(--red)', borderBottomColor: 'rgba(220,53,69,0.2)' }}>Why is it critical?</h3>
            <p style={{ color: '#a52a2a', marginBottom: 0 }}>{data.criticality}</p>
          </div>

          <div className="modal-section" style={{ marginTop: '2rem' }}>
            <h3 style={{ color: 'var(--ink)', borderBottomColor: 'var(--border)' }}>Baseline vs. Symptom</h3>
            <p><strong>Baseline (Normal):</strong> {data.baseline.split('. ')[0] + '.'}</p>
            <p><strong>Clinical Symptom:</strong> {data.baseline.split('. ').slice(1).join('. ')}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="close-action-btn" onClick={onClose}>Got it</button>
        </div>
      </div>
    </div>
  );
}
