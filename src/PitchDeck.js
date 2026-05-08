import React, { useEffect, useMemo, useState } from 'react';
import './PitchDeck.css';
import { PITCH_DECK_SLIDES } from './pitchDeckData';

const VISUAL_MAP = {
  'slide-1-exec-summary': {
    icon: '🩺',
    theme: 'teal',
    title: 'Edge AI clinical vision',
    caption: 'From research to deployable screening architecture',
    chips: ['Privacy-first', 'Explainable AI', 'Remission-focused']
  },
  'slide-2-burden': {
    icon: '📈',
    theme: 'orange',
    title: 'Growing national burden',
    caption: 'Epidemiology and economic pressure are both accelerating',
    chips: ['12M+ affected', 'GBP burden', 'Youth shift']
  },
  'slide-3-gap': {
    icon: '🧩',
    theme: 'slate',
    title: 'Unmet system needs',
    caption: 'Detection, trust, and actionability gaps remain unresolved',
    chips: ['Low sensitivity', 'Data trust gap', 'Static risk messaging']
  },
  'slide-4-question-objectives': {
    icon: '🎯',
    theme: 'teal',
    title: 'Research intent',
    caption: 'Measure feasibility, utility, and deployment readiness',
    chips: ['Model', 'Privacy', 'UX', 'Reliability']
  },
  'slide-5-pipeline': {
    icon: '🧪',
    theme: 'green',
    title: 'Data engineering flow',
    caption: 'From curated symptoms to balanced model inputs',
    chips: ['520 records', 'SMOTE', '80/20 split']
  },
  'slide-6-strategy': {
    icon: '⚙️',
    theme: 'slate',
    title: 'Modeling strategy',
    caption: 'Comparative learning plus interpretable reasoning layers',
    chips: ['LR', 'RF', 'XGBoost', 'SHAP']
  },
  'slide-7-results': {
    icon: '🏆',
    theme: 'orange',
    title: 'Performance quality',
    caption: 'High discrimination with low missed-risk profile',
    chips: ['Accuracy 99.04%', 'Recall 98.44%', 'AUC 1.00']
  },
  'slide-8-architecture': {
    icon: '🔒',
    theme: 'teal',
    title: 'Zero-egress architecture',
    caption: 'Inference remains local, private, and network-independent',
    chips: ['Browser sandbox', 'No health payload egress', 'Real-time updates']
  },
  'slide-9-safety-insights': {
    icon: '🛡️',
    theme: 'green',
    title: 'Clinical guardrails',
    caption: 'Risk messaging constrained by deterministic safety logic',
    chips: ['BMI gatekeeper', 'Acute warning', 'DiRECT simulator']
  },
  'slide-10-limitations': {
    icon: '🔍',
    theme: 'slate',
    title: 'Critical boundaries',
    caption: 'Validation scope and longitudinal limits remain open',
    chips: ['Self-report bias', 'Regional data', 'Retraining constraints']
  },
  'slide-11-conclusion-roadmap': {
    icon: '🚀',
    theme: 'teal',
    title: 'Translation roadmap',
    caption: 'Wearables, CGM integration, and federated learning next',
    chips: ['Wearables', 'CGM', 'Federated updates']
  }
};

function normalizeMetricValue(value) {
  const parsed = parseFloat(String(value).replace(/[^\d.]/g, ''));
  if (!Number.isFinite(parsed)) return 40;
  if (parsed <= 1) return Math.max(14, Math.min(100, parsed * 100));
  return Math.max(14, Math.min(100, parsed));
}

