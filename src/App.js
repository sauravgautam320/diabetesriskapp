import React, { useState, useEffect } from 'react';
import './App.css';

// ── Components ────────────────────────────────────────────────────────────────
import SymptomToggle from './SymptomToggle';
import BmiBar from './BmiBar';
import InferenceCard from './InferenceCard';
import RemissionPanel from './RemissionPanel';
import AboutModal from './AboutModal';
import SymptomInfoModal from './SymptomInfoModal';

// ── Model assets ──────────────────────────────────────────────────────────────
// Ensure these JSON files exist in your src/ folder.
import xgbModel from './diabetes_xgboost_model.json';
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
        const featureIdx = tree.split_indices[node];
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
  { label: 'Sudden Weight Loss', field: 'sudden weight loss', fullWidth: true },
];

const SECONDARY_SYMPTOMS = [
  { label: 'General Weakness', field: 'weakness' },
  { label: 'Excessive Hunger', field: 'Polyphagia' },
  { label: 'Visual Blurring', field: 'visual blurring' },
  { label: 'Itching', field: 'Itching' },
  { label: 'Delayed Healing', field: 'delayed healing' },
  { label: 'Muscle Stiffness', field: 'muscle stiffness' },
  { label: 'Irritability', field: 'Irritability' },
  { label: 'Partial Paresis', field: 'partial paresis' },
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
  const [riskScore, setRiskScore] = useState(null);
  const [bmi, setBmi] = useState(null);

  // ── Derived values ─────────────────────────────────────────────────────────
  const symptomCount = countActiveSymptoms(formData);

  // ── Real-time inference ────────────────────────────────────────────────────
  useEffect(() => {
    const currentBmi = calcBmi(formData.WeightKG, formData.HeightCM);
    setBmi(currentBmi);

    const scaledAge = (formData.Age - scalerParams.age_min) * scalerParams.age_scale;
    const features = buildFeatureVector(formData, scaledAge);
    const prob = predictXGBoost(features);

    setRiskScore(parseFloat((prob * 100).toFixed(1)));
  }, [formData]);

  // ── Field update helpers ───────────────────────────────────────────────────
  const setField = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const onNumberInput = field => e =>
    setField(field, parseFloat(e.target.value) || 0);

  // ── Mobile Tabs State & Modal State ──────────────────────────────────────
  const [mobileTab, setMobileTab] = useState('bio'); // 'bio' | 'symptoms'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [infoSymptom, setInfoSymptom] = useState(null);

  return (
    <div className="app-wrapper">
      <AboutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <SymptomInfoModal isOpen={!!infoSymptom} onClose={() => setInfoSymptom(null)} symptomField={infoSymptom} />

      <header className="app-header">
        <div className="header-inner">
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
          <button className="about-toggle-btn" onClick={() => setIsModalOpen(true)} title="About & Privacy">
            <svg viewBox="0 0 24 24" className="about-icon" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span className="about-text">About &amp; Privacy</span>
          </button>
        </div>
      </header>

      {/* ── Mobile Slim Pinned Header (Anti-Bloat) ───────────────────────── */}
      <div className="mini-sticky-score">
        <span className="mini-score-label">Live Risk Score:</span>
        <span className="mini-score-raw" style={{ color: riskScore > 50 ? 'var(--red)' : 'var(--green)' }}>
          {riskScore != null ? `${riskScore}%` : '—'}
        </span>
      </div>

      <main className="app-main">

        {/* MOBILE TABS NAVIGATION */}
        <div className="mobile-tabs-nav">
          <button 
            className={`tab-btn ${mobileTab === 'bio' ? 'active' : ''}`}
            onClick={() => setMobileTab('bio')}
          >
            1. Bio
          </button>
          <button 
            className={`tab-btn ${mobileTab === 'symptoms' ? 'active' : ''}`}
            onClick={() => setMobileTab('symptoms')}
          >
            2. Symptoms
          </button>
          <button 
            className={`tab-btn ${mobileTab === 'results' ? 'active' : ''}`}
            onClick={() => setMobileTab('results')}
          >
            3. Results
          </button>
        </div>

        {/* COLUMN 1: Biometrics */}
        <div className={`column input-col bio-col ${mobileTab === 'bio' ? 'm-active' : ''}`}>
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
            {bmi && <BmiBar bmi={bmi} />}

            {/* Mobile UX CTA */}
            <div className="mobile-cta-row">
              <button className="cta-next" onClick={() => setMobileTab('symptoms')}>
                Next: Clinical Symptoms &rarr;
              </button>
            </div>
          </section>
        </div>

        {/* COLUMN 2: Symptoms */}
        <div className={`column input-col symp-col ${mobileTab === 'symptoms' ? 'm-active' : ''}`}>
          <section className="card mb-card">
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
                  onInfoClick={setInfoSymptom}
                />
              ))}
            </div>
          </section>

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
                  onInfoClick={setInfoSymptom}
                />
              ))}
            </div>

            {/* Mobile UX CTA */}
            <div className="mobile-cta-row">
              <button className="cta-next" onClick={() => setMobileTab('results')}>
                View Detailed Analysis &rarr;
              </button>
            </div>
          </section>
        </div>

        {/* COLUMN 3: Results (Desktop Right / Mobile 3rd Tab) */}
        <div className={`column results-col ${mobileTab === 'results' ? 'm-active' : ''}`}>
          <InferenceCard
            riskScore={riskScore}
            bmi={bmi}
            symptomCount={symptomCount}
            formData={formData}
          />
          <RemissionPanel riskScore={riskScore} bmi={bmi} />
        </div>

      </main>

      {/* ── Clinical Disclaimer ─────────────────────────────────────────── */}
      <footer className="app-disclaimer">
        <div className="disclaimer-inner">
          <strong>Clinical Disclaimer:</strong> This system utilizes probabilistic machine learning for early-stage screening. 
          It does <strong>not</strong> constitute medical advice or a definitive diagnosis. 
          A conclusive diagnosis requires Hemoglobin A1c (HbA1c) or fasting plasma glucose tests 
          administered by a licensed healthcare professional.
        </div>
      </footer>
    </div>
  );
}