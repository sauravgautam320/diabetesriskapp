# 🩸 Diabetes Risk Predictor

### **Real-Time, Client-Side XAI Diagnostic Tool**

A modern, privacy-preserving React application that leverages machine learning to predict diabetes risk. Built with a "Zero Data Egress" philosophy, the entire inference process occurs locally on the user's device.

---

## 🚀 Overview

The **Diabetes Risk Predictor** is designed to provide instant, explainable metabolic risk assessments. By combining a high-performance XGBoost model with a streamlined React interface, the app allows users to input biometric data and clinical symptoms to receive a real-time risk score—without ever sending sensitive health data to a server.

### 🛡️ Privacy & Security: "Zero Data Egress"
Unlike traditional ML applications that require back-end processing, this tool implements the **XGBoost Inference Engine** directly in JavaScript.
- **Local Compute**: All calculations are performed in your browser's V8 engine.
- **Data Sovereignty**: Your age, weight, and clinical symptoms never leave your local machine.
- **Offline Capable**: Once loaded, the engine requires no internet connection to function.

---

## ✨ Key Features

- **⚡ Live Inference**: Risk scores update instantly as you adjust input values.
- **🧠 Explainable AI (XAI)**: Integrated SHAP-weighted insights highlight which clinical indicators (e.g., Polyuria, Polydipsia) are driving the risk score.
- **📊 Interactive Biometrics**: Visual BMI tracking and responsive risk gauges provide immediate feedback.
- **📱 Modern UX**: A high-density dashboard built with React 19 and Tailwind CSS, featuring Lucide icons and metabolic status panels.

---

## 🛠️ Technical Architecture

### Tech Stack
- **Frontend**: [React 19](https://reactjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Inference engine**: Custom Client-Side XGBoost implementation
- **Model Format**: JSON-based gradient booster model

### Inference Engine Detail
The app utilizes a pre-trained XGBoost model (`diabetes_xgboost_model.json`). The inference algorithm reconstructs the decision trees in memory and traverses them based on the user's feature vector (scaled using `scaler_params.json`).

---

## 🚦 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/diabetesriskapp.git
   cd diabetesriskapp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 📁 Project Structure

```text
src/
├── components/          # Modular UI elements (Gauge, Bars, Toggles)
├── diabetes_xgboost_model.json # Pre-trained model weights
├── scaler_params.json   # Feature scaling parameters
├── App.js               # Main application logic & inference engine
└── index.css            # Global styles and Tailwind imports
```

---

## ⚠️ Disclaimer

> [!WARNING]
> **Not for Medical Use**: This application is a technical demonstration of client-side machine learning and is **not** a licensed medical diagnostic tool. Always consult with a healthcare professional for medical advice and diagnosis.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
