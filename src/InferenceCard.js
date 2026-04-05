import React from 'react';
import RiskGauge from './RiskGauge';

function getBmiCategory(bmi) {
  if (!bmi)       return '—';
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25)   return 'Healthy';
  if (bmi < 30)   return 'Overweight';
  return 'Obese';
}

/**
 * @param {number|null} riskScore    - 0–100 probability * 100
 * @param {number|null} bmi          - Calculated BMI
 * @param {number}      symptomCount - Number of active symptom flags
 * @param {object}      formData     - Full form state (for XAI insight logic)
 */
export default function InferenceCard({ riskScore, bmi, symptomCount, formData }) {
  const highRisk     = riskScore != null && riskScore > 50;
  const hasPrimaryHR = formData.Polyuria === 1 || formData.Polydipsia === 1;
  const hasSWL       = formData['sudden weight loss'] === 1;

  return (
    <div className="inference-card">
      <div className="inference-section-label">
        <span className="dot" />
        Real-Time Inference
      </div>

      <RiskGauge score={riskScore} />

      <div className="meta-row">
        <div className="meta-chip">
          <div className="chip-label">BMI</div>
          <div className="chip-value">{bmi ? bmi.toFixed(1) : '—'}</div>
          <div className="chip-sub">{getBmiCategory(bmi)}</div>
        </div>
        <div className="meta-chip">
          <div className="chip-label">Symptoms</div>
          <div className="chip-value">{symptomCount}</div>
          <div className="chip-sub">active flags</div>
        </div>
      </div>

      <div className="insight-area">
        {highRisk && hasPrimaryHR && (
          <div className="insight-box danger">
            <span className="insight-tag">XAI Insight</span>
            Risk elevated by high-weight SHAP indicators: Polyuria / Polydipsia.
          </div>
        )}
        {highRisk && hasSWL && (
          <div className="insight-box warning">
            <span className="insight-tag">Clinical Flag</span>
            Sudden weight loss reported — differentiate Type 1 Diabetes immediately.
          </div>
        )}
        {!highRisk && (
          <div className="insight-box ok">
            Baseline metabolic profile currently stable.
          </div>
        )}
      </div>
    </div>
  );
}