/**
 * GPU Clipping & Stacking Context Diagnostic Inspector for Glassmorphism Cards
 * Analyzes ancestor elements to detect layout contexts that clip backdrop blur,
 * trap z-indexes, or flatten 3D transform hierarchies.
 */

export interface AncestorClippingIssue {
  element: HTMLElement;
  tagName: string;
  id: string;
  className: string;
  issues: string[];
  severity: 'error' | 'warning' | 'info';
}

export interface GlassDiagnosticReport {
  cardId?: string;
  hasClippingHazard: boolean;
  hasStackingTrap: boolean;
  computedBackdropFilter: string;
  computedZIndex: string;
  ancestorCount: number;
  flaggedAncestors: AncestorClippingIssue[];
  recommendations: string[];
  timestamp: number;
}

export function inspectAncestorLayoutContext(element: HTMLElement | null): GlassDiagnosticReport {
  if (!element || typeof window === 'undefined') {
    return {
      hasClippingHazard: false,
      hasStackingTrap: false,
      computedBackdropFilter: 'none',
      computedZIndex: 'auto',
      ancestorCount: 0,
      flaggedAncestors: [],
      recommendations: [],
      timestamp: Date.now(),
    };
  }

  const cardStyle = window.getComputedStyle(element);
  const computedBackdropFilter = 
    cardStyle.backdropFilter || 
    (cardStyle as unknown as Record<string, string>)['-webkit-backdrop-filter'] || 
    'none';
  const computedZIndex = cardStyle.zIndex;

  const flaggedAncestors: AncestorClippingIssue[] = [];
  const recommendations: string[] = [];
  let current: HTMLElement | null = element.parentElement;
  let ancestorCount = 0;

  while (current && current !== document.documentElement) {
    ancestorCount++;
    const style = window.getComputedStyle(current);
    const issues: string[] = [];
    let severity: 'error' | 'warning' | 'info' = 'info';

    // 1. Check for Overflow Clipping
    const ox = style.overflowX;
    const oy = style.overflowY;
    const isBodyOrHtml = current.tagName === 'BODY' || current.tagName === 'HTML';

    if (!isBodyOrHtml && (ox === 'hidden' || oy === 'hidden' || ox === 'clip' || oy === 'clip')) {
      issues.push(`overflow: [X: ${ox}, Y: ${oy}] clips 3D transforms & outer blur bloom bounds`);
      severity = 'warning';
    }

    // 2. Check for CSS Containment (paint or strict forces a hard viewport clip)
    const contain = style.contain || '';
    if (contain.includes('paint') || contain.includes('strict') || contain.includes('content')) {
      issues.push(`contain: '${contain}' creates a hard rendering containment & breaks backdrop-filter sampling`);
      severity = 'error';
    }

    // 3. Check for Clip-Path or CSS Clip
    const clipPath = style.clipPath;
    if (clipPath && clipPath !== 'none') {
      issues.push(`clip-path: '${clipPath}' forcibly clips GPU raster layer`);
      severity = 'error';
    }

    // 4. Check for 3D Transform Flattening
    const transformStyle = style.transformStyle;
    const transform = style.transform;
    if (transform && transform !== 'none' && transformStyle !== 'preserve-3d') {
      issues.push(`transform on ancestor with 'transform-style: flat' flattens card 3D perspective layers`);
      severity = 'info';
    }

    // 5. Check for CSS Mask
    const mask = style.mask || (style as unknown as Record<string, string>)['-webkit-mask'] || '';
    if (mask && mask !== 'none') {
      issues.push(`CSS mask applied: may mask backdrop-filter buffer`);
      severity = 'warning';
    }

    // 6. Check for Stacking Context Trapping with low z-index
    const zIndex = style.zIndex;
    const opacity = parseFloat(style.opacity || '1');
    const filter = style.filter;
    const mixBlend = style.mixBlendMode;

    if (opacity < 1) {
      issues.push(`opacity: ${opacity} establishes a new isolated stacking context`);
    }
    if (filter && filter !== 'none') {
      issues.push(`filter: '${filter}' establishes an isolated rendering texture`);
    }
    if (mixBlend && mixBlend !== 'normal') {
      issues.push(`mix-blend-mode: '${mixBlend}' creates a composite grouping boundary`);
    }

    if (issues.length > 0) {
      flaggedAncestors.push({
        element: current,
        tagName: current.tagName.toLowerCase(),
        id: current.id || '',
        className: current.className?.toString().slice(0, 50) || '',
        issues,
        severity,
      });
    }

    current = current.parentElement;
  }

  const hasClippingHazard = flaggedAncestors.some((a) => a.severity === 'error' || a.severity === 'warning');
  const hasStackingTrap = flaggedAncestors.some((a) => a.issues.some((i) => i.includes('stacking context')));

  if (hasClippingHazard) {
    recommendations.push(
      'Ensure parent containers do not use "contain: paint" or restrictive "overflow: hidden" unless strictly bounding dimensions.'
    );
  }
  if (computedBackdropFilter === 'none') {
    recommendations.push(
      'Backdrop-filter is reported as none. Verify browser WebKit/Blink backdrop support or CSS vendor prefixes.'
    );
  }

  return {
    cardId: element.id || undefined,
    hasClippingHazard,
    hasStackingTrap,
    computedBackdropFilter,
    computedZIndex,
    ancestorCount,
    flaggedAncestors,
    recommendations,
    timestamp: Date.now(),
  };
}
