import React from 'react';

interface SparklinePreviewProps {
  data?: number[];
  color?: string;
  className?: string;
  height?: number;
  width?: number;
}

export const SparklinePreview: React.FC<SparklinePreviewProps> = ({
  data = [35, 42, 50, 48, 65, 78, 85, 92],
  color = '#d8a34f',
  className = '',
  height = 24,
  width = 64,
}) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Calculate points
  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * (width - 4) + 2;
      const y = height - 3 - ((val - min) / range) * (height - 6);
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `2,${height} ${points} ${width - 2},${height}`;

  return (
    <div className={`inline-block overflow-hidden pointer-events-none select-none ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={`grad-${color.replace(/[^a-zA-Z0-9]/g, '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <polygon
          points={areaPoints}
          fill={`url(#grad-${color.replace(/[^a-zA-Z0-9]/g, '')})`}
        />
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        {/* End pulse dot */}
        {data.length > 0 && (
          <circle
            cx={width - 2}
            cy={height - 3 - ((data[data.length - 1] - min) / range) * (height - 6)}
            r="2"
            fill={color}
          />
        )}
      </svg>
    </div>
  );
};
