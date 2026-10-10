/**
 * High-performance Canvas Renderer for HOMIE Coffee
 * Background seamlessly matches #097454
 */

export const BG_COLOR = '#097454';

/**
 * Draw an image frame centered on canvas using object-contain math
 */
export function drawContainImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | ImageBitmap,
  cw: number,
  ch: number
) {
  // Clear with background color #097454
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, cw, ch);

  const imgWidth = (img as HTMLImageElement).naturalWidth || img.width;
  const imgHeight = (img as HTMLImageElement).naturalHeight || img.height;

  if (!imgWidth || !imgHeight) return;

  // Exact object-contain scale to maximize frame size while fitting canvas
  const scale = Math.min(cw / imgWidth, ch / imgHeight);
  const renderW = Math.round(imgWidth * scale);
  const renderH = Math.round(imgHeight * scale);

  const renderX = Math.round((cw - renderW) / 2);
  const renderY = Math.round((ch - renderH) / 2);

  // Draw image preserving original quality
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, renderX, renderY, renderW, renderH);
}


/**
 * Procedural fallback renderer when external frame files are not provided yet.
 * Renders the 5-stage coffee lifecycle seamlessly on #00735C:
 * 1. Raw Cherry (0.00 - 0.22)
 * 2. Morphing into Roasted Bean (0.22 - 0.45)
 * 3. Grinding into Grounds (0.45 - 0.70)
 * 4. Espresso Extraction (0.70 - 0.85)
 * 5. Latte with "HOMIE" Foam Art (0.85 - 1.00)
 */
