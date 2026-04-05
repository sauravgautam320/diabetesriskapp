import React, { useState, useEffect } from 'react';
import './App.css';

// ── Components ────────────────────────────────────────────────────────────────
import SymptomToggle  from './SymptomToggle';
import BmiBar         from './BmiBar';
import InferenceCard  from './InferenceCard';
import RemissionPanel from './RemissionPanel';

// ── Model assets ──────────────────────────────────────────────────────────────
// Ensure these JSON files exist in your src/ folder.
import xgbModel     from './diabetes_xgboost_model.json';
import scalerParams from './scaler_params.json';

// ─────────────────────────────────────────────────────────────────────────────
// XGBoost Inference Engine (client-side, zero data egress)
// ─────────────────────────────────────────────────────────────────────────────
function predictXGBoost(features) {
  try {
    const trees = xgbModel.learner.gradient_booster.model.trees;
    let sum = 0;

    trees.forEach(tree => {
      let node = 0;
      while (tree.left_children[node] !== -1) {
        const featureIdx     = tree.split_indices[node];
        const splitCondition = tree.split_conditions[node];
        node = features[featureIdx] < splitCondition
          ? tree.left_children[node]
          : tree.right_children[node];
      }
      sum += tree.base_weights[node];
    });

    return 1 / (1 + Math.exp(-sum)); // sigmoid → probability
  } catch (err) {
    console.error('XGBoost inference error:', err);
    return 0;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Feature vector order must match training pipeline exactly
// ─────────────────────────────────────────────────────────────────────────────
function buildFeatureVector(formData, scaledAge) {
  return [
    scaledAge,
    formData.Gender,
    formData.Polyuria,
    formData.Polydipsia,
    formData['sudden weight loss'],
    formData.weakness,
    formData.Polyphagia,
    formData['Genital thrush'],
    formData['visual blurring'],
    formData.Itching,
    formData.Irritability,
    formData['delayed healing'],
    formData['partial paresis'],
    formData['muscle stiffness'],
    formData.Alopecia,
    formData.Obesity,
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// Symptom field definitions (drives both sections)
// ─────────────────────────────────────────────────────────────────────────────
const PRIMARY_SYMPTOMS = [
  { label: 'Frequent Urination (Polyuria)', field: 'Polyuria', fullWidth: false },
  { label: 'Excessive Thirst (Polydipsia)', field: 'Polydipsia', fullWidth: false },
  { label: 'Sudden Weight Loss',            field: 'sudden weight loss', fullWidth: true },
];

const SECONDARY_SYMPTOMS = [
  { label: 'General Weakness',      field: 'weakness' },
  { label: 'Excessive Hunger',      field: 'Polyphagia' },
  { label: 'Visual Blurring',       field: 'visual blurring' },
  { label: 'Itching',               field: 'Itching' },
  { label: 'Delayed Healing',       field: 'delayed healing' },
  { label: 'Muscle Stiffness',      field: 'muscle stiffness' },
  { label: 'Irritability',          field: 'Irritability' },
  { label: 'Partial Paresis',       field: 'partial paresis' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function calcBmi(weightKg, heightCm) {
  const h = heightCm / 100;
  return weightKg / (h * h);
}

function countActiveSymptoms(formData) {
  return [
    ...PRIMARY_SYMPTOMS.map(s => s.field),
    ...SECONDARY_SYMPTOMS.map(s => s.field),
  ].reduce((n, f) => n + (formData[f] || 0), 0);
}

// ─────────────────────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────────────────────
const INITIAL_FORM = {
  Age: 45, Gender: 1, HeightCM: 175, WeightKG: 85,
  Polyuria: 0, Polydipsia: 0, 'sudden weight loss': 0,
  weakness: 0, Polyphagia: 0, 'Genital thrush': 0,
  'visual blurring': 0, Itching: 0, Irritability: 0,
  'delayed healing': 0, 'partial paresis': 0,
  'muscle stiffness': 0, Alopecia: 0, Obesity: 0,
};

export default function App() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [riskScore, setRiskScore]   = useState(null);
  const [bmi, setBmi]               = useState(null);

  // ── Derived values ─────────────────────────────────────────────────────────
  const symptomCount = countActiveSymptoms(formData);

  // ── Real-time inference ────────────────────────────────────────────────────
  useEffect(() => {
    const currentBmi = calcBmi(formData.WeightKG, formData.HeightCM);
    setBmi(currentBmi);

    const scaledAge = (formData.Age - scalerParams.age_min) * scalerParams.age_scale;
    const features  = buildFeatureVector(formData, scaledAge);
    const prob      = predictXGBoost(features);

    setRiskScore(parseFloat((prob * 100).toFixed(1)));
  }, [formData]);

  // ── Field update helpers ───────────────────────────────────────────────────
  const setField = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const onNumberInput = field => e =>
    setField(field, parseFloat(e.target.value) || 0);

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="app-header">
        <div className="logo-mark">
          <svg viewBox="0 0 24 24">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </div>
        <div className="header-text">
          <span className="header-title">Diabetes Risk Predictor</span>
          <span className="header-sub">
            Client-Side XAI Diagnostic · Zero Data Egress
          </span>
        </div>
        <div className="badge-live">
          <span className="badge-live-dot" />
          LIVE INFERENCE
        </div>
      </header>

      {/* ── Main grid ──────────────────────────────────────────────────────── */}
      <main className="app-main">

        {/* LEFT — Intake form */}
        <div className="left-column">

          {/* Section 1 — Demographics & Biometrics */}
          <section className="card">
            <div className="section-label">
              <span className="dot" style={{ background: '#3b9eed' }} />
              Demographics &amp; Biometrics
            </div>

            <div className="field-grid">
              <div className="field-group">
                <label>Age</label>
                <input
                  type="number"
                  value={formData.Age}
                  min={1}
                  max={120}
                  onChange={onNumberInput('Age')}
                />
              </div>
              <div className="field-group">
                <label>Biological Sex</label>
                <select
                  value={formData.Gender}
                  onChange={e => setField('Gender', Number(e.target.value))}
                >
                  <option value={1}>Male</option>
                  <option value={0}>Female</option>
                </select>
              </div>
              <div className="field-group">
                <label>Height (cm)</label>
                <input
                  type="number"
                  value={formData.HeightCM}
                  min={100}
                  max={250}
                  onChange={onNumberInput('HeightCM')}
                />
              </div>
              <div className="field-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  value={formData.WeightKG}
                  min={30}
                  max={300}
                  onChange={onNumberInput('WeightKG')}
                />
              </div>
            </div>

            {/* BMI track — renders once bmi is calculated */}
            {bmi && <BmiBar bmi={bmi} />}
          </section>

          {/* Section 2 — Primary Clinical Indicators */}
          <section className="card">
            <div className="section-label">
              <span className="dot" style={{ background: 'var(--red)' }} />
              Primary Clinical Indicators
              <span className="label-aside">Highest SHAP weight</span>
            </div>

            <div className="symptoms-grid">
              {PRIMARY_SYMPTOMS.map(({ label, field, fullWidth }) => (
                <SymptomToggle
                  key={field}
                  label={label}
                  field={field}
                  isPrimary
                  fullWidth={fullWidth}
                  formData={formData}
                  onChange={setField}
                />
              ))}
            </div>
          </section>

          {/* Section 3 — Secondary Symptoms */}
          <section className="card">
            <div className="section-label">
              <span className="dot" style={{ background: 'var(--teal)' }} />
              Secondary Symptoms
            </div>

            <div className="symptoms-grid">
              {SECONDARY_SYMPTOMS.map(({ label, field }) => (
                <SymptomToggle
                  key={field}
                  label={label}
                  field={field}
                  isPrimary={false}
                  formData={formData}
                  onChange={setField}
                />
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT — Results dashboard */}
        <div className="right-column">
          <InferenceCard
            riskScore={riskScore}
            bmi={bmi}
            symptomCount={symptomCount}
            formData={formData}
          />
          <RemissionPanel riskScore={riskScore} bmi={bmi} />
        </div>

      </main>
    </>
  );
}