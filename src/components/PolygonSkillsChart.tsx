import React from 'react';

import { Skill } from '../game/content';

interface PolygonSkillsChartProps {
  skills: Skill[];
  size?: number;
  color?: string;
}

const PolygonSkillsChart: React.FC<PolygonSkillsChartProps> = ({ skills, size = 300, color = '#ef4444' }) => {
  const numSkills = skills.length;
  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = size / 2 - 20; // leave room for labels
  const angleStep = (2 * Math.PI) / numSkills;

  const polygonPoints = skills
    .map((skill, index) => {
      const angle = angleStep * index - Math.PI / 2; // start from top
      const radius = (skill.percent / 100) * maxRadius;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(' ');

  const gridLevels = 3;
  const gridPolygons = [];
  for (let level = 1; level <= gridLevels; level++) {
    const r = (maxRadius * level) / gridLevels;
    const points = skills
      .map((_, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(' ');
    gridPolygons.push(points);
  }

  const labelPoints = skills.map((skill, index) => {
    const angle = angleStep * index - Math.PI / 2;
    const x = centerX + (maxRadius + 15) * Math.cos(angle);
    const y = centerY + (maxRadius + 15) * Math.sin(angle);
    return { x, y, name: skill.name };
  });

  return (
    <svg
      width={size}
      height={size}
      style={{ overflow: 'visible' }}
      role="img"
      aria-label={`Skills chart: ${skills.map(s => `${s.name} ${s.percent}`).join(', ')}`}
    >
      {gridPolygons.map((points, idx) => (
        <polygon
          key={idx}
          points={points}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="1"
        />
      ))}

      {skills.map((_, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const x = centerX + maxRadius * Math.cos(angle);
        const y = centerY + maxRadius * Math.sin(angle);
        return (
          <line
            key={index}
            x1={centerX}
            y1={centerY}
            x2={x}
            y2={y}
            stroke="currentColor"
          strokeOpacity="0.2"
            strokeWidth="1"
          />
        );
      })}

      <polygon
        points={polygonPoints}
        fill={color}
        fillOpacity="0.35"
        stroke={color}
        strokeWidth="2"
      />

      {polygonPoints.split(' ').map((point, index) => {
        const [x, y] = point.split(',').map(Number);
        return <circle key={index} cx={x} cy={y} r={3} fill={color} />;
      })}

      {labelPoints.map((label, index) => (
        <text
          key={index}
          x={label.x}
          y={label.y}
          fill="currentColor"
          fontSize="11"
          fontWeight="600"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {label.name}
        </text>
      ))}
    </svg>
  );
};

export default PolygonSkillsChart;
