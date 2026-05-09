export const PITCH_DECK_SLIDES = [
  {
    id: 'slide-1-exec-summary',
    chapter: 'Executive summary',
    badge: 'Slide 1',
    title:
      'Predicting the Silent Epidemic: A Client-Side AI Architecture for Accessible and Private Early-Stage Diabetes Risk Assessment',
    subtitle:
      'Researcher: Saurav Gautam | Supervisor: Dr. Saeed Sharif. Vision: an end-to-end, deployable architecture that bridges clinical evidence and real-world screening through privacy-preserving edge AI.',
    highlights: [
      'Core innovation: integration of non-invasive symptom prediction, SHAP-based explainability, and a DiRECT-informed remission simulator.',
      'All inference designed for zero data egress in the browser execution environment.',
      'System objective: clinically informative, technically deployable, and user-trust focused.'
    ]
  },
  {
    id: 'slide-2-burden',
    chapter: 'Problem framing',
    badge: 'Slide 2',
    title: 'The epidemiological burden (the why)',
    stats: [
      { label: 'UK adults with diabetes or prediabetes', value: '12M+' },
      { label: 'Annual NHS diabetes expenditure', value: 'GBP 10.7B' },
      { label: 'Projected annual burden by 2035', value: 'GBP 18B' },
      { label: 'Cost tied to preventable complications', value: '60%' }
    ],
    highlights: [
      'Youth crisis: diagnoses among individuals under 40 increased by 40% between 2016 and 2023.',
      'The missing millions: around 1 million people in England remain undiagnosed and may progress silently toward complications.',
      'The scale and trajectory support urgent development of earlier and more accessible screening pathways.'
    ]
  },
  {
    id: 'slide-3-gap',
    chapter: 'Problem framing',
    badge: 'Slide 3',
    title: 'The gap in current solutions',
    highlights: [
      'Diagnostic failure: HbA1c early-stage sensitivity around 47%, missing over half of early cases.',
      'Privacy and trust gap: server-side tools require uploading highly sensitive symptom and biometric data.',
      'Clinical inertia: many high-risk individuals are not reached in traditional primary care screening flows.',
      'Static risk communication: many systems output binary risk labels without actionable context.'
    ]
  },
  {
    id: 'slide-4-question-objectives',
    chapter: 'Study design',
    badge: 'Slide 4',
    title: 'Research question and objectives',
    quote:
      'To what extent can a client-side AI architecture estimate early-stage diabetes risk and visualize remission potential while preserving user privacy?',
    columns: [
      {
        title: 'Objective 1: Model',
        points: [
          'Analyze and prepare the UCI Sylhet dataset for robust machine learning optimization.',
          'Build and evaluate candidate algorithms for early-stage risk estimation.'
        ]
      },
      {
        title: 'Objective 2 and 3: Privacy and UX',
        points: [
          'Implement client-side inference with TensorFlow.js to ensure zero data egress.',
          'Develop a responsive React application with interactive remission visualization.'
        ]
      },
      {
        title: 'Objective 4: Reliability',
        points: [
          'Assess predictive performance via accuracy, recall, and ROC-AUC on a held-out test set.',
          'Validate whether architecture is clinically useful and operationally deployable.'
        ]
      }
    ]
  },
  {
    id: 'slide-5-pipeline',
    chapter: 'Methods',
    badge: 'Slide 5',
    title: 'Methodology: data and pipeline',
    timeline: [
      'Dataset: UCI Early Stage Diabetes Risk Prediction Dataset (520 instances, 17 non-invasive predictors).',
      'Non-invasive feature set supports screening without laboratory tests (for example polyuria, polydipsia, sudden weight loss, demographics).',
      'Stratified 80/20 split created representative training (416) and validation (104) sets.',
      'SMOTE balancing expanded the training set to 512 to reduce majority-class bias.',
      'Min-max scaling applied to age, with binary encoding for symptom categories.'
    ]
  },
  {
    id: 'slide-6-strategy',
    chapter: 'Methods',
    badge: 'Slide 6',
    title: 'Methodology: model strategy',
    table: {
      headers: ['Algorithms compared', 'Purpose'],
      rows: [
        ['Logistic Regression', 'Baseline linear model'],
        ['Random Forest', 'Ensemble model for high-variance control'],
        ['XGBoost', 'Boosting model for high-performance nonlinear classification']
      ]
    },
    highlights: [
      'SHAP integration enabled global and local explainability for feature-level transparency.',
      'Global interpretability identified dominant risk drivers (polyuria and polydipsia).',
      'Local interpretability supported per-user waterfall-style reasoning.',
      'Deployment engineering used a native JavaScript decision-tree parser to reduce third-party dependency and code bloat.'
    ]
  },
  {
    id: 'slide-7-results',
    chapter: 'Findings',
    badge: 'Slide 7',
    title: 'Results: predictive performance',
    stats: [
      { label: 'Accuracy', value: '99.04%' },
      { label: 'Precision', value: '100.00%' },
      { label: 'Recall', value: '98.44%' },
      { label: 'ROC-AUC', value: '1.00' }
    ],
    highlights: [
      'Top performer: Random Forest achieved 99.04% accuracy on held-out testing.',
      'Safety metric: 98.44% recall indicates very few high-risk cases were missed.',
      'Diagnostic precision at 100.00% eliminated false positives in this test setting.',
      'Separability: ROC-AUC of 1.00 indicated maximal class separation in this feature space.',
      'Edge performance: average inference latency under 50 ms enabled sub-perceptual feedback.'
    ]
  },
  {
    id: 'slide-8-architecture',
    chapter: 'System architecture',
    badge: 'Slide 8',
    title: 'Zero data egress architecture',
    highlights: [
      'Privacy by design: forward propagation runs entirely inside the browser sandbox.',
      'No symptom or biometric data is transmitted over the network for risk scoring.',
      'Empirical verification through browser developer tools showed zero outbound requests carrying health payloads.',
      'Security value: avoids common cloud attack surfaces such as MITM interception and centralized health-data breach exposure.',
      'React integration supports real-time updates without requiring a separate submit interaction.'
    ]
  },
  {
    id: 'slide-9-safety-insights',
    chapter: 'Clinical logic',
    badge: 'Slide 9',
    title: 'Clinical safety and actionable insights',
    stats: [
      { label: 'BMI gatekeeper threshold', value: 'BMI < 27' },
      { label: 'Remission probability (>= 15kg loss)', value: '86%' },
      { label: 'Remission probability (10-15kg loss)', value: '57%' },
      { label: 'Remission probability (5-10kg loss)', value: '34%' }
    ],
    highlights: [
      'Deterministic guardrail silences weight-loss advice when BMI is below clinical suitability thresholds.',
      'High-risk plus low-BMI profiles trigger acute warning logic for potential Type 1 Diabetes or DKA pathways.',
      'Remission simulator is grounded in DiRECT trial relationships between weight loss and remission likelihood.'
    ]
  },
  {
    id: 'slide-10-differentiator',
    chapter: 'Impact',
    badge: 'The edge of innovation',
    title: 'The differentiator: science vs. simulation',
    subtitle:
      'Unlike generic risk calculators, this system combines high-dimensional machine learning with deterministic clinical safety logic.',
    highlights: [
      'Non-linear intelligence vs static rules: ensemble learning captures interaction patterns that simple additive logic cannot detect.',
      'Mathematically grounded transparency: SHAP deconstructs each prediction into feature-level contributions rather than opaque scoring.',
      'Clinical evidence vs opinion: remission simulation is mapped to DiRECT trial outcomes using piecewise remission probability functions.',
      'Privacy sovereignty: native JavaScript inference executes on-device with zero data egress.',
      'Safety gatekeeper protocol: BMI-aware logic suppresses unsafe advice and can trigger acute Type 1 or DKA warning pathways.'
    ],
    table: {
      headers: ['Feature', 'Random web simulator', 'Our system'],
      rows: [
        ['Logic type', 'Linear or additive point-based scoring', 'Non-linear ensemble path-based inference'],
        ['Data handling', 'Cloud-based server-side processing', 'Zero data egress on-device execution'],
        ['Explanation', 'None, trust-only output', 'SHAP vector-level interpretability'],
        ['Remission source', 'General lifestyle advice', 'DiRECT trial benchmark mapping'],
        ['Safety guardrail', 'None', 'BMI-based deterministic gatekeeping']
      ]
    },
    callout:
      'Bottom line: this is not a calculator-style script; it is a SaMD-oriented prototype that combines privacy sovereignty with clinical-grade interpretability.'
  },
  {
    id: 'slide-10-limitations',
    chapter: 'Critical discussion',
    badge: 'Slide 11',
    title: 'Critical discussion and limitations',
    highlights: [
      'Subjectivity: model depends on self-reported symptoms rather than objective laboratory biomarkers.',
      'Data constraints: current evidence is grounded in a regional Sylhet dataset and requires multi-cohort external validation.',
      'Static window: architecture currently provides a point-in-time risk snapshot, not longitudinal metabolic trajectory tracking.',
      'Maintenance challenge: privacy-first design complicates centralized retraining unless advanced privacy-preserving learning pipelines are used.'
    ]
  },
  {
    id: 'slide-11-conclusion-roadmap',
    chapter: 'Future work',
    badge: 'Slide 12',
    title: 'Conclusion and future roadmap',
    timeline: [
      'Achievement: demonstrated that accurate and explainable AI can be deployed at the edge without compromising privacy.',
      'Wearable integration pathway: ingest objective streams such as heart-rate variability and sleep architecture from mobile health ecosystems.',
      'CGM synergy pathway: incorporate real-time glycemic variability signals for much earlier dysfunction detection.',
      'Federated learning pathway: improve global model quality by aggregating learned weights without transferring raw health records.'
    ],
    callout:
      'Final thesis statement: privacy-preserving, clinically informed client-side AI is a viable foundation for scalable early-stage diabetes risk support.'
  }
];
