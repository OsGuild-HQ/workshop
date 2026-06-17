---
trigger: always_on
description: Senior frontend guidance for building production-ready, mobile-responsive web apps and PWAs using Vite.
---

## Vite Senior Frontend Engineering Skill

Use this skill whenever scaffolding, building, configuring, optimizing, or refactoring a frontend application powered by Vite (including React, Vue, Svelte, or Vanilla JS/TS projects).

### Triggers
- **Configuration & Build**: Mentions of `vite.config.ts`, HMR (Hot Module Replacement), dynamic imports, code splitting, rollup configuration, bundling, or asset optimization.
- **Responsive Design**: Requests for mobile-first layouts, media query breakpoints, container queries, viewport settings, touch targets, and fluid typography.
- **PWA/Mobile WebApp**: Converting web apps to progressive web applications, web manifests, service workers, background sync, or offline caching.

---

### Core Philosophy

1. **Mobile-First Layouts**
   - **Smallest Viewport Baseline**: Always write styling starting at the smallest viewport (e.g., `320px`) and use `min-width` media queries to build up layout extensions for larger screens. Never retrofit desktop styling for mobile devices.
   - **Touch Interaction Targets**: Ensure all interactive components (buttons, links, form fields) have a minimum touch target size of `44x44px` with sufficient padding to avoid accidental activations.
   - **Fluid Dimensions**: Prioritize flexbox, CSS grid, and viewport units (`vw`, `vh`) for fluid layouts, and leverage CSS container queries for component-level responsiveness.

2. **Build Performance & Asset Optimization**
   - **Dynamic Imports**: Implement dynamic chunk allocation (e.g., `React.lazy` or dynamic `import()`) on routes and heavy interactive features.
   - **Vite Bundler Tuning**: Fine-tune `rollupOptions.output.manualChunks` to split vendor dependencies cleanly and prevent massive initial load bundles.
   - **Modern Assets**: Optimize all images into modern formats (WebP, AVIF), compress SVG assets, and use inline CSS where beneficial for critical rendering paths.

3. **Accessibility (A11y)**
   - **Semantic Markup**: Maintain strict HTML5 semantics (`<main>`, `<header>`, `<nav>`, `<aside>`, `<footer>`, `<button>`) instead of nested divider elements.
   - **Keyboard & Reader Focus**: Ensure all active elements are keyboard navigable with visible focus rings. Use ARIA attributes appropriately where custom DOM components exist.

4. **Progressive Web App (PWA) Delivery**
   - **Service Workers**: Implement background loading, offline fallbacks, and update indicators.
   - **Manifest Configuration**: Configure web app manifests (`site.webmanifest`) with standalone display modes, theme matching, and proper responsive icon sets.