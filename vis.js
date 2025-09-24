// SVG visualizations created with vanilla JS
(function(){
  const W = 800, H = 360, M = {t:24, r:24, b:40, l:40};

  function createSVG(container){
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'SVG visualization');
    svg.style.width = '100%';
    svg.style.height = 'auto';
    container.appendChild(svg);
    return svg;
  }

  // 1) Bar chart
  (function barChart(){
    const el = document.getElementById('viz1');
    if(!el) return;
    const svg = createSVG(el);

    const data = [8, 12, 5, 15, 9, 13, 7];
    const labels = ['HTML','CSS','JS','Git','Figma','Python','Other'];

    const innerW = W - M.l - M.r;
    const innerH = H - M.t - M.b;
    const maxV = Math.max(...data);
    const barW = innerW / data.length * 0.8;
    const gap = innerW / data.length * 0.2;
    const originX = M.l, originY = H - M.b;

    // axes
    const axis = document.createElementNS('http://www.w3.org/2000/svg','line');
    axis.setAttribute('x1', originX);
    axis.setAttribute('y1', originY);
    axis.setAttribute('x2', originX + innerW);
    axis.setAttribute('y2', originY);
    axis.setAttribute('stroke', '#334155');
    axis.setAttribute('stroke-width', '2');
    svg.appendChild(axis);

    // bars + labels
    data.forEach((v, i) => {
      const x = originX + i * (barW + gap) + gap/2;
      const h = innerH * (v / maxV);
      const y = originY - h;

      const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
      rect.setAttribute('x', x);
      rect.setAttribute('y', y);
      rect.setAttribute('width', barW);
      rect.setAttribute('height', h);
      rect.setAttribute('fill', '#60a5fa');
      rect.setAttribute('rx', 6);
      rect.setAttribute('aria-label', `${labels[i]}: ${v}`);
      rect.addEventListener('mouseenter', () => rect.setAttribute('fill','#93c5fd'));
      rect.addEventListener('mouseleave', () => rect.setAttribute('fill','#60a5fa'));
      svg.appendChild(rect);

      const lbl = document.createElementNS('http://www.w3.org/2000/svg','text');
      lbl.setAttribute('x', x + barW/2);
      lbl.setAttribute('y', originY + 18);
      lbl.setAttribute('text-anchor','middle');
      lbl.setAttribute('fill','#9ca3af');
      lbl.setAttribute('font-size','12');
      lbl.textContent = labels[i];
      svg.appendChild(lbl);
    });

    // title
    const title = document.createElementNS('http://www.w3.org/2000/svg','text');
    title.setAttribute('x', W/2);
    title.setAttribute('y', M.t);
    title.setAttribute('text-anchor','middle');
    title.setAttribute('fill','#e5e7eb');
    title.setAttribute('font-size','16');
    title.textContent = 'Skills Strength (Demo Data)';
    svg.appendChild(title);
  })();

  // 2) Creative SVG art — spiral circles with animation
  (function creativeArt(){
    const el = document.getElementById('viz2');
    if(!el) return;
    const svg = createSVG(el);

    const centerX = W/2, centerY = H/2;
    const count = 140;
    for(let i=0;i<count;i++){
      const t = i / count * Math.PI * 8;
      const r = 10 + i * 2;
      const x = centerX + Math.cos(t) * r * 0.6;
      const y = centerY + Math.sin(t) * r * 0.4;

      const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
      c.setAttribute('cx', x);
      c.setAttribute('cy', y);
      c.setAttribute('r', 3 + (i % 5));
      c.setAttribute('fill', i % 2 ? '#a78bfa' : '#60a5fa');

      // simple animation with SMIL (works on most desktop browsers)
      const anim = document.createElementNS('http://www.w3.org/2000/svg','animate');
      anim.setAttribute('attributeName', 'r');
      anim.setAttribute('values', '2;6;2');
      anim.setAttribute('dur', `${2 + (i%5)/5}s`);
      anim.setAttribute('repeatCount', 'indefinite');
      c.appendChild(anim);

      svg.appendChild(c);
    }

    const caption = document.createElementNS('http://www.w3.org/2000/svg','text');
    caption.setAttribute('x', W/2);
    caption.setAttribute('y', H - 12);
    caption.setAttribute('text-anchor','middle');
    caption.setAttribute('fill','#94a3b8');
    caption.setAttribute('font-size','12');
    caption.textContent = 'Creative SVG Art — Spiral Motion';
    svg.appendChild(caption);
  })();
})();