export default function PitchDeck({ onExit }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const total = PITCH_DECK_SLIDES.length;
  const progress = ((currentSlide + 1) / total) * 100;
  const active = PITCH_DECK_SLIDES[currentSlide];
  const visual = VISUAL_MAP[active.id] || VISUAL_MAP['slide-1-exec-summary'];

  const chapterIndex = useMemo(() => {
    const chapterMap = new Map();
    let idx = 0;
    PITCH_DECK_SLIDES.forEach(slide => {
      if (!chapterMap.has(slide.chapter)) {
        chapterMap.set(slide.chapter, idx);
        idx += 1;
      }
    });
    return chapterMap;
  }, []);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        setCurrentSlide(prev => Math.min(prev + 1, total - 1));
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      }
      if (event.key === 'Home') {
        setCurrentSlide(0);
      }
      if (event.key === 'End') {
        setCurrentSlide(total - 1);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [total]);

  useEffect(() => {
    let startX = 0;
    let startY = 0;

    function onTouchStart(event) {
      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    }

    function onTouchEnd(event) {
      const touch = event.changedTouches[0];
      const dx = startX - touch.clientX;
      const dy = startY - touch.clientY;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
        setCurrentSlide(prev => {
          if (dx > 0) return Math.min(prev + 1, total - 1);
          return Math.max(prev - 1, 0);
        });
      }
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [total]);

  return (
    <div className="pitch-page">
      <div className="pitch-header">
        <div className="pitch-brand">
          <span className="pitch-kicker">Interactive defence deck</span>
          <h1>Diabetes AI dissertation pitch</h1>
        </div>
        <div className="pitch-actions">
          <button className="pitch-btn ghost" onClick={() => setCurrentSlide(0)}>
            Start over
          </button>
          <button className="pitch-btn" onClick={onExit}>
            Open predictor
          </button>
        </div>
      </div>

      <div className="pitch-progress-rail" aria-hidden="true">
        <div className="pitch-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="pitch-main">
        <aside className="pitch-sidebar">
          {PITCH_DECK_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            const chapterNo = chapterIndex.get(slide.chapter) + 1;
            return (
              <button
                key={slide.id}
                className={`pitch-side-item ${isActive ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              >
                <span className="chapter">{`C${chapterNo}`}</span>
                <span className="title">{slide.title}</span>
              </button>
            );
          })}
        </aside>

        <section className="pitch-slide" key={active.id}>
          <div className="slide-topline">
            <span className="badge">{active.badge}</span>
            <span className="chapter-name">{active.chapter}</span>
            <span className="counter">{`${currentSlide + 1} / ${total}`}</span>
          </div>

          <h2>{active.title}</h2>
          {active.subtitle ? <p className="slide-subtitle">{active.subtitle}</p> : null}
          {active.quote ? <blockquote>{active.quote}</blockquote> : null}

          <div className="slide-stage">
            <div className="slide-content">
              {active.stats ? (
                <div className="stats-grid">
                  {active.stats.map(item => (
                    <div className="stat-card" key={`${active.id}-${item.label}`}>
                      <span className="stat-value">{item.value}</span>
                      <span className="stat-label">{item.label}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              {active.table ? (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        {active.table.headers.map(header => (
                          <th key={`${active.id}-${header}`}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {active.table.rows.map(row => (
                        <tr key={`${active.id}-${row[0]}`}>
                          <td>{row[0]}</td>
                          <td>{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              {active.columns ? (
                <div className="columns-grid">
                  {active.columns.map(column => (
                    <article className="info-panel" key={`${active.id}-${column.title}`}>
                      <h3>{column.title}</h3>
                      <ul>
                        {column.points.map(point => (
                          <li key={`${active.id}-${column.title}-${point}`}>{point}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              ) : null}

              {active.timeline ? (
                <ol className="timeline-list">
                  {active.timeline.map(item => (
                    <li key={`${active.id}-${item}`}>{item}</li>
                  ))}
                </ol>
              ) : null}

              {active.highlights ? (
                <ul className="highlights-list">
                  {active.highlights.map(item => (
                    <li key={`${active.id}-${item}`}>{item}</li>
                  ))}
                </ul>
              ) : null}

              {active.callout ? <p className="callout">{active.callout}</p> : null}
            </div>

            <aside className={`slide-visual theme-${visual.theme}`}>
              <div className="visual-orbit" aria-hidden="true" />
              <div className="visual-orbit orbit-2" aria-hidden="true" />
              <div className="visual-icon" aria-hidden="true">{visual.icon}</div>
              <h3>{visual.title}</h3>
              <p>{visual.caption}</p>

              <div className="visual-chip-grid">
                {visual.chips.map(chip => (
                  <span className="visual-chip" key={`${active.id}-${chip}`}>{chip}</span>
                ))}
              </div>

              {active.stats ? (
                <div className="metric-bars">
                  {active.stats.map(item => (
                    <div className="metric-row" key={`${active.id}-bar-${item.label}`}>
                      <div className="metric-row-top">
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                      </div>
                      <div className="metric-track">
                        <span
                          className="metric-fill"
                          style={{ width: `${normalizeMetricValue(item.value)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </aside>
          </div>
        </section>
      </div>

      <div className="pitch-nav">
        <button
          className="pitch-nav-btn"
          onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
          disabled={currentSlide === 0}
        >
          Previous
        </button>
        <div className="dot-track">
          {PITCH_DECK_SLIDES.map((slide, idx) => (
            <button
              key={`${slide.id}-dot`}
              className={`dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <button
          className="pitch-nav-btn"
          onClick={() => setCurrentSlide(prev => Math.min(prev + 1, total - 1))}
          disabled={currentSlide === total - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
