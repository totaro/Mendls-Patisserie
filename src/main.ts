import './index.css';

// Simple fade-in animation using IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-5');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => {
    el.classList.add('opacity-0', 'translate-y-5', 'transition-all', 'duration-1000', 'ease-out');
    observer.observe(el);
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('translate-x-full');
      
      // Toggle icon between hamburger and close (X)
      const svg = mobileMenuBtn.querySelector('svg');
      if (svg) {
        if (mobileMenu.classList.contains('translate-x-full')) {
          svg.innerHTML = '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>';
        } else {
          svg.innerHTML = '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>';
        }
      }
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
        const svg = mobileMenuBtn.querySelector('svg');
        if (svg) {
          svg.innerHTML = '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>';
        }
      });
    });
  }

  // Desktop navigation active state
  const desktopLinks = document.querySelectorAll('.desktop-link');
  const sections = document.querySelectorAll('section[id]');

  const updateNav = (id: string) => {
    desktopLinks.forEach(link => {
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('text-primary', 'font-bold', 'border-b', 'border-tertiary-container');
        link.classList.remove('text-primary/70', 'hover:text-primary', 'transition-transform', 'duration-300', 'ease-out', 'hover:scale-105');
      } else {
        link.classList.remove('text-primary', 'font-bold', 'border-b', 'border-tertiary-container');
        link.classList.add('text-primary/70', 'hover:text-primary', 'transition-transform', 'duration-300', 'ease-out', 'hover:scale-105');
      }
    });
  };

  // Update nav on click
  desktopLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const id = target.getAttribute('href')?.substring(1);
      if (id) updateNav(id);
    });
  });

  // Update nav on scroll
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateNav(entry.target.id);
      }
    });
  }, { rootMargin: '-30% 0px -70% 0px' });

  sections.forEach(section => scrollObserver.observe(section));
});
