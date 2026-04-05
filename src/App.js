import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, HeartPulse, Scale, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import xgbModel from './diabetes_xgboost_model.json';
import scalerParams from './scaler_params.json';

export default function DiabetesRiskApp() {
  // 1. STATE MANAGEMENT
  const [formData, setFormData] = useState({
    Age: 45, Gender: 1, HeightCM: 175, WeightKG: 85,
    Polyuria: 0, Polydipsia: 0, 'sudden weight loss': 0,
    weakness: 0, Polyphagia: 0, 'Genital thrush': 0, 'visual blurring': 0,
    Itching: 0, Irritability: 0, 'delayed healing': 0, 'partial paresis': 0,
    'muscle stiffness': 0, Alopecia: 0, Obesity: 0
  });

  const [riskScore, setRiskScore] = useState(null);
  const [weightLossTarget, setWeightLossTarget] = useState(0);
  const [bmi, setBmi] = useState(null);

  // 2. NATIVE XGBOOST INFERENCE ENGINE
  const predictXGBoost = (features) => {
    try {
      const trees = xgbModel.learner.gradient_booster.model.trees;
      let sum = 0; 
      trees.forEach(tree => {
        let node = 0; 
        while (tree.left_children[node] !== -1) {
          const featureIndex = tree.split_indices[node];
          const splitCondition = tree.split_conditions[node];
          if (features[featureIndex] < splitCondition) {
            node = tree.left_children[node];
          } else {
            node = tree.right_children[node];
          }
        }
        sum += tree.base_weights[node];
      });
      return 1 / (1 + Math.exp(-sum));
    } catch (error) {
      console.error("Inference Error:", error);
      return 0;
    }
  };

  // 3. REAL-TIME CALCULATION
  // Use useEffect to calculate risk instantly when inputs change (better UX than a submit button)

  useEffect(() => {
    const heightM = formData.HeightCM / 100;
    const currentBmi = (formData.WeightKG / (heightM * heightM)).toFixed(1);
    setBmi(Number(currentBmi));

    const scaledAge = (formData.Age - scalerParams.age_min) * scalerParams.age_scale;
    
    const featureVector = [
      scaledAge, formData.Gender, formData.Polyuria, formData.Polydipsia, 
      formData['sudden weight loss'], formData.weakness, formData.Polyphagia, 
      formData['Genital thrush'], formData['visual blurring'], formData.Itching, 
      formData.Irritability, formData['delayed healing'], formData['partial paresis'], 
      formData['muscle stiffness'], formData.Alopecia, formData.Obesity
    ];

    const rawProbability = predictXGBoost(featureVector);
    setRiskScore((rawProbability * 100).toFixed(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]); 

  // 4. REMISSION SIMULATOR LOGIC
  const simulatedRisk = riskScore ? 
    (weightLossTarget >= 15 ? (riskScore * 0.14).toFixed(1) : 
     weightLossTarget >= 10 ? (riskScore * 0.43).toFixed(1) : 
     weightLossTarget >= 5 ? (riskScore * 0.66).toFixed(1) : riskScore) 
    : null;

  // Helper component for touch-friendly toggle buttons
  const SymptomToggle = ({ label, field, isPrimary }) => (
    <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
      formData[field] === 1 
        ? (isPrimary ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50') 
        : 'border-slate-200 hover:border-slate-300 bg-white'
    }`}>
      <span className={`text-sm font-medium ${formData[field] === 1 ? 'text-slate-900' : 'text-slate-600'}`}>
        {label}
      </span>
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
        formData[field] === 1 ? (isPrimary ? 'border-red-500 bg-red-500' : 'border-blue-500 bg-blue-500') : 'border-slate-300'
      }`}>
        {formData[field] === 1 && <CheckCircle2 className="w-4 h-4 text-white" />}
      </div>
      <input 
        type="checkbox" 
        className="hidden" 
        checked={formData[field] === 1} 
        onChange={e => setFormData({...formData, [field]: e.target.checked ? 1 : 0})} 
      />
    </label>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans text-slate-800 selection:bg-blue-100">
      
      {/* PREMIUM HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center gap-4">
          <div className="bg-blue-600 p-2 rounded-lg text-white shadow-md">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Metabolic Risk Engine</h1>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Client-Side XAI Diagnostic • Zero Data Egress</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* RESPONSIVE GRID: 1 column on mobile, 12 columns on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: INTAKE FORM (Spans 7 columns on desktop) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Section 1: Biometrics */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-800">
                <Info className="w-5 h-5 text-blue-500" /> Demographics & Biometrics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Age</label>
                  <input type="number" value={formData.Age} onChange={e => setFormData({...formData, Age: e.target.value})} 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Biological Sex</label>
                  <select value={formData.Gender} onChange={e => setFormData({...formData, Gender: Number(e.target.value)})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none">
                    <option value={1}>Male</option>
                    <option value={0}>Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Height (cm)</label>
                  <input type="number" value={formData.HeightCM} onChange={e => setFormData({...formData, HeightCM: e.target.value})} 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Weight (kg)</label>
                  <input type="number" value={formData.WeightKG} onChange={e => setFormData({...formData, WeightKG: e.target.value})} 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" />
                </div>
              </div>
            </section>

            {/* Section 2: Primary XAI Symptoms */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold mb-2 flex items-center gap-2 text-slate-800">
                <ShieldAlert className="w-5 h-5 text-red-500" /> Primary Clinical Indicators
              </h2>
              <p className="text-sm text-slate-500 mb-6">These symptoms hold the highest predictive weight in the AI model based on SHAP analysis.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SymptomToggle label="Frequent Urination (Polyuria)" field="Polyuria" isPrimary={true} />
                <SymptomToggle label="Excessive Thirst (Polydipsia)" field="Polydipsia" isPrimary={true} />
                <SymptomToggle label="Sudden Weight Loss" field="sudden weight loss" isPrimary={true} />
              </div>
            </section>

            {/* Section 3: Secondary Symptoms */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold mb-6 text-slate-800">Secondary Symptoms</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <SymptomToggle label="General Weakness" field="weakness" />
                <SymptomToggle label="Excessive Hunger (Polyphagia)" field="Polyphagia" />
                <SymptomToggle label="Visual Blurring" field="visual blurring" />
                <SymptomToggle label="Itching" field="Itching" />
                <SymptomToggle label="Delayed Healing" field="delayed healing" />
                <SymptomToggle label="Muscle Stiffness" field="muscle stiffness" />
                <SymptomToggle label="Irritability" field="Irritability" />
                <SymptomToggle label="Partial Paresis" field="partial paresis" />
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: RESULTS DASHBOARD (Spans 5 columns, Sticky on desktop) */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-28 space-y-6">
              
              {/* DIAGNOSTICS CARD */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl overflow-hidden relative">
                {/* Decorative background element */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
                
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-blue-100 z-10 relative">
                  <HeartPulse className="w-5 h-5 text-blue-400" /> Real-Time Inference
                </h2>
                
                <div className="text-center z-10 relative">
                  <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-2">Calculated Risk Score</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-7xl font-black tracking-tighter ${riskScore > 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {riskScore}
                    </span>
                    <span className="text-3xl font-medium text-slate-500">%</span>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-center gap-4 text-sm font-medium text-slate-300">
                    <div className="bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
                      BMI: <span className="text-white">{bmi}</span>
                    </div>
                  </div>
                </div>

                {/* DYNAMIC XAI INSIGHTS */}
                <div className="mt-8 space-y-3 z-10 relative">
                  {riskScore > 50 && (formData.Polyuria === 1 || formData.Polydipsia === 1) && (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl backdrop-blur-sm">
                      <p className="text-sm text-red-200">
                        <strong className="text-red-400 font-bold">XAI Insight:</strong> Risk elevated primarily due to SHAP indicators (Polyuria / Polydipsia).
                      </p>
                    </div>
                  )}
                  {riskScore > 50 && formData['sudden weight loss'] === 1 && (
                    <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl backdrop-blur-sm">
                      <p className="text-sm text-amber-200">
                        <strong className="text-amber-400 font-bold">Clinical Flag:</strong> Sudden weight loss reported. This warrants immediate clinical differentiation from Type 1 Diabetes.
                      </p>
                    </div>
                  )}
                  {riskScore <= 50 && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl backdrop-blur-sm text-center">
                      <p className="text-sm text-emerald-200">Baseline metabolic profile currently stable.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* SAFETY GATEKEEPER / REMISSION SIMULATOR */}
              {riskScore > 50 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {bmi >= 27 ? (
                    /* Show Remission Simulator if Overweight/Obese */
                    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-emerald-100">
                      <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-emerald-800">
                        <Scale className="w-5 h-5" /> DiRECT Remission Simulator
                      </h2>
                      <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                        Your BMI ({bmi}) indicates potential benefit from weight management. Simulate the impact based on DiRECT trial outcomes.
                      </p>
                      
                      <div className="mb-8">
                        <div className="flex justify-between items-end mb-4">
                          <span className="text-sm font-bold text-slate-700">Target Loss</span>
                          <span className="text-2xl font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">{weightLossTarget} kg</span>
                        </div>
                        <input type="range" min="0" max="15" step="5" value={weightLossTarget} 
                          onChange={e => setWeightLossTarget(Number(e.target.value))}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
                        <div className="flex justify-between text-xs font-medium text-slate-400 mt-3 px-1">
                          <span>0kg</span><span>5kg</span><span>10kg</span><span>15kg+</span>
                        </div>
                      </div>

                      <div className="bg-slate-900 p-5 rounded-2xl flex justify-between items-center shadow-inner">
                        <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">Projected Risk</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black text-emerald-400">{simulatedRisk}</span>
                          <span className="text-lg font-medium text-slate-500">%</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Show Safety Warning if Normal/Underweight */
                    <div className="bg-amber-50 p-6 sm:p-8 rounded-3xl shadow-lg border border-amber-200">
                      <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-amber-800">
                        <AlertTriangle className="w-6 h-6" /> Clinical Safety Notice
                      </h2>
                      <p className="text-sm text-amber-900 leading-relaxed">
                        Your current BMI is <strong className="bg-amber-200 px-1 rounded">{bmi}</strong>. The DiRECT remission protocol (weight loss >15kg) is <strong>not clinically indicated</strong> for your weight category. 
                        Further weight reduction could be hazardous. Please consult a healthcare provider for alternative management.
                      </p>
                    </div>
                  )}
                </div>
              )}
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}