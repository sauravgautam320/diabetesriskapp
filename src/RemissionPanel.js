import React, { useState } from 'react';

const ScaleIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 3v18M3 9l9-6 9 6M5 21h14" />
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

/**
 * DiRECT multipliers derived from trial outcome data.
 * ≥15 kg → ~86% reduction, ≥10 kg → ~57%, ≥5 kg → ~34%.
 */
function simulateRisk(baseRisk, weightLoss) {
  if (weightLoss >= 15) return (baseRisk * 0.14).toFixed(1);
  if (weightLoss >= 10) return (baseRisk * 0.43).toFixed(1);
  if (weightLoss >= 5)  return (baseRisk * 0.66).toFixed(1);
  return baseRisk.toFixed(1);
}

/**
 * @param {number} riskScore - current 0–100 risk score
 * @param {number} bmi       - current BMI
 */
export default function RemissionPanel({ riskScore, bmi }) {
  const [weightLoss, setWeightLoss] = useState(0);

  if (riskScore == null || riskScore <= 50) return null;

  if (bmi >= 27) {
    const projected = simulateRisk(riskScore, weightLoss);

    return (
      <div className="remission-card">
        <div className="remission-header">
          <div className="remission-title">
            <ScaleIcon />
            DiRECT Remission Simulator
          </div>
          <div className="remission-sub">BMI ≥27 · Weight management indicated</div>
        </div>

        <div className="remission-body">
          <p style={{
            fontSize: '12px',
            color: 'var(--muted)',
            lineHeight: 1.6,
            marginBottom: '1rem',
          }}>
            Your BMI ({bmi.toFixed(1)}) suggests potential benefit from weight management.
            Simulate impact based on DiRECT trial outcomes.
          </p>

          <div className="range-row">
            <label>Target Loss</label>
            <input
              type="range"
              min="0"
              max="15"
              step="5"
              value={weightLoss}
              onChange={e => setWeightLoss(Number(e.target.value))}
            />
            <span className="range-value">{weightLoss} kg</span>
          </div>

          <div className="projected-row">
            <span className="proj-label">Projected Risk</span>
            <span className="proj-value">{projected}%</span>
          </div>
        </div>
      </div>
    );
  }

  // BMI < 27 but high risk — show safety warning
  return (
    <div className="warning-card">
      <div className="warning-title">
        <AlertIcon />
        Clinical Safety Notice
      </div>
      <div className="warning-body">
        Current BMI is <strong>{bmi.toFixed(1)}</strong>. The DiRECT remission protocol
        (weight loss &gt;15 kg) is <strong>not clinically indicated</strong> for your weight
        category. Further weight reduction could be hazardous. Please consult a healthcare
        provider for alternative management.
      </div>
    </div>
  );
}