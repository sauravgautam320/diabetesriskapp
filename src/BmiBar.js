import React from 'react';

function getBmiCategory(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25)   return 'Healthy';
  if (bmi < 30)   return 'Overweight';
  return 'Obese';
}

/**
 * Maps BMI (range 15–40+) to a percentage position on the colour track.
 * Track bands: <18.5 = blue, 18.5–24.9 = green, 25–29.9 = amber, ≥30 = red
 */
function bmiToPercent(bmi) {
  const min = 15;
  const max = 40;
  return Math.min(100, Math.max(0, ((bmi - min) / (max - min)) * 100));
}

/**
 * @param {number} bmi - Calculated BMI value
 */
export default function BmiBar({ bmi }) {
  const pct        = bmiToPercent(bmi);
  const category   = getBmiCategory(bmi);

  return (
    <div className="bmi-bar-wrap">
      <div className="bmi-bar-header">
        <span className="bmi-track-label">BMI Index</span>
        <div className="bmi-readout">
          <span className="bmi-number">{bmi.toFixed(1)}</span>
          <span className="bmi-category">{category}</span>
        </div>
      </div>

      <div className="bmi-track">
        <div className="bmi-thumb" style={{ left: `${pct}%` }} />
      </div>

      <div className="bmi-scale-labels">
        <span>15</span>
        <span>18.5</span>
        <span>25</span>
        <span>30</span>
        <span>40+</span>
      </div>
    </div>
  );
}