export function drawProceduralStage(
  ctx: CanvasRenderingContext2D,
  progress: number, // 0 to 1
  cw: number,
  ch: number,
  timeMs: number = 0
) {
  // Clear background
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, cw, ch);

  const cx = cw / 2;
  const cy = ch / 2;
  const minDim = Math.min(cw, ch);
  const baseRadius = minDim * 0.22;

  // Subtle natural floating motion
  const floatY = Math.sin(timeMs * 0.0018 + progress * 6) * (minDim * 0.015);
  const floatX = Math.cos(timeMs * 0.0012 + progress * 4) * (minDim * 0.008);

  ctx.save();
  ctx.translate(cx + floatX, cy + floatY);

  if (progress < 0.25) {
    // -------------------------------------------------------------
    // STAGE 1: RAW CHERRY (0.00 -> 0.25)
    // -------------------------------------------------------------
    const p = Math.max(0, Math.min(1, progress / 0.25));
    const rot = (p * 0.25 - 0.1);
    ctx.rotate(rot);

    // Stem and leaf
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, -baseRadius * 0.85);
    ctx.bezierCurveTo(baseRadius * 0.2, -baseRadius * 1.5, baseRadius * 0.6, -baseRadius * 1.6, baseRadius * 0.5, -baseRadius * 1.8);
    ctx.strokeStyle = '#2d5a27';
    ctx.lineWidth = Math.max(4, baseRadius * 0.055);
    ctx.lineCap = 'round';
    ctx.stroke();

    // Leaf
    ctx.beginPath();
    ctx.ellipse(baseRadius * 0.6, -baseRadius * 1.4, baseRadius * 0.45, baseRadius * 0.2, -Math.PI / 4, 0, Math.PI * 2);
    const leafGrad = ctx.createLinearGradient(baseRadius * 0.3, -baseRadius * 1.6, baseRadius * 0.9, -baseRadius * 1.2);
    leafGrad.addColorStop(0, '#1E4620');
    leafGrad.addColorStop(1, '#3B7A38');
    ctx.fillStyle = leafGrad;
    ctx.fill();
    ctx.restore();

    // Cherry Body (twin cherries or single ripe cherry)
    const cherryGrad = ctx.createRadialGradient(
      -baseRadius * 0.3, -baseRadius * 0.3, baseRadius * 0.1,
      0, 0, baseRadius * 1.05
    );
    cherryGrad.addColorStop(0, '#FF4B4B');
    cherryGrad.addColorStop(0.35, '#C81D25');
    cherryGrad.addColorStop(0.75, '#82091D');
    cherryGrad.addColorStop(1, '#3A030C');

    // Soft drop shadow on background
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = baseRadius * 0.35;
    ctx.shadowOffsetY = baseRadius * 0.2;

    ctx.beginPath();
    ctx.arc(0, 0, baseRadius, 0, Math.PI * 2);
    ctx.fillStyle = cherryGrad;
    ctx.fill();

    ctx.shadowColor = 'transparent';

    // Gloss highlight (natural curved light reflection)
    ctx.beginPath();
    ctx.ellipse(-baseRadius * 0.38, -baseRadius * 0.42, baseRadius * 0.32, baseRadius * 0.16, -Math.PI / 6, 0, Math.PI * 2);
    const highlightGrad = ctx.createLinearGradient(-baseRadius * 0.6, -baseRadius * 0.6, -baseRadius * 0.1, -baseRadius * 0.2);
    highlightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
    highlightGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = highlightGrad;
    ctx.fill();

    // Dewdrops
    for (let i = 0; i < 3; i++) {
      const dx = (i === 0 ? baseRadius * 0.4 : i === 1 ? -baseRadius * 0.1 : baseRadius * 0.25);
      const dy = (i === 0 ? -baseRadius * 0.2 : i === 1 ? baseRadius * 0.45 : baseRadius * 0.5);
      const dr = baseRadius * 0.055;
      ctx.beginPath();
      ctx.arc(dx, dy, dr, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fill();
    }

  } else if (progress < 0.50) {
    // -------------------------------------------------------------
    // STAGE 2: ROASTED COFFEE BEAN (0.25 -> 0.50)
    // -------------------------------------------------------------
    const p = (progress - 0.25) / 0.25; // 0 -> 1
    const rot = -0.1 + p * 0.4;
    ctx.rotate(rot);

    // Roasting transition: color goes from warm amber/green to deep espresso brown
    const beanW = baseRadius * 0.85;
    const beanH = baseRadius * 1.25;

    // Outer bean shape with organic curves
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = baseRadius * 0.4;
    ctx.shadowOffsetY = baseRadius * 0.25;

    const beanGrad = ctx.createRadialGradient(
      -beanW * 0.2, -beanH * 0.2, beanW * 0.1,
      0, 0, beanH
    );
    // Darkening and caramelization with progress
    if (p < 0.5) {
      // Light roasting stage
      beanGrad.addColorStop(0, '#B87333');
      beanGrad.addColorStop(0.5, '#7A4016');
      beanGrad.addColorStop(1, '#3B1F0B');
    } else {
      // Full city / specialty roast
      beanGrad.addColorStop(0, '#7A4016');
      beanGrad.addColorStop(0.4, '#44220E');
      beanGrad.addColorStop(0.85, '#241005');
      beanGrad.addColorStop(1, '#110602');
    }

    ctx.beginPath();
    ctx.ellipse(0, 0, beanW, beanH, 0, 0, Math.PI * 2);
    ctx.fillStyle = beanGrad;
    ctx.fill();
    ctx.shadowColor = 'transparent';

    // The iconic center crease of the Arabica coffee bean
    ctx.beginPath();
    ctx.moveTo(0, -beanH * 0.88);
    ctx.bezierCurveTo(-beanW * 0.18, -beanH * 0.35, beanW * 0.2, beanH * 0.35, 0, beanH * 0.88);
    ctx.strokeStyle = '#120703';
    ctx.lineWidth = Math.max(3, beanW * 0.08);
    ctx.lineCap = 'round';
    ctx.stroke();

    // Inner pale crack chaff line
    ctx.beginPath();
    ctx.moveTo(-beanW * 0.02, -beanH * 0.75);
    ctx.bezierCurveTo(-beanW * 0.12, -beanH * 0.25, beanW * 0.14, beanH * 0.25, -beanW * 0.02, beanH * 0.75);
    ctx.strokeStyle = 'rgba(235, 206, 172, 0.75)';
    ctx.lineWidth = Math.max(1.5, beanW * 0.035);
    ctx.stroke();

    // Silky roast oil sheen
    ctx.beginPath();
    ctx.ellipse(-beanW * 0.38, -beanH * 0.3, beanW * 0.25, beanH * 0.45, -Math.PI / 8, 0, Math.PI * 2);
    const sheenGrad = ctx.createLinearGradient(-beanW * 0.6, -beanH * 0.5, -beanW * 0.1, 0);
    sheenGrad.addColorStop(0, 'rgba(255, 220, 180, 0.45)');
    sheenGrad.addColorStop(1, 'rgba(255, 220, 180, 0)');
    ctx.fillStyle = sheenGrad;
    ctx.fill();

    // Aromatic steam / roast wisps
    if (p > 0.4) {
      const wispAlpha = Math.min(0.6, (p - 0.4) * 1.5);
      ctx.strokeStyle = `rgba(255, 255, 255, ${wispAlpha * 0.35})`;
      ctx.lineWidth = 2;
      for (let w = -1; w <= 1; w += 2) {
        ctx.beginPath();
        const startX = w * beanW * 0.5;
        const wave = Math.sin(timeMs * 0.003 + w);
        ctx.moveTo(startX, -beanH * 0.6);
        ctx.bezierCurveTo(startX + wave * 15, -beanH * 1.2, startX - wave * 15, -beanH * 1.6, startX, -beanH * 2.0);
        ctx.stroke();
      }
    }

  } else if (progress < 0.72) {
    // -------------------------------------------------------------
    // STAGE 3: COFFEE GROUNDS & PARTICLES (0.50 -> 0.72)
    // -------------------------------------------------------------
    const p = (progress - 0.50) / 0.22; // 0 -> 1

    // Portafilter rim or grinding dispersion mound
    const moundRadius = baseRadius * (1.1 + p * 0.2);

    // Portafilter basket ring
    ctx.shadowColor = 'rgba(0,0,0,0.45)';
    ctx.shadowBlur = baseRadius * 0.3;
    ctx.shadowOffsetY = baseRadius * 0.2;

    ctx.beginPath();
    ctx.arc(0, 0, moundRadius * 1.15, 0, Math.PI * 2);
    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth = Math.max(6, baseRadius * 0.08);
    ctx.stroke();

    // Coffee bed background
    const puckGrad = ctx.createRadialGradient(0, 0, moundRadius * 0.1, 0, 0, moundRadius);
    puckGrad.addColorStop(0, '#3A1E0E');
    puckGrad.addColorStop(0.6, '#281408');
    puckGrad.addColorStop(1, '#1A0C05');
    ctx.beginPath();
    ctx.arc(0, 0, moundRadius, 0, Math.PI * 2);
    ctx.fillStyle = puckGrad;
    ctx.fill();
    ctx.shadowColor = 'transparent';

    // Tactile micro-grounds scattered around
    const seedCount = 140;
    for (let i = 0; i < seedCount; i++) {
      // Deterministic pseudo-random distribution
      const angle = (i * 137.5) * (Math.PI / 180);
      const rRatio = Math.sqrt(i / seedCount);
      const r = rRatio * moundRadius * 0.95;
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;

      const size = Math.max(1.8, (1 - rRatio * 0.5) * baseRadius * 0.038);
      const shade = (i % 3 === 0) ? '#4A2814' : (i % 3 === 1) ? '#60331A' : '#231106';

      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fillStyle = shade;
      ctx.fill();
    }

    // Dynamic grinding burst particles floating outward as p increases
    if (p < 0.7) {
      const burstFactor = (1 - p);
      for (let b = 0; b < 24; b++) {
        const bAngle = (b / 24) * Math.PI * 2 + timeMs * 0.0005;
        const bDist = moundRadius * (1.1 + burstFactor * 0.7) + (b % 5) * 8;
        const bx = Math.cos(bAngle) * bDist;
        const by = Math.sin(bAngle) * bDist;
        ctx.beginPath();
        ctx.arc(bx, by, Math.max(1.5, baseRadius * 0.02), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212, 175, 55, 0.7)';
        ctx.fill();
      }
    }

  } else if (progress < 0.85) {
    // -------------------------------------------------------------
    // STAGE 4: ESPRESSO EXTRACTION (0.72 -> 0.85)
    // -------------------------------------------------------------
    const p = (progress - 0.72) / 0.13; // 0 -> 1
    const cupR = baseRadius * 1.1;

    // Artisanal ceramic cup outline
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = baseRadius * 0.35;
    ctx.shadowOffsetY = baseRadius * 0.25;

    // Cup rim (matte emerald & gold trim)
    ctx.beginPath();
    ctx.arc(0, 0, cupR, 0, Math.PI * 2);
    ctx.fillStyle = '#015544';
    ctx.fill();

    ctx.strokeStyle = '#D4AF37'; // Gold rim
    ctx.lineWidth = Math.max(3, baseRadius * 0.035);
    ctx.stroke();

    ctx.shadowColor = 'transparent';

    // Crema filling up
    const cremaR = cupR * 0.88;
    const fillRatio = 0.5 + p * 0.5;
    const cremaGrad = ctx.createRadialGradient(0, 0, cremaR * 0.2, 0, 0, cremaR);
    cremaGrad.addColorStop(0, '#E4A254'); // Golden tiger-striped crema
    cremaGrad.addColorStop(0.4, '#C27A2F');
    cremaGrad.addColorStop(0.85, '#683614');
    cremaGrad.addColorStop(1, '#391B07');

    ctx.beginPath();
    ctx.arc(0, 0, cremaR * fillRatio, 0, Math.PI * 2);
    ctx.fillStyle = cremaGrad;
    ctx.fill();

    // Espresso pour stream flowing down from above
    const streamW = Math.max(4, baseRadius * 0.08);
    const streamH = ch * 0.45;
    const streamGrad = ctx.createLinearGradient(0, -streamH, 0, 0);
    streamGrad.addColorStop(0, 'rgba(194, 122, 47, 0.95)');
    streamGrad.addColorStop(0.8, '#5C2D0C');
    streamGrad.addColorStop(1, '#8B4513');

    ctx.beginPath();
    ctx.moveTo(-streamW * 0.5, -streamH);
    ctx.lineTo(-streamW * 0.8, 0);
    ctx.lineTo(streamW * 0.8, 0);
    ctx.lineTo(streamW * 0.5, -streamH);
    ctx.closePath();
    ctx.fillStyle = streamGrad;
    ctx.fill();

    // Crema ripple rings
    const ripplePhase = (timeMs * 0.004) % 1;
    ctx.beginPath();
    ctx.arc(0, 0, cremaR * (0.2 + ripplePhase * 0.5), 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 230, 180, ${0.6 * (1 - ripplePhase)})`;
    ctx.lineWidth = 2;
    ctx.stroke();

  } else {
    // -------------------------------------------------------------
    // STAGE 5: LATTE WITH "HOMIE" FOAM ART (0.85 -> 1.00)
    // -------------------------------------------------------------
    const p = (progress - 0.85) / 0.15; // 0 -> 1
    const cupR = baseRadius * 1.25;

    // Ceramic cup shadow & body
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = baseRadius * 0.45;
    ctx.shadowOffsetY = baseRadius * 0.3;

    // Cup Saucer
    ctx.beginPath();
    ctx.arc(0, baseRadius * 0.1, cupR * 1.35, 0, Math.PI * 2);
    ctx.fillStyle = '#014537';
    ctx.fill();

    // Cup handle
    ctx.beginPath();
    ctx.arc(cupR * 1.15, 0, baseRadius * 0.35, -Math.PI / 2, Math.PI / 2);
    ctx.strokeStyle = '#015544';
    ctx.lineWidth = baseRadius * 0.14;
    ctx.stroke();
    ctx.strokeStyle = '#D4AF37'; // Gold accent on handle
    ctx.lineWidth = 2;
    ctx.stroke();

    // Cup Body
    ctx.beginPath();
    ctx.arc(0, 0, cupR, 0, Math.PI * 2);
    ctx.fillStyle = '#004D3D';
    ctx.fill();

    // Rim
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = Math.max(4, baseRadius * 0.045);
    ctx.stroke();

    ctx.shadowColor = 'transparent';

    // Rich espresso & crema halo ring
    const liquidR = cupR * 0.9;
    const haloGrad = ctx.createRadialGradient(0, 0, liquidR * 0.4, 0, 0, liquidR);
    haloGrad.addColorStop(0, '#F5EDE0'); // Silky microfoam center
    haloGrad.addColorStop(0.65, '#EBD3B0');
    haloGrad.addColorStop(0.82, '#B8783B'); // Crema border
    haloGrad.addColorStop(1, '#53280B'); // Deep crema rim
    ctx.beginPath();
    ctx.arc(0, 0, liquidR, 0, Math.PI * 2);
    ctx.fillStyle = haloGrad;
    ctx.fill();

    // Latte art blossom (foam ripples)
    const foamAlpha = Math.min(1, p * 1.2);
    ctx.save();
    ctx.globalAlpha = foamAlpha;

    // Rosetta / tulip outer heart curves in foam
    ctx.strokeStyle = '#935824';
    ctx.lineWidth = Math.max(2, baseRadius * 0.022);
    ctx.beginPath();
    ctx.arc(0, 0, liquidR * 0.65, 0, Math.PI * 2);
    ctx.stroke();

    // The iconic "HOMIE" foam typography
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const fontSize = Math.max(22, baseRadius * 0.38);
    ctx.font = `700 ${fontSize}px 'Playfair Display', Georgia, serif`;

    // Foam depth shadow
    ctx.fillStyle = 'rgba(125, 70, 22, 0.45)';
    ctx.fillText('HOMIE', 1, 2);

    // Warm ivory foam text
    ctx.fillStyle = '#6E3A0F';
    ctx.fillText('HOMIE', 0, 0);

    // Fine foam heart at the apex
    const heartY = -fontSize * 0.75;
    const hSize = fontSize * 0.32;
    ctx.fillStyle = '#7E4214';
    ctx.beginPath();
    ctx.moveTo(0, heartY + hSize * 0.6);
    ctx.bezierCurveTo(-hSize, heartY - hSize * 0.3, -hSize * 0.6, heartY - hSize, 0, heartY - hSize * 0.3);
    ctx.bezierCurveTo(hSize * 0.6, heartY - hSize, hSize, heartY - hSize * 0.3, 0, heartY + hSize * 0.6);
    ctx.fill();

    // Foam flourish underneath
    ctx.beginPath();
    ctx.moveTo(-fontSize * 1.1, fontSize * 0.65);
    ctx.quadraticCurveTo(0, fontSize * 0.85, fontSize * 1.1, fontSize * 0.65);
    ctx.strokeStyle = '#7E4214';
    ctx.lineWidth = Math.max(1.8, fontSize * 0.07);
    ctx.stroke();

    ctx.restore();

    // Delicate fragrant steam curling up
    ctx.save();
    for (let s = -1; s <= 1; s++) {
      const sPhase = (timeMs * 0.0015 + s * 1.8) % 1;
      const sAlpha = Math.sin(sPhase * Math.PI) * 0.28;
      ctx.strokeStyle = `rgba(255, 255, 255, ${sAlpha})`;
      ctx.lineWidth = Math.max(2, baseRadius * 0.025);
      ctx.beginPath();
      const sx = s * cupR * 0.3;
      const sy = -liquidR * 0.6;
      ctx.moveTo(sx, sy);
      ctx.bezierCurveTo(
        sx + Math.sin(sPhase * 6) * 20,
        sy - cupR * 0.5,
        sx - Math.cos(sPhase * 6) * 20,
        sy - cupR * 1.0,
        sx,
        sy - cupR * 1.4
      );
      ctx.stroke();
    }
    ctx.restore();
  }

  ctx.restore();
}
