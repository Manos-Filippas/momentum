// Momentum UI kit — Lucide icon helper.
// Renders icons imperatively so React's reconciler never fights the SVG that
// lucide.createIcons() injects. Exposed as window.MIcon.
(function () {
  function Icon({ name, size = 20, strokeWidth = 1.75, color, style = {} }) {
    const ref = React.useRef(null);
    React.useEffect(() => {
      const el = ref.current;
      if (!el || !window.lucide) return;
      el.innerHTML = '';
      const i = document.createElement('i');
      i.setAttribute('data-lucide', name);
      el.appendChild(i);
      window.lucide.createIcons({
        attrs: { width: size, height: size, 'stroke-width': strokeWidth },
      });
    });
    return React.createElement('span', {
      ref,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        color: color || 'currentColor',
        flex: 'none',
        ...style,
      },
    });
  }
  window.MIcon = Icon;
})();
