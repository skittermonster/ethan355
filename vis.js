
// vis.js — enhanced SVG visualizations (no external libs)
document.addEventListener("DOMContentLoaded", () => {
  renderBarChart();
  renderCreativeArt();
});

function renderBarChart() {
  const container = document.getElementById("viz1");
  if (!container) return;

  // Demo data
  const data = [
    { label: "HTML", value: 6 },
    { label: "CSS", value: 9 },
    { label: "JS", value: 3 },
    { label: "Git", value: 10 },
    { label: "Figma", value: 5 },
    { label: "Python", value: 9 },
    { label: "Other", value: 4 },
  ];

  // Clear any existing content
  container.innerHTML = "";

  // Sizing (responsive to container width)
  const width = container.getBoundingClientRect().width || 900;
  const height = 420;
  const margin = { top: 80, right: 28, bottom: 70, left: 56 }; // extra top spacing for title
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  const svg = createSvg(width, height);
  container.appendChild(svg);

  // --- Defs: gradient + drop shadow ---
  const defs = el("defs");
  svg.appendChild(defs);

  const grad = el("linearGradient", {
    id: "barGradient",
    x1: "0%",
    y1: "0%",
    x2: "0%",
    y2: "100%",
  });
  grad.appendChild(el("stop", { offset: "0%", "stop-color": "#9cc2ff" }));
  grad.appendChild(el("stop", { offset: "100%", "stop-color": "#6aa6ff" }));
  defs.appendChild(grad);

  const filter = el("filter", { id: "barShadow", x: "-20%", y: "-20%", width: "140%", height: "140%" });
  filter.appendChild(el("feDropShadow", { dx: "0", dy: "3", stdDeviation: "4", "flood-opacity": "0.25" }));
  defs.appendChild(filter);

  // Title
  const title = el("text", {
    x: width / 2,
    y: 36,                                // comfortable top spacing
    "text-anchor": "middle",
    class: "viz-title",
  });
  title.textContent = "Skills Strength (Demo Data)";
  svg.appendChild(title);

  // Subtitle (optional, subtle)
  const subtitle = el("text", {
    x: width / 2,
    y: 58,
    "text-anchor": "middle",
    class: "viz-subtitle",
  });
  subtitle.textContent = "Interactive SVG — hover bars";
  svg.appendChild(subtitle);

  // Chart group
  const g = el("g", { transform: `translate(${margin.left},${margin.top})` });
  svg.appendChild(g);

  // Scales (band-like layout without external libs)
  const n = data.length;
  const pad = 0.35; // space between bars (relative)
  const step = innerW / (n + pad * (n + 1));
  const gap = step * pad;
  const bw = step; // bar width

  const maxVal = Math.max(...data.map((d) => d.value));
  const yScale = (v) => innerH - (v / maxVal) * innerH;

  // Axes/gridlines
  const axis = el("g", { class: "axis" });
  g.appendChild(axis);

  // X baseline
  axis.appendChild(
    el("line", {
      x1: 0,
      y1: innerH,
      x2: innerW,
      y2: innerH,
      class: "axis-line",
    }),
  );

  // Horizontal gridlines (5 ticks)
  const ticks = 5;
  for (let t = 0; t <= ticks; t++) {
    const y = (innerH / ticks) * t;
    axis.appendChild(
      el("line", {
        x1: 0,
        y1: y,
        x2: innerW,
        y2: y,
        class: t === ticks ? "axis-line" : "grid",
      }),
    );

    // y-axis labels on left
    const val = Math.round(maxVal * (1 - y / innerH));
    const lbl = el("text", { x: -10, y: y + 4, class: "y-tick", "text-anchor": "end" });
    lbl.textContent = val.toString();
    axis.appendChild(lbl);
  }

  // Bars
  const bars = el("g", { class: "bars" });
  g.appendChild(bars);

  // For animation: start with 0 height at baseline
  data.forEach((d, i) => {
    const x = gap + i * (bw + gap);
    const y = innerH; // start at baseline
    const bar = el("rect", {
      x,
      y,
      width: bw,
      height: 0,
      rx: 12,
      ry: 12,
      fill: "url(#barGradient)",
      filter: "url(#barShadow)",
      class: "bar",
    });

    // Hover effects / basic tooltip
    bar.addEventListener("mouseenter", () => {
      bar.style.transform = "translateY(-4px)";
      bar.style.filter = "brightness(1.08) url(#barShadow)";
      tooltip.style.opacity = "1";
      tooltip.textContent = `${d.label}: ${d.value}`;
    });
    bar.addEventListener("mousemove", (e) => {
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const ctm = svg.getScreenCTM().inverse();
      const local = pt.matrixTransform(ctm);
      tooltip.setAttribute("x", local.x + 12);
      tooltip.setAttribute("y", local.y - 12);
      tooltipBg.setAttribute("x", local.x + 8);
      tooltipBg.setAttribute("y", local.y - 28);
      const tbbox = tooltip.getBBox();
      tooltipBg.setAttribute("width", tbbox.width + 8);
      tooltipBg.setAttribute("height", tbbox.height + 8);
      tooltipBg.setAttribute("rx", 4);
      tooltipBg.setAttribute("ry", 4);
    });
    bar.addEventListener("mouseleave", () => {
      bar.style.transform = "translateY(0px)";
      bar.style.filter = "url(#barShadow)";
      tooltip.style.opacity = "0";
      tooltipBg.style.opacity = "0";
    });

    bars.appendChild(bar);

    // Animate to final height
    const finalH = innerH - yScale(d.value);
    const finalY = yScale(d.value);
    requestAnimationFrame(() => {
      // allow layout flush
      setTimeout(() => {
        bar.style.transition = "y 700ms cubic-bezier(.2,.8,.2,1), height 700ms cubic-bezier(.2,.8,.2,1)";
        bar.setAttribute("y", finalY);
        bar.setAttribute("height", finalH);
      }, 30 + i * 40); // stagger
    });

    // x labels
    const xl = el("text", {
      x: x + bw / 2,
      y: innerH + 28,
      class: "x-tick",
      "text-anchor": "middle",
    });
    xl.textContent = d.label;
    g.appendChild(xl);
  });

  // Tooltip (SVG text with backing rect)
  const tooltipBg = el("rect", { class: "tooltip-bg", fill: "black", opacity: "0" });
  const tooltip = el("text", { class: "tooltip", opacity: "0" });
  svg.appendChild(tooltipBg);
  svg.appendChild(tooltip);

  // Global styles injected (scoped to this SVG via classes)
  injectStyles();
  
  // Utility creators
  function createSvg(w, h) {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", `0 0 ${w} ${h}`);
    s.setAttribute("width", "100%");
    s.setAttribute("height", h);
    s.setAttribute("role", "img");
    s.setAttribute("aria-label", "Bar chart of skills");
    s.style.display = "block";
    return s;
  }

  function el(name, attrs = {}) {
    const node = document.createElementNS("http://www.w3.org/2000/svg", name);
    for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
    return node;
  }

  function injectStyles() {
    // Only inject once
    if (document.getElementById("viz-style")) return;
    const style = document.createElement("style");
    style.id = "viz-style";
    style.textContent = `
      .viz-title{ font: 700 22px/1.2 system-ui, -apple-system, Segoe UI, Roboto, sans-serif; fill:#e8ecff; }
      .viz-subtitle{ font: 500 13px/1.2 system-ui, -apple-system, Segoe UI, Roboto, sans-serif; fill:#99a3c4; }
      .axis-line{ stroke:#344154; stroke-width:1.2; }
      .grid{ stroke:#283241; stroke-width:1; }
      .x-tick, .y-tick{ font: 600 14px/1 system-ui, -apple-system, Segoe UI, Roboto, sans-serif; fill:#b8c3e0; }
      .bars .bar{ shape-rendering:geometricPrecision; }
      .tooltip{ font: 600 12px/1 system-ui, -apple-system, Segoe UI, Roboto, sans-serif; fill: #ffffff; pointer-events: none; }
      .tooltip-bg{ fill: rgba(0,0,0,.6); pointer-events: none; }
    `;
    document.head.appendChild(style);
  }
}

function renderCreativeArt() {
  const container = document.getElementById("viz2");
  if (!container) return;
  container.innerHTML = "";

  const width = container.getBoundingClientRect().width || 900;
  const height = 320;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", height);
  svg.style.display = "block";
  container.appendChild(svg);

  // soothing spiral dots with animation
  const cx = width / 2;
  const cy = height / 2;
  const turns = 6;
  const steps = 180;
  for (let i = 0; i < steps; i++) {
    const t = i / steps;
    const angle = turns * 2 * Math.PI * t;
    const r = 18 + t * (Math.min(width, height) / 2 - 24);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 2 + 3 * Math.sin(i / 6));
    circle.setAttribute("fill", `hsl(${220 + i / 2}, 70%, ${55 + (Math.sin(i / 8) * 15)}%)`);
    circle.style.animation = `pulse ${1200 + i * 4}ms ease-in-out ${i * 12}ms infinite alternate`;
    svg.appendChild(circle);
  }

  const style = document.createElement("style");
  style.textContent = `@keyframes pulse{ from{ transform: scale(1)} to{ transform: scale(1.25)} }`;
  document.head.appendChild(style);
}
