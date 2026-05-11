# 🩸 Diabetes Risk Predictor

### **Real-Time, Client-Side XAI Diagnostic Tool**

A premium, privacy-preserving React application that leverages high-performance machine learning to predict diabetes risk. Built with a **"Zero Data Egress"** philosophy, the entire inference process—from feature scaling to gradient boosting—occurs locally on the user's device.
---
### Test the live app 
[Live App](diabetesriskpredictorapp.netlify.app)

---

## 🚀 Overview

The **Diabetes Risk Predictor** provides instant, explainable metabolic risk assessments. It bridges the gap between complex machine learning and clinical accessibility by combining a custom **XGBoost Inference Engine** with a polished, high-density dashboard. 

### 🛡️ Privacy by Design: "Zero Data Egress"
Unlike traditional ML applications that rely on server-side APIs, this tool implements the full model logic directly in the browser's V8 engine.
- **Local Compute**: 100% of calculations are performed on-device.
- **Data Sovereignty**: Sensitive biometrics and clinical symptoms never leave the client.
- **Offline Reliability**: Once loaded, the engine functions without any internet connectivity.

---

## ✨ Key Features

### 🧠 Explainable AI (XAI)
Integrated **SHAP-weighted insights** highlight which clinical indicators (e.g., Polyuria, Polydipsia etc as primary indicators and Alopecia, Partial Paresis etc as secondary) are driving the specific risk score. Users don't just see a number; they see the *why*.

### ⚖️ DiRECT Remission Simulator
A dynamic simulation tool based on the **DiRECT trial** data. It allows users in high-risk categories to visualize how targeted weight loss could potentially reduce their metabolic risk profile.

### 📚 Clinical-Grade Documentation
Comprehensive, interactive documentation for every symptom. Each indicator includes:
- **Definition**: Clear clinical description.
- **Mechanism**: How it contributes to diabetic pathology.
- **Criticality**: Its weight in the predictive model.
- **Baseline**: Guidance on distinguishing normal variations from clinical symptoms.

### 📱 Premium Bento-Grid UX
A responsive, high-fidelity interface optimized for both desktop and mobile. 
- **Live Inference**: Risk scores update in real-time (<16ms) as values change.
- **Metabolic Gauges**: Custom SVG gauges and visual BMI tracking.
- **Mobile-First Tabs**: A slimmed-down, anti-bloat navigation flow for smaller screens.

---

## 🛠️ Technical Architecture

### Modern Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://reactjs.org/) |
| **Styling** | Vanilla CSS + [Tailwind CSS 4](https://tailwindcss.com/) (Custom Tokens) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **ML Engine** | Custom JS-only XGBoost Implementation |
| **Model** | JSON decision trees (`diabetes_xgboost_model.json`) |

### Inference Engine Detail
The application utilizes a pre-trained XGBoost model. The engine reconstructs decision trees in memory and performs recursive traversal based on the user's scaled feature vector. This avoids the overhead of large libraries like ONNX while maintaining mathematical parity with Python's `xgboost` package.

---

## 🚦 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/diabetesriskapp.git
   cd diabetesriskapp
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm start
   ```
4. **Access the dashboard:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```text
src/
├── components/          # Modular UI (Gauge, Bars, RemissionPanel, etc.)
├── symptomData.js       # Clinical documentation repository
├── diabetes_xgboost_model.json # Pre-trained model weights
├── scaler_params.json   # Feature scaling parameters (Age/Weight normalization)
├── App.js               # Main application logic & XGBoost JS engine
└── App.css              # Design system tokens and layout styles
```

---

## ⚠️ Clinical Disclaimer

> [!IMPORTANT]
> **Not for Professional Diagnosis**: This application is a technical demonstration of client-side machine learning and probabilistic risk assessment. It is **not** a licensed medical diagnostic tool.
> 
> A conclusive diabetes diagnosis requires clinical tests (HbA1c, Fasting Glucose) administered by a healthcare professional. Always consult with a doctor for medical advice.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
