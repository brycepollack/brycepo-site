export function highlightCurrentNav() {
  const normalize = (path: string | null) => (path ?? '').replace(/\/+$/, '') || '/';
  const currentPath = normalize(window.location.pathname);

  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPath = normalize(link.getAttribute('href'));
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });
}
