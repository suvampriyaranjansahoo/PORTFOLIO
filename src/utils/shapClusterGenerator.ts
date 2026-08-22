export interface ShapPoint {
  id: string;
  x: number;
  y: number;
  z: number;
  cluster: 'low_risk' | 'solvency' | 'liquidity' | 'capital';
  clusterName: string;
  shapScore: number;
  confidence: number;
  primaryFeature: string;
  featureValue: string;
  marginalDelta: string;
  size: number;
  color: string;
}

export interface ClusterInfo {
  id: string;
  key: 'all' | 'low_risk' | 'solvency' | 'liquidity' | 'capital';
  label: string;
  count: number;
  color: string;
  avgShap: number;
  description: string;
}

export const CLUSTERS: ClusterInfo[] = [
  {
    id: 'c-all',
    key: 'all',
    label: 'All Clusters',
    count: 360,
    color: '#38bdf8',
    avgShap: 0.42,
    description: 'Full multidimensional SHAP risk distribution across 78k corporate records.'
  },
  {
    id: 'c-low',
    key: 'low_risk',
    label: 'Solvent & Stable',
    count: 140,
    color: '#10b981',
    avgShap: 0.12,
    description: 'High ROA (>8.5%), healthy cash flow coverage, negative default SHAP delta.'
  },
  {
    id: 'c-solv',
    key: 'solvency',
    label: 'Solvency Stress',
    count: 90,
    color: '#f43f5e',
    avgShap: 0.78,
    description: 'Excessive debt-to-equity (>3.4x), interest coverage breakdown, high default hazard.'
  },
  {
    id: 'c-liq',
    key: 'liquidity',
    label: 'Liquidity Crunch',
    count: 75,
    color: '#f59e0b',
    avgShap: 0.58,
    description: 'Current ratio < 0.95x, depleted quick assets, working capital contraction.'
  },
  {
    id: 'c-cap',
    key: 'capital',
    label: 'Capital Volatility',
    count: 55,
    color: '#818cf8',
    avgShap: 0.46,
    description: 'Swinging operating margins, high equity variance, moderate distress sensitivity.'
  }
];

export function generateShapClusters(seed = 42): ShapPoint[] {
  const points: ShapPoint[] = [];
  let rng = seed;

  const pseudoRandom = () => {
    rng = (rng * 16807) % 2147483647;
    return (rng - 1) / 2147483646;
  };

  const gaussian = (mean = 0, std = 1) => {
    const u1 = Math.max(1e-6, pseudoRandom());
    const u2 = pseudoRandom();
    return mean + std * Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  };

  // Cluster centers in 3D space: centered around z = -4 to z = 1 for real depth separation
  const clusterConfigs = [
    {
      key: 'low_risk' as const,
      name: 'Solvent & Stable',
      count: 140,
      center: [-3.2, -0.6, -1.2],
      spread: [1.8, 1.4, 1.5],
      color: '#10b981',
      feature: 'ROA / Retained Earnings',
      valPrefix: '+',
      valSuffix: '% ROA',
      shapBase: 0.12,
      deltaSign: '-'
    },
    {
      key: 'solvency' as const,
      name: 'Solvency Stress',
      count: 90,
      center: [3.4, 1.2, -0.2],
      spread: [1.6, 1.5, 1.4],
      color: '#f43f5e',
      feature: 'Debt-to-Equity Multiplier',
      valPrefix: '',
      valSuffix: 'x Leverage',
      shapBase: 0.78,
      deltaSign: '+'
    },
    {
      key: 'liquidity' as const,
      name: 'Liquidity Crunch',
      count: 75,
      center: [-0.4, 2.4, -2.5],
      spread: [1.5, 1.3, 1.6],
      color: '#f59e0b',
      feature: 'Quick Ratio / Operating CF',
      valPrefix: '',
      valSuffix: 'x Cash Flow',
      shapBase: 0.58,
      deltaSign: '+'
    },
    {
      key: 'capital' as const,
      name: 'Capital Volatility',
      count: 55,
      center: [1.8, -2.0, -3.2],
      spread: [1.7, 1.2, 1.5],
      color: '#818cf8',
      feature: 'Working Capital / Assets',
      valPrefix: '',
      valSuffix: '% WC',
      shapBase: 0.46,
      deltaSign: '+'
    }
  ];

  let idCounter = 1;

  for (const cfg of clusterConfigs) {
    for (let i = 0; i < cfg.count; i++) {
      const x = cfg.center[0] + gaussian(0, 0.9) * cfg.spread[0] * 0.75;
      const y = cfg.center[1] + gaussian(0, 0.85) * cfg.spread[1] * 0.75;
      const z = cfg.center[2] + gaussian(0, 0.9) * cfg.spread[2] * 0.8;

      const rawShap = Math.max(0.04, Math.min(0.96, cfg.shapBase + gaussian(0, 0.12)));
      const confidence = Math.round(78 + pseudoRandom() * 20);
      const featureNum = (cfg.key === 'low_risk' ? (6 + pseudoRandom() * 9) : (1.5 + pseudoRandom() * 4)).toFixed(1);
      const deltaVal = (Math.abs(rawShap - 0.45) * 0.8).toFixed(2);

      points.push({
        id: `shap-${idCounter++}`,
        x,
        y,
        z,
        cluster: cfg.key,
        clusterName: cfg.name,
        shapScore: parseFloat(rawShap.toFixed(3)),
        confidence,
        primaryFeature: cfg.feature,
        featureValue: `${cfg.valPrefix}${featureNum}${cfg.valSuffix}`,
        marginalDelta: `${cfg.deltaSign}${deltaVal}`,
        size: 0.08 + pseudoRandom() * 0.09,
        color: cfg.color
      });
    }
  }

  return points;
}
