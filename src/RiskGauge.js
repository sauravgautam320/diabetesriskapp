import React, { useMemo } from 'react';

const CX = 100;
const CY = 110;
const RADIUS = 80;
const START_DEG = 200;
const TOTAL_ARC = 140;   // degrees swept from start to end

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function arcPoint(cx, cy, r, deg) {
  return {
    x: cx + r * Math.cos(degToRad(deg)),
    y: cy + r * Math.sin(degToRad(deg)),
  };
}

function describeArc(cx, cy, r, startDeg, endDeg) {
  const s = arcPoint(cx, cy, r, startDeg);
  const e = arcPoint(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

function scoreColor(score) {
  if (score > 70) return '#f87171'; // red-400
  if (score > 50) return '#fbbf24'; // amber-400
  return '#4ade80';                  // green-400
}

/**
 * @param {number|null} score - 0–100 risk percentage, or null while loading
 */
export default function RiskGauge({ score }) {
  const endDeg = START_DEG + TOTAL_ARC;
  const fillDeg = score != null
    ? START_DEG + (Math.min(99.9, Math.max(0.1, score)) / 100) * TOTAL_ARC
    : START_DEG + 0.1;

  const bgPath = useMemo(() => describeArc(CX, CY, RADIUS, START_DEG, endDeg), [endDeg]);
  const fillPath = useMemo(() => describeArc(CX, CY, RADIUS, START_DEG, fillDeg), [fillDeg]);

  const dot = arcPoint(CX, CY, RADIUS, fillDeg);
  const color = score != null ? scoreColor(score) : '#4ade80';

  return (
    <div className="gauge-container">
      <svg
        className="gauge-svg"
        viewBox="0 0 200 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f87171" />
          </linearGradient>
        </defs>

        {/* Background track */}
        <path
          d={bgPath}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Filled arc */}
        <path
          d={fillPath}
          fill="none"
          stroke="url(#arc-gradient)"
          strokeWidth="10"
          strokeLinecap="round"
          style={{ transition: 'd 0.4s ease' }}
        />

        {/* Tracking dot */}
        <circle
          cx={dot.x}
          cy={dot.y}
          r={5}
          fill="white"
          style={{ transition: 'cx 0.4s ease, cy 0.4s ease' }}
        />
      </svg>

      <div className="score-readout">
        <div className="score-number" style={{ color }}>
          {score != null ? score.toFixed(1) : '--'}
          <span className="score-unit">%</span>
        </div>
        <div className="score-label">Diabetes Risk Score</div>
      </div>
    </div>
  );
}